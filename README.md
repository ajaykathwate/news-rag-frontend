# News Q&A Chatbot - Frontend

A modern, responsive chat interface for the News RAG system.

## 📚 Tech Stack

*   **Framework**: React.js (Vite)
*   **Language**: TypeScript
*   **Styling**: SCSS (Custom Dark Mode Design)
*   **HTTP Client**: Axios

## 🚀 Getting Started

### 1. Prerequisites
*   Node.js installed
*   Backend server running (on port 3000 usually)

### 2. Setup

```bash
# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env` file (optional, defaults to localhost:3000):
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 💡 Key Features
*   **Session Management**: Automatically generates a unique Session ID and persists it in LocalStorage.
*   **History Sync**: Fetches previous chat history on load.
*   **Suggested Topics**: On a new chat, fetches real available news topics from the backend to suggest questions.
*   **Optimistic UI**: Shows user message immediately while waiting for bot response.
*   **Markdown Support**: Renders bot responses cleanly.
