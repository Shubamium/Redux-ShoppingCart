import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/app/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Listing from './page/listing.jsx'
import Cart from './page/Cart.jsx'
import DetailedProduct from './page/DetailedProduct.jsx'
import Checkout from './page/Checkout.jsx'

const router = createBrowserRouter([
  {
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Listing/>
      },{
        path:'/cart',
        element:<Cart/>
      },
      {
        path:'/category/:category',
        element:<Listing/>
      },
      {
        path:'/product/:prodId',
        element:<DetailedProduct/>
      },{
        path:'/checkout',
        element:<Checkout/>
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
