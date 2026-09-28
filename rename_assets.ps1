$base = "C:\Users\91637\.gemini\antigravity\scratch\desi-zaika-ajmer\assets\images"
Copy-Item (Join-Path $base "0sskyw2hejhr4yb-hqmqnuc1yv.jpg") (Join-Path $base "hero-entrance.jpg") -Force
Copy-Item (Join-Path $base "kjm5ga138vflarp-ft5hxaxfm0.jpg") (Join-Path $base "restaurant-front.jpg") -Force
Copy-Item (Join-Path $base "k4tjlb1x1hnlehg-qvknnjdd5c.jpg") (Join-Path $base "mural-camels.jpg") -Force
Copy-Item (Join-Path $base "pak5svvuycm8s0y-u0zlez8www.jpg") (Join-Path $base "mural-fair.jpg") -Force
Copy-Item (Join-Path $base "dhmx83k50zhb0o8-51ni0urdju.jpg") (Join-Path $base "restaurant-exit.jpg") -Force
Copy-Item (Join-Path $base "8iam8096ptgy72d-7f8jfx9pkk.jpg") (Join-Path $base "menu-card-main.jpg") -Force
Copy-Item (Join-Path $base "ptpnb3ubqu1ogkg-cklnl00bvj.jpg") (Join-Path $base "menu-card-breads.jpg") -Force
Get-ChildItem $base | Select-Object Name, Length
