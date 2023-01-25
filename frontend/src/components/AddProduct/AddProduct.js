import React, { useState } from "react";

const AddProduct = ({ socket }) => {
    const [product, setProduct] = useState("");

    const handleAddTodo = (e) => {
        e.preventDefault();
        //👇🏻 sends the task to the Socket.io server
        socket.emit("createProduct", { product });
        setProduct("");
    };
    return (
        <form className='form__input' onSubmit={handleAddTodo}>
            <label htmlFor='task'>Añade un Producto</label>
            <input
                type='text'
                name='product'
                id='product'
                value={product}
                className='input'
                required
                onChange={(e) => setProduct(e.target.value)}
            />
            <button className='addTodoBtn'>Añadir</button>
        </form>
    );
};

export default AddProduct;