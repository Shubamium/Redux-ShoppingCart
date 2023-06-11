import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/product/productSlice";
import { reviewReducer } from "../features/review/reviewSlice";

const store = configureStore({
    reducer:{
        products:productReducer,
        cart:cartReducer,
        reviews:reviewReducer
    }
})


export default store;