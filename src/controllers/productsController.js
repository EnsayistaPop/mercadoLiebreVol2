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

		let newProduct = {
		id: id = products.length + 1,
		name:req.body.name,
		price:JSON.parse(req.body.price) ,
		discount:JSON.parse(req.body.discount),
		category:req.body.category,
		description:req.body.description
		};
	console.log(newProduct);
	products.push(newProduct);
	console.log('producto pusheado');
	let productsJSON = JSON.stringify(products);
	fs.writeFileSync(productsFilePath, productsJSON);
	console.log('producto cargado al JSON :D')
	res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productId = req.params.id;
		let product = products.find(product => product.id == productId);
		res.render('product-edit-form', {product}) 
	},
	// Update - Method to update
	update: (req, res) => {
		let productId = req.params.id;
		let productAedit = products.find(product => product.id == productId);
		console.log(productAedit);
		let productEdit = {
			name: productAedit.name = req.body.name,
			price: productAedit.price = req.body.price,
			discount:productAedit.discount = req.body.discount,
			category:productAedit.category = req.body.category,
			description: productAedit.description = req.body.description
		};
		console.log(productEdit);
		let productsEditJSON = JSON.stringify(products);
		fs.writeFileSync(productsFilePath, productsEditJSON);
		console.log('producto editado :D')
		res.redirect('/')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productId = req.params.id;
		let productAelim = products.find(product => product.id == productId);
		console.log('producto a eliminar...')
		console.log(productAelim);	
		res.redirect('/')
	}
};

module.exports = controller;