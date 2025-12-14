import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { getHistory, sendMessage, clearSession, getArticles } from "../api";
import { MessageBubble } from "../components/MessageBubble";
import { ChatInput } from "../components/ChatInput";
import type { Message } from "../types";

export const ChatPage = () => {
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Init Session
    let storedSession = localStorage.getItem("news_rag_session_id");
    if (!storedSession) {
      storedSession = uuidv4();
      localStorage.setItem("news_rag_session_id", storedSession);
    }
    setSessionId(storedSession);

    // Fetch History
    getHistory(storedSession)
      .then(({ history }) => {
        setMessages(history);
      })
      .catch(console.error);

    // Fetch Suggestions
    getArticles()
      .then(({ articles }) => {
        // Pick 3 random titles
        const shuffled = articles.sort(() => 0.5 - Math.random());
        setSuggestions(shuffled.slice(0, 3).map((a) => a.title));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (text: string) => {
    // Optimistic UI
    const userMsg: Message = {
      role: "user",
      content: text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await sendMessage(sessionId, text);
      const botMsg: Message = {
        role: "bot",
        content: response.reply,
        references: response.references,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMsg: Message = {
        role: "bot",
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!confirm("Are you sure you want to clear the chat history?")) return;

    await clearSession(sessionId);
    // New Session
    const newSession = uuidv4();
    localStorage.setItem("news_rag_session_id", newSession);
    setSessionId(newSession);
    setMessages([]);
  };

  return (
    <div className="app-container">
      <header className="chat-header">
        <h1>Global News AI</h1>
        <button
          onClick={handleReset}
          className="reset-btn"
          title="Reset Session"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </header>

      <main className="chat-area">
        <div className="messages-list">
          {messages.length === 0 && !loading && (
            <div className="empty-state">
              <h2>Stay Informed</h2>
              <p>
                Ask me anything about today's technology, world, or business
                news.
              </p>

              {suggestions.length > 0 && (
                <div className="suggestions">
                  <p className="suggestions-label">Trending Topics:</p>
                  <div className="suggestion-chips">
                    {suggestions.map((title, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(`Tell me about: ${title}`)}
                        className="suggestion-chip"
                      >
                        {title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {messages.map((msg, idx) => (
            <MessageBubble key={idx} message={msg} />
          ))}

          {loading && (
            <div className="message-container bot">
              <div className="message-bubble loading">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="chat-footer">
        <ChatInput onSend={handleSend} disabled={loading} />
      </footer>
    </div>
  );
};
