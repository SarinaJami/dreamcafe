import './App.css'
import { ScrollNavbar } from './components'
import { Header, About, Menu, Gallery, Contact } from './containers'

function App() {
  return (
    <div className='App'>
      <ScrollNavbar />
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
