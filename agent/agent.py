import os
from livekit.agents import Agent, AgentSession, JobContext, cli, WorkerOptions
from livekit.plugins import dify, deepgram
from dotenv import load_dotenv

load_dotenv()

async def entry_point(ctx: JobContext):
    await ctx.connect()
    
    agent = Agent(
        instructions="You are MentorAI - a professional and friendly interviewer. Ask thoughtful questions about the candidate's experience and skills."
    )

    # Dify LLM configuration - Load from environment variables
    llm = dify.LLM(
        user=os.getenv("DIFY_USER_ID", "default-user"),
        api_key=os.getenv("DIFY_API_KEY"),
        api_base=os.getenv("DIFY_BASE_URL", "https://api.dify.ai/v1")
    )

    # Deepgram STT/TTS configuration - Load from environment variables
    session = AgentSession(
        stt=deepgram.STT(
            model="nova-2-general",
            language="en-US"
        ),
        llm=llm,
        tts=deepgram.TTS(
            model="aura-asteria-en"
        )
    )

    await session.start(agent=agent, room=ctx.room)

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entry_point))