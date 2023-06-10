import { useDispatch, useSelector } from "react-redux"
import { cartActions } from "../redux/features/cart/cartSlice";
import { json } from "react-router-dom";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const toRender = [...cart].reverse();
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
                This is the checkout stuff
                <div className="checkout-panel">
                    <h2>Total</h2>
                    <p>$3204.99</p>
                </div>
            </div>
        </div>
    ) 
}

function CartItemDisplayer({data}) {

    const dispatch = useDispatch();
    const productData = useSelector((state) => state.products[data.productId-1]);
    const getSubTotal = ()=>{
        let price = 0;
        data.qty.forEach((variant)=>{
            price += productData.price * variant.amount;
        })
        return price;
    }
    return (
        <div className="cart-item">
            <div className="img">
                <img src="https://images.squarespace-cdn.com/content/v1/5bf4bf814611a019a7c475f0/1562038085083-DLUD125WWPOUTGYD8Q60/ke17ZwdGBToddI8pDm48kHH9S2ID7_bpupQnTdrPcoF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0nQwvinDXPV4EYh2MRzm-RRB5rUELEv7EY2n0AZOrEupxpSyqbqKSgmzcCPWV5WMiQ/product%2Bphotography" alt="" className="product-img" />
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
                                        <button className="btn">-</button>
                                             <p className="qty"> {variantList.amount}</p>
                                        <button className="btn">+</button>
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
                        <h2 className="price">${getSubTotal()}</h2>
                </div>
                <button className="btn" onClick={() => {dispatch(cartActions.remove(data.productId));}}>Remove from cart</button>
            </div>
        </div>
    );
}
    export default Cart