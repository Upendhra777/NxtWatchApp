import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import NotFound from './components/NotFound'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NxtWatchContext from './context/NxtWatchContext'

import './App.css'
 
class App extends Component {
  state = {
    activeTheme: 'Light',
    removeBanner: false,
    savedVideosData: [],
    isClickLike: false,
    isClickDislike: false,
    isClickSave: false,
  }

  changeTheme = activeTheme => {
    this.setState({activeTheme})
  }

  removeBannerFunction = removeBanner => {
    this.setState({removeBanner})
  }

  addSavedVideos = savedVideosData => {
    this.setState({savedVideosData})
  }

  clickedLike = isClickLike => {
    this.setState({isClickLike})
  }

  clickedDislike = isClickDislike => {
    this.setState({isClickDislike})
  }

  clickedSave = isClickSave => {
    this.setState({isClickSave})
  }

  render() {
    const {
      activeTheme,
      removeBanner,
      savedVideosData,
      isClickLike,
      isClickDislike,
      isClickSave,
    } = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          activeTheme,
          changeTheme: this.changeTheme,
          removeBanner,
          removeBannerFunction: this.removeBannerFunction,
          savedVideosData,
          addSavedVideos: this.addSavedVideos,
          isClickLike,
          clickedLike: this.clickedLike,
          isClickDislike,
          clickedDislike: this.clickedDislike,
          isClickSave,
          clickedSave: this.clickedSave,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <NotFound />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
