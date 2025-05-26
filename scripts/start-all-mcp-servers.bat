@echo off
echo Starting All MCP Servers...
echo ============================
echo.

echo Starting servers in background processes...
echo.

REM Navigate to gnosta directory first
cd /d "c:\dev\projects\gnosta"

echo [1/27] Starting Quote Server (Port 3000)...
start "Quote-MCP-Server" cmd /c "cd ..\quote-mcp-server && node index.js"
timeout /t 2 /nobreak >nul

echo [2/27] Starting Weather Server...
start "Weather-MCP-Server" cmd /c "cd ..\weather-mcp-server && node index.js"
timeout /t 2 /nobreak >nul

echo [3/27] Starting WhatsApp Server...
start "WhatsApp-MCP-Server" cmd /c "cd ..\whatsapp-mcp\whatsapp-mcp-server && python main.py"
timeout /t 2 /nobreak >nul

echo [4/27] Starting Local Google Drive Server...
start "GDrive-Local-MCP" cmd /c "cd .\mcp_servers\gdrive_mcp_server && npm start"
timeout /t 2 /nobreak >nul

echo [5/27] Starting Terminal Server...
start "Terminal-MCP-Server" cmd /c "cd ..\..\servers\mcp-terminal-server && python main.py"
timeout /t 2 /nobreak >nul

echo [6/27] Starting Slack Server...
start "Slack-MCP-Server" cmd /c "cd ..\..\servers\src\communication_and_collaboration\messaging\slack && npm start"
timeout /t 2 /nobreak >nul

echo [7/27] Starting Official Google Drive Server...
start "GDrive-Official-MCP" cmd /c "cd ..\..\servers\src\data_sources\cloud_storage\gdrive && npm start"
timeout /t 2 /nobreak >nul

echo [8/27] Starting Memory Database Server...
start "Memory-DB-MCP" cmd /c "cd ..\..\servers\src\data_sources\databases\memory && npm start"
timeout /t 2 /nobreak >nul

echo [9/27] Starting PostgreSQL Server...
start "Postgres-MCP-Server" cmd /c "cd ..\..\servers\src\data_sources\databases\postgres && npm start"
timeout /t 2 /nobreak >nul

echo [10/27] Starting Redis Server...
start "Redis-MCP-Server" cmd /c "cd ..\..\servers\src\data_sources\databases\redis && npm start"
timeout /t 2 /nobreak >nul

echo [11/27] Starting SQLite Server...
start "SQLite-MCP-Server" cmd /c "cd ..\..\servers\src\data_sources\databases\sqlite && python -m mcp_server_sqlite.server"
timeout /t 2 /nobreak >nul

echo [12/27] Starting AWS KB Retrieval Server...
start "AWS-KB-MCP-Server" cmd /c "cd ..\..\servers\src\data_sources\knowledge_bases\aws-kb-retrieval-server && npm start"
timeout /t 2 /nobreak >nul

echo [13/27] Starting Brave Search Server...
start "Brave-Search-MCP" cmd /c "cd ..\..\servers\src\data_sources\search_engines\brave-search && npm start"
timeout /t 2 /nobreak >nul

echo [14/27] Starting Puppeteer Server...
start "Puppeteer-MCP-Server" cmd /c "cd ..\..\servers\src\data_sources\web_content\puppeteer && npm start"
timeout /t 2 /nobreak >nul

echo [15/27] Starting Sentry Server...
start "Sentry-MCP-Server" cmd /c "cd ..\..\servers\src\developer_tools\monitoring_and_logging\sentry && python -m mcp_server_sentry.server"
timeout /t 2 /nobreak >nul

echo [16/27] Starting Git Server...
start "Git-MCP-Server" cmd /c "cd ..\..\servers\src\developer_tools\version_control\git && python -m mcp_server_git.server"
timeout /t 2 /nobreak >nul

echo [17/27] Starting GitHub Server...
start "GitHub-MCP-Server" cmd /c "cd ..\..\servers\src\developer_tools\version_control\github && npm start"
timeout /t 2 /nobreak >nul

echo [18/27] Starting GitLab Server...
start "GitLab-MCP-Server" cmd /c "cd ..\..\servers\src\developer_tools\version_control\gitlab && npm start"
timeout /t 2 /nobreak >nul

echo [19/27] Starting Fetch Server...
start "Fetch-MCP-Server" cmd /c "cd ..\..\servers\src\fetch && python -m mcp_server_fetch.server"
timeout /t 2 /nobreak >nul

echo [20/27] Starting Filesystem Server...
start "Filesystem-MCP-Server" cmd /c "cd ..\..\servers\src\filesystem && npm start"
timeout /t 2 /nobreak >nul

echo [21/27] Starting Google Maps Server...
start "GoogleMaps-MCP-Server" cmd /c "cd ..\..\servers\src\location_services\google_maps && npm start"
timeout /t 2 /nobreak >nul

echo [22/27] Starting EverArt Server...
start "EverArt-MCP-Server" cmd /c "cd ..\..\servers\src\media_services\everart && npm start"
timeout /t 2 /nobreak >nul

echo [23/27] Starting Time Server...
start "Time-MCP-Server" cmd /c "cd ..\..\servers\src\time && python -m mcp_server_time.server"
timeout /t 2 /nobreak >nul

echo [24/27] Starting Everything Server...
start "Everything-MCP-Server" cmd /c "cd ..\..\servers\src\utility_and_core\everything && npm start"
timeout /t 2 /nobreak >nul

echo [25/27] Starting Sequential Thinking Server...
start "Sequential-MCP-Server" cmd /c "cd ..\..\servers\src\utility_and_core\sequentialthinking && npm start"
timeout /t 2 /nobreak >nul

echo [26/27] Starting Basic MCP Server...
start "Basic-MCP-Server" cmd /c "cd ..\..\mcp-server && node index.js"
timeout /t 2 /nobreak >nul

echo [27/27] Starting n8n MCP Server...
start "N8N-MCP-Server" cmd /c "cd ..\..\servers\n8n-mcp-server && echo 'n8n server requires manual setup'"
timeout /t 2 /nobreak >nul

echo.
echo ============================
echo All MCP Servers Started!
echo ============================
echo.
echo Waiting 10 seconds for servers to initialize...
timeout /t 10 /nobreak >nul

echo.
echo Checking active ports...
powershell -Command "Get-NetTCPConnection -State Listen | Where-Object {$_.LocalPort -ge 3000 -and $_.LocalPort -le 9000} | Select-Object LocalPort | Sort-Object LocalPort"

echo.
echo Testing known HTTP endpoints...
echo.

echo Testing Quote Server (http://localhost:3000/random-quote):
curl -s http://localhost:3000/random-quote 2>nul || echo "Not responding"

echo.
echo Testing port 3282:
curl -s http://localhost:3282 --connect-timeout 2 2>nul || echo "Not responding"

echo.
echo ============================
echo Startup Complete!
echo ============================
echo.
echo HTTP Endpoints Available:
echo - Quote Server: http://localhost:3000/random-quote
echo - Check other ports: 3282, 5040, etc.
echo.
echo Most MCP servers use stdio transport and don't provide HTTP interfaces.
echo Use the individual server windows to see their status and logs.
echo.
pause