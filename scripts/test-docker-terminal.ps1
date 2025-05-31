# Start Docker service
Write-Host "Starting Docker service..."
docker compose up -d mcp-terminal

# Wait for port 8201
Write-Host "Waiting for port 8201..."
$timeout = 30
$startTime = Get-Date

while ($timeout -gt 0) {
    try {
        $socket = New-Object Net.Sockets.TcpClient
        $socket.Connect("localhost", 8201)
        if ($socket.Connected) {
            $socket.Close()
            Write-Host "Port 8201 is open!"
            break
        }
    } catch {
        Start-Sleep -Seconds 1
    }
    $timeout -= 1
}

if ($timeout -le 0) {
    Write-Error "Timeout waiting for port 8201"
    exit 1
}

# Test WebSocket connection
Write-Host "Testing WebSocket connection..."
$ws = New-Object System.Net.WebSockets.ClientWebSocket
$cts = New-Object System.Threading.CancellationTokenSource
$uri = New-Object System.Uri("ws://localhost:8201")
$task = $ws.ConnectAsync($uri, $cts.Token)
$task.Wait(5000)

if ($ws.State -eq "Open") {
    Write-Host "WebSocket connection established!"
    $ws.Dispose()
    exit 0
} else {
    Write-Error "WebSocket connection failed!"
    exit 1
}