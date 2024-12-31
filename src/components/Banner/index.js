import {GrFormClose} from 'react-icons/gr'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const Banner = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {removeBanner, removeBannerFunction} = value

      const onClickCancelIcon = () => {
        removeBannerFunction(!removeBanner)
      }

      return (
        !removeBanner && (
          <div data-testid="banner" className="banner-section">
            <div className="description-and-cancel-section">
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  className="nxt-watch-logo"
                  alt="nxt watch logo"
                />
                <p className="plans-text">
                  Buy Nxt Watch Premium prepaid plans with <br /> UPI
                </p>
              </div>
              <button type="button" className="get-it-now-btn">
                GET IT NOW
              </button>
            </div>
            <button
              data-testid="close"
              type="button"
              className="button"
              onClick={onClickCancelIcon}
            >
              <GrFormClose className="cancel-icon" />
            </button>
          </div>
        )
      )
    }}
  </NxtWatchContext.Consumer>
)

export default Banner
