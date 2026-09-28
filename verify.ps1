$baseDir = "C:\Users\91637\.gemini\antigravity\scratch\desi-zaika-ajmer"
$html = Join-Path $baseDir "index.html"
$css = Join-Path $baseDir "styles.css"
$js = Join-Path $baseDir "app.js"

Write-Host "index.html: $(Test-Path $html) ($((Get-Item $html).Length) bytes)"
Write-Host "styles.css: $(Test-Path $css) ($((Get-Item $css).Length) bytes)"
Write-Host "app.js: $(Test-Path $js) ($((Get-Item $js).Length) bytes)"

$images = Get-ChildItem (Join-Path $baseDir "assets\images") -Filter "*.jpg"
Write-Host "Images count: $($images.Count)"
foreach ($img in $images) {
    Write-Host " - $($img.Name) ($($img.Length) bytes)"
}
