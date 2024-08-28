const authService = require('../services/auth/auth');
const { logger } = require('../services/logger.service');
const { updateUser } = require('../utils/auth.helper');

const register = async (req, res) => {
    const { username, password } = req.body;
    console.log("Request body:", req.body);

    try {
        const user = await authService.register(username, password);
        const { secret, imageUrl } = await authService.enable2FA(user._id);
        const updatedUser = await updateUser(user._id, { totpSecret: secret, qrCodeUri: imageUrl });

        res.status(201).json({ message: 'User registered successfully', userDetails: updatedUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    console.log("Request body:", req.body);

    try {
        const { user, token } = await authService.login(username, password);
        logger.info(`Logged in user info: ${JSON.stringify(user)}`);
        res.json({ token, user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(401).json({ message: 'Invalid credentials' });
    }
}

const enable2FA = async (req, res) => {
    const { userId } = req.user;

    try {
        const { secret, imageUrl } = await authService.enable2FA(userId);
        res.json({ secret, imageUrl });
    } catch (error) {
        console.error('Error enabling 2FA:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const verify2FA = async (req, res) => {
    const { userId, token } = req.body;
    console.log("Token:", token);
    console.log("UserId:", userId);

    try {
        const isValid = await authService.verify2FA(userId, token);
        if (isValid) {
            res.json({ message: '2FA successfully verified' });
        } else {
            res.status(401).json({ message: 'Invalid 2FA token' });
        }
    } catch (error) {
        console.error('Error verifying 2FA:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const getProtectedResource = async (req, res) => {
    res.json({ message: 'Protected resource' });
}

module.exports = { register, login, enable2FA, verify2FA, getProtectedResource };
