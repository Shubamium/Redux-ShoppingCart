import { createSlice } from "@reduxjs/toolkit";
import data from '../../../db/db.json'

const initialState = data.reviews;

const reviewSlice = createSlice({
    name:'reviews',
    initialState
})

export const reviewReducer = reviewSlice.reducer;
export default reviewSlice;
