@echo off

echo Running git bump and push routine ...
cd /D "%~dp0"
cmd.exe /K "npm run start" 


echo DONE!
pause