import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom';

import './style/index.scss';


// Add coupons functionality one price discount
// Add Out of stock indicator/functionality

function App() {
    const product = useSelector((state)=>state.products);  
    return (
      <div>
          <header>
            <div className="confine">
              <h1 className='title'>Redux <span>Shopping Cart</span></h1>
              
              <nav>
                  <Link className='nav-link' to={'/'}>Home</Link>
                  <Link className='nav-link' to={'/cart'}>Cart</Link>
              </nav>
            </div>
          </header>
          <main>
             <Outlet/>
          </main>
      </div>
    )
}

export default App
