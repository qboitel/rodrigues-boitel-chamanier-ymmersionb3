const Product = function (product) {
    this.id = product.id;
    this.name = product.name;
    this.images = product.images;
    this.brand = product.brand;
    this.description = product.description;
    this.size = product.size;
    this.price = product.price;
    this.category = product.category;
    this.colors = product.colors;
    this.reduction = product.reduction;
}

const AllSize = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]

const AllCategories = ["veste", "short", "pantalon", "pull", "t-shirts", "test"]

const AllColor = ["rouge", "vert", "bleu", "noir", "blanc", "jaune", "rose"]

function checkDataProduct(data) {
    if (!data.name || !data.brand || !data.description || !data.price || !data.category || !data.reduction) {
        return false
    }
    if ((data.size.length == 0 || data.color.length == 0 || !data.size.every(value => AllSize.includes(value)) || !AllCategories.includes(data.category)) || !data.color.every(value => AllColor.includes(value))) {
        return false
    }
    return true

}

function changeColorToObj(color) {
    let updateColor = []
    color.map(element => {
        console.log('map');
        element.toLowerCase()
        switch (element) {
            case "rouge":
                updateColor.push({
                    "name": "rouge",
                    "bgClass": "bg-red-500"
                });
                break;
            case "vert":
                updateColor.push({
                    "name": "vert",
                    "bgClass": "bg-green-500"
                });
                break;
            case "bleu":
                updateColor.push({
                    "name": "bleu",
                    "bgClass": "bg-blue-500"
                });
                break;
            case "noir":
                updateColor.push({
                    "name": "noir",
                    "bgClass": "bg-black"
                });
                break;
            case "blanc":
                updateColor.push({
                    "name": "blanc",
                    "bgClass": "bg-white"
                });
                break;
            case "jaune":
                updateColor.push({
                    "name": "jaune",
                    "bgClass": "bg-yellow-500"
                });
                break;
            case "rose":
                updateColor.push({
                    "name": "rose",
                    "bgClass": "bg-pink-500"
                });
                break;
        }
    })
    return updateColor;
}

module.exports = {
    Product,
    checkDataProduct,
    changeColorToObj
}