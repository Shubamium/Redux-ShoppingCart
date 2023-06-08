import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        add:(state,action)=>{
            // const {id,variant,qty} = action.payload; 
            // const cartItem = {id,variant,qty};
            const inCart = state.findIndex((cartItem) => cartItem.productId === action.payload.id);
            if(inCart === -1){
                const {id,variant,qty} = action.payload;
                const cartItem = {
                    productId:id,
                    qty:[]
                }
                cartItem.qty.push({variant:variant,amount:qty});
                state.push(cartItem);
            }else{
                const prevVariant = state[inCart].qty.findIndex((quantity) => quantity.variant === action.payload.variant);
                if(prevVariant !== -1){
                    state[inCart].qty[prevVariant].amount += action.payload.qty;
                }else{
                    state[inCart].qty.push({variant:action.payload.variant,amount:action.payload.qty});
                }
             
            }
        },
        remove:(state,action)=>{
            const cartItemIndex = state.findIndex((val) => val.productId === action.payload);
            state.splice(cartItemIndex,1);
        }
    }
});

export const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;