import os
from livekit import api
from dotenv import load_dotenv

# Load env vars
load_dotenv("../.env")

API_KEY = os.getenv("LIVEKIT_API_KEY")
API_SECRET = os.getenv("LIVEKIT_API_SECRET")
LIVEKIT_URL = os.getenv("LIVEKIT_URL")

if not API_KEY or not API_SECRET:
    print("LỖI: Không tìm thấy LIVEKIT_API_KEY hoặc SECRET trong .env")
    exit(1)

# Tạo token cho user
token = api.AccessToken(API_KEY, API_SECRET) \
    .with_identity("Ung_Vien_Test") \
    .with_name("Ứng Viên") \
    .with_grants(api.VideoGrants(
        room_join=True,
        room="test-room",  # Đổi lại tên room đơn giản
        can_publish=True,
        can_subscribe=True,
    ))

print("\n" + "="*60)
print("TOKEN ĐỂ KẾT NỐI:")
print("="*60)
print(token.to_jwt())
print("\n" + "="*60)
print(f"\nTruy cập: https://meet.livekit.io/custom")
print(f"LiveKit URL: {LIVEKIT_URL}")
print(f"Token: (copy ở trên)")
print("="*60 + "\n")