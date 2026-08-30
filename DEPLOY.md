# 🚀 Guide de déploiement - Portfolio Tsitana Khyme

## 📋 Prérequis

- Compte GitHub
- Compte Netlify (gratuit)
- Token d'accès GitHub (pour le push initial)

## 🔐 Étape 1 : Push vers GitHub

### Créer un token GitHub

1. Allez sur : https://github.com/settings/tokens/new
2. Cochez : `repo` (accès complet aux repositories)
3. Générez et copiez le token

### Push avec le token

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/Khyme667/Portfolio.git
git push -u origin main
```

**⚠️ Important :** Ne commitez jamais votre token. Utilisez-le uniquement pour cette commande.

## 🌐 Étape 2 : Déployer sur Netlify

### Via l'interface web Netlify

1. Allez sur : https://app.netlify.com
2. Cliquez sur **"Add new site"** → **"Import an existing project"**
3. Connectez votre compte GitHub
4. Sélectionnez le repository : `Khyme667/Portfolio`
5. Configuration du build :
   - **Build command :** `npm install --prefix netlify/functions`
   - **Publish directory :** `.` (racine)
   - **Functions directory :** `netlify/functions`

### Variables d'environnement

Dans **Site settings** → **Environment variables**, ajoutez :

```
EMAIL_USER=tsitanakhyme@gmail.com
EMAIL_PASS=hthm hhuy bzfv eihc
RECIPIENT_EMAIL=tsitanakhyme@gmail.com
NODE_ENV=production
```

6. Cliquez sur **"Deploy site"**

## ✅ Étape 3 : Vérification

Une fois déployé :

1. Netlify vous donne une URL : `https://random-name-123456.netlify.app`
2. Testez le formulaire de contact
3. Vérifiez que vous recevez bien les emails

## 🎨 Étape 4 : Domaine personnalisé (optionnel)

1. Dans Netlify : **Domain settings** → **Add custom domain**
2. Suivez les instructions pour configurer votre DNS

## 🔄 Déploiement automatique

Chaque push sur `main` déclenchera automatiquement un nouveau déploiement.

```bash
git add .
git commit -m "Your changes"
git push origin main
```

## 🐛 Troubleshooting

### Le formulaire ne fonctionne pas en production

- Vérifiez les variables d'environnement dans Netlify
- Consultez les logs : **Netlify Dashboard** → **Functions** → **contact**
- Vérifiez la console du navigateur (F12)

### Erreur CORS

- Vérifiez que `netlify.toml` est bien dans la racine
- La fonction `contact.js` a déjà les headers CORS configurés

### Email non reçu

- Vérifiez que `EMAIL_PASS` est bien un **mot de passe d'application Gmail**
- Créez-en un sur : https://myaccount.google.com/apppasswords

---

**🎉 Votre portfolio est maintenant en ligne !**

Site déployé : https://github.com/Khyme667/Portfolio

Besoin d'aide ? Contact : tsitanakhyme@gmail.com
