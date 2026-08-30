# 🚀 Guide de Démarrage Rapide

**Portfolio Tsitana Khyme — En 5 minutes**

## Étape 1 : Installer le backend

```bash
cd F:\prj\portfolio-khyme\backend
npm install
```

## Étape 2 : Configurer Gmail

1. **Créer un mot de passe d'application Gmail** :
   - Aller sur https://myaccount.google.com/apppasswords
   - Se connecter avec tsitanakhyme@gmail.com
   - Sélectionner "Autre (nom personnalisé)" → taper "Portfolio Backend"
   - Cliquer sur "Générer"
   - **Copier** le mot de passe 16 caractères (ex: `abcd efgh ijkl mnop`)

2. **Créer le fichier `.env`** dans `backend/` :
```env
PORT=3000
EMAIL_USER=tsitanakhyme@gmail.com
EMAIL_PASS=abcdefghijklmnop
RECIPIENT_EMAIL=tsitanakhyme@gmail.com
CORS_ORIGIN=http://localhost:5500
NODE_ENV=development
```

## Étape 3 : Lancer le backend

```bash
npm run dev
```

Tu devrais voir :
```
✅ Serveur email prêt à envoyer des messages
🚀 Serveur démarré sur http://localhost:3000
```

## Étape 4 : Lancer le frontend

**Option A : Avec Python**
```bash
cd F:\prj\portfolio-khyme
python -m http.server 5500
```

**Option B : Ouvrir directement**
```bash
start F:\prj\portfolio-khyme\index.html
```

## Étape 5 : Tester

1. Ouvrir http://localhost:5500 dans le navigateur
2. Aller à la section "Contact" (tout en bas)
3. Remplir le formulaire de test :
   - Nom : Test User
   - Email : ton email perso
   - Sujet : Test
   - Message : Ceci est un test
4. Cliquer sur "Envoyer le message"
5. ✅ **Vérifier** que tu reçois l'email sur `tsitanakhyme@gmail.com`

## 🎉 C'est tout !

Le site est maintenant fonctionnel avec :
- ✅ Formulaire de contact → Email direct
- ✅ Design dark moderne
- ✅ Animations fluides
- ✅ Responsive mobile/tablet/desktop

---

## 🔧 Problèmes courants

### "❌ Erreur de configuration email"
→ Vérifier que `EMAIL_USER` et `EMAIL_PASS` sont corrects dans `.env`

### "CORS error" dans la console
→ Vérifier que le backend tourne sur `localhost:3000`
→ Vérifier `CORS_ORIGIN=http://localhost:5500` dans `.env`

### Le formulaire ne s'envoie pas
→ Ouvrir la console du navigateur (F12) pour voir l'erreur
→ Vérifier que le backend est bien lancé

---

## 📝 Prochaines étapes

1. **Personnaliser** :
   - Remplacer les textes dans `index.html`
   - Ajouter ta vraie photo (section "À propos")
   - Mettre tes vrais projets (section "Portfolio")
   - Ajouter ton CV PDF

2. **Déployer** :
   - Frontend → Netlify / Vercel / GitHub Pages
   - Backend → Railway / Render / Heroku
   - Voir `README.md` pour les détails

3. **Domaine personnalisé** (optionnel) :
   - Acheter un domaine (ex: tsitanakhyme.com)
   - Le pointer vers ton hébergement
   - Configurer HTTPS
