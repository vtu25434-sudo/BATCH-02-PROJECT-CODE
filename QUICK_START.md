# EduBot - Quick Start Guide

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
cd "MINOR project codes/data"
npm install
```

### Step 2: Start Server
```bash
node server.js
```
Or double-click `start.bat` on Windows

### Step 3: Open Browser
Navigate to: **http://localhost:3000**

## ✅ What You Should See

### Server Console:
```
📚 Loaded university dataset: [path]
🚀 EduBot server running at http://localhost:3000
📝 Open your browser and navigate to: http://localhost:3000
⚠️  Make sure to access via http://localhost:3000, not by opening the HTML file directly!
```

### Browser:
- Beautiful chat interface with purple theme
- Welcome message from EduBot
- Quick action buttons (including green "Fee Structure" and orange "Placements")
- Sidebar with Popular Topics
- Chat input at bottom

## 🧪 Quick Test

1. Click "Admission Requirements" button
2. You should see a response with confidence score
3. Try typing: "What is the fee structure?"
4. Check that typing indicator appears
5. Verify response appears with related topics

## ❌ Troubleshooting

### "localhost refused to connect"
- Make sure server is running (`node server.js`)
- Access via `http://localhost:3000` (NOT file://)
- Check if port 3000 is in use

### "Cannot find module 'express'"
- Run: `npm install`

### API not responding
- Check server console for errors
- Verify `veltech.json` exists
- Check browser console (F12) for errors

## 📁 Project Files

- `server.js` - Express server
- `index.html` - Chat interface
- `styles.css` - Styling
- `veltech.json` - University data
- `package.json` - Dependencies

## 🎯 Features

✅ Interactive chat interface
✅ Quick action buttons
✅ Popular topics sidebar
✅ Typing indicators
✅ Confidence scores
✅ Related topic suggestions
✅ Error handling
✅ Responsive design

---

**Ready to use!** Start the server and open `http://localhost:3000`

