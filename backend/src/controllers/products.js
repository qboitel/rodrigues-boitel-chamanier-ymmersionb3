const { readFile } = require('fs')

const dataFile = __dirname + "/../../datas/data_products.json"

function getAllProducts(req, res) {
    console.log("getAllProducts");
    readFile(dataFile, 'utf-8', (err, data) => {
        if (err) {
            res.status(400).json({ pth: dataFile, code: 404, message: "Oupss une erreur s'est produite lors de la lecture des donées..." })
        }
        res.json(JSON.parse(data))
    })
}

function getProductsByID(req, res) {
    console.log("getProductsByID");
    const idProduct = req.params.id
    if (!idProduct) {
        res.status(404).json({ message: "Impossible d'excuter cette demande, reference produit manquante" })
    }
    readFile(dataFile, 'utf-8', (err, data) => {
        if (err) {
            res.status(400).json({ code: 404, message: "Oupss une erreur s'est produite lors de la lecture des donées..." })
        }
        data = JSON.parse(data).find(element => element.id === parseInt(idProduct))
        !data ? res.status(404).json({ code: 404, message: "Oupss reference produit introuvable" }) : res.json(data)
    })
}

function getProductsByCategory(req, res) {
    console.log("getProductsByCategory");
    const categoryName = req.params.cat
    if (!categoryName) {
        res.status(404).json({ code: 404, message: "Impossible d'excuter cette demande, categorie produit manquante" })
    }

    readFile(dataFile, 'utf-8', (err, data) => {
        if (err) {
            res.status(400).json({ code: 404, message: "Oupss une erreur s'est produite lors de la lecture des donées..." })
        }
        data = JSON.parse(data).filter(element => element.category === categoryName)
        !data ? res.status(404).json({ code: 404, message: "Oupss categorie produit introuvable" }) : res.json(data)
    })
}

function getProdutcsBySearch(req, res) {
    console.log("getProdutcsBySearch");
    let dataSearch = req.query.q
    if (!dataSearch) {
        res.status(404).json({ code: 404, message: "Impossible d'excuter cette demande, manque de données" })
    }
    readFile(dataFile, 'utf-8', (err, data) => {
        if (err) {
            res.status(400).json({ code: 404, message: "Oupss une erreur s'est produite lors de la lecture des donées..." })
        }
        data = JSON.parse(data).filter(element => element.name.toLowerCase().includes(dataSearch.toLowerCase()))
        !data ? res.status(404).json({ code: 404, message: "Oupss pas de produits correspondants" }) : res.json(data)
    })
}

function getProdutsByFilter(req, res) {

}

function addProduct(req, res) {

}

module.exports = {
    getAllProducts,
    getProductsByID,
    getProductsByCategory,
    getProdutcsBySearch
}