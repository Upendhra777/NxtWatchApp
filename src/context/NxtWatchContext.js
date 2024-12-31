import React from 'react'

const NxtWatchContext = React.createContext({
  activeTheme: 'Light',
  changeTheme: () => {},
  removeBanner: false,
  removeBannerFunction: () => {},
  savedVideosData: [],
  addSavedVideos: () => {},
  isClickLike: false,
  clickedLike: () => {},
  isClickDislike: false,
  clickedDislike: () => {},
  isClickSave: false,
  clickedSave: () => {},
})

export default NxtWatchContext
