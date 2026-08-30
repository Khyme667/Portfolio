@echo off
REM ═══════════════════════════════════════════════════
REM Script d'installation automatique (Windows)
REM Portfolio Tsitana Khyme
REM ═══════════════════════════════════════════════════

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║   🟣 Installation Portfolio Tsitana Khyme          ║
echo ╚════════════════════════════════════════════════════╝
echo.

REM Vérifier Node.js
echo 📦 Vérification des prérequis...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js n'est pas installé
    echo    Télécharger sur https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js détecté : %NODE_VERSION%

REM Vérifier npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm n'est pas installé
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✅ npm détecté : %NPM_VERSION%
echo.

REM Installer les dépendances backend
echo 📦 Installation des dépendances backend...
cd backend

if not exist package.json (
    echo ❌ package.json introuvable
    pause
    exit /b 1
)

call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erreur lors de l'installation
    pause
    exit /b 1
)

echo ✅ Dépendances installées
echo.

REM Créer .env si n'existe pas
if not exist .env (
    echo ⚠️  Fichier .env manquant
    echo 📝 Création du fichier .env...
    echo.

    set /p EMAIL_USER="Email Gmail (tsitanakhyme@gmail.com) : "
    if "%EMAIL_USER%"=="" set EMAIL_USER=tsitanakhyme@gmail.com

    echo.
    echo 🔑 Configuration Gmail requise :
    echo    1. Aller sur https://myaccount.google.com/apppasswords
    echo    2. Se connecter avec %EMAIL_USER%
    echo    3. Créer un mot de passe pour 'Portfolio Backend'
    echo    4. Copier le mot de passe 16 caractères
    echo.

    set /p EMAIL_PASS="Mot de passe d'application Gmail : "

    (
        echo # Configuration Backend - Portfolio Tsitana Khyme
        echo PORT=3000
        echo EMAIL_USER=%EMAIL_USER%
        echo EMAIL_PASS=%EMAIL_PASS%
        echo RECIPIENT_EMAIL=%EMAIL_USER%
        echo CORS_ORIGIN=http://localhost:5500
        echo NODE_ENV=development
    ) > .env

    echo ✅ Fichier .env créé
) else (
    echo ✅ Fichier .env existe déjà
)

cd ..
echo.

REM Résumé
echo ╔════════════════════════════════════════════════════╗
echo ║              ✅ Installation terminée !            ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo 🚀 Prochaines étapes :
echo.
echo 1. Lancer le backend :
echo    cd backend ^&^& npm run dev
echo.
echo 2. Dans un autre terminal, lancer le frontend :
echo    python -m http.server 5500
echo    ou ouvrir directement index.html
echo.
echo 3. Ouvrir dans le navigateur :
echo    http://localhost:5500
echo.
echo 4. Tester le formulaire de contact (section Contact)
echo.
echo 📚 Documentation complète : README.md
echo 🚀 Guide rapide : QUICKSTART.md
echo.
pause
