@echo off

echo Copying file dependencies ...
cd /D "%~dp0"
cmd.exe /K "node index.js"  

echo DONE!
pause