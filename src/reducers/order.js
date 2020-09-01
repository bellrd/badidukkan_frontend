export const address_selected = (state, data) => {
    return {...state, address: {...data}}
};

export const merchandise_service_set = (state, data) => {
    return {...state, order_type: data}
};

export const order_placed = (state, data) => {
    localStorage.removeItem("cart")
    return {...state, cart: [], merchandise_id: null, address: null, service:null}
};