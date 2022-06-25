const passwordValidator = require('password-validator')

// Créer un schéma
const schema = new passwordValidator();

// Ajoutez-lui des propriétés
schema
    .is().min(8)                                    // Longueur minimale 8
    .is().max(100)                                  // Longueur maximale 100
    .has().uppercase()                              // Doit contenir des lettres majuscules
    .has().lowercase()                              // Doit contenir des lettres minuscules
    .has().digits(2)                                // Doit avoir au moins 2 chiffres
    .has().not().spaces()                           // Ne devrait pas avoir d'espaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Mettre ces valeurs sur liste noire

const validationPass = (req, res, next) => {

    if (schema.validate(req.body.password)) {
        next();
    } else {
        return res.status(401).json({ error: `${schema.validate(req.body.password, { list: true })}` })
    }
}

module.exports = validationPass;