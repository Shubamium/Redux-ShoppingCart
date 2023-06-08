import { useDispatch, useSelector } from "react-redux"
import { cartActions } from "../redux/features/cart/cartSlice";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    return (
        <div>
            <div className="cart">
                    {cart && cart.map((data)=>{
                        return (
                            <div key={data.productId}>
                                <h2>Product {data.productId}</h2>
                                {data.qty.map((variantList)=>(
                                    <div>
                                        <h3>Variant {variantList.variant}</h3>
                                        {/* <p>Size {variantList.size}</p> */}
                                        <p>Amount: {variantList.amount}</p>
                                    </div>
                                ))}
                                <button onClick={()=>{dispatch(cartActions.remove(data.productId))}}>Remove from cart</button>
                            </div>
                        )
                    })}
            </div>
        </div>
    ) 
}

function CartItemDisplayer(){

}
export default Cart