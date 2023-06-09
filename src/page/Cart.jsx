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
                      <CartItemDisplayer   data={data} />
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
    return (
        <div key={data.productId}>
            <h2>Product {data.productId}</h2>
            {data.qty.map(variantList => <div>
                    <h3>Variant {variantList.variant}</h3>
                    {/* <p>Size {variantList.size}</p> */}
                    <p>Amount: {variantList.amount}</p>
                                    </div>
            )}<button onClick={() => {dispatch(cartActions.remove(data.productId));}}>Remove from cart</button>
        </div>
    );
}
    export default Cart