import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike} from 'react-icons/bi'
import {BsBookmark} from 'react-icons/bs'
import cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import SideMenu from '../SideMenu'
import Navbar from '../Navbar'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

class VideoItemDetails extends Component {
  state = {
    videoDetailsData: {},
    isLoading: true,
  }

  componentDidMount = async () => {
    this.getVideoDetailsData()
  }

  getVideoDetailsData = async () => {
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedVideoDetailsData = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url.replace('watch?v=', 'embed/'),
        thumbnailUrl: data.video_details.thumbnail_url,
        channelName: data.video_details.channel.name,
        channelProfileImageUrl: data.video_details.channel.profile_image_url,
        channelSubscriberCount: data.video_details.channel.subscriber_count,
        viewCount: data.video_details.view_count,
        publishedAt: formatDistanceToNow(
          new Date(data.video_details.published_at),
          {
            addSuffix: true,
          },
        ).replace(/(over|almost|about)\s+/g, ''),
        description: data.video_details.description,
      }
      this.setState({
        videoDetailsData: updatedVideoDetailsData,
        isLoading: false,
      })
    }
  }

  getVideoDetailsContainer = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-video-details-container'
      : 'light-theme-video-details-container'

  getTitle = activeTheme =>
    activeTheme === 'Dark' ? 'dark-title' : 'white-title'

  render() {
    const {videoDetailsData, isLoading} = this.state
    const {
      title,
      videoUrl,
      channelName,
      channelProfileImageUrl,
      channelSubscriberCount,
      viewCount,
      publishedAt,
      description,
    } = videoDetailsData

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {
            activeTheme,
            savedVideosData,
            addSavedVideos,
            isClickLike,
            clickedLike,
            isClickDislike,
            clickedDislike,
            isClickSave,
            clickedSave,
          } = value

          const onClickSaveIcon = () => {
            clickedSave(!isClickSave)
            if (!isClickSave) {
              this.setState(
                prevState => ({
                  videoDetailsData: {
                    ...prevState.videoDetailsData,
                    ...videoDetailsData,
                  },
                }),
                () => {
                  addSavedVideos([...savedVideosData, videoDetailsData])
                },
              )
            } else {
              const updatedSavedVideosData = savedVideosData.filter(
                video => video.id !== videoDetailsData.id,
              )
              this.setState(
                prevState => ({
                  videoDetailsData: {
                    ...prevState.videoDetailsData,
                    ...videoDetailsData,
                  },
                }),
                () => {
                  addSavedVideos(updatedSavedVideosData)
                },
              )
            }
          }

          const onClickedLikeIcon = () => {
            clickedLike(!isClickLike)
          }

          const onClickedDislikeIcon = () => {
            clickedDislike(!isClickDislike)
          }

          const videoDetailsContainer = this.getVideoDetailsContainer(
            activeTheme,
          )
          const titleTxt = this.getTitle(activeTheme)

          return (
            <div className="navbar-side-menu-and-video-details-container">
              <Navbar />

              <div className="side-menu-and-video-details-section">
                <div className="side-menu-container">
                  <SideMenu />
                </div>

                {isLoading ? (
                  <div className="loader-container" data-testid="loader">
                    <Loader
                      type="ThreeDots"
                      color="#3b82f6"
                      height="50"
                      width="50"
                    />
                  </div>
                ) : (
                  <div className={videoDetailsContainer}>
                    <iframe
                      width="1130"
                      height="400"
                      src={videoUrl}
                      title={title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <p className={titleTxt}>{title}</p>
                    <div className="views-likes-container">
                      <div className="views-container">
                        <p className="views">{viewCount} views</p>
                        <p className="published-at">{publishedAt}</p>
                      </div>
                      <div className="likes-container">
                        <div
                          role="button"
                          tabIndex="0"
                          className="icons-and-texts-container"
                          onClick={onClickedLikeIcon}
                        >
                          <BiLike
                            className={
                              isClickLike
                                ? 'blue-color-icon'
                                : 'video-item-details-icon'
                            }
                          />

                          <p
                            className={
                              isClickLike ? 'blue-views-text' : 'views'
                            }
                          >
                            Like
                          </p>
                        </div>
                        <div
                          role="button"
                          tabIndex="0"
                          className="icons-and-texts-container"
                          onClick={onClickedDislikeIcon}
                        >
                          <BiDislike
                            className={
                              isClickDislike
                                ? 'blue-color-icon'
                                : 'video-item-details-icon'
                            }
                          />
                          <p
                            className={
                              isClickDislike ? 'blue-views-text' : 'views'
                            }
                          >
                            Dislike
                          </p>
                        </div>
                        <div
                          role="button"
                          tabIndex="0"
                          className="icons-and-texts-container"
                          onClick={onClickSaveIcon}
                        >
                          <BsBookmark
                            className={
                              isClickSave
                                ? 'blue-color-icon'
                                : 'video-item-details-icon'
                            }
                          />
                          <p
                            className={
                              isClickSave ? 'blue-views-text' : 'views'
                            }
                          >
                            {isClickSave ? 'saved' : 'save'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <hr width="100%" color="#181818" />

                    <div className="channel-profile-and-description">
                      <img
                        src={channelProfileImageUrl}
                        className="channel-profile"
                        alt="channel logo"
                      />
                      <div className="channel-name-container">
                        <p className={titleTxt}>{channelName}</p>
                        <p className="channel-subscriber-count">
                          {channelSubscriberCount} subscribers
                        </p>
                      </div>
                    </div>

                    <p className={`${titleTxt} channel-description`}>
                      {description}
                    </p>
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

export default VideoItemDetails
