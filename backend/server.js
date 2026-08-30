/* ═══════════════════════════════════════════════════
   TSITANA KHYME — Backend Server
   Email contact form handler avec Nodemailer
   ═══════════════════════════════════════════════════ */

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const validator = require('validator');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares de sécurité ───
app.use(helmet());

// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
        : '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
};
app.use(cors(corsOptions));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting - Max 20 requêtes par 15 minutes par IP (mode dev)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 5 : 20, // 20 en dev, 5 en prod
    message: {
        success: false,
        error: 'Trop de tentatives. Veuillez réessayer dans 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// ─── Configuration Nodemailer (Gmail) ───
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Vérifier la connexion au serveur email au démarrage
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Erreur de configuration email:', error);
        console.log('\n⚠️  Assurez-vous d\'avoir configuré le fichier .env avec :');
        console.log('   - EMAIL_USER : votre email Gmail');
        console.log('   - EMAIL_PASS : mot de passe d\'application Gmail');
        console.log('   Créer un mot de passe : https://myaccount.google.com/apppasswords\n');
    } else {
        console.log('✅ Serveur email prêt à envoyer des messages');
    }
});

// ─── Validation des données ───
function validateContactForm(data) {
    const errors = [];

    // Nom
    if (!data.name || validator.isEmpty(data.name.trim())) {
        errors.push('Le nom est requis');
    } else if (data.name.length < 2 || data.name.length > 100) {
        errors.push('Le nom doit contenir entre 2 et 100 caractères');
    }

    // Email
    if (!data.email || !validator.isEmail(data.email)) {
        errors.push('Email invalide');
    }

    // Sujet
    if (!data.subject || validator.isEmpty(data.subject)) {
        errors.push('Le sujet est requis');
    }

    // Message
    if (!data.message || validator.isEmpty(data.message.trim())) {
        errors.push('Le message est requis');
    } else if (data.message.length < 10) {
        errors.push('Le message doit contenir au moins 10 caractères');
    } else if (data.message.length > 5000) {
        errors.push('Le message est trop long (max 5000 caractères)');
    }

    return errors;
}

// Sanitize input to prevent XSS
function sanitizeInput(str) {
    return validator.escape(str.trim());
}

// ─── Routes ───

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Backend opérationnel',
        timestamp: new Date().toISOString()
    });
});

// Route de contact - avec rate limiting
app.post('/api/contact', limiter, async (req, res) => {
    try {
        // Extraction et nettoyage des données
        const { name, email, subject, message } = req.body;

        // Validation
        const validationErrors = validateContactForm(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Données invalides',
                details: validationErrors
            });
        }

        // Sanitize inputs
        const cleanData = {
            name: sanitizeInput(name),
            email: email.trim().toLowerCase(),
            subject: sanitizeInput(subject),
            message: sanitizeInput(message)
        };

        // Préparer l'email HTML
        const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; background: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #714B67, #8f6585); color: #fff; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
        .header p { margin: 5px 0 0; opacity: 0.9; font-size: 14px; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; }
        .field-label { font-weight: 600; color: #714B67; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
        .field-value { background: #f8f8f8; padding: 12px 15px; border-radius: 6px; border-left: 3px solid #714B67; }
        .message-box { background: #f0f0f5; padding: 20px; border-radius: 8px; margin-top: 20px; border: 1px solid #e0e0e0; white-space: pre-wrap; word-wrap: break-word; }
        .footer { background: #f8f8f8; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #e0e0e0; }
        .badge { display: inline-block; background: #714B67; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📩 Nouveau message de contact</h1>
            <p>Portfolio — Tsitana Khyme</p>
        </div>
        <div class="content">
            <div class="field">
                <div class="field-label">👤 Nom</div>
                <div class="field-value">${cleanData.name}</div>
            </div>
            <div class="field">
                <div class="field-label">📧 Email</div>
                <div class="field-value"><a href="mailto:${cleanData.email}" style="color: #714B67; text-decoration: none;">${cleanData.email}</a></div>
            </div>
            <div class="field">
                <div class="field-label">📋 Sujet</div>
                <div class="field-value">${cleanData.subject}</div>
            </div>
            <div class="field">
                <div class="field-label">💬 Message</div>
                <div class="message-box">${cleanData.message}</div>
            </div>
            <span class="badge">Reçu le ${new Date().toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</span>
        </div>
        <div class="footer">
            <p>Ce message a été envoyé via le formulaire de contact de votre portfolio.</p>
            <p style="margin-top: 10px;"><strong>Répondre directement à ${cleanData.email}</strong></p>
        </div>
    </div>
</body>
</html>
        `;

        // Email en texte brut (fallback)
        const textEmail = `
═══════════════════════════════════════
NOUVEAU MESSAGE DE CONTACT
Portfolio — Tsitana Khyme
═══════════════════════════════════════

👤 Nom : ${cleanData.name}
📧 Email : ${cleanData.email}
📋 Sujet : ${cleanData.subject}

💬 MESSAGE :
${cleanData.message}

─────────────────────────────────────
Reçu le ${new Date().toLocaleString('fr-FR')}
Répondre à : ${cleanData.email}
        `;

        // Configuration du mail
        const mailOptions = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
            replyTo: cleanData.email,
            subject: `[Portfolio] ${cleanData.subject} - ${cleanData.name}`,
            text: textEmail,
            html: htmlEmail
        };

        // Envoyer l'email
        const info = await transporter.sendMail(mailOptions);

        console.log('✅ Email envoyé:', info.messageId);
        console.log(`   De: ${cleanData.name} <${cleanData.email}>`);
        console.log(`   Sujet: ${cleanData.subject}`);

        // Réponse succès
        res.status(200).json({
            success: true,
            message: 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi:', error);

        res.status(500).json({
            success: false,
            error: 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Route 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route non trouvée'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('❌ Erreur serveur:', err);
    res.status(500).json({
        success: false,
        error: 'Erreur interne du serveur'
    });
});

// ─── Démarrage du serveur ───
app.listen(PORT, () => {
    console.log('\n╔════════════════════════════════════════════════════╗');
    console.log('║   🟣 Portfolio Backend - Tsitana Khyme            ║');
    console.log('╚════════════════════════════════════════════════════╝\n');
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📧 Email configuré : ${process.env.EMAIL_USER || 'NON CONFIGURÉ'}`);
    console.log(`🔒 CORS autorisé pour : ${corsOptions.origin === '*' ? 'Toutes origines (DEV)' : corsOptions.origin}`);
    console.log(`⚡ Mode : ${process.env.NODE_ENV || 'development'}`);
    console.log('\n📡 Endpoints disponibles :');
    console.log('   GET  /api/health  — Health check');
    console.log('   POST /api/contact — Envoi de message\n');
});

// Gestion arrêt propre
process.on('SIGTERM', () => {
    console.log('\n👋 Arrêt du serveur...');
    process.exit(0);
});
