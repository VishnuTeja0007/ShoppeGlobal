export const addAction = (state, action) => {
    const existing = state.cartItems.find((item) => item.id === action.payload.id);

    if (existing) {
        existing.noOfItems += 1;
    } else {
        state.cartItems.push({ ...action.payload, noOfItems: 1 });
    }

    state.totalQuantity += 1;
};

// export const removeFromCart={state}