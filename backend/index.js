const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;
const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const fetchID = () => Math.random().toString(36).substring(2, 10);

let products = {
	Comprar: {
		title: "Comprar",
		items: [
			{
				id: fetchID(),
				title: "Leche",
				comments: [],
			},
		],
	},
	Carrito: {
		title: "Carrito",
		items: [
			{
				id: fetchID(),
				title: "Pan",
				comments: [
					{
						name: "Mamá",
						text: "Que sea del Hiperdino",
						id: fetchID(),
					},
				],
			},
		],
	},
	Comprado: {
		title: "Comprado",
		items: [
			{
				id: fetchID(),
				title: "Tornillos",
				comments: [
					{
						name: "Mamá",
						text: "Del tipo 45",
						id: fetchID(),
					},
				],
			},
		],
	},
};

socketIO.on("connection", (socket) => {
	console.log(` ${socket.id} user just connected!`);

	socket.on("createProduct", (data) => {
		const newProduct = { id: fetchID(), title: data.product, comments: [] };
		products["Comprar"].items.push(newProduct);
		socketIO.emit("products", products);
	});

	socket.on("productDragged", (data) => {
		const { source, destination } = data;
		const itemMoved = {
			...products[source.droppableId].items[source.index],
		};
		console.log("ItemMoved>>> ", itemMoved);
		products[source.droppableId].items.splice(source.index, 1);
		products[destination.droppableId].items.splice(
			destination.index,
			0,
			itemMoved
		);
		console.log("Source >>>", products[source.droppableId].items);
		console.log("Destination >>>", products[destination.droppableId].items);
		socketIO.emit("products", products);
	});

	socket.on("fetchComments", (data) => {
		const productItems = products[data.category].items;
		for (let i = 0; i < productItems.length; i++) {
			if (productItems[i].id === data.id) {
				socketIO.emit("comments", productItems[i].comments);
			}
		}
	});
	socket.on("addComment", (data) => {
		const productItems = products[data.category].items;
		for (let i = 0; i < productItems.length; i++) {
			if (productItems[i].id === data.id) {
				productItems[i].comments.push({
					name: data.userId,
					text: data.comment,
					id: fetchID(),
				});
				socketIO.emit("comments", productItems[i].comments);
			}
		}
	});
	socket.on("disconnect", () => {
		socket.disconnect();
		console.log("A user disconnected");
	});
});

app.get("/api", (req, res) => {
	res.json(products);
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});