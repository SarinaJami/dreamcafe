import { useRef, useState } from 'react';
import './App.css'
import { ScrollNavbar } from './components'
import { Header, About, Menu, Gallery, Contact, OrderList, Cart } from './containers'
import { item01, item02, item03, item04, item05, item06 } from './assets/images';
import { TbSettingsDollar } from 'react-icons/tb';
const itemImages = [item01, item02, item03, item04, item05, item06];
const itemName = ['Latte', 'Americano', 'Mocha', 'Cappuccino', 'Caramel Macchiato', 'Irish Coffee'];
const prices = [6.8, 5, 6.8, 6.5, 5.6, 7.5];

const menuItems = itemName.map((name, index) => ({
  id: index,
  name: name,
  image: itemImages[index],
  price: prices[index],
}))

function App() {
  const [isOrderListVisible, setIsOrderListVisible] = useState(false);
  const [orderCount, setOrderCount] = useState({});
  const [toggleMenu, setToggleMenu] = useState(false);
  const navbarRef = useRef(null);

  return (
    <div className='App'>
      <ScrollNavbar navbarRef={navbarRef} onOrderClick={() => {
        setIsOrderListVisible(true)
      }} toggleMenu={toggleMenu} setToggleMenu={setToggleMenu}
      />
      {isOrderListVisible && (
        <OrderList
          menuItems={menuItems}
          orderCount={orderCount}
          setOrderCount={setOrderCount}
          onClose={() => setIsOrderListVisible(false)}
          navbarRef={navbarRef}
        />
      )}
      <div className='gradient-bg header-section'>
        <Header />
      </div>
      <About />
      <Menu />
      <Gallery />
      <div className='gradient-bg-reverse'>
        <Contact />
      </div>
      {/* <Cart
        orderCount={orderCount}
        setOrderCount={setOrderCount}
      /> */}
    </div>
  );
}

export default App;
