# News RAG Frontend

A React + Vite application for the News Q&A Chatbot.

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configuration**:
   The API URL is set in `.env` (created by Vite) or defaults to `http://localhost:3000/api`.
   You can create a `.env` file:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

## Running

```bash
npm run dev
```
The app will open at `http://localhost:5173`.

## Features
- **Real-time Chat**: Interface to chat with the bot.
- **RAG Integration**: Answers are grounded in ingested news.
- **Sources**: Displays source links for answers.
- **Session Reset**: Button to clear history and start fresh.
# news-rag-frontend
