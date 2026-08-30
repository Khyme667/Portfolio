// ═══════════════════════════════════════════════════
// Configuration Frontend
// ═══════════════════════════════════════════════════

const CONFIG = {
    // Backend API URL
    apiUrl: 'http://localhost:3000/api', // Changer pour 'https://ton-backend.com/api' en production

    // Google Analytics (optionnel)
    gaTrackingId: 'G-XXXXXXXXXX', // Remplacer par votre ID GA4

    // Contact info
    email: 'tsitanakhyme@gmail.com',
    phone: '+261 34 57 047 80',
    whatsapp: '261345704780',
    linkedin: 'khyme-tsitana-web-developer',
    github: 'tsitanakhyme',

    // CV download URL
    cvUrl: './src/CV_Tsitana_Khyme_dev_Odoo.pdf',

    // Features toggles
    features: {
        darkMode: true,
        languageSwitcher: false, // À activer si multilingue
        analytics: false,        // À activer en production
        chatWidget: false        // Tawk.to ou autre
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
