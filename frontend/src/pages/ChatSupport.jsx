// src/components/ChatSupport.jsx
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { MessageCircle, X } from "lucide-react";



const socket = io(process.env.REACT_APP_API_URL, {
  transports: ["websocket"],
});



export default function ChatSupport() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setChat((prev) => [...prev, data]);
        });
        return () => socket.off("receive_message");
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            const newMsg = { text: message, sender: "You" };
            socket.emit("send_message", newMsg);
            
            setMessage("");
        }
    };

    return (
        <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
            {/* Floating bubble */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                    }}
                >
                    <MessageCircle size={28} />
                </button>
            )}

            {/* Expanded Chat Box */}
            {isOpen && (
                <div
                    style={{
                        width: "320px",
                        height: "400px",
                        backgroundColor: "white",
                        borderRadius: "12px",
                        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        overflow: "hidden",
                        transition: "all 0.3s ease-in-out",
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            padding: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <h5 style={{ margin: 0 }}>Chat Support</h5>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                background: "none",
                                border: "none",
                                color: "white",
                                cursor: "pointer",
                            }}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Chat messages */}
                    <div
                        style={{
                            flexGrow: 1,
                            overflowY: "auto",
                            padding: "10px",
                            backgroundColor: "#f9f9f9",
                        }}
                    >
                        {chat.map((c, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    justifyContent: c.sender === "You" ? "flex-end" : "flex-start",
                                    marginBottom: "8px",
                                }}
                            >
                                <p
                                    style={{
                                        backgroundColor: c.sender === "You" ? "#DCF8C6" : "#E5E5EA",
                                        padding: "8px 12px",
                                        borderRadius: "15px",
                                        maxWidth: "70%",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {c.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Input area */}
                    <div
                        style={{
                            display: "flex",
                            padding: "10px",
                            borderTop: "1px solid #ddd",
                            backgroundColor: "white",
                        }}
                    >
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            style={{
                                flex: 1,
                                padding: "8px",
                                borderRadius: "20px",
                                border: "1px solid #ccc",
                                outline: "none",
                            }}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            style={{
                                backgroundColor: "#007bff",
                                border: "none",
                                color: "white",
                                borderRadius: "50%",
                                width: "40px",
                                height: "40px",
                                marginLeft: "8px",
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
