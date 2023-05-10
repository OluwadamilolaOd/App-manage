import Header from './Header'
import Sidebar from './Sidebar'
import Router from '../router/Router'

const Layout = (props) => {
  
  return (
    <>
    <div className='layout'>
      <div>
        <Header />
      </div>
      <div className="main_layout">
        <Sidebar setOpenModal={props.setOpenModal}/>
        <div className="content">
          <Router/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Layout
