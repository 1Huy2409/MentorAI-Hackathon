
import { GoogleGenAI, Type, LiveServerMessage, Modality } from "@google/genai";
import type { Part } from "@google/genai";
import type { CvAnalysisResult, InputData, QuickInterviewData, InterviewMode } from '../src/types';

const apiKey = import.meta.env.VITE_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const MODEL_NAME = 'gemini-2.5-flash';
const LIVE_MODEL_NAME = 'gemini-2.5-flash-native-audio-preview-09-2025';

// --- Text Generation Service ---

export const analyzeCvAndJd = async (cv: InputData, jd: InputData): Promise<CvAnalysisResult> => {
    const parts: Part[] = [];

    // 1. Setup System Instruction & Context
    parts.push({
        text: `
      Vai trò: Bạn là một chuyên gia nhân sự (HR Specialist) và Career Coach chuyên nghiệp.
      Nhiệm vụ: Phân tích độ phù hợp giữa Hồ sơ ứng viên (CV) và Mô tả công việc (JD) để đưa ra đánh giá chi tiết.
      
      Dưới đây là hai tài liệu cần so sánh (có thể là văn bản hoặc file PDF/Hình ảnh).
      Hãy đọc kỹ nội dung của từng tài liệu.
    `
    });

    // 2. Add CV Part
    parts.push({ text: "\n========== TÀI LIỆU 1: HỒ SƠ ỨNG VIÊN (CV) ==========" });
    if (cv.type === 'file') {
        parts.push({ text: `(Dữ liệu được cung cấp dưới dạng file: ${cv.fileName})` });
        parts.push({
            inlineData: {
                data: cv.value,
                mimeType: cv.mimeType || 'application/pdf'
            }
        });
    } else {
        parts.push({ text: cv.value });
    }

    // 3. Add JD Part
    parts.push({ text: "\n========== TÀI LIỆU 2: MÔ TẢ CÔNG VIỆC (JD) ==========" });
    if (jd.type === 'file') {
        parts.push({ text: `(Dữ liệu được cung cấp dưới dạng file: ${jd.fileName})` });
        parts.push({
            inlineData: {
                data: jd.value,
                mimeType: jd.mimeType || 'application/pdf'
            }
        });
    } else {
        parts.push({ text: jd.value });
    }

    // 4. Analysis Instructions
    const prompt = `
    \n========== YÊU CẦU PHÂN TÍCH ==========
    Dựa trên nội dung của hai tài liệu trên, hãy thực hiện các bước sau:
    1. MATCHING: So sánh kỹ năng, kinh nghiệm, và trình độ trong CV với các yêu cầu cốt lõi trong JD.
    2. STRENGTHS: Chỉ ra 3 điểm mạnh giúp ứng viên nổi bật.
    3. WEAKNESSES: Chỉ ra 3 điểm yếu hoặc "điểm mù" mà ứng viên cần cải thiện.
    4. REWRITE: Đề xuất 3 nội dung cụ thể trong CV cần viết lại để tối ưu hóa từ khóa và ấn tượng hơn với nhà tuyển dụng.
    5. SCORE: Đánh giá mức độ phù hợp trên thang 100.

    Hãy trả về kết quả dưới dạng JSON (không markdown) theo schema sau.
  `;

    parts.push({ text: prompt });

    try {
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: { role: 'user', parts: parts },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        matchingScore: { type: Type.INTEGER },
                        strengths: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        weaknesses: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        rewrittenPoints: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    original: { type: Type.STRING },
                                    improved: { type: Type.STRING },
                                    reason: { type: Type.STRING }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (response.text) {
            return JSON.parse(response.text) as CvAnalysisResult;
        }
        throw new Error("No response text generated");
    } catch (error) {
        console.error("Error analyzing CV:", error);
        return {
            matchingScore: 0,
            strengths: ["Không thể đọc tài liệu hoặc lỗi phân tích."],
            weaknesses: ["Vui lòng đảm bảo file là PDF hoặc Hình ảnh rõ nét.", error instanceof Error ? error.message : "Unknown error"],
            rewrittenPoints: []
        };
    }
};

// --- Live API Service ---

// Audio Helpers
function base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

export class LiveInterviewManager {
    private inputAudioContext: AudioContext | null = null;
    private outputAudioContext: AudioContext | null = null;
    private inputNode: ScriptProcessorNode | null = null;
    private source: MediaStreamAudioSourceNode | null = null;
    private outputNode: GainNode | null = null;
    private nextStartTime = 0;
    private stream: MediaStream | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private session: any = null; // Holds the active session

    public onAiSpeakingStateChange: ((isSpeaking: boolean) => void) | null = null;

    async connect(
        mode: InterviewMode,
        data: {
            cv?: InputData,
            jd?: InputData,
            weaknesses?: string[],
            quickData?: QuickInterviewData
        }
    ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

        this.outputNode = this.outputAudioContext.createGain();
        this.outputNode.connect(this.outputAudioContext.destination);

        let systemInstruction = "";

        if (mode === 'ANALYSIS' && data.cv && data.jd && data.weaknesses) {
            // Prepare context strings
            const cvContext = data.cv.type === 'text'
                ? `CV Content Snippet: ${data.cv.value.substring(0, 500)}...`
                : `CV File: ${data.cv.fileName} (User uploaded file)`;

            const jdContext = data.jd.type === 'text'
                ? `JD Content Snippet: ${data.jd.value.substring(0, 500)}...`
                : `JD File: ${data.jd.fileName} (User uploaded file)`;

            systemInstruction = `
        Bạn là một Nhà tuyển dụng (Recruiter) chuyên nghiệp.
        
        Bối cảnh:
        - Bạn đang phỏng vấn trực tiếp ứng viên dựa trên hồ sơ đã nộp.
        - Điểm yếu của ứng viên cần kiểm tra kỹ (từ phân tích trước đó): ${data.weaknesses.join(', ')}.
        - Thông tin sơ bộ: ${cvContext}, ${jdContext}.

        Nhiệm vụ:
        1. Đặt câu hỏi phỏng vấn chuyên sâu, tập trung khai thác điểm yếu hoặc kinh nghiệm trong CV.
        2. Lắng nghe và phản hồi tự nhiên.
        3. Bắt đầu bằng việc chào ứng viên và đặt câu hỏi đầu tiên liên quan đến CV.
      `;
        } else if (mode === 'QUICK' && data.quickData) {
            systemInstruction = `
        Bạn là một Nhà tuyển dụng (Recruiter) chuyên nghiệp đang phỏng vấn ứng viên cho vị trí: ${data.quickData.role}.
        Mức độ kinh nghiệm của ứng viên: ${data.quickData.experience}.

        Nhiệm vụ:
        1. Đóng vai người phỏng vấn nghiêm túc nhưng cởi mở.
        2. Đặt các câu hỏi phù hợp với vị trí ${data.quickData.role} và tầm kinh nghiệm ${data.quickData.experience}.
        3. Bắt đầu bằng câu: "Chào bạn, tôi là người phỏng vấn hôm nay. Bạn hãy giới thiệu đôi chút về bản thân mình?"
      `;
        }

        // Get User Mic
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const sessionPromise = ai.live.connect({
            model: LIVE_MODEL_NAME,
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
                },
                systemInstruction: systemInstruction,
            },
            callbacks: {
                onopen: () => {
                    console.log("Session opened");
                    this.setupAudioInput(sessionPromise);
                },
                onmessage: (message: LiveServerMessage) => {
                    this.handleMessage(message);
                },
                onclose: () => {
                    console.log("Session closed");
                },
                onerror: (err) => {
                    console.error("Session error", err);
                }
            }
        });

        // Wait for session to resolve to keep reference
        this.session = await sessionPromise;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private setupAudioInput(sessionPromise: Promise<any>) {
        if (!this.inputAudioContext || !this.stream) return;

        this.source = this.inputAudioContext.createMediaStreamSource(this.stream);
        // Use ScriptProcessor for raw PCM access (standard for this API)
        this.inputNode = this.inputAudioContext.createScriptProcessor(4096, 1, 1);

        this.inputNode.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);

            // Convert Float32 to Int16 (PCM)
            const l = inputData.length;
            const int16 = new Int16Array(l);
            for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
            }

            const base64Data = arrayBufferToBase64(int16.buffer);

            // Send to Gemini
            sessionPromise.then((session) => {
                session.sendRealtimeInput({
                    media: {
                        mimeType: 'audio/pcm;rate=16000',
                        data: base64Data
                    }
                });
            });
        };

        this.source.connect(this.inputNode);
        this.inputNode.connect(this.inputAudioContext.destination);
    }

    private async handleMessage(message: LiveServerMessage) {
        const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;

        if (audioData) {
            if (this.onAiSpeakingStateChange) this.onAiSpeakingStateChange(true);

            if (this.outputAudioContext && this.outputNode) {
                // Sync timing
                this.nextStartTime = Math.max(this.outputAudioContext.currentTime, this.nextStartTime);

                const audioBytes = base64ToUint8Array(audioData);
                const audioBuffer = await this.decodeAudioData(audioBytes, this.outputAudioContext);

                const source = this.outputAudioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(this.outputNode);

                source.start(this.nextStartTime);
                this.nextStartTime += audioBuffer.duration;

                // Simple heuristic to turn off visualizer shortly after buffer duration
                setTimeout(() => {
                    if (this.onAiSpeakingStateChange && this.outputAudioContext?.currentTime && this.outputAudioContext.currentTime >= this.nextStartTime - 0.1) {
                        this.onAiSpeakingStateChange(false);
                    }
                }, audioBuffer.duration * 1000);
            }
        }
    }

    private async decodeAudioData(data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> {
        // Manual PCM 16-bit decoding because browser decodeAudioData expects headers
        const dataInt16 = new Int16Array(data.buffer);
        const buffer = ctx.createBuffer(1, dataInt16.length, 24000); // Output is usually 24kHz
        const channelData = buffer.getChannelData(0);

        for (let i = 0; i < dataInt16.length; i++) {
            channelData[i] = dataInt16[i] / 32768.0;
        }
        return buffer;
    }

    disconnect() {
        if (this.session) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            try { (this.session as any).close(); } catch { /* ignore */ }
        }

        if (this.inputNode) {
            this.inputNode.disconnect();
            this.inputNode.onaudioprocess = null;
        }
        if (this.source) this.source.disconnect();
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
        if (this.inputAudioContext) this.inputAudioContext.close();
        if (this.outputAudioContext) this.outputAudioContext.close();

        this.inputAudioContext = null;
        this.outputAudioContext = null;
        this.session = null;
    }
}
