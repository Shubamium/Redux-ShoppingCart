import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cartActions } from '../redux/features/cart/cartSlice';

function Checkout() {

    const dispatch = useDispatch();
    const carts = useSelector((state)=>state.cart);
    const {state} = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        if(state === null || carts == null || carts.length === 0){
            console.log(carts);
            navigate('/');
        }
    },[carts]);
    
    if(!state) return <></>;

    const shippingFee = (parseFloat(state.price) / 100) * 2;
    const vat = parseFloat((state.price / 100) * 4.5);
    const totalPrice = (parseFloat(state.price) + vat + shippingFee).toFixed(2);
    
    function placeOrder(){
        dispatch(cartActions.order());
    }
    return (
        <div id="checkout">
            <div className='order-info'>
                <h2 className='page-title'>Checkout</h2>
                <p className='page-desc'>Finalize your order and complete the order! </p>
                <OrderSummary/>
                <BillingInfo/>
                <PaymentInfo/>
                <ShippingInfo/>
            </div>
            <div className='action'>
               <div className="floating">
                <div className="order-notes">
                    <label htmlFor="">Order Notes (Optional)</label>
                    <textarea name="" id="" cols="30" rows="10" placeholder='Message for the seller. . .'></textarea>
                </div>

                <div className="all-prices">
                    <p><span className='field'>Shipping Fee:</span> <span className='price'>${shippingFee.toFixed(2)}</span></p>
                    <p><span className='field'>Discount:</span> <span className='price'>$0</span></p>
                    <p><span className='field'>VAT:</span> <span className='price'>${vat.toFixed(2)}</span></p>
                </div>

                <div className="end">
                    <div className="prices-total">
                        <h2>Total</h2>
                        <p className='price'>${totalPrice}</p>
                    </div>
                    <div className='cta'>
                       <Link to={'/checkout/success'}>
                       <button className='btn' onClick={()=>placeOrder()}>Place Order</button>
                       </Link>
                    </div>
                </div>
               </div>
            </div>
            
        </div>
    )
}

function BillingInfo(){
    return (
        <div className='checkout-form-section'>
            <h2>Billing Info:</h2>
            <form className='form'>
                <div className="vstack">
                    <div className="input-field">
                        <label htmlFor="fname">First Name</label>
                        <input type="text" name='fname' placeholder='John'/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" name='lname' placeholder='Doe'/>
                    </div>
                </div>
                <div className="vstack phone">
                   <div className="input-field">
                        <label htmlFor="ctcode">Phone Number</label>
                        <input type="number" name='ctcode' placeholder='+62'/>
                    </div>
                    <input type="number" className='number' placeholder='000-000-000' />
                </div>
                <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' placeholder='john.doe31@gmail.com'/>
                </div>
            </form>
        </div>
    )
}

function PaymentInfo(){
    return (
        <div className='checkout-form-section'>
            <h2 >Payment Info:</h2>
            <form className='form'>

                <div className="input-field">
                    <label htmlFor="ccnum">CC Number</label>
                    <input type="text" name='ccnum' placeholder='Credit-Card number'/>
                </div>

                <div className="vstack">
                   <div className="input-field">
                        <label htmlFor="m">Month</label>
                        <select>
                            <option>Jan</option>
                            <option>Feb</option>
                            <option>Mar</option>
                            <option>Apr</option>
                            <option>May</option>
                            <option>Jun</option>
                            <option>Jul</option>
                            <option>Aug</option>
                            <option>Sep</option>
                            <option>Okt</option>
                            <option>Nov</option>
                            <option>Dec</option>
                        </select>
                    </div>
                    <div className="input-field">
                        <label htmlFor="y">Year</label>
                        <input type="number" name='y' max={2030} min={0} placeholder='0000'/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="cvc">CVC</label>
                        <input type="number" name='cvc' placeholder='Card CVC'/>
                    </div>
                </div>

                <div className="input-field">
                        <label htmlFor="email">Cardholder Name</label>
                        <input type="email" name='email' placeholder='Joe Mama'/>
                </div>

            </form>
        </div>
    )
}

function ShippingInfo(){
    return (
        <div className='checkout-form-section'>
            <h2>Shipping Info:</h2>
            <form className='form'>

                <div className="input-field">
                    <label htmlFor="fname">Full Name</label>
                    <input type="text" name='fname' placeholder='Adress Name'/>
                </div>
                <div className="input-field">
                    <label htmlFor="ad1">Address 1</label>
                    <input type="text" name='ad2' placeholder='Addres Line 1'/>
                </div>
                <div className="input-field">
                    <label htmlFor="ad2">Address Line 2 (optional)</label>
                    <input type="text" name='ad2' placeholder='Adress line 2'/>
                </div>
                <div className="vstack">
                   <div className="input-field">
                        <label htmlFor="city">City</label>
                        <input type="text" name='y' max={2030} min={0} placeholder='City Name'/>
                       
                    </div>
                    <div className="input-field">
                        <label htmlFor="state">State</label>
                        <input type="text" name='state'  placeholder='State/Region/Province'/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="zip">Zip Code:</label>
                        <input type="number" name='zip' placeholder='Zip - 00000'/>
                    </div>
                </div>

                <div className="input-field">
                        <label htmlFor="country">Country</label>
                        <input type="name" name='Country' placeholder='Country/Nation'/>
                </div>
                  <div className="vstack">
                      <label htmlFor="tos">By filling the forms and procceeding with the checkout, you agree to our <a>Terms of Services</a></label>
                      <input type="checkbox" name="tos" id="tos" />
                  </div>

            </form>
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
                totalPrice += parseFloat(price);
                return (
                    <tr key={index} className='order-summary'>
                        <td>
                              { thisProduct && thisProduct.name}
                        </td>
                        <td>
                             <span>{thisProduct.variants[cartQty.variant].color}</span> - <span className='price'>{thisProduct.variants[cartQty.variant].size}</span> 
                        </td>
                        <td>
                            {cartQty.amount}
                        </td>
                        <td className='price'>
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
        <table className='payment-info'>
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
                    <td colSpan={2} align='right' className='total'>Price Total:</td>
                    <td colSpan={2} className='price'> ${totalPrice.toFixed(2)} </td>
                </tr>
        </table>
    )
}
export default Checkout