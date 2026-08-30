@echo off
echo.
echo ╔════════════════════════════════════════════════════╗
echo ║          🚀 Lancement du Portfolio                ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo 📦 Démarrage du serveur local sur http://localhost:5500
echo.

REM Vérifier si Python est installé
python --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ Utilisation de Python HTTP Server
    echo.
    echo 🌐 Ouvrir dans le navigateur : http://localhost:5500
    echo.
    echo ⚠️  Pour arrêter : Appuyer sur Ctrl+C
    echo.
    cd /d "%~dp0"
    python -m http.server 5500
) else (
    echo ❌ Python n'est pas installé
    echo.
    echo 💡 Alternatives :
    echo    1. Installer Python : https://python.org
    echo    2. Utiliser VS Code Live Server
    echo    3. Installer http-server : npm install -g http-server
    echo.
    pause
)
