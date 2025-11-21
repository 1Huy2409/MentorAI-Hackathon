#!/usr/bin/env python
"""Check Agent class signature."""

from livekit import agents
import inspect

print("Agent class signature:")
print(inspect.signature(agents.Agent.__init__))
print("\nAgent attributes:")
for attr in dir(agents.Agent):
    if not attr.startswith('_'):
        print(f"  - {attr}")
