# MCP Servers Inventory for Gnosta Project

## Overview

This document provides a comprehensive inventory of all MCP (Model Context Protocol) servers found in the `c:\dev\` directory structure and their accessibility from the Gnosta project located at `c:\dev\projects\gnosta\`.

**Total Servers Found: 27**

## Server Categories

### 1. Local Servers (1 server)
Located within the Gnosta project directory:

| Server Name | Path | Type | Description |
|-------------|------|------|-------------|
| gdrive_mcp_server | `./mcp_servers/gdrive_mcp_server` | TypeScript | Google Drive MCP server with TypeScript implementation |

**Execution:** `cd ./mcp_servers/gdrive_mcp_server && npm start`

### 2. Parent Directory Servers (3 servers)
Located in the parent projects directory:

| Server Name | Path | Type | Description | Special Requirements |
|-------------|------|------|-------------|---------------------|
| quote_mcp_server | `../quote-mcp-server` | JavaScript | HTTP server providing random quotes API | Port 3000, endpoint `/random-quote` |
| weather_mcp_server | `../weather-mcp-server` | JavaScript | MCP server providing weather information tools | Requires `WEATHER_API_KEY` environment variable |
| whatsapp_mcp_server | `../whatsapp-mcp/whatsapp-mcp-server` | Python | Comprehensive WhatsApp MCP server with messaging capabilities | Requires WhatsApp bridge setup, stdio transport |

**Execution Examples:**
- Quote: `cd ../quote-mcp-server && node index.js`
- Weather: `cd ../weather-mcp-server && node index.js`
- WhatsApp: `cd ../whatsapp-mcp/whatsapp-mcp-server && python main.py`

### 3. Dev Servers Collection (22 servers)
Located in the comprehensive servers repository:

#### Communication & Collaboration
| Server Name | Path | Type | Description |
|-------------|------|------|-------------|
| mcp_terminal_server | `../../servers/mcp-terminal-server` | Python | Terminal command execution MCP server. Note: Runs as an HTTP server on `127.0.0.1:8000`. |
| slack_mcp_server | `../../servers/src/communication_and_collaboration/messaging/slack` | TypeScript | Slack messaging MCP server |

#### Data Sources

**Cloud Storage:**
| Server Name | Path | Type | Description |
|-------------|------|------|-------------|
| gdrive_server_official | `../../servers/src/data_sources/cloud_storage/gdrive` | TypeScript | Official Google Drive MCP server |

**Databases:**
| Server Name | Path | Type | Description |
|-------------|------|------|-------------|
| memory_database_server | `../../servers/src/data_sources/databases/memory` | TypeScript | In-memory database MCP server |
| postgres_server | `../../servers/src/data_sources/databases/postgres` | TypeScript | PostgreSQL database MCP server |
| redis_server | `../../servers/src/data_sources/databases/redis` | TypeScript | Redis database MCP server |
| sqlite_server | `../../servers/src/data_sources/databases/sqlite` | Python | SQLite database MCP server |

**Knowledge Bases:**
| Server Name | Path | Type | Description |
|-------------|------|------|-------------|
| aws_kb_retrieval_server | `../../servers/src/data_sources/knowledge_bases/aws-kb-retrieval-server` | TypeScript | AWS Knowledge Base retrieval MCP server |

**Search Engines:**
| Server Name | Path | Type | Description |
|-------------|------|------|-------------|
| brave_search_server | `../../servers/src/data_sources/search_engines/brave-search` | TypeScript | Brave Search engine MCP server |

**Web Content:**
| Server Name | Path | Type | Description |
|-------------|------|------|-------------|
| puppeteer_server | `../../servers/src/data_sources/web_content/puppeteer` | TypeScript | Puppeteer web scraping MCP server |

#### Developer Tools

**Monitoring & Logging:**
| Server Name | Path | Type | Description |
|-------------|------|------|-------------|
| sentry_server | `../../servers/src/developer_tools/monitoring_and_logging/sentry` | Python | Sentry monitoring and logging MCP server |

**Version Control:**
| Server Name | Path | Type | Description |
|-------------|------|------|-------------|
| git_server | `../../servers/src/developer_tools/version_control/git` | Python | Git version control MCP server |
| github_server_official | `../../servers/src/developer_tools/version_control/github` | TypeScript | Official GitHub MCP server |
| gitlab_server | `../../servers/src/developer_tools/version_control/gitlab` | TypeScript | GitLab MCP server |

#### Core Utilities
| Server Name | Path | Type | Description |
|-------------|------|------|-------------|
| fetch_server_official | `../../servers/src/fetch` | Python | Official HTTP fetch MCP server |
| filesystem_server_official | `../../servers/src/filesystem` | TypeScript | Official filesystem MCP server |
| time_server | `../../servers/src/time` | Python | Time and date utilities MCP server |
| everything_server | `../../servers/src/utility_and_core/everything` | TypeScript | Everything search utility MCP server |
| sequential_thinking_server | `../../servers/src/utility_and_core/sequentialthinking` | TypeScript | Sequential thinking MCP server |

#### Location Services
| Server Name | Path | Type | Description |
|-------------|------|------|-------------|
| google_maps_server | `../../servers/src/location_services/google_maps` | TypeScript | Google Maps location services MCP server |

#### Media Services
| Server Name | Path | Type | Description |
|-------------|------|------|-------------|
| everart_server | `../../servers/src/media_services/everart` | TypeScript | EverArt media services MCP server |

### 4. Standalone Servers (1 server)
| Server Name | Path | Type | Description |
|-------------|------|------|-------------|
| basic_mcp_server | `../../mcp-server` | JavaScript | Basic standalone MCP server |

**Execution:** `cd ../../mcp-server && node index.js`

### 5. Pre-configured Servers (6 servers)
These servers are configured to run via npx commands:

| Server Name | Command | Description |
|-------------|---------|-------------|
| filesystem | `mcp-server-filesystem "C:\\Dev\\projects"` | Filesystem access server for projects directory |
| windows_cli | `npx -y @modelcontextprotocol/server-windows-cli` | Windows CLI command execution server |
| sequential-thinking | `npx -y @modelcontextprotocol/server-sequential-thinking` | Sequential thinking and reasoning server |
| fetch | `npx -y @modelcontextprotocol/server-fetch` | HTTP fetch and web request server |
| github | `npx -y @modelcontextprotocol/server-github` | GitHub integration server |
| slack | `npx -y @modelcontextprotocol/server-slack` | Slack integration server with configured tokens |

## Accessibility Verification

All 27 MCP servers are accessible from the Gnosta project directory (`c:\dev\projects\gnosta\`) using relative paths. The accessibility has been verified and documented in the configuration files.

## Management Tools

### Configuration File
- **Location:** [`mcp-servers-config.json`](mcp-servers-config.json:1)
- **Purpose:** Complete inventory with execution instructions and server details

### Execution Scripts
- **Windows:** [`run-mcp-servers.bat`](run-mcp-servers.bat:1) - Interactive batch script for Windows
- **Unix/Linux:** [`run-mcp-servers.sh`](run-mcp-servers.sh:1) - Interactive shell script for Unix-like systems

### Features of Management Scripts:
- Interactive menu system
- Categorized server selection
- Quick start commands
- Server accessibility testing
- Detailed server information display

## Quick Start Examples

### From Gnosta Directory:

**Local Server:**
```bash
cd ./mcp_servers/gdrive_mcp_server && npm start
```

**Parent Directory Servers:**
```bash
cd ../quote-mcp-server && node index.js
cd ../weather-mcp-server && node index.js
cd ../whatsapp-mcp/whatsapp-mcp-server && python main.py
```

**Dev Collection Examples:**
```bash
cd ../../servers/mcp-terminal-server && python main.py
cd ../../servers/src/data_sources/databases/sqlite && python -m mcp_server_sqlite.server
cd ../../servers/src/developer_tools/version_control/github && npm start
cd ../../servers/src/filesystem && npm start
```

**Standalone:**
```bash
cd ../../mcp-server && node index.js
```

## Requirements & Dependencies

### Python Servers
- Require Python environment
- Use module execution format: `python -m module_name.server`
- May require additional dependencies via pip/uv

### TypeScript/JavaScript Servers
- Require Node.js and npm
- Need `npm install` before first run
- Use `npm start` or `node index.js`

### Environment Variables
- **Weather Server:** Requires `WEATHER_API_KEY`
- **Cloud Storage:** May require API credentials
- **Version Control:** May require authentication tokens
- **Slack:** Requires bot tokens and signing secrets

## Directory Structure Summary

```
c:\dev\
├── mcp-server\                          # Basic standalone server
├── servers\                             # Comprehensive MCP servers collection
│   ├── mcp-terminal-server\            # Terminal execution
│   ├── n8n-mcp-server\                 # n8n workflow automation
│   └── src\
│       ├── communication_and_collaboration\
│       ├── data_sources\
│       ├── developer_tools\
│       ├── fetch\
│       ├── filesystem\
│       ├── location_services\
│       ├── media_services\
│       ├── time\
│       └── utility_and_core\
└── projects\
    ├── gnosta\                          # Main project directory
    │   └── mcp_servers\
    │       └── gdrive_mcp_server\       # Local Google Drive server
    ├── quote-mcp-server\                # Quote API server
    ├── weather-mcp-server\              # Weather tools server
    └── whatsapp-mcp\
        └── whatsapp-mcp-server\         # WhatsApp messaging server
```

## Conclusion

All 27 MCP servers found in the `c:\dev\` directory structure are now properly catalogued and accessible from the Gnosta project. The comprehensive configuration and management tools provide easy access to all servers with proper execution instructions and requirements documentation.