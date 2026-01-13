import { createSlice } from "@reduxjs/toolkit"
import { addAction } from "./cartActions"
const cartSlice = createSlice({
    name: "cartItems",
    initialState: {
        cartItems: [],
        totalQuantity: 0
    },
    reducers: {
        addToCart:addAction,
        removeFromCart: (state) => {
            state.cartItems.pop()
        },
        clearCart: (state) => {
            state.cartItems = []
        }
    }
})
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer