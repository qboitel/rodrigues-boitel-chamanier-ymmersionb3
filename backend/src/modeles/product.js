const Product = function (product) {
    this.id = product.id
    this.name = product.name; //
    this.images = product.images;
    this.brand = product.brand; //
    this.description = product.description; //
    this.size = product.size;
    this.price = product.price; //
    this.category = product.category; //
    this.color = product.color;
    this.reduction = product.reduction;
}

const AllSize = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]

const AllCategories = ["veste", "short", "pantalon", "pull", "t-shirts"]

const AllColor = []

function checkDataProduct(data) {
    if (!data.name || !data.brand || !data.description || !data.price || !data.category || !data.reduction) {
        return false
    }
    if ((data.size.length == 0 || data.color.length == 0 || !data.size.every(value => AllSize.includes(value)) || !AllCategories.includes(data.category))) {
        return false
    }
    return true

}

function changeColorToObj(color) {

}

module.exports = {
    Product,
    checkDataProduct
}