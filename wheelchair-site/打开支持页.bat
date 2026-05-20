@echo off
chcp 65001 >nul
cd /d "%~dp0"
set PORT=8765
set URL=http://127.0.0.1:%PORT%/support.html

echo 正在检查本地预览服务...
powershell -NoProfile -Command "try { (Invoke-WebRequest -Uri '%URL%' -UseBasicParsing -TimeoutSec 2).StatusCode | Out-Null; exit 0 } catch { exit 1 }"
if errorlevel 1 (
  echo 启动预览服务（端口 %PORT%）...
  start "wheelchair-preview" /min "%LOCALAPPDATA%\Programs\cursor\resources\app\resources\helpers\node.exe" server-preview.js
  timeout /t 2 /nobreak >nul
)

echo 打开浏览器: %URL%
start "" "%URL%"
echo.
echo 若未弹出浏览器，请手动复制地址:
echo %URL%
echo.
pause
