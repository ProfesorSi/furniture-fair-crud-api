const db = require("../models");
const Exhibitor = db.exhibitors;

// Create and Save a new Exhibitor
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Exhibitor
    const exhibitor = new Exhibitor({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
        isPremium: req.body.isPremium,
        imageURL: req.body.imageURL,
      
    });

    // Save Exhibitor in the database
    exhibitor
        .save(exhibitor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Exhibitor."
            });
        });
};

// Retrieve all Exhibitors from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Exhibitor.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving exhibitors."
            });
        });
};


// Find a single Product with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Exhibitor.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Exhibitor with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Exhibitor with id=" + id });
        });
};


// Update a Product by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Exhibitor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Exhibitor with id=${id}. Maybe Exhibitor was not found!`
                });
            } else res.send({ message: "Exhibitor was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Exhibitor with id=" + id
            });
        });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Exhibitor.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Exhibitor with id=${id}. Maybe Exhibitor was not found!`
                });
            } else {
                res.send({
                    message: "Exhibitor was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Exhibitor with id=" + id
            });
        });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
    Exhibitor.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Exhibitor were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all exhibitors."
            });
        });
};

// Find all published Products
exports.findAllPublished = (req, res) => {
    Exhibitor.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
};


// Find all products by category
exports.findPremiumExhibitor = (req, res) => {
    Exhibitor.find({ isPremium: req.params.isPremium })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
};


