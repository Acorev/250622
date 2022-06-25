// Imports
const router = require('express').Router()

const postCtrl = require('../controllers/post.controler')
const multer = require('../middlewares/multer.config')
const auth = require('../middlewares/auth')

// Routes
router.get('/', postCtrl.getAllPosts)
router.get('/:id', postCtrl.getOnePost)
router.post('/', postCtrl.createPost)
router.put('/:id', postCtrl.modifyPost)
router.delete('/:id', postCtrl.deletePost)
router.post('/:id/like', postCtrl.createLikePost)

// Exports
module.exports = router