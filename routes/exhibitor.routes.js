module.exports = app => {
  const exhibitors = require("../controllers/exhibitor.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/", exhibitors.create);

  // Retrieve all Products
  router.get("/", exhibitors.findAll);

  // Retrieve all published Products
  router.get("/published", exhibitors.findAllPublished);

  // Retrieve a single Product with id
  router.get("/:id", exhibitors.findOne);

  // Retrieve products by category
  router.get("/:isPremium", exhibitors.findPremiumExhibitor);




  // Update a Product with id
  router.put("/:id", exhibitors.update);

  // Delete a Product with id
  router.delete("/:id", exhibitors.delete);

  // Create a new Product
  router.delete("/", exhibitors.deleteAll);



  app.use('/api/exhibitors', router);
};