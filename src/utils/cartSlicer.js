import { createSlice } from "@reduxjs/toolkit";
import { addAction, decreaseItem, removeFromCart } from "./cartActions";

// Redux slice for managing cart state
const cartSlice = createSlice({
    name: "cartItems",
    initialState: {
        cartItems: [],
        totalQuantity: 0
    },
    reducers: {
        addToCart: addAction,
        decreaseCart: decreaseItem,
        removeCart: removeFromCart,
        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
        }
    }
});

export const { addToCart, decreaseCart, removeCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;