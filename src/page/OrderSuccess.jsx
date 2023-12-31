import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { cartActions } from '../redux/features/cart/cartSlice';

function OrderSuccess() {
   
  return (
    <div>
        <h2>Your order has been successfully processed</h2>
        <p>You should receive an order information in your emails! Thanks for purchasing in our store!</p>
        <Link to={'/'}>
            <button className='btn'>Go back</button>
        </Link>
    </div>
  )
}

export default OrderSuccess