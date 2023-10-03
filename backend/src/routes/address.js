module.exports = app => {

    const Address = require('../controllers/address')
    // Initialisation du router
    let router = require('express').Router();

    //LISTE DES ROUTES POUR LA PARTIE ADDRESS
    //Route pour récuperer l'ensemble des produits
    router.get('/', Address.getAddress);
    //Route pour récuperer l'ensemble des produits
    router.get('/geo', Address.getAddressWithGeolocalisation);
    // Racine de la route pour la partie produit
    app.use('/api/address', router);
} 