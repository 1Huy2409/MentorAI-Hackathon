import logging
import os
from dotenv import load_dotenv

from livekit.agents import (
    AutoSubscribe,
    JobContext,
    JobProcess,
    WorkerOptions,
    cli,
)
from livekit.agents.voice import Agent as VoiceAgent
from livekit.plugins import google, deepgram, silero

# Load environment variables
load_dotenv(dotenv_path="../.env")

logger = logging.getLogger("voice-agent")

def prewarm(proc: JobProcess):
    proc.userdata["first_participant_joined"] = False

async def entrypoint(ctx: JobContext):
    logger.info(f"Connecting to room: {ctx.room.name}")
    await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)

    participant = await ctx.wait_for_participant()
    logger.info(f"Người dùng {participant.identity} đã tham gia. Đang khởi tạo Agent...")

    # --- CẤU HÌNH AGENT ---
    try:
        agent = VoiceAgent(
            vad=silero.VAD.load(),
            stt=deepgram.STT(model="nova-2-general", language="vi"),
            llm=google.LLM(model="gemini-1.5-flash"),
            tts=deepgram.TTS(model="aura-asteria-en"),
            instructions="Bạn là MentorAI. Hãy chào ứng viên ngắn gọn bằng tiếng Việt.",
        )

        agent.start(ctx.room, participant)
        logger.info("✅ Agent đã khởi động thành công!")
        
        await agent.say("Hello, Mentor AI is ready to interview.", allow_interruptions=True)

    except Exception as e:
        logger.error(f"❌ LỖI KHỞI TẠO AGENT: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
            prewarm_fnc=prewarm,
        ),
    )