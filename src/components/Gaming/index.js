import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaGamepad} from 'react-icons/fa'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import SideMenu from '../SideMenu'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

class Gaming extends Component {
  state = {
    GamingVideosData: [],
    isLoading: true,
    isFailure: false,
  }

  componentDidMount() {
    this.getGamingData()
  }

  successResponse = data => {
    const updatedGamingData = data.map(gamingVideo => ({
      id: gamingVideo.id,
      title: gamingVideo.title,
      thumbnailUrl: gamingVideo.thumbnail_url,
      viewCount: gamingVideo.view_count,
    }))
    this.setState({GamingVideosData: updatedGamingData, isLoading: false})
  }

  failureResponse = () => {
    this.setState({isFailure: true, isLoading: false})
  }

  getGamingData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      this.successResponse(fetchedData.videos)
    } else {
      this.failureResponse()
    }
  }

  getGamingHeadingContainer = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-gaming-heading-container'
      : 'light-theme-gaming-heading-container'

  getGamingVideos = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-gaming-videos'
      : 'light-theme-gaming-videos'

  getGamingVideoTitle = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-gaming-video-title'
      : 'light-theme-gaming-video-title'

  getGameIcon = activeTheme =>
    activeTheme === 'Dark' ? 'dark-theme-game-icon' : 'light-theme-game-icon'

  getGamingIconContainer = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-gaming-icon-container'
      : 'light-theme-gaming-icon-container'

  renderGamingVideosSection = activeTheme => {
    const {GamingVideosData, isLoading, isFailure} = this.state

    if (isLoading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
        </div>
      )
    }

    if (isFailure) {
      return (
        <div className="gaming-failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
            className="failure-view"
            alt="failure view"
          />
          <h1 className="failure-heading">Oops! Something Went Wrong</h1>
          <p className="failure-description">
            We are having some trouble to complete your request. <br /> Please
            try again.
          </p>
          <button
            type="button"
            className="retry-btn"
            onClick={this.getGamingData}
          >
            Retry
          </button>
        </div>
      )
    }

    return (
      <>
        <div className="gaming-videos-section">
          <div className={this.getGamingHeadingContainer(activeTheme)}>
            <div className={this.getGamingIconContainer(activeTheme)}>
              <FaGamepad className={this.getGameIcon(activeTheme)} />
            </div>
            <h1 className="gaming-heading">Gaming</h1>
          </div>
          <ul className={this.getGamingVideos(activeTheme)}>
            {GamingVideosData.map(gamingVideo => (
              <li key={gamingVideo.id} className="gaming-video">
                <Link to={`/videos/${gamingVideo.id}`}>
                  <img
                    src={gamingVideo.thumbnailUrl}
                    className="gaming-video-thumbnail"
                    alt="video thumbnail"
                  />

                  <p className={this.getGamingVideoTitle(activeTheme)}>
                    {gamingVideo.title}
                  </p>
                  <p className="gaming-video-view-count">
                    {gamingVideo.viewCount} Watching Worldwide
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {activeTheme} = value
          return (
            <div className="navbar-side-menu-and-gaming-video-section">
              <Navbar />

              <div className="side-menu-and-gaming-section">
                <div className="side-menu">
                  <SideMenu />
                </div>

                {this.renderGamingVideosSection(activeTheme)}
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Gaming
