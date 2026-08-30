# Changelog

## [1.0.0] - 2026-08-30

### Ajouté
- ✨ Site portfolio complet avec design dark mode moderne
- 🎨 Thème Odoo purple (#714B67) cohérent
- 📱 Design 100% responsive (mobile, tablet, desktop)
- 🎬 Animations fluides (fade-in, compteurs, particules, typing effect)
- 📧 Backend Node.js + Express pour gestion des contacts
- 📬 Envoi d'emails via Nodemailer + Gmail avec template HTML
- 🔒 Sécurité complète (Helmet, CORS, rate limiting, validation XSS)
- 📊 9 sections : Hero, About, Services, Skills, Portfolio, Process, Testimonials, Contact, Footer
- 🗂️ Portfolio filtrable par catégorie (Modules, Intégration, Migration)
- 💬 Slider de témoignages auto-rotatif
- ⬆️ Bouton "Back to top" avec smooth scroll
- 📚 Documentation complète (README, QUICKSTART, TODO)
- 🚀 Scripts d'installation automatique (install.sh, install.bat)
- ⚙️ Configuration modulaire (config.js, .env)
- 🧪 Health check endpoint pour monitoring

### Technique
- HTML5 sémantique
- CSS3 avec variables, Grid, Flexbox
- JavaScript ES6+ Vanilla
- Node.js 16+
- Express 4
- Nodemailer 6
- Validator.js pour validation
- Font Awesome 6.5.1
- Google Fonts (Inter + JetBrains Mono)

### Sécurité
- Rate limiting : 5 requêtes/15min par IP
- CORS configurable
- Validation stricte de tous les champs
- Échappement XSS
- Headers sécurisés (Helmet)
- Mot de passe Gmail d'application

### Performance
- Intersection Observer pour animations
- Lazy animations
- CSS optimisé
- Pas de dépendances frontend lourdes

---

## Prochaines versions (roadmap)

### [1.1.0] - À venir
- [ ] Mode clair/sombre toggle
- [ ] Multilingue FR/EN
- [ ] Blog intégré
- [ ] Page 404 personnalisée
- [ ] Sitemap.xml pour SEO
- [ ] Optimisation images WebP

### [1.2.0] - À venir
- [ ] Dashboard admin pour gérer portfolio
- [ ] CMS headless pour contenu dynamique
- [ ] Système de tags pour projets
- [ ] Recherche dans le portfolio
- [ ] Export CV PDF dynamique

### [2.0.0] - À venir
- [ ] PWA (Progressive Web App)
- [ ] Mode offline
- [ ] Notifications push
- [ ] Chat en temps réel
- [ ] Intégration calendrier (booking)
