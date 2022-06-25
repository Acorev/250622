// Imports
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

/**
 *  création d'un nouveau utilisateur
 * @param { email: String, password: String } req
 * @param { message: String } res
 */
module.exports.signup = async (req, res) => {
    const body = req.body

    // scripte le password avec bcrypt
    await bcrypt.hash(body.password, 10)
        .then(hash => { body.password = hash })
        .catch(error => res.status(500).json({ error: error.message }))

    // créer un utilisateur dans la DB
    await User.create(body)
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error: 'Utilisateur déja créé !' }))
}

/**
 * Connection d'un utilisateur
 * @param { email: String, password: String } req 
 * @param { userId: String, token: String } res 
 */
module.exports.login = async (req, res) => {
    const body = req.body

    // Controle de la présence et de la validité de l'utilisateur dans la BD
    await User.findOne({ email: body.email })
        .then(user => {

            // Si l'utilisateur n'existe pas
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            // Compare la validité du password
            bcrypt.compare(body.password, user.password)
                .then(valid => {

                    // l'utilisateur n'a pas le entrée le bon password
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' })
                    }

                    // l''utilisateur à le bon password
                    // On créer sont token et on renvoie le token
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.KEY_TOKEN,
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error: error.message }));
        })
        .catch(error => res.status(500).json({ error: error.message }))
}