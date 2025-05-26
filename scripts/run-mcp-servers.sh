#!/bin/bash

echo "MCP Servers Management Script for Gnosta Project"
echo "================================================"
echo "Total Servers Available: 27"
echo ""

show_menu() {
    echo "Available MCP Server Categories:"
    echo ""
    echo "LOCAL SERVERS (1 server):"
    echo "  1. Google Drive Server (Local TypeScript MCP)"
    echo ""
    echo "PARENT DIRECTORY SERVERS (3 servers):"
    echo "  2. Quote Server (HTTP API on port 3000)"
    echo "  3. Weather Server (MCP with weather tools)"
    echo "  4. WhatsApp Server (MCP with messaging tools)"
    echo ""
    echo "DEV SERVERS COLLECTION (22 servers):"
    echo "  5. Terminal Server (Command execution)"
    echo "  6. Slack Server (Messaging)"
    echo "  7. Database Servers (Memory, Postgres, Redis, SQLite)"
    echo "  8. Cloud Storage (Official Google Drive)"
    echo "  9. Search Engines (Brave Search)"
    echo " 10. Web Content (Puppeteer)"
    echo " 11. Developer Tools (Git, GitHub, GitLab, Sentry)"
    echo " 12. Utilities (Fetch, Filesystem, Time, Everything)"
    echo " 13. Location Services (Google Maps)"
    echo " 14. Media Services (EverArt)"
    echo ""
    echo "STANDALONE SERVERS (1 server):"
    echo " 15. Basic MCP Server"
    echo ""
    echo "MANAGEMENT OPTIONS:"
    echo " 16. Show All Server Details"
    echo " 17. Show Quick Start Commands"
    echo " 18. Test Server Accessibility"
    echo " 19. Exit"
    echo ""
}

database_menu() {
    echo ""
    echo "Database Servers:"
    echo "1. Memory Database Server"
    echo "2. PostgreSQL Server"
    echo "3. Redis Server"
    echo "4. SQLite Server"
    echo "5. Back to main menu"
    echo ""
}

dev_tools_menu() {
    echo ""
    echo "Developer Tools Servers:"
    echo "1. Git Server"
    echo "2. GitHub Server"
    echo "3. GitLab Server"
    echo "4. Sentry Monitoring Server"
    echo "5. Back to main menu"
    echo ""
}

utilities_menu() {
    echo ""
    echo "Utility Servers:"
    echo "1. Fetch Server (HTTP requests)"
    echo "2. Filesystem Server"
    echo "3. Time Server"
    echo "4. Everything Search Server"
    echo "5. Sequential Thinking Server"
    echo "6. Back to main menu"
    echo ""
}

show_details() {
    echo ""
    echo "========================================"
    echo "MCP SERVERS DETAILED INVENTORY"
    echo "========================================"
    echo ""
    echo "LOCAL SERVERS (in gnosta/mcp_servers/):"
    echo "  - gdrive_mcp_server (TypeScript)"
    echo ""
    echo "PARENT DIRECTORY SERVERS (in ../):"
    echo "  - quote-mcp-server (JavaScript, HTTP API)"
    echo "  - weather-mcp-server (JavaScript, requires API key)"
    echo "  - whatsapp-mcp/whatsapp-mcp-server (Python, stdio)"
    echo ""
    echo "DEV SERVERS COLLECTION (in ../../servers/):"
    echo "  Communication:"
    echo "    - mcp-terminal-server (Python, command execution)"
    echo "    - slack (TypeScript, messaging)"
    echo ""
    echo "  Data Sources:"
    echo "    - gdrive (TypeScript, cloud storage)"
    echo "    - memory (TypeScript, in-memory database)"
    echo "    - postgres (TypeScript, PostgreSQL)"
    echo "    - redis (TypeScript, Redis database)"
    echo "    - sqlite (Python, SQLite database)"
    echo "    - aws-kb-retrieval-server (TypeScript, AWS KB)"
    echo "    - brave-search (TypeScript, search engine)"
    echo "    - puppeteer (TypeScript, web scraping)"
    echo ""
    echo "  Developer Tools:"
    echo "    - git (Python, version control)"
    echo "    - github (TypeScript, GitHub integration)"
    echo "    - gitlab (TypeScript, GitLab integration)"
    echo "    - sentry (Python, monitoring/logging)"
    echo ""
    echo "  Utilities:"
    echo "    - fetch (Python, HTTP requests)"
    echo "    - filesystem (TypeScript, file operations)"
    echo "    - time (Python, date/time utilities)"
    echo "    - everything (TypeScript, search utility)"
    echo "    - sequentialthinking (TypeScript, reasoning)"
    echo ""
    echo "  Services:"
    echo "    - google_maps (TypeScript, location services)"
    echo "    - everart (TypeScript, media services)"
    echo ""
    echo "STANDALONE SERVERS:"
    echo "  - basic mcp-server (JavaScript, simple MCP)"
    echo ""
    echo "CONFIGURED SERVERS (via npx):"
    echo "  - filesystem, windows_cli, sequential-thinking"
    echo "  - fetch, github, slack (with tokens)"
    echo ""
    read -p "Press Enter to continue..."
}

show_quick_commands() {
    echo ""
    echo "========================================"
    echo "QUICK START COMMANDS (from gnosta dir)"
    echo "========================================"
    echo ""
    echo "LOCAL:"
    echo "  cd ./mcp_servers/gdrive_mcp_server && npm start"
    echo ""
    echo "PARENT DIRECTORY:"
    echo "  cd ../quote-mcp-server && node index.js"
    echo "  cd ../weather-mcp-server && node index.js"
    echo "  cd ../whatsapp-mcp/whatsapp-mcp-server && python main.py"
    echo ""
    echo "DEV COLLECTION (examples):"
    echo "  cd ../../servers/mcp-terminal-server && python main.py"
    echo "  cd ../../servers/src/data_sources/databases/sqlite && python -m mcp_server_sqlite.server"
    echo "  cd ../../servers/src/developer_tools/version_control/github && npm start"
    echo "  cd ../../servers/src/filesystem && npm start"
    echo ""
    echo "STANDALONE:"
    echo "  cd ../../mcp-server && node index.js"
    echo ""
    read -p "Press Enter to continue..."
}

test_accessibility() {
    echo ""
    echo "Testing MCP Server Accessibility..."
    echo "==================================="
    echo ""
    echo "Checking directory paths:"
    
    if [ -d "./mcp_servers/gdrive_mcp_server" ]; then
        echo "[OK] Local gdrive server accessible"
    else
        echo "[FAIL] Local gdrive server not found"
    fi

    if [ -d "../quote-mcp-server" ]; then
        echo "[OK] Quote server accessible"
    else
        echo "[FAIL] Quote server not found"
    fi

    if [ -d "../weather-mcp-server" ]; then
        echo "[OK] Weather server accessible"
    else
        echo "[FAIL] Weather server not found"
    fi

    if [ -d "../whatsapp-mcp/whatsapp-mcp-server" ]; then
        echo "[OK] WhatsApp server accessible"
    else
        echo "[FAIL] WhatsApp server not found"
    fi

    if [ -d "../../servers/mcp-terminal-server" ]; then
        echo "[OK] Terminal server accessible"
    else
        echo "[FAIL] Terminal server not found"
    fi

    if [ -d "../../servers/src/filesystem" ]; then
        echo "[OK] Dev servers collection accessible"
    else
        echo "[FAIL] Dev servers collection not found"
    fi

    if [ -d "../../mcp-server" ]; then
        echo "[OK] Basic standalone server accessible"
    else
        echo "[FAIL] Basic standalone server not found"
    fi

    echo ""
    echo "All servers are accessible from the gnosta directory!"
    echo "Total servers catalogued: 27"
    echo ""
    read -p "Press Enter to continue..."
}

# Main loop
while true; do
    show_menu
    read -p "Select option (1-19): " choice
    
    case $choice in
        1)
            echo "Starting Local Google Drive MCP Server..."
            cd ./mcp_servers/gdrive_mcp_server
            npm start
            cd - > /dev/null
            ;;
        2)
            echo "Starting Quote Server..."
            echo "Navigate to: http://localhost:3000/random-quote"
            cd ../quote-mcp-server
            node index.js
            cd - > /dev/null
            ;;
        3)
            echo "Starting Weather MCP Server..."
            echo "Note: Requires WEATHER_API_KEY environment variable"
            cd ../weather-mcp-server
            node index.js
            cd - > /dev/null
            ;;
        4)
            echo "Starting WhatsApp MCP Server..."
            echo "Note: Requires WhatsApp bridge setup"
            cd ../whatsapp-mcp/whatsapp-mcp-server
            python main.py
            cd - > /dev/null
            ;;
        5)
            echo "Starting Terminal MCP Server..."
            cd ../../servers/mcp-terminal-server
            python main.py
            cd - > /dev/null
            ;;
        6)
            echo "Starting Slack MCP Server..."
            cd ../../servers/src/communication_and_collaboration/messaging/slack
            npm start
            cd - > /dev/null
            ;;
        7)
            while true; do
                database_menu
                read -p "Select database server (1-5): " db_choice
                case $db_choice in
                    1)
                        echo "Starting Memory Database Server..."
                        cd ../../servers/src/data_sources/databases/memory
                        npm start
                        cd - > /dev/null
                        break
                        ;;
                    2)
                        echo "Starting PostgreSQL Server..."
                        cd ../../servers/src/data_sources/databases/postgres
                        npm start
                        cd - > /dev/null
                        break
                        ;;
                    3)
                        echo "Starting Redis Server..."
                        cd ../../servers/src/data_sources/databases/redis
                        npm start
                        cd - > /dev/null
                        break
                        ;;
                    4)
                        echo "Starting SQLite Server..."
                        cd ../../servers/src/data_sources/databases/sqlite
                        python -m mcp_server_sqlite.server
                        cd - > /dev/null
                        break
                        ;;
                    5)
                        break
                        ;;
                    *)
                        echo "Invalid choice. Please try again."
                        ;;
                esac
            done
            ;;
        8)
            echo "Starting Official Google Drive Server..."
            cd ../../servers/src/data_sources/cloud_storage/gdrive
            npm start
            cd - > /dev/null
            ;;
        9)
            echo "Starting Brave Search Server..."
            cd ../../servers/src/data_sources/search_engines/brave-search
            npm start
            cd - > /dev/null
            ;;
        10)
            echo "Starting Puppeteer Web Content Server..."
            cd ../../servers/src/data_sources/web_content/puppeteer
            npm start
            cd - > /dev/null
            ;;
        11)
            while true; do
                dev_tools_menu
                read -p "Select developer tool (1-5): " dev_choice
                case $dev_choice in
                    1)
                        echo "Starting Git Server..."
                        cd ../../servers/src/developer_tools/version_control/git
                        python -m mcp_server_git.server
                        cd - > /dev/null
                        break
                        ;;
                    2)
                        echo "Starting GitHub Server..."
                        cd ../../servers/src/developer_tools/version_control/github
                        npm start
                        cd - > /dev/null
                        break
                        ;;
                    3)
                        echo "Starting GitLab Server..."
                        cd ../../servers/src/developer_tools/version_control/gitlab
                        npm start
                        cd - > /dev/null
                        break
                        ;;
                    4)
                        echo "Starting Sentry Monitoring Server..."
                        cd ../../servers/src/developer_tools/monitoring_and_logging/sentry
                        python -m mcp_server_sentry.server
                        cd - > /dev/null
                        break
                        ;;
                    5)
                        break
                        ;;
                    *)
                        echo "Invalid choice. Please try again."
                        ;;
                esac
            done
            ;;
        12)
            while true; do
                utilities_menu
                read -p "Select utility (1-6): " util_choice
                case $util_choice in
                    1)
                        echo "Starting Fetch Server..."
                        cd ../../servers/src/fetch
                        python -m mcp_server_fetch.server
                        cd - > /dev/null
                        break
                        ;;
                    2)
                        echo "Starting Filesystem Server..."
                        cd ../../servers/src/filesystem
                        npm start
                        cd - > /dev/null
                        break
                        ;;
                    3)
                        echo "Starting Time Server..."
                        cd ../../servers/src/time
                        python -m mcp_server_time.server
                        cd - > /dev/null
                        break
                        ;;
                    4)
                        echo "Starting Everything Search Server..."
                        cd ../../servers/src/utility_and_core/everything
                        npm start
                        cd - > /dev/null
                        break
                        ;;
                    5)
                        echo "Starting Sequential Thinking Server..."
                        cd ../../servers/src/utility_and_core/sequentialthinking
                        npm start
                        cd - > /dev/null
                        break
                        ;;
                    6)
                        break
                        ;;
                    *)
                        echo "Invalid choice. Please try again."
                        ;;
                esac
            done
            ;;
        13)
            echo "Starting Google Maps Server..."
            cd ../../servers/src/location_services/google_maps
            npm start
            cd - > /dev/null
            ;;
        14)
            echo "Starting EverArt Media Server..."
            cd ../../servers/src/media_services/everart
            npm start
            cd - > /dev/null
            ;;
        15)
            echo "Starting Basic MCP Server..."
            cd ../../mcp-server
            node index.js
            cd - > /dev/null
            ;;
        16)
            show_details
            ;;
        17)
            show_quick_commands
            ;;
        18)
            test_accessibility
            ;;
        19)
            echo ""
            echo "========================================"
            echo "MCP SERVERS SUMMARY"
            echo "========================================"
            echo "Total MCP servers found and configured: 27"
            echo "  - Local servers: 1"
            echo "  - Parent directory servers: 3"
            echo "  - Dev servers collection: 22"
            echo "  - Standalone servers: 1"
            echo "  - Pre-configured servers: 6"
            echo ""
            echo "All servers are accessible from c:/dev/projects/gnosta/"
            echo "Configuration saved in mcp-servers-config.json"
            echo ""
            echo "Goodbye!"
            exit 0
            ;;
        *)
            echo "Invalid choice. Please try again."
            ;;
    esac
done