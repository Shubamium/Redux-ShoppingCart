import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function Checkout() {

    const carts = useSelector((state)=>state.cart);

    return (
        <div id="checkout">
            <h2>Checkout</h2>
            <OrderSummary/>
            <div className='action'>

            </div>
            
        </div>
    )
}

function OrderSummary(){
    const carts = useSelector((state)=>state.cart);
    const productData = useSelector((state)=>state.products);
    const getProductData = (prodId) =>{
        const findIndex = productData.findIndex((prod) => prod.id === prodId)
        return productData[findIndex] || null;
    }
    function renderOrderSummary(){
        let toRender = [];
        let totalPrice = 0;
        // For each cart
        carts.forEach(cart => {
            // Add the cart data and variant to render list
            const thisProduct = getProductData(cart.productId);
            const data = cart.qty.map((cartQty,index)=> {
                let price = (thisProduct.price*cartQty.amount).toFixed(2);
                totalPrice += parseInt(price);
                return (
                    <tr key={index} className='order-summary'>
                        <td>
                              { thisProduct && thisProduct.name}
                        </td>
                        <td>
                             <span>{thisProduct.variants[cartQty.variant].color}</span> - <span>{thisProduct.variants[cartQty.variant].size}</span> 
                        </td>
                        <td>
                            {cartQty.amount}
                        </td>
                        <td>
                           ${thisProduct && price}
                        </td>
                    </tr>
                )
            });

            toRender.push(...data);
        })                
       
        return {toRender,totalPrice};
    }

    const {totalPrice,toRender} = renderOrderSummary()
    return(
        <table className='payment-info' border='2px'>
                <thead>
                 <h2>Order Summary</h2>
                </thead>
                <tr>
                    <th>
                            Name
                    </th>
                    <th>
                            Variant
                    </th>
                    <th>
                            Qty
                    </th>
                    <th>
                        Price
                    </th>
                </tr>
                {toRender} 
                <tr>
                    <td colSpan={2} align='right'>Price Total:</td>
                    <td colSpan={2}> ${totalPrice} </td>
                </tr>
        </table>
    )
}
export default Checkout