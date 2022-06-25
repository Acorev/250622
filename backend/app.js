// Imports
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const helmet = require('helmet')

const userRoutes = require('./routes/user.route')
const postRoutes = require('./routes/post.route')

// Constantes
require('dotenv').config()
const port = process.env.PORT || 3000

// Instanciation express
const app = express()
app.use(express.json())
app.use(cors())

// Utilisation de helmet
app.use(helmet())

// Cross-Origin-Resource-Policy permission pour localhost
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'localhost')
    next()
});

// Autorise l'acces au répertoire images
app.use('/images', express.static(path.join(__dirname, 'images')))

// Connection à la database MongoDB
// Démarage et écoute serveur
mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => app.listen(port, () => {
        console.log(`Serveur en écoute sur http://localhost:${port}`)
    }))
    .catch((error) => console.log(error.message))

// Routes
app.use('/api/auth', userRoutes)
app.use('/api/posts', postRoutes)