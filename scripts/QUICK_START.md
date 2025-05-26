# Quick Start Guide - MCP Servers

## Start All Servers at Once

### Windows Users:

**Option 1: Batch Script (Simple)**
```cmd
start-all-mcp-servers.bat
```

**Option 2: PowerShell Script (Advanced)**
```powershell
# Start all servers
.\start-all-mcp-servers.ps1

# Check server status
.\start-all-mcp-servers.ps1 -CheckStatus

# Stop all servers
.\start-all-mcp-servers.ps1 -StopAll

# Show help
.\start-all-mcp-servers.ps1 -ShowHelp
```

### Unix/Linux/Mac Users:

```bash
# Make executable
chmod +x start-all-mcp-servers.sh

# Start all servers
./start-all-mcp-servers.sh
```

## What Gets Started

The scripts will start all **27 MCP servers**:

### HTTP Endpoints Available:
- **Quote Server**: `http://localhost:3000/random-quote`
- **Additional ports**: Check 3282, 5040, 8080 for other services

### Server Categories:
1. **Local Servers** (1): Google Drive MCP
2. **Parent Directory Servers** (3): Quote, Weather, WhatsApp
3. **Dev Servers Collection** (22): Communication, Data Sources, Developer Tools, Utilities
4. **Standalone Servers** (1): Basic MCP Server
5. **Pre-configured Servers** (6): Available via npx commands

## Individual Server Management

Use the interactive menu scripts for individual server control:
- **Windows**: `run-mcp-servers.bat`
- **Unix/Linux**: `run-mcp-servers.sh`

## Server Status Checking

After starting servers, check what's running:

### Windows:
```powershell
# Check active ports
Get-NetTCPConnection -State Listen | Where-Object {$_.LocalPort -ge 3000 -and $_.LocalPort -le 9000} | Select-Object LocalPort | Sort-Object LocalPort

# Test HTTP endpoints
curl http://localhost:3000/random-quote
curl http://localhost:3282
```

### Unix/Linux:
```bash
# Check active ports
netstat -tuln | grep -E ':(300[0-9]|[4-9][0-9][0-9][0-9])' | sort

# Test HTTP endpoints
curl http://localhost:3000/random-quote
curl http://localhost:3282
```

## Important Notes

- **Most MCP servers use stdio transport** and don't provide HTTP interfaces
- **Only some servers** (like Quote Server) provide web APIs
- **Each server runs in its own window** for easy monitoring
- **Check individual server windows** for logs and status
- **Some servers require environment variables** (API keys, tokens)

## Troubleshooting

### If servers don't start:
1. Check if paths exist
2. Ensure Node.js and Python are installed
3. Run `npm install` in TypeScript server directories
4. Check for missing environment variables

### If ports are already in use:
1. Stop existing processes
2. Use the stop scripts to clean up
3. Check for conflicting applications

### For permission issues:
1. Run as administrator (Windows)
2. Check file permissions (Unix/Linux)
3. Ensure execution policy allows scripts (PowerShell)

## Configuration Files

- **Complete inventory**: [`mcp-servers-config.json`](mcp-servers-config.json)
- **Detailed documentation**: [`MCP_SERVERS_INVENTORY.md`](MCP_SERVERS_INVENTORY.md)
- **Interactive management**: [`run-mcp-servers.bat`](run-mcp-servers.bat) / [`run-mcp-servers.sh`](run-mcp-servers.sh)