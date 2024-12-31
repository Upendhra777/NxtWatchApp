import {Link} from 'react-router-dom'
import {Component} from 'react'
import {FaGamepad} from 'react-icons/fa'
import Navbar from '../Navbar'
import SideMenu from '../SideMenu'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

class SavedVideos extends Component {
  getSavedVideosHeadingContainer = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-saved-videos-heading-container'
      : 'light-theme-saved-videos-heading-container'

  getSavedVideos = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-saved-videos'
      : 'light-theme-saved-videos'

  getSavedVideosIcon = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-saved-videos-icon'
      : 'light-theme-saved-videos-icon'

  getSavedVideosIconContainer = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-saved-videos-icon-container'
      : 'light-theme-saved-videos-icon-container'

  getSavedVideoTitle = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-saved-video-title'
      : 'light-theme-saved-video-title'

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {activeTheme, savedVideosData} = value
          const savedVideosHeadingContainer = this.getSavedVideosHeadingContainer(
            activeTheme,
          )
          const savedVideos = this.getSavedVideos(activeTheme)
          const savedVideoTitle = this.getSavedVideoTitle(activeTheme)
          const savedVideosIcon = this.getSavedVideosIcon(activeTheme)
          const savedVideosIconContainer = this.getSavedVideosIconContainer(
            activeTheme,
          )

          return (
            <div className="navbar-side-menu-and-saved-videos-section">
              <Navbar />

              <div className="side-menu-and-saved-videos-section">
                <div className="side-menu-container">
                  <SideMenu />
                </div>

                {savedVideosData.length === 0 ? (
                  <div className="no-saved-videos-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                      className="no-saved-videos-img"
                      alt="no saved videos"
                    />
                    <h1 className="no-saved-videos-heading">
                      No saved videos found
                    </h1>
                    <p className="no-saved-videos-description">
                      You can save your videos while watching them
                    </p>
                  </div>
                ) : (
                  <div className="saved-videos-section">
                    <div className={savedVideosHeadingContainer}>
                      <div className={savedVideosIconContainer}>
                        <FaGamepad className={savedVideosIcon} />
                      </div>
                      <h1 className="saved-videos-heading">Saved Videos</h1>
                    </div>

                    <ul className={savedVideos}>
                      {savedVideosData.map(savedVideo => (
                        <li className="saved-video" key={savedVideo.id}>
                          <Link to={`/videos/${savedVideo.id}`}>
                            <img
                              src={savedVideo.thumbnailUrl}
                              className="trend-video-thumbnail-image"
                              alt="video thumbnail"
                            />

                            <li className="saved-video-content">
                              <p className={savedVideoTitle}>
                                {savedVideo.title}
                              </p>
                              <p className="saved-video-channel-name">
                                {savedVideo.channelName}
                              </p>
                              <li className="views-published-at-container">
                                <p className="trend-video-views">
                                  {savedVideo.viewCount} views
                                </p>
                                <p className="trend-video-published-at">
                                  {savedVideo.publishedAt}
                                </p>
                              </li>
                            </li>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default SavedVideos
