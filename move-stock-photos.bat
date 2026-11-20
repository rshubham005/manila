@echo off
REM Moves the stock photos Chrome saved to your Downloads folder into this website.
if not exist "%~dp0images\stock" mkdir "%~dp0images\stock"
move /Y "%USERPROFILE%\Downloads\plsm-*.jpg" "%~dp0images\stock\"
echo.
echo Done. Stock photos are now in images\stock
pause
