class Recipe {
    constructor(api_resp) {
      this.name = api_resp.label;
      this.img = api_resp.image;
      this.url = api_resp.url;
      this.uri = api_resp.uri;
      this.ingredients = api_resp.ingredientLines;
    }
    toString() {
      return "Read about " + this.name + " at " + this.url;
    }
  }
  
  module.exports = {Recipe};