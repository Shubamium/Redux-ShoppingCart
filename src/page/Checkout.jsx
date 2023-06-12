import React from 'react'
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
        // For each cart
        carts.forEach(cart => {
            // Add the cart data and variant to render list
            const thisProduct = getProductData(cart.productId);
            const data = cart.qty.map((cartQty,index)=>(
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
                       ${thisProduct && (thisProduct.price*cartQty.amount).toFixed(2)}
                    </td>
                </tr>
            ));

            toRender.push(...data);
        })                
        return toRender;
    }
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
                {renderOrderSummary()} 
        </table>
    )
}
export default Checkout