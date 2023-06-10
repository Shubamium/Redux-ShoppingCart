import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { cartActions } from "../redux/features/cart/cartSlice";
function Listing() {

    const products = useSelector((state)=> state.products);
    const itemInCart = useSelector((state)=> state.cart.length);
    return (
        <div className="listing">
            <div className="category">
                <h2>Category</h2>
                <ul>
                    <li>
                        <a href="">Clothing</a>
                    </li>
                    <li>
                        <a href="">Accesories</a>
                    </li>
                    <li>
                        <a href="">Footwear</a>
                    </li>
                </ul>
            </div>
            <div className="product-list">
                    {products.map((product)=>{
                        return <ProductList product={product}></ProductList>
                    })}
            </div>
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
        <div className="product">
            <img className="prod-img" src={'https://lzd-img-global.slatic.net/g/p/a1fa48a04c8c30705c9c2ea1bbf6d3d0.jpg_720x720q80.jpg_.webp'} alt="" />
            <div className="prod-data">
                <h2 className="name">{product.name}</h2>
                <p className="category">{product.category}</p>
                <p className="desc">{product.description}</p>
                {/* <div className="variants">
                    {product.variants.map((variant,index)=>{
                        return <div key={index}>
                            <h4>Variant {index + 1}</h4>
                            <p>{variant.color}</p>
                            <p>{variant.size}</p>
                        </div>
                    })}
                </div> */}
               
            </div>
            <form className="prod-footer" onSubmit={(e)=>{e.preventDefault()}}>
                    <p className="price">${product.price}</p>
                    {/* <label htmlFor="qty">Qty:</label> */}
                    {/* <input type="number" onChange={(e)=>setQty(e.target.value)} value={qty} min={1} max={99} name="qty" /> */}
                    <button className="btn cart-btn" onClick={handleAdd}>Add to cart</button>
            </form>
            {/* <p>{product.variants[0].size}</p> */}
        </div>
    )
}