import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://eventopia.vercel.app" // replace after frontend deploy
  ],
  credentials: true,
}));
app.use(express.json());

// ✅ Mount routes
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes); // ✅ added missing "/" at the start

app.get("/", (req, res) => res.send("API running"));

// ✅ Create HTTP Server & Setup Socket.io AFTER app is defined
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://eventopia.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});



// ✅ SOCKET.IO CHATBOT LOGIC
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("send_message", (data) => {
        console.log("Message received:", data.text);

        // Broadcast user message to all clients
        io.emit("receive_message", data);

        // ✅ Simple rule-based chatbot responses
        const userMsg = data.text.toLowerCase();

        if (userMsg.includes("hello") || userMsg.includes("hi")) {
            io.emit("receive_message", {
                text: "👋 Hi there! Welcome to Eventopia Live Support. How can I help you today?",
                sender: "Bot",
            });
        } else if (userMsg.includes("book") || userMsg.includes("event")) {
            io.emit("receive_message", {
                text: "🎟️ You can book an event directly from the Event Details page. Just click 'Book Now'!",
                sender: "Bot",
            });
        } else if (userMsg.includes("refund")) {
            io.emit("receive_message", {
                text: "💸 Refunds are available within 7 days of booking. Please contact support for assistance.",
                sender: "Bot",
            });
        } else if (userMsg.includes("catering")) {
            io.emit("receive_message", {
                text: "🍽️ We offer multiple catering options! You can select one when booking your event.",
                sender: "Bot",
            });
        } else if (userMsg.includes("help")) {
            io.emit("receive_message", {
                text: "🙋 Sure! I can help with bookings, payments, or general inquiries. What do you need help with?",
                sender: "Bot",
            });
        } else if (userMsg.includes("bye")) {
            io.emit("receive_message", {
                text: "👋 Goodbye! Have a great event with Eventopia!",
                sender: "Bot",
            });
        } else {
            io.emit("receive_message", {
                text: "🤖 I'm not sure I understand that. Try asking about 'booking', 'refund', or 'catering'.",
                sender: "Bot",
            });
        }
    });

    socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
