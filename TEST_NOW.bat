@echo off
echo ========================================
echo    QUICK TEST - Server Startup
echo ========================================
echo.

cd /d "%~dp0"

echo Testing Node.js...
node --version
if errorlevel 1 (
    echo ERROR: Node.js not found!
    pause
    exit /b 1
)
echo.

echo Testing dependencies...
if not exist "node_modules\express" (
    echo ERROR: Dependencies not installed!
    echo Run: npm install
    pause
    exit /b 1
)
echo OK: Dependencies found
echo.

echo Testing server file...
if not exist "server.js" (
    echo ERROR: server.js not found!
    pause
    exit /b 1
)
echo OK: server.js found
echo.

echo ========================================
echo    STARTING SERVER NOW...
echo ========================================
echo.
echo The server will start in this window.
echo DO NOT CLOSE THIS WINDOW!
echo.
echo After you see "Server is RUNNING!", open browser to:
echo http://localhost:3000
echo.
echo Press Ctrl+C to stop the server.
echo.
echo ========================================
echo.

node server.js

pause

