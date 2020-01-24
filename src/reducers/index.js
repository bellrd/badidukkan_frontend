import {login, logout} from "./auth";
import {addOneItem, removeOneItem, deleteItem} from "./cart";
import {address_selected, order_type_set} from "./order";

let reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return login(state, action.payload);
        case "LOGOUT":
            return logout(state, action.payload);
        case "ADD_ONE_ITEM":
            return addOneItem(state, action.payload)
        case "REMOVE_ONE_ITEM":
            return removeOneItem(state, action.payload)
        case "DELETE_ITEM":
            return deleteItem(state, action.payload)
        case "ADDRESS_SELECTED":
            return address_selected(state, action.payload)
        case "ORDER_TYPE_SET":
            return order_type_set(state, action.payload)
        default:
            return;
    }
};

export default reducer;
