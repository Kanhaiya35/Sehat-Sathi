require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const outbreakRoutes = require('./routes/outbreak');
const chatRoutes = require('./routes/chat'); // ✅ ADD THIS

const app = express();

connectDB();

app.use(cookieParser());
app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/outbreaks', outbreakRoutes);
app.use('/api/chat', chatRoutes); // ✅ ADD THIS

app.get("/test-ai", async (req,res)=>{
const {getAIResponse} = require("./utils/aiProvider")

const reply = await getAIResponse(
"hello",
[],
"You are helpful",
"gemini"
)

res.json({reply})
})

app.listen(5000, () => {
console.log("Server running on port 5000");
});