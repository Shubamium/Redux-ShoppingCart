import { useDispatch, useSelector } from "react-redux"
import { cartActions } from "../redux/features/cart/cartSlice";

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
                <img src="" alt="" className="product-img" />
            </div>
            <div className="center">
                <h2 className="name">{productData.name}</h2>
                {data.qty.map(variantList => {
                    const variantData = productData.variants[variantList.variant];
                    return (
                        <div>
                            {/* <h3>Variant {variantData.color}</h3> */}
                            {/* <p>Size {variantData.size}</p> */}
                            <p>Amount: {variantList.amount}</p>
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