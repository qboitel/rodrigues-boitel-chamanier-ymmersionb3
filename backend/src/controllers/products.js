const { readFile } = require('fs')
const { Product } = require('./../modeles/product')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, (__dirname + '/../../asset/images/' + req.body.cat))
    },
    filename: function (req, file, cb) {
        console.log('icicicicicici ==> ', file);
        cb(null, 'test' + '.' + file.originalname.split('.')[1])
    }
})

const upload = multer({ storage: storage })


const dataFile = __dirname + "/../../datas/data_products.json"

function getAllProducts(req, res) {
    console.log("getAllProducts");
    readFile(dataFile, 'utf-8', (err, data) => {
        if (err) {
            res.status(400).json({ pth: dataFile, code: 404, message: "Oupss une erreur s'est produite lors de la lecture des données..." })
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
            res.status(400).json({ code: 404, message: "Oupss une erreur s'est produite lors de la lecture des données..." })
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
            res.status(400).json({ code: 404, message: "Oupss une erreur s'est produite lors de la lecture des données..." })
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
            res.status(400).json({ code: 404, message: "Oupss une erreur s'est produite lors de la lecture des données..." })
        }
        data = JSON.parse(data).filter(element => element.name.toLowerCase().includes(dataSearch.toLowerCase()))
        !data ? res.status(404).json({ code: 404, message: "Oupss pas de produits correspondants" }) : res.json(data)
    })
}

function getProdutsByFilter(req, res) {

}
function addProduct(req, res) {
    console.log('addProduct');
    console.log(req.body);
    console.log(req.file);
    console.log(req.files);
    res.send('okokoko')
}

module.exports = {
    getAllProducts,
    getProductsByID,
    getProductsByCategory,
    getProdutcsBySearch,
    addProduct,
    upload
}
