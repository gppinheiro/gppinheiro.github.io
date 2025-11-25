"""
Google Cloud Function for Guilherme AI Chatbot
Handles chat requests and integrates with Gemini API
"""

import os
import json
import google.generativeai as genai
from flask import Request, jsonify
from flask_cors import cross_origin
from knowledge_base import get_system_prompt

GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
ALLOWED_ORIGIN = os.environ.get('ALLOWED_ORIGIN', '*')

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable must be set")

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel(
    model_name='gemini-1.5-flash',
    generation_config={
        'temperature': 0.7,
        'top_p': 0.95,
        'top_k': 40,
        'max_output_tokens': 1024,
    }
)


def format_conversation_history(history):
    """
    Format conversation history for Gemini API
    
    Args:
        history: List of message objects with 'role' and 'content'
        
    Returns:
        List of formatted messages for Gemini
    """
    formatted = []
    for msg in history:
        role = 'user' if msg.get('role') == 'user' else 'model'
        formatted.append({
            'role': role,
            'parts': [msg.get('content', '')]
        })
    return formatted


def generate_ai_response(user_message, conversation_history):
    """
    Generate AI response using Gemini API
    
    Args:
        user_message: The current user message
        conversation_history: Previous conversation messages
        
    Returns:
        AI generated response text
    """
    try:
        chat = model.start_chat(
            history=format_conversation_history(conversation_history)
        )
        
        system_prompt = get_system_prompt()
        full_prompt = f"{system_prompt}\n\nUser question: {user_message}"
        
        if len(conversation_history) == 0:
            response = chat.send_message(full_prompt)
        else:
            response = chat.send_message(user_message)
        
        return response.text
        
    except Exception as e:
        print(f"Error generating AI response: {e}")
        return "I apologize, but I'm having trouble processing your request right now. Please try again or reach out to me directly at pinheiropgui@gmail.com."


@cross_origin(origins=ALLOWED_ORIGIN)
def chat(request: Request):
    """
    Cloud Function entry point for chat endpoint
    
    Expected request body:
    {
        "message": "User message",
        "history": [
            {"role": "user", "content": "Previous message"},
            {"role": "assistant", "content": "Previous response"}
        ]
    }
    
    Returns:
    {
        "response": "AI generated response",
        "success": true
    }
    """
    
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)
    
    headers = {
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        'Content-Type': 'application/json'
    }
    
    try:
        request_json = request.get_json(silent=True)
        
        if not request_json:
            return (
                jsonify({
                    'success': False,
                    'error': 'Invalid request body'
                }),
                400,
                headers
            )
        
        user_message = request_json.get('message', '').strip()
        conversation_history = request_json.get('history', [])
        
        if not user_message:
            return (
                jsonify({
                    'success': False,
                    'error': 'Message is required'
                }),
                400,
                headers
            )
        
        if len(conversation_history) > 10:
            conversation_history = conversation_history[-10:]
        
        ai_response = generate_ai_response(user_message, conversation_history)
        
        return (
            jsonify({
                'success': True,
                'response': ai_response
            }),
            200,
            headers
        )
        
    except Exception as e:
        print(f"Error in chat function: {e}")
        return (
            jsonify({
                'success': False,
                'error': 'Internal server error',
                'message': 'Sorry, something went wrong. Please try again.'
            }),
            500,
            headers
        )
