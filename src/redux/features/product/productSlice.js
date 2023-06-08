import { createSlice } from "@reduxjs/toolkit";
import data from '../../../db/db.json'

const initialState = data.products;
const productSlice = createSlice({
    name:'product',
    initialState,
});

// export const cartActions = cartSlice.actions;
const productReducer = productSlice.reducer;
export default productReducer;