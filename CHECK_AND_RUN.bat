@echo off
title EduBot Server - Auto Start
color 0A

echo.
echo ================================================================================
echo                         EDUBOT SERVER - AUTO START
echo ================================================================================
echo.

cd /d "%~dp0"

echo [CHECK] Verifying Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [CHECK] Verifying dependencies...
if not exist "node_modules\express" (
    echo [INSTALL] Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies!
        pause
        exit /b 1
    )
)

echo [CHECK] Verifying server file...
if not exist "server.js" (
    echo [ERROR] server.js not found!
    pause
    exit /b 1
)

echo.
echo ================================================================================
echo                          STARTING SERVER NOW...
echo ================================================================================
echo.
echo IMPORTANT:
echo   - Server is starting...
echo   - Wait for "Server is RUNNING!" message
echo   - Then open browser to: http://localhost:3000
echo   - Keep this window OPEN!
echo.
echo ================================================================================
echo.

node server.js

if errorlevel 1 (
    echo.
    echo ================================================================================
    echo                              ERROR OCCURRED!
    echo ================================================================================
    echo.
    echo The server encountered an error. Please check the messages above.
    echo.
    echo Common issues:
    echo   1. Port 3000 is already in use
    echo   2. Missing dependencies (run: npm install)
    echo   3. Node.js version is too old
    echo.
    pause
)

