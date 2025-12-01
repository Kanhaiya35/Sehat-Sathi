# Sehat Saathi - AI-Driven Public Health Chatbot

**Brand Name:** Sehat Saathi  
**Tagline:** "Your Digital Health Companion"  
**Project:** AI-Driven Public Health Chatbot for Disease Awareness

A minimal, modern, clean multi-page website prototype built for SIH 2025.

## 🎨 Design System

- **Framework:** TailwindCSS (modern, minimal look)
- **Theme:** Blue/Green healthcare gradient theme
- **Style:** Rounded corners, soft shadows, clean layout
- **Features:** Smooth hover transitions, fade animations, dark mode toggle
- **Responsive:** Fully responsive (mobile → desktop)

## 📁 Project Structure

```
/project
 ├── index.html             (Landing Page)
 ├── awareness.html         (Awareness Page)
 ├── chatbot.html           (Chatbot Page)
 ├── schemes.html           (Health Schemes & Eligibility Checker)
 ├── tailwind.config.js     (Tailwind configuration)
 ├── README.md              (This file)
 ├── /assets
 │     ├── /css
 │     │     └── style.css      (Custom styles)
 │     ├── /js
 │     │     ├── main.js         (Navigation & animations)
 │     │     ├── chat.js         (Chatbot functionality)
 │     │     ├── darkmode.js     (Dark mode toggle)
 │     │     └── schemes.js      (Eligibility checker logic)
 │     └── /images               (Placeholder for images)
```

## 🚀 How to Run

### Option 1: Direct File Opening (Simplest)

1. Simply open any HTML file (e.g., `index.html`) in a modern web browser
2. The website will load with all features working
3. **Note:** Requires internet connection for TailwindCSS CDN and Font Awesome

### Option 2: Using a Local Server (Recommended)

#### Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open `http://localhost:8000` in your browser.

#### Using Node.js:
```bash
# Install http-server globally
npm install -g http-server

# Run the server
http-server -p 8000
```
Then open `http://localhost:8000` in your browser.

#### Using PHP:
```bash
php -S localhost:8000
```
Then open `http://localhost:8000` in your browser.

## 📄 Pages Overview

### 1. **index.html** - Landing Page
- Hero section with brand name and tagline
- Features grid (Multilingual, Voice Assistant, Outbreak Alerts, Vaccination)
- Mini chatbot mockup with interactive demo
- Gradient buttons and modern UI

### 2. **awareness.html** - Awareness Page
- "Why Choose Sehat Saathi?" section
- Benefits cards (Easy info, Multiple languages, Voice support, Real-time alerts)
- Awareness cards:
  - Preventive Healthcare Tips
  - Importance of Vaccination
  - Symptoms of Common Diseases (Dengue, Malaria, COVID-19)
  - Government Schemes overview

### 3. **chatbot.html** - Full Chat Page
- Complete chatbot interface
- Bot and user message bubbles
- Typing indicator animation
- Mock AI responses based on keywords
- Scrollable chat area
- Dark mode support

### 4. **schemes.html** - Health Schemes & Eligibility
- **Section 1:** Major Indian Health Schemes cards:
  - Ayushman Bharat / PM-JAY
  - Janani Suraksha Yojana (JSY)
  - Mission Indradhanush
  - Digital Health Mission (ABDM)
- **Section 2:** Interactive Eligibility Checker form
- **Section 3:** Dynamic results display with animations

## 🛠️ JavaScript Files

### **main.js**
- Mobile navigation toggle
- Smooth scroll functionality
- Fade-in animations on scroll
- Navbar scroll effects

### **darkmode.js**
- Dark mode toggle functionality
- Saves preference to localStorage
- System preference detection
- Icon updates (🌙 / 🌞)

### **chat.js**
- Mock chat reply system
- Auto-scroll to latest message
- Typing indicator animation
- Keyword-based responses
- Message bubble animations

### **schemes.js**
- Form validation
- Rule-based eligibility calculation
- Dynamic results display
- Scheme matching logic

## 🎯 Features

### Global Features (All Pages)
- ✅ Responsive navigation bar with mobile menu
- ✅ Dark mode toggle (🌙 / 🌞)
- ✅ Smooth animations and transitions
- ✅ Footer with "Made for SIH 2025"
- ✅ Accessible and readable fonts

### Chatbot Features
- ✅ Interactive chat interface
- ✅ Mock AI responses
- ✅ Typing indicator
- ✅ Message history
- ✅ Keyword-based replies

### Eligibility Checker Features
- ✅ Form validation
- ✅ Rule-based eligibility logic
- ✅ Animated result cards
- ✅ Multiple scheme matching
- ✅ Real-time results display

## 🎨 Customization

### Changing Colors
Modify Tailwind classes in HTML files:
- Blue: `bg-blue-600`, `text-blue-600`
- Green: `bg-green-600`, `text-green-600`
- Gradients: `from-blue-600 to-green-600`

### Adding More Schemes
Edit `schemes.js` to add new schemes and eligibility rules.

### Modifying Chat Responses
Edit the `getBotReply()` function in `chat.js` to customize responses.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technologies Used

- **HTML5** - Semantic markup
- **TailwindCSS** - Utility-first CSS framework (via CDN)
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons
- **Google Fonts** - Inter & Poppins fonts

## 📝 Notes

- This is a **frontend-only** prototype
- Chat responses are **simulated** (not connected to real AI)
- Form submissions are **client-side only**
- All data processing happens in the browser
- Dark mode preference is saved in localStorage

## 🚀 Production Deployment

For production deployment, you would need to:
1. Connect chatbot to a real AI backend (e.g., OpenAI, custom NLP)
2. Set up server for form submissions
3. Implement actual scheme eligibility API
4. Add analytics and tracking
5. Optimize images and assets
6. Set up proper hosting (Vercel, Netlify, etc.)
7. Add backend API for real-time data

## 📄 License

This project is created for SIH 2025.

## 👥 Credits

Made for **SIH 2025** - Smart India Hackathon

---

**Note:** All pages are fully functional frontend prototypes. The chatbot uses mock responses, and the eligibility checker uses rule-based logic. For production, backend integration would be required.
# Sehat-Sathi
