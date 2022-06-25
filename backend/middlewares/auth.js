// Imports
const jwt = require("jsonwebtoken")

/**
 * Vérification du token de l'itilisateur
 */
module.exports = (req, res, next) => {
    try {
        // Récupération le userId dans le header
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
        const userId = decodedToken.userId;

        // ajout userId a req
        req.auth = { userId };

        // Vérification si userId existe et qu'il corresponde userId du token
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(404).json({
        });
    }
};