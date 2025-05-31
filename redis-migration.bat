@echo off
:: Redis migration script for Gnosta project memory

:: Configuration
set JSON_FILE=memory\gnosta-project-memory.json
set REDIS_CONTAINER=redis-local
set REDIS_PORT=6379
set KEY_PREFIX=gnosta:memory

:: Check if Redis is running
docker inspect --format='{{.State.Running}}' %REDIS_CONTAINER% 2>nul | findstr "true" >nul
if %ERRORLEVEL% neq 0 (
    echo Starting Redis container...
    docker run -d --name %REDIS_CONTAINER% -p %REDIS_PORT%:6379 redis:latest
)

:: Verify Redis connection
redis-cli -h localhost -p %REDIS_PORT% PING 2>nul | findstr "PONG" >nul
if %ERRORLEVEL% neq 0 (
    echo Error: Could not connect to Redis server
    exit /b 1
)

:: Create Redis commands from JSON using PowerShell
echo Converting JSON to Redis commands...
powershell -Command "Get-Content '%JSON_FILE%' | ConvertFrom-Json | Get-Member -MemberType NoteProperty | ForEach-Object { \"SET %KEY_PREFIX%:$($_.Name) '$($_.Value)'\" }" > redis-commands.txt

:: Import data to Redis
echo Importing data to Redis...
redis-cli -h localhost -p %REDIS_PORT% --pipe < redis-commands.txt

:: Verify import
echo Verifying Redis import...
redis-cli -h localhost -p %REDIS_PORT% GET "%KEY_PREFIX%:project_name"

:: Cleanup
echo Cleaning up redundant files...
del /q %JSON_FILE% redis-commands.txt

echo Migration completed successfully!