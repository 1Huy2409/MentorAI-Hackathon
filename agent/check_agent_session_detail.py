#!/usr/bin/env python
"""Check AgentSession API in detail."""

from livekit import agents
import inspect

print("=== AgentSession.__init__ ===")
print(inspect.signature(agents.AgentSession.__init__))

print("\n=== AgentSession.start ===")
print(inspect.signature(agents.AgentSession.start))

print("\n=== AgentSession methods ===")
for name in dir(agents.AgentSession):
    if not name.startswith('_') and callable(getattr(agents.AgentSession, name)):
        print(f"  - {name}")
