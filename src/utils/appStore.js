import {configureStore} from "@reduxjs/toolkit"
import cartSlicer from "./cartSlicer.js"
import searchSlice from "./searchSlice.js"
const appStore=configureStore({
    reducer:{
        cart:cartSlicer,
        search:searchSlice
    }
})

export default appStore