@echo off
cd /d "%~dp0"
start /min "" node server-preview.js
timeout /t 1 /nobreak >nul
start "" "http://127.0.0.1:8765/"
