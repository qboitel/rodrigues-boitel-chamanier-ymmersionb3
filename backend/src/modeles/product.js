const Product = function (product) {
    this.id = product.id
    this.name = product.name;
    this.images = product.images;
    this.brand = product.brand;
    this.description = product.description;
    this.size = product.size;
    this.price = product.price;
    this.category = product.category;
    this.color = product.color;
    this.reduction = product.reduction;
}

module.exports = { Product }