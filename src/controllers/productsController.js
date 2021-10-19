const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products, toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let productId = req.params.id;
		let product = products.find(product => product.id == productId);
		res.render('detail', {product})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render('product-edit-form')
	},
	// Update - Method to update
	update: (req, res) => {
		res.redirect('/')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		res.redirect('/')
	}
};

module.exports = controller;