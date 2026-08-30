#!/bin/bash

# ═══════════════════════════════════════════════════
# Script d'installation automatique
# Portfolio Tsitana Khyme
# ═══════════════════════════════════════════════════

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║   🟣 Installation Portfolio Tsitana Khyme          ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Vérifier Node.js
echo -e "${BLUE}📦 Vérification des prérequis...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    echo "   Télécharger sur https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js détecté : $NODE_VERSION${NC}"

# Vérifier npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm détecté : $NPM_VERSION${NC}"
echo ""

# Installer les dépendances backend
echo -e "${BLUE}📦 Installation des dépendances backend...${NC}"
cd backend

if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json introuvable${NC}"
    exit 1
fi

npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erreur lors de l'installation${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Dépendances installées${NC}"
echo ""

# Créer .env si n'existe pas
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  Fichier .env manquant${NC}"
    echo -e "${BLUE}📝 Création du fichier .env...${NC}"

    read -p "Email Gmail (tsitanakhyme@gmail.com) : " EMAIL_USER
    EMAIL_USER=${EMAIL_USER:-tsitanakhyme@gmail.com}

    echo ""
    echo -e "${PURPLE}🔑 Configuration Gmail requise :${NC}"
    echo "   1. Aller sur https://myaccount.google.com/apppasswords"
    echo "   2. Se connecter avec $EMAIL_USER"
    echo "   3. Créer un mot de passe pour 'Portfolio Backend'"
    echo "   4. Copier le mot de passe 16 caractères"
    echo ""

    read -p "Mot de passe d'application Gmail (16 caractères) : " EMAIL_PASS

    cat > .env << EOF
# Configuration Backend - Portfolio Tsitana Khyme
PORT=3000
EMAIL_USER=$EMAIL_USER
EMAIL_PASS=$EMAIL_PASS
RECIPIENT_EMAIL=$EMAIL_USER
CORS_ORIGIN=http://localhost:5500
NODE_ENV=development
EOF

    echo -e "${GREEN}✅ Fichier .env créé${NC}"
else
    echo -e "${GREEN}✅ Fichier .env existe déjà${NC}"
fi

cd ..
echo ""

# Résumé
echo "╔════════════════════════════════════════════════════╗"
echo "║              ✅ Installation terminée !            ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""
echo -e "${PURPLE}🚀 Prochaines étapes :${NC}"
echo ""
echo "1. Lancer le backend :"
echo -e "   ${BLUE}cd backend && npm run dev${NC}"
echo ""
echo "2. Dans un autre terminal, lancer le frontend :"
echo -e "   ${BLUE}python -m http.server 5500${NC}"
echo "   ou ouvrir directement index.html"
echo ""
echo "3. Ouvrir dans le navigateur :"
echo -e "   ${BLUE}http://localhost:5500${NC}"
echo ""
echo "4. Tester le formulaire de contact (section Contact)"
echo ""
echo -e "${YELLOW}📚 Documentation complète : README.md${NC}"
echo -e "${YELLOW}🚀 Guide rapide : QUICKSTART.md${NC}"
echo ""
