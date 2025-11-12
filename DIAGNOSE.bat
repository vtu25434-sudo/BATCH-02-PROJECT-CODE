@echo off
title EduBot Server Diagnostic Tool
color 0E

echo.
echo ================================================================================
echo                    EDUBOT SERVER DIAGNOSTIC TOOL
echo ================================================================================
echo.

cd /d "%~dp0"

echo [1/5] Checking current directory...
echo Current directory: %CD%
echo.

echo [2/5] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is NOT installed or not in PATH!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo After installing, restart your computer and try again.
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo [OK] Node.js is installed: %NODE_VERSION%
)
echo.

echo [3/5] Checking npm installation...
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is NOT installed or not in PATH!
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo [OK] npm is installed: %NPM_VERSION%
)
echo.

echo [4/5] Checking project files...
if not exist "server.js" (
    echo [ERROR] server.js NOT found!
    echo.
    pause
    exit /b 1
) else (
    echo [OK] server.js exists
)

if not exist "package.json" (
    echo [ERROR] package.json NOT found!
    echo.
    pause
    exit /b 1
) else (
    echo [OK] package.json exists
)

if not exist "veltech.json" (
    echo [WARNING] veltech.json NOT found! Server will work but without data.
) else (
    echo [OK] veltech.json exists
)

if not exist "index.html" (
    echo [ERROR] index.html NOT found!
    echo.
    pause
    exit /b 1
) else (
    echo [OK] index.html exists
)
echo.

echo [5/5] Checking dependencies...
if not exist "node_modules" (
    echo [WARNING] node_modules folder NOT found!
    echo [INFO] Dependencies need to be installed.
    echo.
    echo Installing dependencies now...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies!
        echo.
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed successfully
) else (
    echo [OK] node_modules folder exists
    
    echo [INFO] Checking key dependencies...
    if not exist "node_modules\express" (
        echo [WARNING] express module not found in node_modules
        echo [INFO] Reinstalling dependencies...
        call npm install
    ) else (
        echo [OK] express module found
    )
    
    if not exist "node_modules\cors" (
        echo [WARNING] cors module not found in node_modules
    ) else (
        echo [OK] cors module found
    )
)
echo.

echo ================================================================================
echo                           TESTING SERVER STARTUP
echo ================================================================================
echo.
echo Attempting to start server for 5 seconds...
echo If you see "Server is RUNNING!" below, the server works!
echo.
echo --------------------------------------------------------------------------------
echo.

timeout /t 1 /nobreak >nul

node server.js &
set SERVER_PID=%!

timeout /t 5 /nobreak >nul

echo.
echo --------------------------------------------------------------------------------
echo.

taskkill /PID %SERVER_PID% /F >nul 2>&1

echo.
echo ================================================================================
echo                            DIAGNOSTIC COMPLETE
echo ================================================================================
echo.
echo If the server started successfully above, you can run it with:
echo   1. Double-click: RUN_SERVER.bat
echo   2. Or run: node server.js
echo.
echo If there were errors, please check the messages above.
echo.
pause

