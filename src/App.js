import { useRef, useState, useEffect } from 'react';
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
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [orderCount, setOrderCount] = useState({});
  const [finalOrder, setFinalOrder] = useState({});
  const navbarRef = useRef(null);
  const totalOrder = Object.values(finalOrder).reduce((sum, value) => sum + value, 0) 

  return (
    <div className='App'>
      <ScrollNavbar navbarRef={navbarRef} totalOrder={totalOrder} 
        onOrderClick={() => {
          setIsOrderListVisible(true)
          setIsCartVisible(false)
        }}
        onCartClick={() => {
          setIsCartVisible(true)
          setIsOrderListVisible(false)
        }}
      />
      {isOrderListVisible && (
        <OrderList
          menuItems={menuItems}
          orderCount={orderCount}
          setOrderCount={setOrderCount}
          setFinalOrder={setFinalOrder}
          onClose={() => {
            setIsOrderListVisible(false)
            setOrderCount(finalOrder)
          }}
          navbarRef={navbarRef}
          setIsCartVisible={setIsCartVisible}
          setIsOrderListVisible={setIsOrderListVisible}
        />
      )}
      {isCartVisible && (
        <Cart
          menuItems={menuItems}
          finalOrder={finalOrder}
          setFinalOrder={setFinalOrder}
          setOrderCount={setOrderCount}
          onClose={() => setIsCartVisible(false) }
          navbarRef={navbarRef}
          setIsCartVisible={setIsCartVisible}
          setIsOrderListVisible={setIsOrderListVisible}
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
    </div>
  );
}

export default App;
