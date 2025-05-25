import { useState } from "react";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // Pour ouvrir/fermer la boîte

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { type: "user", text: message };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      const botMsg = { type: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "❌ Erreur de serveur." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: open ? "300px" : "60px",
      height: open ? "400px" : "60px",
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      borderRadius: "15px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      overflow: "hidden",
      transition: "0.3s ease-in-out",
      zIndex: 9999,
    }}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "15px",
            cursor: "pointer",
            fontSize: "24px",
          }}
        >
          💬
        </button>
      ) : (
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <div
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>Chatbot</span>
            <button onClick={() => setOpen(false)} style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "20px",
              cursor: "pointer"
            }}>×</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: "10px",
            overflowY: "auto",
            background: "#f9f9f9"
          }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.type === "user" ? "right" : "left", margin: "5px 0" }}>
                <span style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  backgroundColor: msg.type === "user" ? "#007bff" : "#e0e0e0",
                  color: msg.type === "user" ? "#fff" : "#000",
                  borderRadius: "12px",
                  maxWidth: "80%",
                  wordWrap: "break-word",
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <p style={{ fontStyle: "italic" }}>Réflexion en cours...</p>}
          </div>

          {/* Input */}
          <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
            <textarea
              rows={1}
              placeholder="Votre question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              style={{
                flex: 1,
                border: "none",
                resize: "none",
                padding: "8px",
                fontSize: "14px",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "0 15px",
                cursor: "pointer",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
