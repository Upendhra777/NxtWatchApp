import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {FaFire} from 'react-icons/fa'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import SideMenu from '../SideMenu'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

class Trending extends Component {
  state = {trendVideosData: [], isLoading: true, isFailure: false}

  componentDidMount() {
    this.getTrendVideosData()
  }

  successResponse = data => {
    const updatedTrendVideosData = data.map(trendVideo => ({
      id: trendVideo.id,
      title: trendVideo.title,
      thumbnailUrl: trendVideo.thumbnail_url,
      channelName: trendVideo.channel.name,
      channelProfileImageUrl: trendVideo.channel.profile_image_url,
      viewCount: trendVideo.view_count,
      publishedAt: formatDistanceToNow(new Date(trendVideo.published_at), {
        addSuffix: true,
      }).replace(/(over|almost|about)\s+/g, ''),
    }))
    this.setState({trendVideosData: updatedTrendVideosData, isLoading: false})
  }

  failureResponse = () => {
    this.setState({isFailure: true, isLoading: false})
  }

  getTrendVideosData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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

  getTrendHeadingContainer = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-trend-heading-container'
      : 'light-theme-trend-heading-container'

  getTrendVideos = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-trend-videos'
      : 'light-theme-trend-videos'

  getTrendVideoTitle = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-trend-video-title'
      : 'light-theme-trend-video-title'

  getTrendIcon = activeTheme =>
    activeTheme === 'Dark' ? 'dark-theme-trend-icon' : 'light-theme-trend-icon'

  getTrendIconContainer = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-trend-icon-container'
      : 'light-theme-trend-icon-container'

  renderTrendVideosSection = activeTheme => {
    const {trendVideosData, isLoading, isFailure} = this.state

    if (isLoading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
        </div>
      )
    }

    if (isFailure) {
      return (
        <div className="trending-failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
            className="failure-view"
            alt="failure view"
          />
          <h1 className="failure-heading">Oops! Something Went Wrong</h1>
          <p className="failure-description">
            We are having some trouble completing your request. <br /> Please
            try again.
          </p>
          <button
            type="button"
            className="retry-btn"
            onClick={this.getTrendVideosData}
          >
            Retry
          </button>
        </div>
      )
    }

    return (
      <div className="trend-videos-section">
        <div className={this.getTrendHeadingContainer(activeTheme)}>
          <div className={this.getTrendIconContainer(activeTheme)}>
            <FaFire className={this.getTrendIcon(activeTheme)} />
          </div>
          <h1 className="trend-heading">Trending</h1>
        </div>

        <ul className={this.getTrendVideos(activeTheme)}>
          {trendVideosData.map(trendVideo => (
            <li key={trendVideo.id}>
              <Link to={`/videos/${trendVideo.id}`} className="trend-video">
                <img
                  src={trendVideo.thumbnailUrl}
                  className="trend-video-thumbnail-image"
                  alt="video thumbnail"
                />

                <div className="trend-video-content">
                  <p className={this.getTrendVideoTitle(activeTheme)}>
                    {trendVideo.title}
                  </p>
                  <p className="trend-video-channel-name">
                    {trendVideo.channelName}
                  </p>
                  <div className="views-published-at-container">
                    <p className="trend-video-views">
                      {trendVideo.viewCount} views
                    </p>
                    <p className="trend-video-published-at">
                      {trendVideo.publishedAt}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {activeTheme} = value
          return (
            <div className="navbar-side-menu-and-trend-videos-section">
              <Navbar />

              <div className="side-menu-and-trend-videos-section">
                <div className="side-menu-container">
                  <SideMenu />
                </div>

                {this.renderTrendVideosSection(activeTheme)}
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Trending
