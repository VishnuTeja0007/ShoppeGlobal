import Footer from '../components/Footer'
import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'

const RouterLayout = () => {
  return (
    <div>
      <Header />
        <Outlet />
    <Footer/>
    </div>
  )
}

export default RouterLayout
