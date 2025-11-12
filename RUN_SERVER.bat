@echo off
title EduBot Server - DO NOT CLOSE THIS WINDOW
color 0A

echo.
echo ================================================================================
echo                         EDUBOT SERVER STARTUP
echo ================================================================================
echo.

cd /d "%~dp0"

echo [STEP 1] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERROR] Node.js is NOT installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    echo After installing Node.js:
    echo   1. Close this window
    echo   2. Run this file again
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js is installed: %NODE_VERSION%
echo.

echo [STEP 2] Checking dependencies...
if not exist "node_modules" (
    echo [INFO] Installing dependencies (this may take a minute)...
    call npm install --silent
    if errorlevel 1 (
        echo.
        echo [ERROR] Failed to install dependencies!
        echo.
        echo Try running: npm install
        echo.
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed successfully
) else (
    echo [OK] Dependencies are already installed
)
echo.

echo [STEP 3] Starting server...
echo.
echo ================================================================================
echo                    SERVER IS STARTING - PLEASE WAIT...
echo ================================================================================
echo.
echo IMPORTANT INSTRUCTIONS:
echo.
echo   1. Wait for the message "Server is RUNNING!"
echo   2. Open your browser
echo   3. Go to: http://localhost:3000
echo   4. Keep this window OPEN while using the app
echo   5. Press Ctrl+C to stop the server
echo.
echo ================================================================================
echo.

node server.js

echo.
echo ================================================================================
echo                         SERVER HAS STOPPED
echo ================================================================================
echo.
pause

