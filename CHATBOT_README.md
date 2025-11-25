# Guilherme AI Chatbot - README

An AI-powered chatbot that allows recruiters to "interview" Guilherme by asking questions about his background, projects, experience, and skills.

## 🏗️ Architecture

- **Frontend**: Custom Web Components (`custom-chat-bubble` and `custom-chat-popup`)
- **Backend**: Google Cloud Functions (Serverless Python)
- **AI**: Google Gemini 1.5 Flash API

## 📦 What's Included

### Backend (`/cloud-function/`)
- `main.py` - Cloud Function with Gemini API integration
- `knowledge_base.py` - Guilherme's profile, projects, and experience data
- `requirements.txt` - Python dependencies
- `deploy.sh` - Deployment script
- `SETUP_GUIDE.md` - Comprehensive Google Cloud setup instructions

### Frontend (`/custom-elements/`)
- `chat-bubble/` - Floating chat button in bottom-right
- `chat-popup/` - Chat interface with message history

## 🚀 Deployment Instructions

### Step 1: Deploy the Backend

1. **Open the setup guide**:
   ```bash
   cd cloud-function
   open SETUP_GUIDE.md
   ```

2. **Follow the guide** to:
   - Create Google Cloud project
   - Enable billing and APIs
   - Get Gemini API key
   - Install gcloud CLI

3. **Deploy the function**:
   ```bash
   ./deploy.sh YOUR_GEMINI_API_KEY
   ```

4. **Get your function URL**:
   ```bash
   gcloud functions describe guilherme-ai-chat --region us-central1 --format='value(httpsTrigger.url)'
   ```

### Step 2: Configure the Frontend

1. **Update the API endpoint** in `custom-elements/chat-popup/chat-popup.js`:
   ```javascript
   // Line 12 - Replace with your Cloud Function URL
   this.API_ENDPOINT = 'https://YOUR-REGION-YOUR-PROJECT.cloudfunctions.net/guilherme-ai-chat';
   ```

2. **Rebuild the project**:
   ```bash
   npm run build
   ```

3. **Test locally**:
   ```bash
   python3 -m http.server 8000
   ```
   Open `http://localhost:8000` and click the chat bubble!

### Step 3: Deploy to Production

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add Guilherme AI chatbot"
   git push
   ```

2. Your GitHub Pages site will automatically update with the chat feature!

## 🧪 Testing

### Local Testing (Frontend Only)
1. Build: `npm run build`
2. Serve: `python3 -m http.server 8000`
3. Open browser to `http://localhost:8000`
4. Click chat bubble (will show "not configured" error until backend is deployed)

### Full Integration Testing
1. Deploy Cloud Function (see Step 1 above)
2. Update API endpoint (see Step 2 above)
3. Test with sample questions:
   - "What projects have you worked on?"
   - "Tell me about your experience at Nmbrs"
   - "What are your technical skills?"

## 💡 Features

✅ **Smart AI**: Knows everything from your website  
✅ **Conversation Memory**: Maintains chat history  
✅ **Theme Support**: Adapts to dark/light mode  
✅ **Mobile Responsive**: Works on all devices  
✅ **Graceful Fallback**: Suggests direct contact for unknown topics  
✅ **Premium Design**: Gradient bubble with pulse animation  

## 🎨 Customization

### Change Chat Bubble Colors
Edit `custom-elements/chat-bubble/chat-bubble.css`:
```css
background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
```

### Update AI Personality
Edit `cloud-function/knowledge_base.py` to modify:
- Personal introduction
- Communication style
- Response guidelines

### Adjust API Limits
Edit `cloud-function/main.py`:
```python
# Line 158 - Change conversation history limit
if len(conversation_history) > 10:  # Change this number
```

## 🔒 Security

- Cloud Function uses CORS restriction to your domain
- API key stored as environment variable (not in code)
- No sensitive data in frontend code
- HTTPS-only communication

## 💰 Cost Estimate

With Google Cloud free tier:
- **Cloud Functions**: 2M invocations/month free
- **Gemini API**: Free tier with rate limits
- **Expected monthly cost**: $0-5 (likely $0 for personal portfolio)

Set up budget alerts in Google Cloud Console for peace of mind!

## 📊 Monitoring

View function logs:
```bash
gcloud functions logs read guilherme-ai-chat --region us-central1
```

Check costs:
[Google Cloud Billing Reports](https://console.cloud.google.com/billing/reports)

## 🐛 Troubleshooting

### Chat bubble doesn't appear
- Check browser console for errors
- Verify `npm run build` completed successfully
- Check that custom elements are imported in `modules.js`

### Chat shows "not configured" error
- Update `API_ENDPOINT` in `chat-popup.js`
- Redeploy with `npm run build`

### AI responses are slow
- Normal for first request (cold start ~2-3 seconds)
- Subsequent requests are faster (~500ms)

### CORS errors in browser
- Verify `ALLOWED_ORIGIN` in Cloud Function deployment
- Check if domain matches exactly (https://guilhermepinheiro.me)

## 📝 Next Steps

- [ ] Deploy Cloud Function following SETUP_GUIDE.md
- [ ] Update API_ENDPOINT in chat-popup.js
- [ ] Test with sample questions
- [ ] Deploy to production
- [ ] Share with recruiters! 🎉

## 📧 Questions?

If you encounter any issues, the AI will suggest contacting you directly at:
pinheiropgui@gmail.com

---

Built with ❤️ using Google Gemini AI
