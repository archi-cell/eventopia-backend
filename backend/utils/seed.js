// backend/utils/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Event from "../models/Event.js";

dotenv.config();

const seed = async () => {
    try {
        // 1️⃣ Connect to MongoDB
        await connectDB();

        // 2️⃣ Clear old data
        await User.deleteMany();
        await Event.deleteMany();

        // 3️⃣ Create Admin User
        await User.create({
            name: "Admin",
            email: "admin@eventopia.com",
            password: "password",
            role: "admin",
        });

        // 4️⃣ Insert Events
        await Event.insertMany([
            {
                title: "Rock the Night Festival",
                description: "Join the biggest rock festival with live performances by international bands.",
                date: new Date("2025-12-05"),
                ticketPrice: 1200,
                image: "/images/rock.jpg",
                venue: { name: "Grand Arena, Mumbai", capacity: 5000, price: 200 },
                cateringOptions: [
                    { name: "Standard", price: 15 },
                    { name: "Premium", price: 25 },
                ],
                category: "Concerts",
            },
            {
                title: "Acoustic Evenings",
                description: "A cozy night filled with soulful acoustic performances and chill vibes.",
                date: new Date("2025-11-20"),
                ticketPrice: 800,
                image: "/images/background.jpg",
                venue: { name: "Blue Note Lounge, Delhi", capacity: 300, price: 150 },
                cateringOptions: [
                    { name: "Basic", price: 10 },
                    { name: "Deluxe", price: 20 },
                ],
                category: "Concerts",
            },
            {
                title: "Pop Beats Live",
                description: "Dance the night away with chart-topping pop sensations and vibrant lights.",
                date: new Date("2025-12-22"),
                ticketPrice: 1500,
                image: "/images/pop.jpg",
                venue: { name: "Arena One, Bengaluru", capacity: 8000, price: 350 },
                cateringOptions: [
                    { name: "Snacks", price: 12 },
                    { name: "Full Meal", price: 30 },
                ],
                category: "Concerts",
            },
            {
                title: "Shakespeare Reimagined",
                description: "An innovative modern take on Shakespeare’s classic plays with a twist.",
                date: new Date("2025-11-25"),
                ticketPrice: 600,
                image: "/images/shakes.jpg",
                venue: { name: "City Arts Theater, Pune", capacity: 400, price: 100 },
                cateringOptions: [
                    { name: "Light Snacks", price: 10 },
                    { name: "Dinner Combo", price: 25 },
                ],
                category: "Theater & Drama",
            },
            {
                title: "The Phantom Stage",
                description: "A thrilling play exploring mystery, illusion, and suspense.",
                date: new Date("2025-12-10"),
                ticketPrice: 750,
                image: "/images/phatom.jpg",
                venue: { name: "Royal Theater, Kolkata", capacity: 600, price: 120 },
                cateringOptions: [
                    { name: "Regular", price: 12 },
                    { name: "VIP Refreshments", price: 30 },
                ],
                category: "Theater & Drama",
            },
            {
                title: "Laugh Riot",
                description: "An evening full of laughter and hilarious stand-up comedy acts.",
                date: new Date("2025-12-18"),
                ticketPrice: 500,
                image: "/images/laugh.jpg",
                venue: { name: "Comedy Central Hall, Hyderabad", capacity: 700, price: 110 },
                cateringOptions: [
                    { name: "Standard", price: 8 },
                    { name: "Premium", price: 18 },
                ],
                category: "Theater & Drama",
            },
            {
                title: "Cricket Premier League",
                description: "Watch your favorite cricket teams battle it out for the ultimate title.",
                date: new Date("2025-12-01"),
                ticketPrice: 2000,
                image: "/images/cricket.jpg",
                venue: { name: "Wankhede Stadium, Mumbai", capacity: 30000, price: 800 },
                cateringOptions: [
                    { name: "Snacks", price: 10 },
                    { name: "Full Buffet", price: 35 },
                ],
                category: "Sports",
            },
            {
                title: "Marathon 2025",
                description: "Run for a cause! Join thousands of fitness enthusiasts in this grand marathon.",
                date: new Date("2025-11-30"),
                ticketPrice: 300,
                image: "/images/marathon.jpg",
                venue: { name: "Marine Drive, Mumbai", capacity: 10000, price: 200 },
                cateringOptions: [
                    { name: "Energy Pack", price: 5 },
                    { name: "Recovery Meal", price: 15 },
                ],
                category: "Sports",
            },
            {
                title: "Football Fiesta",
                description: "Feel the excitement as top football clubs compete for the championship.",
                date: new Date("2025-12-20"),
                ticketPrice: 1000,
                image: "/images/football.jpg",
                venue: { name: "Salt Lake Stadium, Kolkata", capacity: 60000, price: 500 },
                cateringOptions: [
                    { name: "Stadium Snacks", price: 12 },
                    { name: "Deluxe Combo", price: 25 },
                ],
                category: "Sports",
            },
        ]);

        console.log("✅ Database seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding error:", error);
        process.exit(1);
    }
};

seed();
