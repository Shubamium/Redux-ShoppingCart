import { useDispatch, useSelector } from "react-redux"
import { cartActions } from "../redux/features/cart/cartSlice";
import { json } from "react-router-dom";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    return (
        <div className="cart">
            <div className="cart-listing">
                {cart && cart.map((data)=>{
                    return (
                      <CartItemDisplayer key={data.productId}  data={data} />
                    )
                })}
                {cart.length === 0 && <p>There's no item in your cart</p>}
            </div>
            <div className="cart-action">
                This is the checkout stuff
            </div>
        </div>
    ) 
}

function CartItemDisplayer({data}) {

    const dispatch = useDispatch();
    const productData = useSelector((state) => state.products[data.productId]);
   
    return (
        <div className="cart-item">
            <div className="img">
                <img src="https://images.squarespace-cdn.com/content/v1/5bf4bf814611a019a7c475f0/1562038085083-DLUD125WWPOUTGYD8Q60/ke17ZwdGBToddI8pDm48kHH9S2ID7_bpupQnTdrPcoF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0nQwvinDXPV4EYh2MRzm-RRB5rUELEv7EY2n0AZOrEupxpSyqbqKSgmzcCPWV5WMiQ/product%2Bphotography" alt="" className="product-img" />
            </div>
            <div className="center">
                <h2 className="name">{productData.name}</h2>
                {data.qty.map((variantList,index) => {
                    const variantData = productData.variants[variantList.variant];
                    return (
                        <div className="shopping-cart" key={index}>
                            <h3>{variantData.color}</h3>
                            <p>Size {variantData.size}</p>
                            <p> {variantList.amount}</p>
                        </div>
                    )
                }
                )}
            </div>
            <button className="btn" onClick={() => {dispatch(cartActions.remove(data.productId));}}>Remove from cart</button>
            <div className="end">
                <div className="total">
                        <p>Sub total:</p>
                        <h2 className="price">$222</h2>
                </div>
            </div>
        </div>
    );
}
    export default Cart