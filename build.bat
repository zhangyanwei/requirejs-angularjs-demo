:check-cnpm
CALL cnpm -v
IF ERRORLEVEL 1 GOTO install-cnpm
IF ERRORLEVEL 0 GOTO check-gulp

:install-cnpm
CALL npm install cnpm -g --registry=https://registry.npm.taobao.org

:check-gulp
CALL gulp -v
IF ERRORLEVEL 1 GOTO install-gulp
IF ERRORLEVEL 0 GOTO gulp-task

:install-gulp
CALL cnpm install gulp -g

:gulp-task
CALL cnpm install
CALL gulp less

rmdir /S /Q build
mkdir build\css\lib

xcopy /sy src\lib build\lib\
xcopy /sy src\css\lib build\css\lib\

CALL gulp default
node r.js -o build.js

CALL gulp update-version

CMD /K