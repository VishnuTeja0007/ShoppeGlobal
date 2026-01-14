export const addAction = (state, action) => {
    const existing = state.cartItems.find((item) => item.id === action.payload.id);
    
    if (existing) {
        existing.noOfItems += 1;
    } else {
        state.cartItems.push({ ...action.payload, noOfItems: 1 });
    }

    state.totalQuantity += 1;
};
export const decreaseItem = (state, action) => {
    const existing = state.cartItems.find((item) => item.id === action.payload.id);
    
    if (existing) {
        if (existing.noOfItems > 1) {
            // Just decrease
            existing.noOfItems -= 1;
            state.totalQuantity -= 1;
        } 
    }
};

export const removeFromCart=(state,action)=>{
    const existing = state.cartItems.find((item) => item.id === action.payload.id);
    if (!existing) return;

    // Reduce total quantity by however many of this item are in the cart
    state.totalQuantity = Math.max(0, state.totalQuantity - (existing.noOfItems ?? 0));
    // Remove the item entirely
    state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
}