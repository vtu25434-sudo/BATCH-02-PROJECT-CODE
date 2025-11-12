@echo off
title EduBot Server - KEEP THIS WINDOW OPEN
color 0A
cls

echo.
echo ================================================================================
echo                    EDUBOT SERVER - STARTING...
echo ================================================================================
echo.

cd /d "%~dp0"
echo Current directory: %CD%
echo.

echo [1] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo [OK] Node.js: %%i
echo.

echo [2] Checking dependencies...
if not exist "node_modules\express\index.js" (
    echo [INSTALL] Installing dependencies (this may take a minute)...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Installation failed!
        echo.
        pause
        exit /b 1
    )
) else (
    echo [OK] Dependencies found
)
echo.

echo [3] Checking files...
if not exist "server.js" (
    echo [ERROR] server.js not found!
    pause
    exit /b 1
)
if not exist "index.html" (
    echo [ERROR] index.html not found!
    pause
    exit /b 1
)
if not exist "veltech.json" (
    echo [WARNING] veltech.json not found - server will work but without data
)
echo [OK] All required files found
echo.

echo ================================================================================
echo                          STARTING SERVER...
echo ================================================================================
echo.
echo IMPORTANT INSTRUCTIONS:
echo   1. Wait for "Server is RUNNING!" message below
echo   2. DO NOT close this window!
echo   3. Open your browser
echo   4. Go to: http://localhost:3000
echo   5. Keep this window open while using the app
echo.
echo To stop server: Press Ctrl+C
echo.
echo ================================================================================
echo.

node server.js

echo.
echo ================================================================================
echo Server has stopped.
echo.
echo If server stopped unexpectedly, check the error messages above.
echo.
pause

