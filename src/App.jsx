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
            <h2>Redux Shopping Cart Example</h2>
            <nav>
                <Link to={'/'}>Home</Link>
                <Link to={'/cart'}>Cart</Link>
            </nav>
          </header>
          <main>
             <Outlet/>
          </main>
      </div>
    )
}

export default App
