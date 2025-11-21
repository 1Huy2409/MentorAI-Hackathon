#!/usr/bin/env python
"""Check RealtimeModel and how to use it with Agent."""

from livekit.plugins import google
from livekit import agents
import inspect

print("=== RealtimeModel ===")
print(inspect.signature(google.beta.realtime.RealtimeModel.__init__))

print("\n=== Check for Session class ===")
if hasattr(google.beta.realtime, 'RealtimeSession'):
    print("RealtimeSession found!")
    print(inspect.signature(google.beta.realtime.RealtimeSession.__init__))

print("\n=== Agent init signature ===")
print(inspect.signature(agents.Agent.__init__))

print("\n=== Check for AgentSession ===")
if hasattr(agents, 'AgentSession'):
    print("AgentSession found!")
