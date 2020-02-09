import {login, logout} from "./auth";
import {addOneItem, deleteItem, initialize_cart, removeOneItem} from "./cart";
import {address_selected, merchandise_service_set, order_placed} from "./order";

let reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return login(state, action.payload);
        case "LOGOUT":
            return logout(state, action.payload);
        case "ADD_ONE_ITEM":
            return addOneItem(state, action.payload);
        case "REMOVE_ONE_ITEM":
            return removeOneItem(state, action.payload);
        case "DELETE_ITEM":
            return deleteItem(state, action.payload);
        case "ADDRESS_SELECTED":
            return address_selected(state, action.payload);
        case "MERCHANDISE_SERVICE_SET":
            return merchandise_service_set(state, action.payload);
        case "INITIALIZE_CART":
            return initialize_cart(state);
        case "ORDER_PLACED":
            return order_placed(state);
        default:
            return;
    }
};

export default reducer;
