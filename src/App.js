import { useRef, useState } from 'react';
import './App.css'
import { ScrollNavbar } from './components'
import { Header, About, Menu, Gallery, Contact, Cart } from './containers'

function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [orderCount, setOrderCount] = useState({});
  const navbarRef = useRef(null);

  return (
    <div className='App'>
      <ScrollNavbar navbarRef={navbarRef} onOrderClick={() => setIsCartVisible(true)} />
      {isCartVisible && (
        <Cart
          orderCount={orderCount}
          setOrderCount={setOrderCount}
          onClose={() => setIsCartVisible(false)}
          navbarRef={navbarRef}
        />
      )}
      <div className='gradient-bg header-section'>
        <Header />
      </div>
      <About />
      <Menu />
      <Gallery />
      <Contact />
    </div>
  );
}

export default App;
