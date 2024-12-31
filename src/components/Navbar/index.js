import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import {FaMoon} from 'react-icons/fa'
import {WiDaySunny} from 'react-icons/wi'
import cookies from 'js-cookie'
import {useHistory, Link} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

const Navbar = () => {
  const history = useHistory()

  const onclickLogOutBtn = () => {
    cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {activeTheme, changeTheme} = value

        const navContainerClass =
          activeTheme === 'Dark' ? 'nav-black' : 'nav-container'

        const logoutBtn =
          activeTheme === 'Dark' ? 'white-logout-btn' : 'blue-logout-btn'
        const popupSection =
          activeTheme === 'Dark'
            ? 'dark-theme-popup-section'
            : 'light-theme-popup-section'
        const popupDescription =
          activeTheme === 'Dark'
            ? 'dark-theme-popup-description'
            : 'light-theme-popup-description'

        const onClickMoonIcon = () => {
          const newTheme = activeTheme === 'Dark' ? 'Light' : 'Dark'
          changeTheme(newTheme)
        }

        return (
          <nav className={navContainerClass}>
            <Link to="/">
              <img
                src={
                  activeTheme === 'Dark'
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                className="nxt-watch-logo"
                alt="website logo"
              />
            </Link>
            <div className="moon-profile-logout-container">
              {activeTheme === 'Dark' ? (
                <button
                  data-testid="theme"
                  type="button"
                  className="button"
                  onClick={onClickMoonIcon}
                >
                  <WiDaySunny className="wi-sunny-logo" />
                </button>
              ) : (
                <button
                  data-testid="theme"
                  type="button"
                  className="button"
                  onClick={onClickMoonIcon}
                >
                  <FaMoon className="fa-moon-logo" />
                </button>
              )}
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                className="profile"
                alt="profile"
              />

              <Popup
                modal
                trigger={
                  <button type="button" className={logoutBtn}>
                    Logout
                  </button>
                }
              >
                {close => (
                  <div className={popupSection}>
                    <p className={popupDescription}>
                      Are you sure, you want to logout?
                    </p>
                    <div className="buttons-container">
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="confirm-btn"
                        onClick={onclickLogOutBtn}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </nav>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default Navbar
