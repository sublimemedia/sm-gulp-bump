@echo off

echo Running git bump and push routine ...
cd /D "%~dp0"
cmd.exe /K "%~dp0node_modules/.bin/gulp push"  

echo DONE!
pause