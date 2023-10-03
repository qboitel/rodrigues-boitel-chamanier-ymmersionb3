module.exports = app => {

    const Products = require('../controllers/products')
    // Initialisation du router
    let router = require('express').Router();

    //LISTE DES ROUTES POUR LA PARTIE PRODUITS
    //Route pour récuperer l'ensemble des produits
    router.get('/', Products.getAllProducts);
    // Route pour recuperer un produit avec son id 
    router.get('/product/:id', Products.getProductsByID);
    // Route pour récuperer les produits par categorie
    router.get('/categorie/:cat', Products.getProductsByCategory);
    // Route pour effectuer une recherche d'un article
    router.get('/search', Products.getProdutcsBySearch)
    // Route pour ajouter des produits à la boutique
    router.post('/add', Products.addProduct, Products.upload.array('pics'))
    // Racine de la route pour la partie produit
    app.use('/api/products', router);
} 
