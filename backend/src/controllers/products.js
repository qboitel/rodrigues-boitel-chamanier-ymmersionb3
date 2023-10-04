const { readFile, access, unlink, rename, writeFile, constants } = require('fs');
const { Product, checkDataProduct, changeColorToObj } = require('./../modeles/product');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, (__dirname + '/../../asset/images/' + req.body.category));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


const dataFile = __dirname + "/../../datas/data_products.json";


function getAllProducts(req, res) {
    console.log("getAllProducts");
    readFile(dataFile, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, message: "Oupss une erreur s'est produite lors de la lecture des données" })
        }
        res.json(JSON.parse(data));
    })
}

function getProductsByID(req, res) {
    console.log("getProductsByID");
    const idProduct = req.params.id
    if (!idProduct) {
        res.status(400).json({ code: 400, message: "Impossible d'exécuter cette demande, référence produit manquante" })
    }
    readFile(dataFile, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, message: "Oupss une erreur s'est produite lors de la lecture des données" })
        }
        data = JSON.parse(data).find(element => element.id === parseInt(idProduct))
        !data ? res.status(404).json({ code: 404, message: "Oups référence produit introuvable" }) : res.json(data)
    })
}

function getProductsByCategory(req, res) {
    console.log("getProductsByCategory");
    const categoryName = req.params.cat
    if (!categoryName) {
        res.status(400).json({ code: 400, message: "Impossible d'exécuter cette demande, catégorie produit manquante" })
    }

    readFile(dataFile, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, message: "Oupss une erreur s'est produite lors de la lecture des données" })
        }
        data = JSON.parse(data).filter(element => element.category === categoryName)
        !data ? res.status(404).json({ code: 404, message: "Oupss catégorie produit introuvable" }) : res.json(data)
    })
}

function getProdutcsBySearch(req, res) {
    console.log("getProdutcsBySearch");
    let dataSearch = req.query.q
    if (!dataSearch) {
        res.status(400).json({ code: 400, message: "Impossible d'exécuter cette demande, recherche produit manquante" })
    }
    readFile(dataFile, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ code: 500, message: "Oupss une erreur s'est produite lors de la lecture des données" })
        }
        data = JSON.parse(data).filter(element => element.name.toLowerCase().includes(dataSearch.toLowerCase()))
        !data ? res.status(404).json({ code: 404, message: "Oupss pas de produits correspondants" }) : res.json(data)
    })
}


function addProduct(req, res) {
    console.log('addProduct');
    console.log(req.body);
    //Vérification des données produit avant ajout
    if (!checkDataProduct(req.body) || req.files.length == 0) {
        req.files.forEach(file => {
            access(file.path, constants.F_OK, (err) => {
                if (!err) {
                    unlink(file.path, (err) => {
                        if (err) {
                            console.log(`Oupss une erreur dans la suppression des fichiers : ${err}`);
                        }
                    });
                }
            });
        });
        res.status(400).json({ code: 400, message: "Oupss les données sont invalides ! demande impossible..." });
        return;
    }

    //Recupe des données produit (envoyer par l'utilisateur)
    const newProduct = new Product({
        name: String(req.body.name).toUpperCase(),
        images: [],
        brand: String(req.body.brand).toLowerCase(),
        description: req.body.description,
        size: req.body.size.map(value => value.toUpperCase()),
        price: parseFloat(req.body.price),
        category: String(req.body.category).toLowerCase(),
        color: changeColorToObj(req.body.color),
        reduction: parseInt(req.body.reduction)
    });
    console.log(newProduct);

    let dataShop
    readFile(dataFile, 'utf-8', (err, data) => {
        if (err) {
            res.status(400).json({ code: 404, message: "Oupss une erreur s'est produite lors de la lecture des donées..." });
            return;
        }
        dataShop = JSON.parse(data);
        // Recuperation de l'id pour le nouveau produit
        newProduct.id = dataShop[dataShop.length - 1].id + 1;

        // Changement de nom de fichier pour les images upload et ajout de leurs chemins
        let index = 0;
        for (let file of req.files) {
            let fileName = `/${newProduct.category}/${newProduct.id}${String.fromCharCode(65 + index)}.${file.originalname.split('.')[1]}`;
            const filePath = __dirname + `/../../asset/images${fileName}`;
            rename(file.path, filePath, (err) => {
                if (err) {
                    res.status(500).json({ code: 500, message: 'Oupsss une erreur dans la manipulation des données' });
                    return;

                }
            });
            newProduct.images.push(fileName);
            index++;
        }

        dataShop.push(newProduct)
        writeFile(dataFile, JSON.stringify(dataShop), (err) => {
            if (err) {
                res.status(500).json({ code: 500, message: `Oupsss une erreur dans l'écriture du fichier` });
                return;
            }
            res.status(200).json(newProduct);
        });
    });



}

module.exports = {
    getAllProducts,
    getProductsByID,
    getProductsByCategory,
    getProdutcsBySearch,
    addProduct,
    upload
}
