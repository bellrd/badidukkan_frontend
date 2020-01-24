export const address_selected = (state, data) => {
    return {...state, orderAddress: {...data}}
};

export const order_type_set = (state, data) => {

    return {...state, orderType: {...data}}
};