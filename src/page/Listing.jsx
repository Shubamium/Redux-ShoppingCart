import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { cartActions } from "../redux/features/cart/cartSlice";

function Listing() {

    const products = useSelector((state)=> state.products);
    const itemInCart = useSelector((state)=> state.cart.length);
    return (
        <div>
            <p>Item in cart:{itemInCart}</p>
            {products.length}
            {products && products.map((product)=>{
                return (
                    <ProductList product={product} key={product.id}></ProductList>
                )
            })}
        </div>
    )
}

export default Listing



function ProductList({product}){
    const dispatch = useDispatch();
    const [variant,setVariant] = useState(1);
    const [qty,setQty] = useState(1);
    

    function handleAdd(){
        try{
            const quantity = parseInt(qty);
            const cartItem = {id:product.id,qty:quantity,variant:Math.floor(Math.random()*3)}
            dispatch(cartActions.add(cartItem));
        }catch(err){
            alert('Please enter a number for the quantity' + err);
        }
    }
    return (
        <div className="product-list">
            <img src={product.imageSrc} alt="" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.category}</p>
            <p>{product.price}</p>
            <div>
                {product.variants.map((variant,index)=>{
                    return <div key={index}>
                        <h4>Variant {index + 1}</h4>
                        <p>{variant.color}</p>
                        <p>{variant.size}</p>
                    </div>
                })}
            </div>
            <form onSubmit={(e)=>{e.preventDefault()}}>
                <label htmlFor="qty">Qty:</label>
                <input type="number" onChange={(e)=>setQty(e.target.value)} value={qty} min={1} max={99} name="qty" />
                <button onClick={handleAdd}>Add to cart</button>
            </form>
            {/* <p>{product.variants[0].size}</p> */}
        </div>
    )
}