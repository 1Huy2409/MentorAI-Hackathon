from dotenv import load_dotenv
from livekit import agents
from livekit.agents import AgentSession, Agent
from livekit.plugins import google

load_dotenv()

async def entrypoint(ctx: agents.JobContext):
    await ctx.connect()

    session = AgentSession(
        llm=google.beta.realtime.RealtimeModel(
            model="gemini-2.0-flash-exp",  # Correct model name
            voice="Puck"
        )
    )

    await session.start(
        room=ctx.room,
        agent=Agent(instructions="Bạn là người phỏng vấn người Anh. Hãy nói tiếng Anh. Chào ứng viên ngắn gọn và hỏi về kinh nghiệm. Trả lời dưới 2 câu.")
    )

    await session.generate_reply(
        instructions="Chào ứng viên bằng tiếng Anh và giới thiệu bản thân ngắn gọn."
    )


if __name__ == "__main__":
    agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint))
