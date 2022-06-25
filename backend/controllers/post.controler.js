// Imports
const Post = require('../models/posts.model');

/**
 * Permet de récuperer touts les posts de la base MongoDB
 * @param { Array of sauces } res 
 */
const getAllPosts = async (req, res) => {
  await Post.find()
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error }))
};

/**
 * Récupere une seule sauce
 * @param { post } res 
 */
const getOnePost = async (req, res) => {
  const idPost = req.params.id
  await Post.findById(idPost)
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error }))
};
const createPost = async (req, res) => {
  await Post.create(req.body)
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }))
};
const modifyPost = async (req, res) => { };
const deletePost = async (req, res) => { };
const createLikePost = async (req, res) => { };

module.exports = {
  getAllPosts,
  getOnePost,
  createPost,
  modifyPost,
  deletePost,
  createLikePost
};