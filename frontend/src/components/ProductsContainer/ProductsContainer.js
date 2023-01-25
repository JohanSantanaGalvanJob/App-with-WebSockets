import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import socketIO from "socket.io-client";

const ProductsContainer = () => {
    const socket = socketIO.connect("http://localhost:4000");
    const [products, setProducts] = useState({});

    useEffect(() => {
        function fetchProducts() {
            fetch("http://localhost:4000/api")
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setProducts(data);
                });
        }
        fetchProducts();
    }, []);

    useEffect(() => {
		socket.on("products", (data) => {
			setProducts(data);
		});
	}, [socket]);

    const handleDragEnd = ({ destination, source }) => {
		if (!destination) return;
		if (
			destination.index === source.index &&
			destination.droppableId === source.droppableId
		)
			return;

		socket.emit("productDragged", {
			source,
			destination,
		});
	};

    return (
        <div className='container'>
            <DragDropContext onDragEnd={handleDragEnd}>
                {Object.entries(products).map((product) => (
                    <div
                        className={`${product[1].title.toLowerCase()}__wrapper`}
                        key={product[1].title}
                    >
                        <h3>{product[1].title}</h3>
                        <div className={`${product[1].title.toLowerCase()}__container`}>
                            <Droppable droppableId={product[1].title}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {product[1].items.map((item, index) => (
                                                
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`${product[1].title.toLowerCase()}__items`}
                                                    >
                                                        <p>{item.title}</p>
                                                        <p className='comment'>
                                                            <Link to={`/comments/${product[1].title}/${item.id}`}>
                                                                {item.comments.length > 0
                                                                    ? `Ver Comentarios`
                                                                    : "Añadir un Comentario"}
                                                            </Link>
                                                        </p>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </div>
                ))}
            </DragDropContext>
        </div>
    );
};

export default ProductsContainer;