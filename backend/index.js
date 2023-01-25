const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;
// const { Novu } = require("@novu/node");
// const novu = new Novu("<API_KEY>");
const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const fetchID = () => Math.random().toString(36).substring(2, 10);

let tasks = {
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

// const sendNotification = async (user) => {
// 	try {
// 		const result = await novu.trigger("<TEMPLATE_ID>", {
// 			to: {
// 				subscriberId: "<SUBSCRIBER_ID>",
// 			},
// 			payload: {
// 				userId: user,
// 			},
// 		});
// 		console.log(result);
// 	} catch (err) {
// 		console.error("Error >>>>", { err });
// 	}
// };
socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on("createTask", (data) => {
		const newTask = { id: fetchID(), title: data.task, comments: [] };
		tasks["Comprar"].items.push(newTask);
		socketIO.emit("tasks", tasks);

		// 👇🏻 sends notification via Novu
		// sendNotification(data.userId);
	});

	socket.on("taskDragged", (data) => {
		const { source, destination } = data;
		const itemMoved = {
			...tasks[source.droppableId].items[source.index],
		};
		console.log("ItemMoved>>> ", itemMoved);
		tasks[source.droppableId].items.splice(source.index, 1);
		tasks[destination.droppableId].items.splice(
			destination.index,
			0,
			itemMoved
		);
		console.log("Source >>>", tasks[source.droppableId].items);
		console.log("Destination >>>", tasks[destination.droppableId].items);
		socketIO.emit("tasks", tasks);
	});

	socket.on("fetchComments", (data) => {
		const taskItems = tasks[data.category].items;
		for (let i = 0; i < taskItems.length; i++) {
			if (taskItems[i].id === data.id) {
				socketIO.emit("comments", taskItems[i].comments);
			}
		}
	});
	socket.on("addComment", (data) => {
		const taskItems = tasks[data.category].items;
		for (let i = 0; i < taskItems.length; i++) {
			if (taskItems[i].id === data.id) {
				taskItems[i].comments.push({
					name: data.userId,
					text: data.comment,
					id: fetchID(),
				});
				socketIO.emit("comments", taskItems[i].comments);
			}
		}
	});
	socket.on("disconnect", () => {
		socket.disconnect();
		console.log("🔥: A user disconnected");
	});
});

app.get("/api", (req, res) => {
	res.json(tasks);
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});