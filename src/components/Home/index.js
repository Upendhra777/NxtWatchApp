import {Component} from 'react'
import {Link} from 'react-router-dom'
import cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {MdSearch} from 'react-icons/md'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import SideMenu from '../SideMenu'
import Banner from '../Banner'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

class Home extends Component {
  state = {
    searchInput: '',
    videosData: [],
    isLoading: true,
    isFailure: false,
  }

  componentDidMount() {
    this.getVideosData()
  }

  onClickSearchIcon = () => {
    this.setState({isLoading: true, isFailure: false}, this.getVideosData)
  }

  retryFetchingData = () => {
    this.setState({isFailure: false, isLoading: true}, this.getVideosData)
  }

  onchangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  successResponse = data => {
    const updatedVideosData = data.videos.map(video => ({
      id: video.id,
      title: video.title,
      thumbnailUrl: video.thumbnail_url,
      channelName: video.channel.name,
      channelProfileImageUrl: video.channel.profile_image_url,
      viewCount: video.view_count,
      publishedAt: formatDistanceToNow(new Date(video.published_at), {
        addSuffix: true,
      }).replace(/(over|almost|about)\s+/g, ''),
    }))

    this.setState({videosData: updatedVideosData, isLoading: false})
  }

  failureResponse = () => {
    this.setState({isFailure: true, isLoading: false})
  }

  getVideosData = async () => {
    const jwtToken = cookies.get('jwt_token')
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    console.log(fetchedData)
    if (response.ok) {
      this.successResponse(fetchedData)
    } else {
      this.failureResponse()
    }
  }

  renderVideosSection = title => {
    const {isLoading, isFailure, videosData} = this.state

    if (isLoading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
        </div>
      )
    }

    if (isFailure) {
      return (
        <div className="failure-container">
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
            onClick={this.retryFetchingData}
          >
            Retry
          </button>
        </div>
      )
    }

    if (videosData.length === 0) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            className="failure-view"
            alt="no videos"
          />
          <h1 className="failure-heading">No Search results found</h1>
          <p className="failure-description">
            Try different key words or remove search filter
          </p>
          <button
            type="button"
            className="retry-btn"
            onClick={this.retryFetchingData}
          >
            Retry
          </button>
        </div>
      )
    }

    return (
      <div className="videos-section">
        {videosData.map(video => (
          <ul className="video-section">
            <Link to={`/videos/${video.id}`}>
              <img
                src={video.thumbnailUrl}
                className="thumbnail-url"
                alt="video thumbnail"
              />
              <div className="profile-image-and-video-content">
                <img
                  src={video.channelProfileImageUrl}
                  className="profile-image"
                  alt="channel logo"
                />
                <div className="video-content">
                  <p className={title}>{video.title}</p>
                  <p className="channel">{video.channelName}</p>
                  <div className="views-and-published-container">
                    <p className="views">{video.viewCount} views</p>

                    <p className="published-at">{video.publishedAt}</p>
                  </div>
                </div>
              </div>
            </Link>
          </ul>
        ))}
      </div>
    )
  }

  getThemeClassName = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-videos-and-search-container'
      : 'light-theme-videos-and-search-container'

  getTitle = activeTheme =>
    activeTheme === 'Dark' ? 'dark-title' : 'white-title'

  getSearchInput = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-search-input'
      : 'light-theme-search-input'

  getSearchIconContainer = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-search-icon-container'
      : 'light-search-icon-container'

  getSearchIcon = activeTheme =>
    activeTheme === 'Dark' ? 'dark-search-icon' : 'light-search-icon'

  render() {
    const {searchInput} = this.state

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {activeTheme} = value

          const ThemeClassName = this.getThemeClassName(activeTheme)
          const title = this.getTitle(activeTheme)
          const searchInputTheme = this.getSearchInput(activeTheme)
          const searchIconContainer = this.getSearchIconContainer(activeTheme)
          const searchIcon = this.getSearchIcon(activeTheme)

          return (
            <div data-testid="home" className="home-container">
              <div className="navbar-container">
                <Navbar />
              </div>

              <div className="content-container">
                <div className="side-menu-container">
                  <SideMenu />
                </div>

                <div className="nxt-watch-container">
                  <Banner />

                  <div className={ThemeClassName}>
                    <div className="search-container">
                      <input
                        type="search"
                        className={searchInputTheme}
                        placeholder="Search"
                        onChange={this.onchangeSearchInput}
                        value={searchInput}
                      />
                      <div className={searchIconContainer}>
                        <button
                          data-testid="searchButton"
                          type="button"
                          className="button"
                          onClick={this.onClickSearchIcon}
                        >
                          <MdSearch className={searchIcon} />
                        </button>
                      </div>
                    </div>

                    {this.renderVideosSection(title)}
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Home
