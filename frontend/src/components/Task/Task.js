import React from "react";
import AddTask from "../AddTask/AddTask";
import TasksContainer from "../TasksContainer/TasksContainer";
import Nav from "../Nav/Nav";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000");

const Task = () => {
	return (
		<div>
			<Nav />
			<AddTask socket={socket} />
			<TasksContainer socket={socket} />
		</div>
	);
};

export default Task;