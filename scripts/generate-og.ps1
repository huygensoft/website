param(
  [string]$OutputPath = "$PSScriptRoot\..\static\og-huygensoft.png"
)

Add-Type -AssemblyName System.Drawing

function New-RoundedPath([float]$x, [float]$y, [float]$width, [float]$height, [float]$radius) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $diameter = $radius * 2
  $path.AddArc($x, $y, $diameter, $diameter, 180, 90)
  $path.AddArc($x + $width - $diameter, $y, $diameter, $diameter, 270, 90)
  $path.AddArc($x + $width - $diameter, $y + $height - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($x, $y + $height - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  return $path
}

$directory = Split-Path -Parent $OutputPath
New-Item -ItemType Directory -Force -Path $directory | Out-Null

$bitmap = [System.Drawing.Bitmap]::new(1200, 630, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$background = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 247, 248, 252))
$graphics.FillRectangle($background, 0, 0, 1200, 630)

$graphics.FillEllipse([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(92, 124, 112, 255)), 760, -120, 450, 450)
$graphics.FillEllipse([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(78, 41, 206, 187)), 690, 310, 450, 400)
$graphics.FillEllipse([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(62, 119, 217, 255)), 10, 430, 380, 260)

$surfacePath = New-RoundedPath 58 48 1084 534 42
$surfaceBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(185, 255, 255, 255))
$surfacePen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(220, 255, 255, 255), 2)
$graphics.FillPath($surfaceBrush, $surfacePath)
$graphics.DrawPath($surfacePen, $surfacePath)

$markPath = New-RoundedPath 96 89 75 75 22
$markBrush = [System.Drawing.Drawing2D.LinearGradientBrush]::new([System.Drawing.Rectangle]::new(96, 89, 75, 75), [System.Drawing.Color]::FromArgb(255, 94, 87, 232), [System.Drawing.Color]::FromArgb(255, 43, 214, 196), 45)
$graphics.FillPath($markBrush, $markPath)
$markFont = [System.Drawing.Font]::new('Arial', 30, [System.Drawing.FontStyle]::Bold)
$graphics.DrawString('H', $markFont, [System.Drawing.Brushes]::White, 116, 105)

$titleFont = [System.Drawing.Font]::new('Arial', 72, [System.Drawing.FontStyle]::Bold)
$subtitleFont = [System.Drawing.Font]::new('Arial', 31, [System.Drawing.FontStyle]::Regular)
$detailFont = [System.Drawing.Font]::new('Arial', 23, [System.Drawing.FontStyle]::Regular)
$inkBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 21, 24, 47))
$mutedBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 78, 84, 116))
$graphics.DrawString('Huygensoft', $titleFont, $inkBrush, 96, 234)
$graphics.DrawString('Software made simple.', $subtitleFont, $mutedBrush, 100, 330)
$graphics.DrawString('Development  |  Integration  |  IT Consultancy', $detailFont, $mutedBrush, 102, 389)

$panelPath = New-RoundedPath 766 178 270 270 38
$panelBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(173, 255, 255, 255))
$panelPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(225, 255, 255, 255), 3)
$graphics.FillPath($panelBrush, $panelPath)
$graphics.DrawPath($panelPen, $panelPath)
$graphics.FillEllipse([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(55, 91, 88, 231)), 814, 224, 172, 172)

$graphPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(255, 91, 88, 231), 7)
$graphPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$graphPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$points = [System.Drawing.Point[]]@([System.Drawing.Point]::new(810, 354), [System.Drawing.Point]::new(858, 318), [System.Drawing.Point]::new(910, 342), [System.Drawing.Point]::new(979, 260))
$graphics.DrawLines($graphPen, $points)
foreach ($point in $points) { $graphics.FillEllipse([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 43, 214, 196)), $point.X - 11, $point.Y - 11, 22, 22) }

$bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$graphPen.Dispose()
$panelPen.Dispose()
$panelBrush.Dispose()
$detailFont.Dispose()
$subtitleFont.Dispose()
$titleFont.Dispose()
$inkBrush.Dispose()
$mutedBrush.Dispose()
$markFont.Dispose()
$markBrush.Dispose()
$surfacePen.Dispose()
$surfaceBrush.Dispose()
$background.Dispose()
$graphics.Dispose()
$bitmap.Dispose()
