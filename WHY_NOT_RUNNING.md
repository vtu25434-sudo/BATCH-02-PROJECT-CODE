# 🔍 Why Server Is Not Running - Troubleshooting Guide

## Common Reasons Server Doesn't Run

### 1. ❌ Server Starts But Closes Immediately
**Symptoms:**
- Window opens and closes quickly
- No error messages visible
- Server doesn't stay running

**Causes & Solutions:**

#### Cause A: Missing Dependencies
**Solution:**
```bash
cd "MINOR project codes\data"
npm install
```
Then run server again.

#### Cause B: Port Already in Use
**Solution:**
1. Check what's using port 3000:
   ```bash
   netstat -ano | findstr :3000
   ```
2. Close that application
3. Or use different port:
   ```bash
   set PORT=3001
   node server.js
   ```

#### Cause C: Node.js Not in PATH
**Solution:**
1. Reinstall Node.js from https://nodejs.org/
2. Make sure to check "Add to PATH" during installation
3. Restart computer
4. Try again

### 2. ❌ No Window Opens At All
**Symptoms:**
- Double-clicking .bat file does nothing
- No command window appears

**Causes & Solutions:**

#### Cause A: Windows Security Blocking .bat Files
**Solution:**
1. Right-click the .bat file
2. Select "Run as administrator"
3. Or change execution policy:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

#### Cause B: File Association Problem
**Solution:**
1. Right-click .bat file
2. Select "Open with" → "Command Prompt"
3. Or open Command Prompt manually and run:
   ```bash
   cd "MINOR project codes\data"
   RUN_SERVER.bat
   ```

### 3. ❌ Server Runs But Browser Shows Error
**Symptoms:**
- Server window shows "Server is RUNNING!"
- Browser still shows "connection refused"

**Causes & Solutions:**

#### Cause A: Wrong URL
**Solution:**
- Use: `http://localhost:3000`
- NOT: `file:///C:/...`
- NOT: `https://localhost:3000`

#### Cause B: Firewall Blocking
**Solution:**
1. Check Windows Firewall settings
2. Allow Node.js through firewall
3. Or temporarily disable firewall to test

#### Cause C: Server Not Actually Running
**Solution:**
1. Check server window - does it show "Server is RUNNING!"?
2. Look for error messages in server window
3. Verify port 3000 is listening:
   ```bash
   netstat -ano | findstr :3000
   ```

### 4. ❌ Error Messages in Server Window
**Symptoms:**
- Server window shows error messages
- Server stops immediately

**Common Errors & Solutions:**

#### Error: "Cannot find module 'express'"
**Solution:**
```bash
npm install
```

#### Error: "Port 3000 is already in use"
**Solution:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use different port
set PORT=3001
node server.js
```

#### Error: "EACCES: permission denied"
**Solution:**
- Run as administrator
- Or use a port above 1024 (like 3000)

#### Error: "ENOENT: no such file or directory"
**Solution:**
- Check if all files exist (server.js, index.html, veltech.json)
- Verify you're in the correct directory

### 5. ❌ Server Runs But Crashes After a Few Seconds
**Symptoms:**
- Server starts successfully
- Shows "Server is RUNNING!"
- Then crashes/closes after a few seconds

**Causes & Solutions:**

#### Cause A: Syntax Error in Code
**Solution:**
1. Check server.js for syntax errors
2. Run: `node server.js` and look for error messages
3. Fix any syntax errors

#### Cause B: Missing File
**Solution:**
1. Verify all files exist:
   - server.js
   - index.html
   - veltech.json (optional but recommended)
   - package.json
2. Check file paths in server.js

#### Cause C: Memory Issue
**Solution:**
1. Close other applications
2. Restart computer
3. Try again

## 🔧 Diagnostic Steps

### Step 1: Run Diagnostic Tool
```bash
# Double-click: DIAGNOSE.bat
# Or run in command prompt:
cd "MINOR project codes\data"
DIAGNOSE.bat
```

### Step 2: Check Node.js
```bash
node --version
npm --version
```
Should show version numbers. If not, Node.js is not installed properly.

### Step 3: Check Dependencies
```bash
cd "MINOR project codes\data"
dir node_modules
```
Should show node_modules folder. If not, run `npm install`.

### Step 4: Test Server Manually
```bash
cd "MINOR project codes\data"
node server.js
```
Watch for error messages. Server should stay running.

### Step 5: Check Port
```bash
netstat -ano | findstr :3000
```
Should show nothing if port is free, or show process ID if port is in use.

## ✅ Quick Fix Checklist

- [ ] Node.js is installed (`node --version` works)
- [ ] Dependencies are installed (`node_modules` folder exists)
- [ ] All files exist (server.js, index.html, package.json)
- [ ] Port 3000 is free (no other application using it)
- [ ] Running from correct directory
- [ ] No syntax errors in server.js
- [ ] Firewall allows Node.js
- [ ] Using correct URL: http://localhost:3000

## 🚀 Recommended Startup Method

1. **Use DIAGNOSE.bat first:**
   - Double-click `DIAGNOSE.bat`
   - It will check everything and tell you what's wrong

2. **Then use START_SERVER_FIXED.bat:**
   - Double-click `START_SERVER_FIXED.bat`
   - It has better error handling

3. **Or use CHECK_AND_RUN.bat:**
   - Double-click `CHECK_AND_RUN.bat`
   - It checks and installs automatically

## 📝 Still Not Working?

1. **Check server window for error messages**
   - Look for red error text
   - Copy the error message
   - Search for the error online

2. **Check browser console:**
   - Press F12 in browser
   - Look at Console tab
   - Check for errors

3. **Try different browser:**
   - Chrome
   - Firefox
   - Edge

4. **Try different port:**
   ```bash
   set PORT=3001
   node server.js
   ```
   Then access: http://localhost:3001

5. **Check Windows Event Viewer:**
   - Search for "Event Viewer" in Windows
   - Look for Node.js errors

## 💡 Pro Tips

1. **Always check the server window first**
   - Error messages appear there
   - Don't close it immediately

2. **Use Command Prompt instead of double-clicking**
   - You can see error messages better
   - Window won't close automatically

3. **Keep server window visible**
   - Don't minimize it
   - Watch for error messages

4. **Test with simple command first:**
   ```bash
   node --version
   ```
   If this doesn't work, Node.js is the problem

5. **Check file permissions**
   - Make sure you have read/write access
   - Run as administrator if needed

## 🎯 Most Common Issue

**The #1 reason servers don't run:**
**Missing dependencies or port already in use**

**Quick fix:**
```bash
cd "MINOR project codes\data"
npm install
node server.js
```

If port is in use:
```bash
set PORT=3001
node server.js
```

---

**Remember:** The server MUST be running before you open the browser!

