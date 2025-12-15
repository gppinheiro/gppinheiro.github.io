# Google Cloud Setup Guide for Guilherme AI Chatbot

This guide will walk you through setting up Google Cloud to deploy the AI chatbot backend.

## Prerequisites
- Google Account (Gmail)
- Credit/Debit card for Google Cloud (free tier available, minimal charges expected)

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Project name: `guilherme-ai-chatbot`
4. Click "Create"
5. Wait for project creation (takes ~30 seconds)

## Step 2: Enable Billing

1. Go to [Billing](https://console.cloud.google.com/billing)
2. Click "Link a billing account" or "Create billing account"
3. Follow the prompts to add payment information
4. **Note**: Google Cloud offers:
   - $300 free credits for new accounts (90 days)
   - Cloud Functions: 2M invocations/month free
   - Gemini API: Free tier with rate limits

**Expected monthly costs**: ~$0-5 depending on traffic (likely $0 with free tier)

## Step 3: Enable Required APIs

Run these commands in [Cloud Shell](https://console.cloud.google.com/cloudshell) or your terminal with gcloud CLI:

```bash
# Enable Cloud Functions API
gcloud services enable cloudfunctions.googleapis.com

# Enable Cloud Build API (required for deployments)
gcloud services enable cloudbuild.googleapis.com

# Enable Gemini API (Generative AI)
gcloud services enable generativelanguage.googleapis.com
```

Or enable via Console:
1. Go to [APIs & Services](https://console.cloud.google.com/apis/dashboard)
2. Click "+ ENABLE APIS AND SERVICES"
3. Search and enable:
   - Cloud Functions API
   - Cloud Build API
   - Generative Language API

## Step 4: Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Select your project: `guilherme-ai-chatbot`
4. Copy the API key (starts with `AIza...`)
5. **Keep this secure!** You'll use it in deployment

## Step 5: Install Google Cloud CLI (if not already installed)

**macOS** (Homebrew):
```bash
brew install google-cloud-sdk
```

**Manual Installation**:
1. Download from [cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install)
2. Follow installation instructions
3. Run: `gcloud init`
4. Login and select project: `guilherme-ai-chatbot`

## Step 6: Deploy the Cloud Function

From the `cloud-function` directory:

```bash
cd cloud-function/ai-chatbot

# Deploy function (replace YOUR_API_KEY with actual key)
gcloud functions deploy guilherme-ai-chat \
  --runtime python311 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point chat \
  --set-env-vars GEMINI_API_KEY=YOUR_API_KEY \
  --region us-central1
```

**Wait 2-3 minutes for deployment...**

## Step 7: Get Function URL

After deployment:
```bash
gcloud functions describe guilherme-ai-chat --region us-central1
```

Look for `httpsTrigger.url` - this is your API endpoint!
Example: `https://us-central1-guilherme-ai-chatbot.cloudfunctions.net/guilherme-ai-chat`

## Step 8: Test the Function

```bash
curl -X POST YOUR_FUNCTION_URL \
  -H "Content-Type: application/json" \
  -d '{"message": "What projects have you worked on?", "history": []}'
```

You should get a JSON response with Guilherme AI's answer!

## Step 9: Configure CORS (Security)

Update the function with domain restriction:
```bash
gcloud functions deploy guilherme-ai-chat \
  --runtime python311 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point chat \
  --set-env-vars GEMINI_API_KEY=YOUR_API_KEY,ALLOWED_ORIGIN=https://guilhermepinheiro.me \
  --region us-central1
```

## Troubleshooting

### "Permission denied" errors
```bash
gcloud auth login
gcloud config set project guilherme-ai-chatbot
```

### "Billing not enabled"
- Ensure billing is linked to your project in Cloud Console

### "API not enabled"
- Run the API enable commands from Step 3

### Check function logs
```bash
gcloud functions logs read guilherme-ai-chat --region us-central1
```

## Monitoring Costs

1. Go to [Billing Reports](https://console.cloud.google.com/billing/reports)
2. Filter by project: `guilherme-ai-chatbot`
3. Set up budget alerts (recommended: $5/month)

## Next Steps

Once deployed, update the frontend code with your Function URL:
- File: `custom-elements/chat-popup/chat-popup.js`
- Variable: `API_ENDPOINT = 'YOUR_FUNCTION_URL'`
