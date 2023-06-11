import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cartActions } from "../redux/features/cart/cartSlice";

function DetailedProduct(){
    const [variant,setVariant] = useState(0);
    const [qty,setQty] = useState(1);

    const dispatch = useDispatch();
    const {prodId} = useParams();
    const product = useSelector((state)=>state.products[state.products.findIndex((prod)=> prod.id === prodId)]);
    const reviews = useSelector((state)=>state.reviews[state.reviews.findIndex((reviews) => reviews.prodId === prodId)] );

    function handleAdd(){
        try{
            const quantity = parseInt(qty);
            const cartItem = {id:product.id,qty:quantity,variant:variant}
            dispatch(cartActions.add(cartItem));
        }catch(err){
            alert('Please enter a number for the quantity' + err);
        }
    }

    return (
        <div className="product-page">
            <section className="product-detail">
                <div>
                    <img className="prod-img" src={product.imageSrc || 'https://lzd-img-global.slatic.net/g/p/a1fa48a04c8c30705c9c2ea1bbf6d3d0.jpg_720x720q80.jpg_.webp'} alt="" />
                </div>
                <div className="prod-data">
                    <h2 className="name">{product.name}</h2>
                    <p className="category">{product.category}</p>
                    <p className="desc">{product.description}</p>
                    <div className="reviews">
                        {reviews && reviews.reviews.map((review,index)=>{
                            return (
                                 <div className="review" key={index}>
                                        <div className="img">
                                                <img className="profile-pic" src="https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png" alt="" />
                                        </div>
                                        <div className="detail">
                                            <h2 className="reviewer-name">{review.name}</h2>
                                            <p className="reviewer-text">{review.review}</p>
                                        </div>
                                        <div className="score">
                                            <p>{review.starReview}</p>
                                            {/* stars */}
                                        </div>
                                 </div>
                            )
                        })}
                    </div>
                </div>
                <form className="prod-action" onSubmit={(e)=>{e.preventDefault()}}>
                    <div className="floating">
                        <div className="variant-field">
                            <p>Variant:</p>
                            <div className="variants">
                                    {product.variants.map((variantData,index)=>{
                                        return <button className={`variant ${index == variant && 'selected'}`} onClick={()=>setVariant(index)} key={index}>
                                            <p className="type">{variantData.color}</p>
                                            <p className="size">{variantData.size}</p>
                                        </button>
                                    })}
                            </div>
                        </div>
                        
                        <div className="pricing-field">
                            <h2 className="heading">Total</h2>
                            <p className="price">${product.price}</p>
                            <button className="btn cart-btn" onClick={handleAdd}>Add to cart</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default DetailedProduct