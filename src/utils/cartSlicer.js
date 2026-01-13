import { createSlice } from "@reduxjs/toolkit"
import { addAction, decreaseItem, removeFromCart } from "./cartActions"
const cartSlice = createSlice({
    name: "cartItems",
    initialState: {
        cartItems: [],
        totalQuantity: 0
    },
    reducers: {
        addToCart:addAction,
        decreaseCart: decreaseItem,
        removeCart: removeFromCart,
        clearCart: (state) => {
            state.cartItems = []
        }
    }
})
export const { addToCart, decreaseCart, removeCart, clearCart } = cartSlice.actions

export default cartSlice.reducer