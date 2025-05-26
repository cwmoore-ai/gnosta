#!/bin/bash

echo "Starting All MCP Servers..."
echo "============================"
echo ""

echo "Starting servers in background processes..."
echo ""

# Navigate to gnosta directory first
cd "c:/dev/projects/gnosta" || { echo "Failed to navigate to gnosta directory"; exit 1; }

echo "[1/27] Starting Quote Server (Port 3000)..."
(cd ../quote-mcp-server && node index.js) &
sleep 2

echo "[2/27] Starting Weather Server..."
(cd ../weather-mcp-server && node index.js) &
sleep 2

echo "[3/27] Starting WhatsApp Server..."
(cd ../whatsapp-mcp/whatsapp-mcp-server && python main.py) &
sleep 2

echo "[4/27] Starting Local Google Drive Server..."
(cd ./mcp_servers/gdrive_mcp_server && npm start) &
sleep 2

echo "[5/27] Starting Terminal Server..."
(cd ../../servers/mcp-terminal-server && python main.py) &
sleep 2

echo "[6/27] Starting Slack Server..."
(cd ../../servers/src/communication_and_collaboration/messaging/slack && npm start) &
sleep 2

echo "[7/27] Starting Official Google Drive Server..."
(cd ../../servers/src/data_sources/cloud_storage/gdrive && npm start) &
sleep 2

echo "[8/27] Starting Memory Database Server..."
(cd ../../servers/src/data_sources/databases/memory && npm start) &
sleep 2

echo "[9/27] Starting PostgreSQL Server..."
(cd ../../servers/src/data_sources/databases/postgres && npm start) &
sleep 2

echo "[10/27] Starting Redis Server..."
(cd ../../servers/src/data_sources/databases/redis && npm start) &
sleep 2

echo "[11/27] Starting SQLite Server..."
(cd ../../servers/src/data_sources/databases/sqlite && python -m mcp_server_sqlite.server) &
sleep 2

echo "[12/27] Starting AWS KB Retrieval Server..."
(cd ../../servers/src/data_sources/knowledge_bases/aws-kb-retrieval-server && npm start) &
sleep 2

echo "[13/27] Starting Brave Search Server..."
(cd ../../servers/src/data_sources/search_engines/brave-search && npm start) &
sleep 2

echo "[14/27] Starting Puppeteer Server..."
(cd ../../servers/src/data_sources/web_content/puppeteer && npm start) &
sleep 2

echo "[15/27] Starting Sentry Server..."
(cd ../../servers/src/developer_tools/monitoring_and_logging/sentry && python -m mcp_server_sentry.server) &
sleep 2

echo "[16/27] Starting Git Server..."
(cd ../../servers/src/developer_tools/version_control/git && python -m mcp_server_git.server) &
sleep 2

echo "[17/27] Starting GitHub Server..."
(cd ../../servers/src/developer_tools/version_control/github && npm start) &
sleep 2

echo "[18/27] Starting GitLab Server..."
(cd ../../servers/src/developer_tools/version_control/gitlab && npm start) &
sleep 2

echo "[19/27] Starting Fetch Server..."
(cd ../../servers/src/fetch && python -m mcp_server_fetch.server) &
sleep 2

echo "[20/27] Starting Filesystem Server..."
(cd ../../servers/src/filesystem && npm start) &
sleep 2

echo "[21/27] Starting Google Maps Server..."
(cd ../../servers/src/location_services/google_maps && npm start) &
sleep 2

echo "[22/27] Starting EverArt Server..."
(cd ../../servers/src/media_services/everart && npm start) &
sleep 2

echo "[23/27] Starting Time Server..."
(cd ../../servers/src/time && python -m mcp_server_time.server) &
sleep 2

echo "[24/27] Starting Everything Server..."
(cd ../../servers/src/utility_and_core/everything && npm start) &
sleep 2

echo "[25/27] Starting Sequential Thinking Server..."
(cd ../../servers/src/utility_and_core/sequentialthinking && npm start) &
sleep 2

echo "[26/27] Starting Basic MCP Server..."
(cd ../../mcp-server && node index.js) &
sleep 2

echo "[27/27] Starting n8n MCP Server..."
(cd ../../servers/n8n-mcp-server && echo 'n8n server requires manual setup') &
sleep 2

echo ""
echo "============================"
echo "All MCP Servers Started!"
echo "============================"
echo ""
echo "Waiting 10 seconds for servers to initialize..."
sleep 10

echo ""
echo "Checking active ports..."
if command -v netstat >/dev/null 2>&1; then
    netstat -tuln | grep -E ':(300[0-9]|[4-9][0-9][0-9][0-9])' | sort
elif command -v ss >/dev/null 2>&1; then
    ss -tuln | grep -E ':(300[0-9]|[4-9][0-9][0-9][0-9])' | sort
else
    echo "netstat or ss not available for port checking"
fi

echo ""
echo "Testing known HTTP endpoints..."
echo ""

echo "Testing Quote Server (http://localhost:3000/random-quote):"
if command -v curl >/dev/null 2>&1; then
    curl -s http://localhost:3000/random-quote 2>/dev/null || echo "Not responding"
else
    echo "curl not available for testing"
fi

echo ""
echo "Testing port 3282:"
if command -v curl >/dev/null 2>&1; then
    curl -s http://localhost:3282 --connect-timeout 2 2>/dev/null || echo "Not responding"
else
    echo "curl not available for testing"
fi

echo ""
echo "============================"
echo "Startup Complete!"
echo "============================"
echo ""
echo "HTTP Endpoints Available:"
echo "- Quote Server: http://localhost:3000/random-quote"
echo "- Check other ports: 3282, 5040, etc."
echo ""
echo "Most MCP servers use stdio transport and don't provide HTTP interfaces."
echo "Check individual terminal sessions to see server status and logs."
echo ""
echo "To stop all servers, use: pkill -f 'node\|python.*mcp'"
echo ""

# Function to stop all servers
stop_all_servers() {
    echo "Stopping all MCP servers..."
    pkill -f "node.*index.js"
    pkill -f "python.*main.py"
    pkill -f "python.*mcp_server"
    pkill -f "npm start"
    echo "All servers stopped."
}

# Trap to stop servers on script exit
trap stop_all_servers EXIT

echo "Press Ctrl+C to stop all servers and exit..."
while true; do
    sleep 1
done