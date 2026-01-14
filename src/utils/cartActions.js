// Action to add an item to the cart or increment its quantity
export const addAction = (state, action) => {
    const existing = state.cartItems.find((item) => item.id === action.payload.id);
    
    if (existing) {
        existing.noOfItems += 1;
    } else {
        state.cartItems.push({ ...action.payload, noOfItems: 1 });
    }

    state.totalQuantity += 1;
};

// Action to decrease the quantity of an item
export const decreaseItem = (state, action) => {
    const existing = state.cartItems.find((item) => item.id === action.payload.id);
    
    if (existing) {
        if (existing.noOfItems > 1) {
            existing.noOfItems -= 1;
            state.totalQuantity -= 1;
        } 
    }
};

// Action to remove an item entirely from the cart
export const removeFromCart = (state, action) => {
    const existing = state.cartItems.find((item) => item.id === action.payload.id);
    if (!existing) return;

    // Reduce total quantity by however many of this item are in the cart
    state.totalQuantity = Math.max(0, state.totalQuantity - (existing.noOfItems ?? 0));
    // Remove the item entirely
    state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
};