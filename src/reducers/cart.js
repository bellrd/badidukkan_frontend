export const addOneItem = (state, data) => {

    // check if item of that key and size is already exist or not
    const newCart = [...state.cart];
    let index = state.cart.findIndex(item => (item.id === data.item.id && item.size === data.size));
    if (index !== -1) {
        // update price if changed
        newCart[index].price = data.price;
        newCart[index].quantity += 1
    } else {
        const item = {
            key: new Date().getTime().toString(),
            id: data.item.id,
            name: data.item.name,
            size: data.size,
            quantity: 1,
            price: data.price,
        };
        newCart.push({...item})
    }
    const newState = {...state, cart: newCart};
    localStorage.setItem("cart", JSON.stringify(newState.cart));
    return newState
};


export const removeOneItem = (state, data) => {
    const index = state.cart.findIndex(item => (item.id === data.item.id && item.size === data.size));
    console.log("removing one item ");

    // no such item in cart
    if (index === -1) {
        return {...state};
    }

    const newCart = [...state.cart];
    newCart[index].quantity = newCart[index].quantity - 1;
    if (newCart[index].quantity <= 0)
        newCart.splice(index, 1);

    const newState = {...state, cart: newCart};
    localStorage.setItem("cart", JSON.stringify(newCart.cart));
    return newState
};

export const deleteItem = (state, data) => {
    let index = state.cart.findIndex(item => (item.id === data.item.id && item.size === data.size));
    const newCart = [...state.cart];
    if (index !== -1) {
        newCart.splice(index, 1)
    }
    const newState = {...state, cart: newCart};
    localStorage.setItem("cart", JSON.stringify(newCart.cart));
    return newState
};
