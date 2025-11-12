@echo off
echo Testing server startup...
echo.

cd /d "%~dp0"

echo Checking if server can start...
timeout /t 2 /nobreak >nul

start "EduBot Server" /min node server.js

timeout /t 3 /nobreak >nul

echo.
echo Server should be running now!
echo.
echo Open your browser and go to: http://localhost:3000
echo.
echo Press any key to stop the server and close this window...
pause >nul

taskkill /FI "WINDOWTITLE eq EduBot Server*" /T /F >nul 2>&1

