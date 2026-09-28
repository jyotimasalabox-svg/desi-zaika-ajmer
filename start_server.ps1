param(
    [int]$Port = 5500
)

$prefix = "http://localhost:$Port/"
$baseDir = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host " देसी जायका (Desi Zaika) वेबसाइट लोकल सर्वर चालू है!" -ForegroundColor Yellow
    Write-Host " URL: $prefix" -ForegroundColor Cyan
    Write-Host " फोल्डर: $baseDir" -ForegroundColor White
    Write-Host " बंद करने के लिए Ctrl+C दबाएं" -ForegroundColor Gray
    Write-Host "==========================================================" -ForegroundColor Green

    # Try to open default browser
    Start-Process $prefix

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($urlPath)) {
            $urlPath = "index.html"
        }
        $urlPath = [System.Uri]::UnescapeDataString($urlPath)
        $filePath = Join-Path $baseDir $urlPath

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length

            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($ext) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                ".js"   { $response.ContentType = "application/javascript; charset=utf-8" }
                ".jpg"  { $response.ContentType = "image/jpeg" }
                ".jpeg" { $response.ContentType = "image/jpeg" }
                ".png"  { $response.ContentType = "image/png" }
                ".svg"  { $response.ContentType = "image/svg+xml" }
                ".ico"  { $response.ContentType = "image/x-icon" }
                default { $response.ContentType = "application/octet-stream" }
            }

            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "[$((Get-Date).ToString('HH:mm:ss'))] 200 OK: $urlPath" -ForegroundColor DarkGray
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            Write-Host "[$((Get-Date).ToString('HH:mm:ss'))] 404 Not Found: $urlPath" -ForegroundColor Red
        }

        $response.Close()
    }
} catch {
    Write-Host "Server stopped or error: $_" -ForegroundColor Red
} finally {
    if ($listener -ne $null -and $listener.IsListening) {
        $listener.Stop()
    }
}
