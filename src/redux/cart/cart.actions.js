import CartActionTypes from './card.types'

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
})

export const getAllCartItem = item => ({
    type: CartActionTypes.GET_ALL_CART_ITEM,
    payload: item
})
