#!/usr/bin/env python
"""Quick test to verify imports work."""

try:
    from livekit.plugins import google
    print("✓ livekit.plugins.google imported")
    
    # Check for MultimodalAgent in various locations
    if hasattr(google, 'beta'):
        print("✓ google.beta exists")
        if hasattr(google.beta, 'MultimodalAgent'):
            print("✓ google.beta.MultimodalAgent found")
        if hasattr(google.beta, 'realtime'):
            print("✓ google.beta.realtime exists")
            if hasattr(google.beta.realtime, 'RealtimeModel'):
                print("✓ google.beta.realtime.RealtimeModel found")
    
    if hasattr(google, 'MultimodalAgent'):
        print("✓ google.MultimodalAgent found")
    
    print("\nAll attributes in google:")
    for attr in sorted(dir(google)):
        if not attr.startswith('_'):
            print(f"  - {attr}")
            
except ImportError as e:
    print(f"✗ Import failed: {e}")
except Exception as e:
    print(f"✗ Error: {e}")
