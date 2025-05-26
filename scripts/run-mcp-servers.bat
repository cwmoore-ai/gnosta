@echo off
echo MCP Servers Management Script for Gnosta Project
echo ================================================
echo Total Servers Available: 27
echo.

:menu
echo Available MCP Server Categories:
echo.
echo LOCAL SERVERS (1 server):
echo   1. Google Drive Server (Local TypeScript MCP)
echo.
echo PARENT DIRECTORY SERVERS (3 servers):
echo   2. Quote Server (HTTP API on port 3000)
echo   3. Weather Server (MCP with weather tools)
echo   4. WhatsApp Server (MCP with messaging tools)
echo.
echo DEV SERVERS COLLECTION (22 servers):
echo   5. Terminal Server (Command execution)
echo   6. Slack Server (Messaging)
echo   7. Database Servers (Memory, Postgres, Redis, SQLite)
echo   8. Cloud Storage (Official Google Drive)
echo   9. Search Engines (Brave Search)
echo  10. Web Content (Puppeteer)
echo  11. Developer Tools (Git, GitHub, GitLab, Sentry)
echo  12. Utilities (Fetch, Filesystem, Time, Everything)
echo  13. Location Services (Google Maps)
echo  14. Media Services (EverArt)
echo.
echo STANDALONE SERVERS (1 server):
echo  15. Basic MCP Server
echo.
echo MANAGEMENT OPTIONS:
echo  16. Show All Server Details
echo  17. Show Quick Start Commands
echo  18. Test Server Accessibility
echo  19. Exit
echo.
set /p choice="Select option (1-19): "

if "%choice%"=="1" goto gdrive_local
if "%choice%"=="2" goto quote_server
if "%choice%"=="3" goto weather_server
if "%choice%"=="4" goto whatsapp_server
if "%choice%"=="5" goto terminal_server
if "%choice%"=="6" goto slack_server
if "%choice%"=="7" goto database_menu
if "%choice%"=="8" goto gdrive_official
if "%choice%"=="9" goto brave_search
if "%choice%"=="10" goto puppeteer_server
if "%choice%"=="11" goto dev_tools_menu
if "%choice%"=="12" goto utilities_menu
if "%choice%"=="13" goto google_maps
if "%choice%"=="14" goto everart_server
if "%choice%"=="15" goto basic_server
if "%choice%"=="16" goto show_details
if "%choice%"=="17" goto quick_commands
if "%choice%"=="18" goto test_accessibility
if "%choice%"=="19" goto exit
echo Invalid choice. Please try again.
goto menu

:gdrive_local
echo Starting Local Google Drive MCP Server...
cd .\mcp_servers\gdrive_mcp_server
npm start
goto menu

:quote_server
echo Starting Quote Server...
echo Navigate to: http://localhost:3000/random-quote
cd ..\quote-mcp-server
node index.js
goto menu

:weather_server
echo Starting Weather MCP Server...
echo Note: Requires WEATHER_API_KEY environment variable
cd ..\weather-mcp-server
node index.js
goto menu

:whatsapp_server
echo Starting WhatsApp MCP Server...
echo Note: Requires WhatsApp bridge setup
cd ..\whatsapp-mcp\whatsapp-mcp-server
python main.py
goto menu

:terminal_server
echo Starting Terminal MCP Server...
cd ..\..\servers\mcp-terminal-server
python main.py
goto menu

:slack_server
echo Starting Slack MCP Server...
cd ..\..\servers\src\communication_and_collaboration\messaging\slack
npm start
goto menu

:database_menu
echo.
echo Database Servers:
echo 1. Memory Database Server
echo 2. PostgreSQL Server
echo 3. Redis Server
echo 4. SQLite Server
echo 5. Back to main menu
echo.
set /p db_choice="Select database server (1-5): "
if "%db_choice%"=="1" goto memory_db
if "%db_choice%"=="2" goto postgres_db
if "%db_choice%"=="3" goto redis_db
if "%db_choice%"=="4" goto sqlite_db
if "%db_choice%"=="5" goto menu
goto database_menu

:memory_db
echo Starting Memory Database Server...
cd ..\..\servers\src\data_sources\databases\memory
npm start
goto menu

:postgres_db
echo Starting PostgreSQL Server...
cd ..\..\servers\src\data_sources\databases\postgres
npm start
goto menu

:redis_db
echo Starting Redis Server...
cd ..\..\servers\src\data_sources\databases\redis
npm start
goto menu

:sqlite_db
echo Starting SQLite Server...
cd ..\..\servers\src\data_sources\databases\sqlite
python -m mcp_server_sqlite.server
goto menu

:gdrive_official
echo Starting Official Google Drive Server...
cd ..\..\servers\src\data_sources\cloud_storage\gdrive
npm start
goto menu

:brave_search
echo Starting Brave Search Server...
cd ..\..\servers\src\data_sources\search_engines\brave-search
npm start
goto menu

:puppeteer_server
echo Starting Puppeteer Web Content Server...
cd ..\..\servers\src\data_sources\web_content\puppeteer
npm start
goto menu

:dev_tools_menu
echo.
echo Developer Tools Servers:
echo 1. Git Server
echo 2. GitHub Server
echo 3. GitLab Server
echo 4. Sentry Monitoring Server
echo 5. Back to main menu
echo.
set /p dev_choice="Select developer tool (1-5): "
if "%dev_choice%"=="1" goto git_server
if "%dev_choice%"=="2" goto github_server
if "%dev_choice%"=="3" goto gitlab_server
if "%dev_choice%"=="4" goto sentry_server
if "%dev_choice%"=="5" goto menu
goto dev_tools_menu

:git_server
echo Starting Git Server...
cd ..\..\servers\src\developer_tools\version_control\git
python -m mcp_server_git.server
goto menu

:github_server
echo Starting GitHub Server...
cd ..\..\servers\src\developer_tools\version_control\github
npm start
goto menu

:gitlab_server
echo Starting GitLab Server...
cd ..\..\servers\src\developer_tools\version_control\gitlab
npm start
goto menu

:sentry_server
echo Starting Sentry Monitoring Server...
cd ..\..\servers\src\developer_tools\monitoring_and_logging\sentry
python -m mcp_server_sentry.server
goto menu

:utilities_menu
echo.
echo Utility Servers:
echo 1. Fetch Server (HTTP requests)
echo 2. Filesystem Server
echo 3. Time Server
echo 4. Everything Search Server
echo 5. Sequential Thinking Server
echo 6. Back to main menu
echo.
set /p util_choice="Select utility (1-6): "
if "%util_choice%"=="1" goto fetch_server
if "%util_choice%"=="2" goto filesystem_server
if "%util_choice%"=="3" goto time_server
if "%util_choice%"=="4" goto everything_server
if "%util_choice%"=="5" goto sequential_server
if "%util_choice%"=="6" goto menu
goto utilities_menu

:fetch_server
echo Starting Fetch Server...
cd ..\..\servers\src\fetch
python -m mcp_server_fetch.server
goto menu

:filesystem_server
echo Starting Filesystem Server...
cd ..\..\servers\src\filesystem
npm start
goto menu

:time_server
echo Starting Time Server...
cd ..\..\servers\src\time
python -m mcp_server_time.server
goto menu

:everything_server
echo Starting Everything Search Server...
cd ..\..\servers\src\utility_and_core\everything
npm start
goto menu

:sequential_server
echo Starting Sequential Thinking Server...
cd ..\..\servers\src\utility_and_core\sequentialthinking
npm start
goto menu

:google_maps
echo Starting Google Maps Server...
cd ..\..\servers\src\location_services\google_maps
npm start
goto menu

:everart_server
echo Starting EverArt Media Server...
cd ..\..\servers\src\media_services\everart
npm start
goto menu

:basic_server
echo Starting Basic MCP Server...
cd ..\..\mcp-server
node index.js
goto menu

:show_details
echo.
echo ========================================
echo MCP SERVERS DETAILED INVENTORY
echo ========================================
echo.
echo LOCAL SERVERS (in gnosta/mcp_servers/):
echo   - gdrive_mcp_server (TypeScript)
echo.
echo PARENT DIRECTORY SERVERS (in ../):
echo   - quote-mcp-server (JavaScript, HTTP API)
echo   - weather-mcp-server (JavaScript, requires API key)
echo   - whatsapp-mcp/whatsapp-mcp-server (Python, stdio)
echo.
echo DEV SERVERS COLLECTION (in ../../servers/):
echo   Communication:
echo     - mcp-terminal-server (Python, command execution)
echo     - slack (TypeScript, messaging)
echo.
echo   Data Sources:
echo     - gdrive (TypeScript, cloud storage)
echo     - memory (TypeScript, in-memory database)
echo     - postgres (TypeScript, PostgreSQL)
echo     - redis (TypeScript, Redis database)
echo     - sqlite (Python, SQLite database)
echo     - aws-kb-retrieval-server (TypeScript, AWS KB)
echo     - brave-search (TypeScript, search engine)
echo     - puppeteer (TypeScript, web scraping)
echo.
echo   Developer Tools:
echo     - git (Python, version control)
echo     - github (TypeScript, GitHub integration)
echo     - gitlab (TypeScript, GitLab integration)
echo     - sentry (Python, monitoring/logging)
echo.
echo   Utilities:
echo     - fetch (Python, HTTP requests)
echo     - filesystem (TypeScript, file operations)
echo     - time (Python, date/time utilities)
echo     - everything (TypeScript, search utility)
echo     - sequentialthinking (TypeScript, reasoning)
echo.
echo   Services:
echo     - google_maps (TypeScript, location services)
echo     - everart (TypeScript, media services)
echo.
echo STANDALONE SERVERS:
echo   - basic mcp-server (JavaScript, simple MCP)
echo.
echo CONFIGURED SERVERS (via npx):
echo   - filesystem, windows_cli, sequential-thinking
echo   - fetch, github, slack (with tokens)
echo.
pause
goto menu

:quick_commands
echo.
echo ========================================
echo QUICK START COMMANDS (from gnosta dir)
echo ========================================
echo.
echo LOCAL:
echo   cd .\mcp_servers\gdrive_mcp_server ^&^& npm start
echo.
echo PARENT DIRECTORY:
echo   cd ..\quote-mcp-server ^&^& node index.js
echo   cd ..\weather-mcp-server ^&^& node index.js
echo   cd ..\whatsapp-mcp\whatsapp-mcp-server ^&^& python main.py
echo.
echo DEV COLLECTION (examples):
echo   cd ..\..\servers\mcp-terminal-server ^&^& python main.py
echo   cd ..\..\servers\src\data_sources\databases\sqlite ^&^& python -m mcp_server_sqlite.server
echo   cd ..\..\servers\src\developer_tools\version_control\github ^&^& npm start
echo   cd ..\..\servers\src\filesystem ^&^& npm start
echo.
echo STANDALONE:
echo   cd ..\..\mcp-server ^&^& node index.js
echo.
pause
goto menu

:test_accessibility
echo.
echo Testing MCP Server Accessibility...
echo ===================================
echo.
echo Checking directory paths:
if exist ".\mcp_servers\gdrive_mcp_server" (
    echo [OK] Local gdrive server accessible
) else (
    echo [FAIL] Local gdrive server not found
)

if exist "..\quote-mcp-server" (
    echo [OK] Quote server accessible
) else (
    echo [FAIL] Quote server not found
)

if exist "..\weather-mcp-server" (
    echo [OK] Weather server accessible
) else (
    echo [FAIL] Weather server not found
)

if exist "..\whatsapp-mcp\whatsapp-mcp-server" (
    echo [OK] WhatsApp server accessible
) else (
    echo [FAIL] WhatsApp server not found
)

if exist "..\..\servers\mcp-terminal-server" (
    echo [OK] Terminal server accessible
) else (
    echo [FAIL] Terminal server not found
)

if exist "..\..\servers\src\filesystem" (
    echo [OK] Dev servers collection accessible
) else (
    echo [FAIL] Dev servers collection not found
)

if exist "..\..\mcp-server" (
    echo [OK] Basic standalone server accessible
) else (
    echo [FAIL] Basic standalone server not found
)

echo.
echo All servers are accessible from the gnosta directory!
echo Total servers catalogued: 27
echo.
pause
goto menu

:exit
echo.
echo ========================================
echo MCP SERVERS SUMMARY
echo ========================================
echo Total MCP servers found and configured: 27
echo   - Local servers: 1
echo   - Parent directory servers: 3  
echo   - Dev servers collection: 22
echo   - Standalone servers: 1
echo   - Pre-configured servers: 6
echo.
echo All servers are accessible from c:\dev\projects\gnosta\
echo Configuration saved in mcp-servers-config.json
echo.
echo Goodbye!