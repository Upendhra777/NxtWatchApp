import {Link} from 'react-router-dom'
import {FaHome, FaFire, FaGamepad, FaBookmark} from 'react-icons/fa'
import './index.css'
import NxtWatchContext from '../../context/NxtWatchContext'

const SideMenu = () => {
  const getThemeClassName = activeTheme =>
    activeTheme === 'Dark' ? 'dark-theme-side-menu' : 'light-theme-side-menu'

  const getListName = activeTheme =>
    activeTheme === 'Dark' ? 'white-list-name' : 'dark-list-name'
  const getIcon = activeTheme =>
    activeTheme === 'Dark' ? 'white-icon' : 'dark-icon'
  const getDescriptionTxt = activeTheme =>
    activeTheme === 'Dark' ? 'white-description' : 'dark-description'

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {activeTheme} = value
        const themeClassName = getThemeClassName(activeTheme)
        const listName = getListName(activeTheme)
        const listIcons = getIcon(activeTheme)
        const descriptionTxt = getDescriptionTxt(activeTheme)

        return (
          <div className={themeClassName}>
            <ul className="lists-container">
              <Link to="/" className="link-item">
                <li className="list-item">
                  <FaHome className={listIcons} />
                  <p className={listName}>Home</p>
                </li>
              </Link>

              <Link to="/trending" className="link-item">
                <li className="list-item">
                  <FaFire className={listIcons} />
                  <p className={listName}>Trending</p>
                </li>
              </Link>

              <Link to="/gaming" className="link-item">
                <li className="list-item">
                  <FaGamepad className={listIcons} />
                  <p className={listName}>Gaming</p>
                </li>
              </Link>

              <Link to="/saved-videos" className="link-item">
                <li className="list-item">
                  <FaBookmark className={listIcons} />
                  <p className={listName}>Saved videos</p>
                </li>
              </Link>
            </ul>

            <ul className="contact-us-section">
              <li>
                <p className={descriptionTxt}>CONTACT US</p>
              </li>
              <li className="social-media-icons">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  className="social-media-icon"
                  alt="facebook logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  className="social-media-icon"
                  alt="twitter logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  className="social-media-icon"
                  alt="linked in logo"
                />
              </li>
              <li>
                <p className={descriptionTxt}>
                  Enjoy! Now to see your <br /> channels and <br />
                  recommendations!
                </p>
              </li>
            </ul>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default SideMenu
