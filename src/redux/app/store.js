import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/product/productSlice";

const store = configureStore({
    reducer:{
        products:productReducer,
        cart:cartReducer
    }
})


export default store;