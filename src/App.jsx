
import { Header } from './components/Header'
import { Productlist } from './components/ProductList'
import "./index.css"

function App() {
  
  return <div className='bg-bg text-text min-h-screen flex flex-col gap-[10px] '>
    <Header/>
    <div className='main w-screen h-auto p-10'>
    <Productlist></Productlist>
    </div>
  </div>
  

}

export default App
