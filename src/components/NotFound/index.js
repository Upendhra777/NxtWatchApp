import Navbar from '../Navbar'
import SideMenu from '../SideMenu'

import './index.css'

const NotFound = () => (
  <div className="navbar-side-menu-not-found-container">
    <Navbar />
    <div className="side-menu-and-not-found-container">
      <SideMenu />
      <div className="not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
          className="not-found-view"
          alt="not found view"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-description">
          we are sorry, the page you requested could not be found.
        </p>
      </div>
    </div>
  </div>
)

export default NotFound
