#!/bin/bash

echo ""
echo "========================================"
echo "   EduBot - Vel Tech University (Chennai)"
echo "========================================"
echo ""
echo "Starting EduBot server..."
echo ""
echo "Frontend: http://localhost:3000"
echo "API: http://localhost:3000/api/chat"
echo "University API: /api/university /api/fees /api/programs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

export UNIVERSITY_DATA_PATH=./data/veltech.json
node server.js
