const QRCode = require('qrcode');
const { logger } = require('../logger.service');

const generateQRCode = async (secret) => {
    try {
        const otpauthUrl = `otpauth://totp/MyApp?secret=${secret}&issuer=MyApp`;
        logger.debug(`OTP URL: ${otpauthUrl}`);
        logger.debug(`Secret Received: ${secret}`);
        return otpauthUrl;
    } catch (err) {
        console.error('Error generating QR code:', err);
        throw new Error('Failed to generate QR code');
    }
};

module.exports = { generateQRCode };
