# Gnosta Project

## Running MCP Servers in Docker

### Prerequisites
- Docker Desktop installed
- File sharing enabled for `C:\Dev\projects\gnosta` in Docker Desktop settings

### Startup Command
```powershell
# Start the MCP terminal service
docker compose up -d mcp-terminal
```

### Sample Roo Command
```roo
run DockerTerminal → ls -la
```

This will execute the `ls -la` command in the Docker container's `/workspace/gnosta` directory, showing the same files as your local `C:\Dev\projects\gnosta` directory.

### Verification
Run the test script to verify the service:
```powershell
.\scripts\test-docker-terminal.ps1