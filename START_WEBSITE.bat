@echo off
title Desi Zaika Ajmer - Restaurant Website
cd /d "%~dp0"
echo ==========================================================
echo Starting Desi Zaika Website...
echo Location: Madar, Ajmer, Rajasthan
echo ==========================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start_server.ps1"
pause
