const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const User = require('../../models/Users');
const  tokenService = require('./token.service');
const  qrCodeService = require('./qrcode.service');
const {logger} =require('../logger.service')
const authService = {
    register: async (username, password) => {
        try {
            const user = new User({ username, password });
            const userdetails = await user.save();
            logger.info(`USER found: ${user}`);
            return userdetails;
        } catch (err) {
            console.error('Error registering user:', err.message);
            throw new Error('Failed to register user');
        }
    },

    login: async (username, password) => {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                logger.warn('User not found');
                throw new Error('User not found');
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                logger.warn('Invalid credentials');
                throw new Error('Invalid credentials');
            }

            const token = tokenService.generateToken(user._id);
            return { user, token };
        } catch (err) {
            logger.error(`Error logging in: ${err}`);
            throw new Error('Failed to log in');
        }
    },

    enable2FA: async (userId) => {
        try {
            const user = await User.findById(userId);
            if (!user) throw new Error('User not found');

            const secret = speakeasy.generateSecret({ length: 20 });
            user.totpSecret = secret.base32;

            await user.save();
            const imageUrl = await qrCodeService.generateQRCode(secret.base32);

            logger.debug(`User TOTP Secret and imageURL: ${JSON.stringify({ secret: secret.base32, imageUrl })}`);
            return { secret: secret.base32, imageUrl };
        } catch (err) {
            console.error('Error enabling 2FA:', err);
            throw new Error('Failed to enable 2FA');
        }
    },

    verify2FA: async (userId, token) => {
        try {
            const user = await User.findById(userId);
            if (!user) throw new Error('User not found');

            const verified = speakeasy.totp.verify({
                secret: user.totpSecret,
                encoding: 'base32',
                token,
                window: 1,
            });

            if (verified) {
                return true;
            } else {
                throw new Error('Invalid 2FA token');
            }
        } catch (err) {
            console.error('Error verifying 2FA:', err);
            throw new Error('Failed to verify 2FA');
        }
    }
};

module.exports = authService;
