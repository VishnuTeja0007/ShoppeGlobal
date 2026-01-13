import {configureStore} from "@reduxjs/toolkit"
import cartSlicer from "./cartSlicer.js"
const appStore=configureStore({
    reducer:{
        cart:cartSlicer,
    }
})

export default appStore