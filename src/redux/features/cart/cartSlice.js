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
        },
        increment:(state,action)=>{
            const productId = state.findIndex((cart)=>cart.productId === action.payload.id);
            state[productId].qty[action.payload.variant].amount += 1;
            
        },
        decrement:(state,action)=>{
            const productId = state.findIndex((cart)=>cart.productId === action.payload.id);
            const thisVariant = state[productId].qty[action.payload.variant];
            const qty = state[productId].qty;
            thisVariant.amount -= 1;
            if(thisVariant.amount <= 0){
                // thisVariant.amount = 0;
                qty.splice(action.payload.variant,1);
                if(qty.length <= 0){
                    console.log('spliced');
                    state.splice(productId,1);
                }               
            }
        }
    }
});

export const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;