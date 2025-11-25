#!/bin/bash

# Deployment script for Guilherme AI Cloud Function
# Make sure you have gcloud CLI installed and configured

echo "🚀 Deploying Guilherme AI Cloud Function..."
echo ""

# Check if GEMINI_API_KEY is provided
if [ -z "$1" ]; then
    echo "❌ Error: GEMINI_API_KEY not provided"
    echo ""
    echo "Usage: ./deploy.sh YOUR_GEMINI_API_KEY"
    echo ""
    echo "Get your API key from: https://aistudio.google.com/app/apikey"
    exit 1
fi

GEMINI_API_KEY=$1

echo "📋 Configuration:"
echo "  - Function name: guilherme-ai-chat"
echo "  - Region: us-central1"
echo "  - Runtime: python311"
echo ""

# Deploy the function
gcloud functions deploy guilherme-ai-chat \
  --runtime python311 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point chat \
  --set-env-vars GEMINI_API_KEY=$GEMINI_API_KEY,ALLOWED_ORIGIN=https://guilhermepinheiro.me \
  --region us-central1 \
  --memory 256MB \
  --timeout 60s

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📝 Get your function URL:"
    echo "gcloud functions describe guilherme-ai-chat --region us-central1 --format='value(httpsTrigger.url)'"
    echo ""
    echo "🧪 Test your function:"
    echo "curl -X POST \$(gcloud functions describe guilherme-ai-chat --region us-central1 --format='value(httpsTrigger.url)') \\"
    echo "  -H 'Content-Type: application/json' \\"
    echo "  -d '{\"message\": \"What projects have you worked on?\", \"history\": []}'"
else
    echo ""
    echo "❌ Deployment failed!"
    echo "Check the error messages above and refer to SETUP_GUIDE.md"
    exit 1
fi
