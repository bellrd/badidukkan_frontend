export const addOneItem = (state, data) => {

    // check if item of that key and size is already exist or not
    if (localStorage.getItem("merchandise_id")) {
        if (!(data.merchandise_id == localStorage.getItem("merchandise_id"))) {
            state = {...state, cart: []};
            localStorage.removeItem("merchandise_id");
            localStorage.removeItem("cart")
        }
    }
    const newCart = [...state.cart];
    let index = state.cart.findIndex(item => (item._id === data._id && item.size === data.size));
    if (index !== -1) {
        // update price if changed
        newCart[index].price = data.price;
        newCart[index].quantity += 1
    } else {
        const item = {
            key: new Date().getTime().toString(),
            _id: data._id,
            name: data.name,
            size: data.size,
            quantity: 1,
            price: data.price,
            category_id: data.category_id,
            merchandise_id: data.merchandise_id,
        };
        newCart.push({...item})
    }
    const newState = {...state, merchandise_id: data.merchandise_id, cart: newCart};
    localStorage.setItem("cart", JSON.stringify(newState.cart));
    localStorage.setItem("merchandise_id", data.merchandise_id);
    return newState
};


export const removeOneItem = (state, data) => {
    const index = state.cart.findIndex(item => (item._id === data._id && item.size === data.size));
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
    let index = state.cart.findIndex(item => (item._id === data._id && item.size === data.size));
    const newCart = [...state.cart];
    if (index !== -1) {
        newCart.splice(index, 1)
    }
    const newState = {...state, cart: newCart};
    localStorage.setItem("cart", JSON.stringify(newCart.cart));
    return newState
};

export const initialize_cart = (state) => {
    localStorage.removeItem("cart");
    localStorage.removeItem("merchandise_id");
    return {...state, cart: [], merchandise_id: [], address: null, service:null}
};
