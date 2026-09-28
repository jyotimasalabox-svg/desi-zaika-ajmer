@echo off
title Push Desi Zaika to GitHub
cd /d "%~dp0"

set "GIT_DIR=C:\Users\91637\AppData\Local\GitHubDesktop\app-3.6.6\resources\app\git\cmd"
set "GH_DIR=C:\Users\91637\AppData\Local\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin"
set "PATH=%GIT_DIR%;%GH_DIR%;%PATH%"

echo ==========================================================
echo       DESI ZAIKA - PUSH TO GITHUB HELPER
echo ==========================================================
echo.
echo 1. Checking GitHub Login...
echo (A browser window will open if you are not logged in yet)
echo.
call gh auth login -w -p https
echo.
echo 2. Publishing repository to your GitHub account...
call gh repo create desi-zaika-ajmer --public --source=. --remote=origin --push
echo.
echo ==========================================================
echo  Repository successfully published to your GitHub!
echo ==========================================================
pause
