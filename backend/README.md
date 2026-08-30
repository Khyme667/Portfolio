# Backend Portfolio — Tsitana Khyme

Backend Node.js + Express pour gérer le formulaire de contact avec envoi d'email via Nodemailer.

## 🚀 Installation

```bash
cd backend
npm install
```

## ⚙️ Configuration

1. **Créer le fichier `.env`** à partir de `.env.example` :
```bash
cp .env.example .env
```

2. **Configurer Gmail** :
   - Aller sur https://myaccount.google.com/apppasswords
   - Créer un **mot de passe d'application** pour "Autre (nom personnalisé)"
   - Copier le mot de passe généré (16 caractères)

3. **Éditer le fichier `.env`** :
```env
PORT=3000
EMAIL_USER=tsitanakhyme@gmail.com
EMAIL_PASS=votre_mot_de_passe_application_16_caracteres
RECIPIENT_EMAIL=tsitanakhyme@gmail.com
CORS_ORIGIN=http://localhost:5500,https://tsitanakhyme.com
NODE_ENV=development
```

## 🏃 Lancement

**Mode développement** (avec auto-reload) :
```bash
npm run dev
```

**Mode production** :
```bash
npm start
```

Le serveur démarre sur `http://localhost:3000`

## 📡 API Endpoints

### `GET /api/health`
Health check du serveur.

**Réponse** :
```json
{
  "success": true,
  "message": "Backend opérationnel",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### `POST /api/contact`
Envoi d'un message de contact.

**Body** (JSON) :
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Développement de module",
  "budget": "2000-5000€",
  "message": "Bonjour, je souhaite discuter d'un projet..."
}
```

**Réponse succès** :
```json
{
  "success": true,
  "message": "Message envoyé avec succès !",
  "messageId": "abc123..."
}
```

**Réponse erreur** :
```json
{
  "success": false,
  "error": "Données invalides",
  "details": ["Le nom est requis", "Email invalide"]
}
```

## 🔒 Sécurité

- **CORS** : Origines configurables via `CORS_ORIGIN`
- **Rate limiting** : Max 5 requêtes / 15 min par IP
- **Helmet** : Headers de sécurité HTTP
- **Validation** : Tous les champs sont validés et sanitisés
- **XSS Protection** : Échappement des entrées utilisateur

## 📦 Déploiement

### Option 1 : Serveur VPS / Cloud (Recommandé)
Déployer sur DigitalOcean, AWS, Heroku, Railway, Render, etc.

### Option 2 : Serverless
Adapter pour Vercel/Netlify Functions (nécessite modifications).

### Variables d'environnement en production
Ne pas oublier de configurer :
- `NODE_ENV=production`
- `CORS_ORIGIN=https://votredomaine.com`
- Les credentials Gmail

## 🧪 Test

**Test manuel avec curl** :
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Ceci est un message de test"
  }'
```

## 📝 Notes

- **Gmail** : Limite de 500 emails/jour pour compte gratuit
- **Alternative** : Utiliser SendGrid, Mailgun, AWS SES pour production
- **HTTPS** : Obligatoire en production pour sécuriser les données
