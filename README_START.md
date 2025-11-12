# 🚀 How to Start EduBot Server

## Quick Start (Easiest Method)

### Option 1: Double-Click Startup Script
1. **Double-click** `START_SERVER.bat` file
2. Wait for server to start
3. Open browser and go to: **http://localhost:3000**

### Option 2: Manual Start

#### Step 1: Open Command Prompt
- Press `Windows Key + R`
- Type `cmd` and press Enter
- Or right-click in the folder and select "Open in Terminal"

#### Step 2: Navigate to Project Folder
```bash
cd "c:\Users\monik\OneDrive\Desktop\INDUSTRY PROJECT\MINOR project codes\data"
```

#### Step 3: Install Dependencies (First Time Only)
```bash
npm install
```

#### Step 4: Start Server
```bash
node server.js
```

#### Step 5: Open Browser
- Open Chrome or any browser
- Go to: **http://localhost:3000**

## ✅ What You Should See

### In Command Prompt:
```
📚 Loaded university dataset: [path]
🚀 EduBot server running at http://localhost:3000
📝 Open your browser and navigate to: http://localhost:3000
⚠️  Make sure to access via http://localhost:3000, not by opening the HTML file directly!
```

### In Browser:
- Beautiful chat interface
- Welcome message from EduBot
- Quick action buttons
- Sidebar with Popular Topics
- Chat input at bottom

## ❌ Troubleshooting

### Error: "localhost refused to connect"
**Solution:** Make sure the server is running!
1. Check if you see the server messages in command prompt
2. Make sure you're accessing `http://localhost:3000` (not file://)
3. Check if port 3000 is already in use

### Error: "Cannot find module 'express'"
**Solution:** Install dependencies
```bash
npm install
```

### Error: "Port 3000 is already in use"
**Solution:** 
1. Close the other application using port 3000
2. Or use a different port:
```bash
set PORT=3001
node server.js
```
Then access: http://localhost:3001

### Error: "Node.js is not installed"
**Solution:** 
1. Download Node.js from https://nodejs.org/
2. Install it
3. Restart command prompt
4. Try again

## 🎯 Testing the Server

1. **Start the server** (see above)
2. **Open browser** to http://localhost:3000
3. **Click "Admission Requirements"** button
4. **You should see** a response with confidence score
5. **Try typing:** "What is the fee structure?"
6. **Verify** typing indicator appears
7. **Check** response appears with related topics

## 📝 Important Notes

- ⚠️ **Always start the server before opening the browser**
- ⚠️ **Access via http://localhost:3000 (NOT file://)**
- ⚠️ **Keep the command prompt window open** while using the app
- ⚠️ **Press Ctrl+C** to stop the server

## 🎉 Success!

If everything works, you should see:
- ✅ Server running in command prompt
- ✅ Browser opens to chat interface
- ✅ Quick buttons work
- ✅ Chat responses appear
- ✅ No errors in browser console

---

**Need Help?** Check the console for error messages!

