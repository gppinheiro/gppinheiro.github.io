import os
import sys

# Set env var before importing main
# Using the key from the user's deploy command for reproduction
os.environ['GEMINI_API_KEY'] = 'AIzaSyCrsDXwMMAmy4WpwmzD5fx1XZqoLwzJ3Ws'

print("--- Starting Debug Script ---")

try:
    import google.generativeai as genai
    print(f"google-generativeai version: {genai.__version__}")
    print("Listing available models:")
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)
except ImportError:
    print("google-generativeai not installed")

try:
    from main import generate_ai_response
    print("Successfully imported main")
except Exception as e:
    print(f"Error during import (likely model init): {e}")
    # Print the full traceback if possible, but for now just the error
    import traceback
    traceback.print_exc()
    sys.exit(1)

history = [
    {"role": "user", "content": "Hello"},
    {"role": "model", "content": "Hi there! I am Guilherme AI."}
]
user_msg = "What is your name?"

try:
    print("\nAttempting to generate response...")
    response = generate_ai_response(user_msg, history)
    print("\nSUCCESS! Response:", response)
except Exception as e:
    print(f"\nFAILURE! Caught exception during generation: {e}")
    import traceback
    traceback.print_exc()
