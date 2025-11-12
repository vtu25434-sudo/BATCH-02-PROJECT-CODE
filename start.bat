@echo off
REM Simple start script for Windows
cd /d "%~dp0"
set UNIVERSITY_DATA_PATH=.\veltech.json
echo Installing dependencies (if needed)...
npm install --no-audit --no-fund
echo Starting server...
node server.js
pause
