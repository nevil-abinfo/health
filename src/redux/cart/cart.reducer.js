import CartActionTypes from './card.types.js';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){

        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case CartActionTypes.GET_ALL_CART_ITEM:
            return {
                ...state,
                cartItems: action.payload || []
            }
            default:
                return state;
    }
}

export default cartReducer;