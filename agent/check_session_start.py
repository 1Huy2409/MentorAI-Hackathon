#!/usr/bin/env python
"""Check AgentSession.start signature."""

from livekit import agents
import inspect

print("AgentSession.start signature:")
print(inspect.signature(agents.AgentSession.start))
