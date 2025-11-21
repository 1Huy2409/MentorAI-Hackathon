# LiveKit Agent - Hướng dẫn chạy

## Yêu cầu
- Python 3.9+
- LiveKit Cloud account với API Key/Secret
- Google API Key (Gemini)

## Cài đặt

1. **Cài dependencies:**
```bash
pip install -r requirements.txt
```

2. **Cấu hình .env:**
Điền thông tin vào file `.env`:
```
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
GOOGLE_API_KEY=your_google_api_key
```

## Chạy Agent

```bash
python agent.py dev
```

Agent sẽ:
- Kết nối với LiveKit Cloud
- Chờ participant join vào room
- Sử dụng Gemini Multimodal (voice + text)
- Trả lời theo system prompt đã cấu hình

## Debug
- Kiểm tra log để xem kết nối
- Đảm bảo `.env` có đầy đủ thông tin
- Test bằng LiveKit Meet hoặc frontend app
