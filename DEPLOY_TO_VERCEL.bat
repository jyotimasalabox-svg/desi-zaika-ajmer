@echo off
title Deploy Desi Zaika to Vercel
cd /d "%~dp0"
set "NODE_DIR=C:\Users\91637\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.19.0-win-x64"
set "PATH=%NODE_DIR%;%PATH%"

echo ==========================================================
echo        DESI ZAIKA - 1-CLICK VERCEL DEPLOYMENT
echo ==========================================================
echo.
echo Step 1: Checking Vercel Login...
echo (If prompted, select Continue with GitHub or Email)
echo.
call vercel login
echo.
echo Step 2: Deploying Desi Zaika directly to Production...
call vercel --prod --yes
echo.
echo ==========================================================
echo  Deployment complete! Your website is live worldwide!
echo ==========================================================
pause
