import React from "react";
import AddProduct from "../AddProduct/AddProduct";
import ProductsContainer from "../ProductsContainer/ProductsContainer";
import Nav from "../Nav/Nav";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000");

const Product = () => {
	return (
		<div>
			<Nav />
			<AddProduct socket={socket} />
			<ProductsContainer socket={socket} />
		</div>
	);
};

export default Product;