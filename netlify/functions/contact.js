/* ═══════════════════════════════════════════════════
   Netlify Serverless Function - Contact Form
   ═══════════════════════════════════════════════════ */

const nodemailer = require('nodemailer');
const validator = require('validator');

// Validation des données
function validateContactForm(data) {
    const errors = [];

    if (!data.name || validator.isEmpty(data.name.trim())) {
        errors.push('Le nom est requis');
    } else if (data.name.length < 2 || data.name.length > 100) {
        errors.push('Le nom doit contenir entre 2 et 100 caractères');
    }

    if (!data.email || !validator.isEmail(data.email)) {
        errors.push('Email invalide');
    }

    if (!data.subject || validator.isEmpty(data.subject)) {
        errors.push('Le sujet est requis');
    }

    if (!data.message || validator.isEmpty(data.message.trim())) {
        errors.push('Le message est requis');
    } else if (data.message.length < 10) {
        errors.push('Le message doit contenir au moins 10 caractères');
    } else if (data.message.length > 5000) {
        errors.push('Le message est trop long (max 5000 caractères)');
    }

    return errors;
}

// Sanitize input
function sanitizeInput(str) {
    return validator.escape(str.trim());
}

exports.handler = async (event, context) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }

    // Only POST allowed
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ success: false, error: 'Method not allowed' })
        };
    }

    try {
        const data = JSON.parse(event.body);

        // Validation
        const validationErrors = validateContactForm(data);
        if (validationErrors.length > 0) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    error: 'Données invalides',
                    details: validationErrors
                })
            };
        }

        // Sanitize
        const cleanData = {
            name: sanitizeInput(data.name),
            email: data.email.trim().toLowerCase(),
            subject: sanitizeInput(data.subject),
            message: sanitizeInput(data.message)
        };

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // HTML Email
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
        .content { padding: 30px; }
        .field { margin-bottom: 20px; }
        .field-label { font-weight: 600; color: #714B67; font-size: 12px; text-transform: uppercase; }
        .field-value { background: #f8f8f8; padding: 12px 15px; border-radius: 6px; border-left: 3px solid #714B67; }
        .message-box { background: #f0f0f5; padding: 20px; border-radius: 8px; margin-top: 20px; white-space: pre-wrap; }
        .footer { background: #f8f8f8; padding: 20px; text-align: center; font-size: 12px; color: #666; }
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
                <div class="field-value"><a href="mailto:${cleanData.email}">${cleanData.email}</a></div>
            </div>
            <div class="field">
                <div class="field-label">📋 Sujet</div>
                <div class="field-value">${cleanData.subject}</div>
            </div>
            <div class="field">
                <div class="field-label">💬 Message</div>
                <div class="message-box">${cleanData.message}</div>
            </div>
        </div>
        <div class="footer">
            <p>Reçu le ${new Date().toLocaleDateString('fr-FR')}</p>
            <p><strong>Répondre à ${cleanData.email}</strong></p>
        </div>
    </div>
</body>
</html>
        `;

        // Send email
        const info = await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
            replyTo: cleanData.email,
            subject: `[Portfolio] ${cleanData.subject} - ${cleanData.name}`,
            html: htmlEmail
        });

        console.log('✅ Email sent:', info.messageId);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.',
                messageId: info.messageId
            })
        };

    } catch (error) {
        console.error('❌ Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                error: 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.'
            })
        };
    }
};
