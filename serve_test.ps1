$port = 8080
$prefix = "http://localhost:$port/"
$baseDir = "C:\Users\91637\.gemini\antigravity\scratch\desi-zaika-ajmer"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
    $listener.Start()
    Write-Host "Server running at $prefix"
    Write-Host "Press Ctrl+C to stop"
    
    # Run test loop for 1 request or continuous if requested
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $localPath = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrEmpty($localPath)) { $localPath = "index.html" }
    $filePath = Join-Path $baseDir $localPath
    
    if (Test-Path $filePath) {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $bytes.Length
        if ($filePath.EndsWith(".html")) { $response.ContentType = "text/html; charset=utf-8" }
        elseif ($filePath.EndsWith(".css")) { $response.ContentType = "text/css" }
        elseif ($filePath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
        elseif ($filePath.EndsWith(".jpg") -or $filePath.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
        elseif ($filePath.EndsWith(".png")) { $response.ContentType = "image/png" }
        
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
        $response.StatusCode = 200
        Write-Host "Served: $localPath (200 OK)"
    } else {
        $response.StatusCode = 404
        Write-Host "Not found: $localPath (404)"
    }
    $response.Close()
} finally {
    $listener.Stop()
}
