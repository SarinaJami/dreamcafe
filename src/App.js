import './App.css'
import { Navbar } from './components'
import { Header, About, Menu, Gallery, Contact } from './containers'

function App() {
  return (
    <div className='App'>
      <div className='gradient-bg header-section'>
        <Navbar />
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
