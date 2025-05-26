# PowerShell script to start all MCP servers
param(
    [switch]$StopAll,
    [switch]$CheckStatus,
    [switch]$ShowHelp
)

if ($ShowHelp) {
    Write-Host @"
MCP Servers Management Script
=============================

Usage:
  .\start-all-mcp-servers.ps1          # Start all servers
  .\start-all-mcp-servers.ps1 -StopAll # Stop all servers
  .\start-all-mcp-servers.ps1 -CheckStatus # Check server status

This script manages 27 MCP servers across the c:\dev\ directory structure.
"@
    exit
}

# Function to stop all MCP servers
function Stop-AllMCPServers {
    Write-Host "Stopping all MCP servers..." -ForegroundColor Yellow
    
    # Get all processes that might be MCP servers
    $processes = Get-Process | Where-Object { 
        $_.ProcessName -eq "node" -or 
        $_.ProcessName -eq "python" -or 
        $_.ProcessName -eq "npm" 
    }
    
    foreach ($process in $processes) {
        try {
            $commandLine = (Get-WmiObject Win32_Process -Filter "ProcessId = $($process.Id)").CommandLine
            if ($commandLine -and ($commandLine -like "*mcp*" -or $commandLine -like "*index.js*" -or $commandLine -like "*main.py*")) {
                Write-Host "Stopping process: $($process.ProcessName) (PID: $($process.Id))" -ForegroundColor Red
                Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
            }
        }
        catch {
            # Ignore errors for processes we can't access
        }
    }
    
    Write-Host "All MCP servers stopped." -ForegroundColor Green
}

# Function to check server status
function Check-ServerStatus {
    Write-Host "Checking MCP Server Status..." -ForegroundColor Cyan
    Write-Host "=============================" -ForegroundColor Cyan
    
    # Check active ports
    Write-Host "`nActive ports (3000-9000):" -ForegroundColor Yellow
    Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue | 
        Where-Object {$_.LocalPort -ge 3000 -and $_.LocalPort -le 9000} | 
        Select-Object LocalPort | 
        Sort-Object LocalPort | 
        Format-Table -AutoSize
    
    # Test known HTTP endpoints
    Write-Host "Testing HTTP endpoints:" -ForegroundColor Yellow
    
    $endpoints = @(
        @{Port=3000; Path="/random-quote"; Name="Quote Server"},
        @{Port=3282; Path=""; Name="Unknown Server"},
        @{Port=5040; Path=""; Name="Port 5040"},
        @{Port=8080; Path=""; Name="Port 8080"}
    )
    
    foreach ($endpoint in $endpoints) {
        $url = "http://localhost:$($endpoint.Port)$($endpoint.Path)"
        try {
            $response = Invoke-WebRequest -Uri $url -TimeoutSec 3 -ErrorAction Stop
            Write-Host "✅ $($endpoint.Name): $url (Status: $($response.StatusCode))" -ForegroundColor Green
        }
        catch {
            Write-Host "❌ $($endpoint.Name): $url (Not responding)" -ForegroundColor Red
        }
    }
}

if ($StopAll) {
    Stop-AllMCPServers
    exit
}

if ($CheckStatus) {
    Check-ServerStatus
    exit
}

# Main script - Start all servers
Write-Host "Starting All MCP Servers..." -ForegroundColor Green
Write-Host "============================" -ForegroundColor Green
Write-Host ""

# Navigate to gnosta directory
$gnostaPath = "c:\dev\projects\gnosta"
if (-not (Test-Path $gnostaPath)) {
    Write-Error "Gnosta directory not found: $gnostaPath"
    exit 1
}

Set-Location $gnostaPath
Write-Host "Working directory: $(Get-Location)" -ForegroundColor Cyan
Write-Host ""

# Array of server configurations
$servers = @(
    @{Name="Quote Server"; Path="..\quote-mcp-server"; Command="node index.js"; Port=3000},
    @{Name="Weather Server"; Path="..\weather-mcp-server"; Command="node index.js"; Port=3001},
    @{Name="WhatsApp Server"; Path="..\whatsapp-mcp\whatsapp-mcp-server"; Command="python main.py"; Port="stdio"},
    @{Name="Local Google Drive Server"; Path=".\mcp_servers\gdrive_mcp_server"; Command="npm start"; Port="auto"},
    @{Name="Terminal Server"; Path="..\..\servers\mcp-terminal-server"; Command="python main.py"; Port="stdio"},
    @{Name="Slack Server"; Path="..\..\servers\src\communication_and_collaboration\messaging\slack"; Command="npm start"; Port="auto"},
    @{Name="Official Google Drive Server"; Path="..\..\servers\src\data_sources\cloud_storage\gdrive"; Command="npm start"; Port="auto"},
    @{Name="Memory Database Server"; Path="..\..\servers\src\data_sources\databases\memory"; Command="npm start"; Port="auto"},
    @{Name="PostgreSQL Server"; Path="..\..\servers\src\data_sources\databases\postgres"; Command="npm start"; Port="auto"},
    @{Name="Redis Server"; Path="..\..\servers\src\data_sources\databases\redis"; Command="npm start"; Port="auto"},
    @{Name="SQLite Server"; Path="..\..\servers\src\data_sources\databases\sqlite"; Command="python -m mcp_server_sqlite.server"; Port="stdio"},
    @{Name="AWS KB Retrieval Server"; Path="..\..\servers\src\data_sources\knowledge_bases\aws-kb-retrieval-server"; Command="npm start"; Port="auto"},
    @{Name="Brave Search Server"; Path="..\..\servers\src\data_sources\search_engines\brave-search"; Command="npm start"; Port="auto"},
    @{Name="Puppeteer Server"; Path="..\..\servers\src\data_sources\web_content\puppeteer"; Command="npm start"; Port="auto"},
    @{Name="Sentry Server"; Path="..\..\servers\src\developer_tools\monitoring_and_logging\sentry"; Command="python -m mcp_server_sentry.server"; Port="stdio"},
    @{Name="Git Server"; Path="..\..\servers\src\developer_tools\version_control\git"; Command="python -m mcp_server_git.server"; Port="stdio"},
    @{Name="GitHub Server"; Path="..\..\servers\src\developer_tools\version_control\github"; Command="npm start"; Port="auto"},
    @{Name="GitLab Server"; Path="..\..\servers\src\developer_tools\version_control\gitlab"; Command="npm start"; Port="auto"},
    @{Name="Fetch Server"; Path="..\..\servers\src\fetch"; Command="python -m mcp_server_fetch.server"; Port="stdio"},
    @{Name="Filesystem Server"; Path="..\..\servers\src\filesystem"; Command="npm start"; Port="auto"},
    @{Name="Google Maps Server"; Path="..\..\servers\src\location_services\google_maps"; Command="npm start"; Port="auto"},
    @{Name="EverArt Server"; Path="..\..\servers\src\media_services\everart"; Command="npm start"; Port="auto"},
    @{Name="Time Server"; Path="..\..\servers\src\time"; Command="python -m mcp_server_time.server"; Port="stdio"},
    @{Name="Everything Server"; Path="..\..\servers\src\utility_and_core\everything"; Command="npm start"; Port="auto"},
    @{Name="Sequential Thinking Server"; Path="..\..\servers\src\utility_and_core\sequentialthinking"; Command="npm start"; Port="auto"},
    @{Name="Basic MCP Server"; Path="..\..\mcp-server"; Command="node index.js"; Port="auto"},
    @{Name="n8n MCP Server"; Path="..\..\servers\n8n-mcp-server"; Command="echo 'Requires manual setup'"; Port="manual"}
)

$successCount = 0
$totalServers = $servers.Count

for ($i = 0; $i -lt $totalServers; $i++) {
    $server = $servers[$i]
    $progress = $i + 1
    
    Write-Host "[$progress/$totalServers] Starting $($server.Name)..." -ForegroundColor Yellow
    
    if (Test-Path $server.Path) {
        try {
            $processName = "$($server.Name.Replace(' ', '-'))-MCP"
            Start-Process -FilePath "cmd" -ArgumentList "/c", "cd /d `"$($server.Path)`" && title $processName && $($server.Command)" -WindowStyle Minimized
            $successCount++
            Write-Host "  ✅ Started successfully" -ForegroundColor Green
        }
        catch {
            Write-Host "  ❌ Failed to start: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    else {
        Write-Host "  ❌ Path not found: $($server.Path)" -ForegroundColor Red
    }
    
    Start-Sleep -Milliseconds 1500
}

Write-Host ""
Write-Host "============================" -ForegroundColor Green
Write-Host "Startup Summary" -ForegroundColor Green
Write-Host "============================" -ForegroundColor Green
Write-Host "Successfully started: $successCount/$totalServers servers" -ForegroundColor Cyan
Write-Host ""

Write-Host "Waiting 10 seconds for servers to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Check status after startup
Check-ServerStatus

Write-Host ""
Write-Host "============================" -ForegroundColor Green
Write-Host "All MCP Servers Started!" -ForegroundColor Green
Write-Host "============================" -ForegroundColor Green
Write-Host ""
Write-Host "Management Commands:" -ForegroundColor Cyan
Write-Host "  Check Status: .\start-all-mcp-servers.ps1 -CheckStatus" -ForegroundColor White
Write-Host "  Stop All:     .\start-all-mcp-servers.ps1 -StopAll" -ForegroundColor White
Write-Host "  Help:         .\start-all-mcp-servers.ps1 -ShowHelp" -ForegroundColor White
Write-Host ""
Write-Host "Note: Most MCP servers use stdio transport and don't provide HTTP interfaces." -ForegroundColor Yellow
Write-Host "Check the individual server windows for logs and status information." -ForegroundColor Yellow