import { useDispatch, useSelector } from "react-redux"
import { cartActions } from "../redux/features/cart/cartSlice";
import { json } from "react-router-dom";
import { useMemo } from "react";


function getSubTotal(cartItem,productData){
    let price = 0;
    cartItem.qty.forEach((variant)=>{
       if(!isNaN(variant.amount)){
            price += parseFloat(productData.price) * variant.amount;
       }
    })
    return price.toFixed(2);

}


const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const productData = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const toRender = [...cart].reverse();

    const getPriceTotal = () => {
        let priceTotal = 0;
        cart.forEach((item)=>{
            let itemPrice = parseFloat(getSubTotal(item,productData[item.productId - 1]));
            priceTotal += itemPrice;
        })
        return priceTotal.toFixed(2);
    }
    const price = useMemo(()=>{return getPriceTotal()},[cart]);
    return (
        <div className="cart">
            <div className="cart-listing">
                {cart && toRender.map((data)=>{
                    return (
                      <CartItemDisplayer key={data.productId}  data={data} />
                    )
                })}
                {cart.length === 0 && <p>There's no item in your cart</p>}
            </div>
            <div className="cart-action">
                {/* This is the checkout stuff */}
                <div className="checkout-panel">
                    <div className="coupon">
                        <div className="field">
                            <label htmlFor="coupon-field">Coupon Codes</label>
                            <input type="text" name="coupon-field"/>
                        </div>
                        <button className="btn">Apply</button>
                    </div>
                    <div className="footer">
                        <div className="price-field">
                            <h2>Total</h2>
                            <p className="price">${price}</p>
                        </div>
                        <div>
                          <button className="btn">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

function CartItemDisplayer({data}) {

    const dispatch = useDispatch();
    const productData = useSelector((state) => state.products[data.productId-1]);
   
    return (
        <div className="cart-item">
            <div className="img">
                <img src={productData.imageSrc} alt="" className="product-img" />
            </div>
            <div className="center">
                <div className="info">
                    <h2 className="name">{productData.name}</h2>
                    <p className="desc">{productData.description}</p>
                </div>
                <div className="variant-list">
                {data.qty.map((variantList,index) => {
                        const variantData = productData.variants[variantList.variant];
                        return (
                            <div className="variant" key={index}>
                                <div className="left">
                                    <h3 className="color">{variantData.color}</h3>
                                    <p>{variantData.size}</p>
                                </div>
                                <div className="right">
                                        {/* <input type="text" /> */}
                                        <button className="btn" onClick={()=>{dispatch(cartActions.decrement({id:data.productId,variant:index}))}}>-</button>
                                             <p className="qty"> {variantList.amount}</p>
                                        <button className="btn" onClick={()=>{dispatch(cartActions.increment({id:data.productId,variant:index}))}}>+</button>
                                </div>
                            </div>
                        )
                    }
                )}
                </div>
            </div>
            <div className="end">
                <div className="total">
                        <p>Sub Total:</p>
                        <h2 className="price">${getSubTotal(data,productData)}</h2>
                </div>
                <button className="btn" onClick={() => {dispatch(cartActions.remove(data.productId))}}>Remove from cart</button>
            </div>
        </div>
    );
}
    export default Cart