import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/app/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Listing from './page/listing.jsx'
import Cart from './page/Cart.jsx'

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
