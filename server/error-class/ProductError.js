 class ProductError extends Error {
    constructor(message="Unable to fetch product"){
      super(message);
      this.name = "ProductError";
    }
}

module.exports = ProductError;