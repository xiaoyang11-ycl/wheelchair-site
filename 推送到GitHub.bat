@echo off
chcp 65001 >nul
cd /d "%~dp0"
set GIT=C:\Program Files\Git\cmd\git.exe
set GIT_AUTHOR_NAME=xiaoyang11-ycl
set GIT_AUTHOR_EMAIL=xiaoyang11-ycl@users.noreply.github.com
set GIT_COMMITTER_NAME=xiaoyang11-ycl
set GIT_COMMITTER_EMAIL=xiaoyang11-ycl@users.noreply.github.com

echo === 轮椅网站：推送到 GitHub ===
echo.

%GIT% add -A
%GIT% status -sb
echo.

set /p OK=确认推送到 GitHub？(Y/N): 
if /i not "%OK%"=="Y" exit /b 0

%GIT% commit -m "Add assets folder with hero image" 2>nul
echo 正在拉取远程仓库并合并...
%GIT% pull origin main --allow-unrelated-histories --no-edit
echo 正在推送...
%GIT% push -u origin main

if %ERRORLEVEL%==0 (
  echo.
  echo 成功！等 1-3 分钟后打开：
  echo https://xiaoyang11-ycl.github.io/wheelchair-site/
  echo https://xiaoyang11-ycl.github.io/wheelchair-site/assets/hero.jpg
) else (
  echo.
  echo 推送失败。常见原因：
  echo 1. 未登录 GitHub - 会弹出浏览器，按提示登录
  echo 2. 网络问题 - 检查能否打开 github.com
  echo 3. 若提示 rejected，在 GitHub 网页上传 assets 文件夹
)
pause
