import {Component} from 'react'
import cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMessage: '',
    isChecked: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = event => {
    this.setState({isChecked: event.target.checked})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({errorMessage: errMsg, showSubmitError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  getLoginFormContainer = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-login-form-container'
      : 'light-theme-login-form-container'

  getLoginContainer = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-login-container'
      : 'light-theme-login-container'

  getInputLabel = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-input-label'
      : 'light-theme-input-label'

  getShowPasswordText = activeTheme =>
    activeTheme === 'Dark'
      ? 'dark-theme-show-password-text'
      : 'light-theme-show-password-text'

  getUserInput = activeTheme =>
    activeTheme === 'Dark' ? 'dark-theme-user-input' : 'light-theme-user-input'

  getNxtWatchLogoUrl = activeTheme =>
    activeTheme === 'Dark'
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

  render() {
    const {
      username,
      password,
      showSubmitError,
      errorMessage,
      isChecked,
    } = this.state

    const token = cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <NxtWatchContext>
        {value => {
          const {activeTheme} = value
          const loginFormContainer = this.getLoginFormContainer(activeTheme)
          const loginContainer = this.getLoginContainer(activeTheme)
          const inputLabel = this.getInputLabel(activeTheme)
          const showPasswordText = this.getShowPasswordText(activeTheme)
          const userInput = this.getUserInput(activeTheme)
          const nxtWatchLogoUrl = this.getNxtWatchLogoUrl(activeTheme)

          return (
            <div className={loginContainer}>
              <form className={loginFormContainer} onSubmit={this.submitForm}>
                <img
                  src={nxtWatchLogoUrl}
                  className="nxt-watch-logo"
                  alt="website logo"
                />
                <div className="input-container">
                  <label htmlFor="UserName" className={inputLabel}>
                    USERNAME
                  </label>
                  <input
                    type="text"
                    id="UserName"
                    className={userInput}
                    placeholder="Username"
                    onChange={this.onChangeUsername}
                    value={username}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="Password" className={inputLabel}>
                    PASSWORD
                  </label>
                  <input
                    type={isChecked ? 'text' : 'password'}
                    id="Password"
                    className={userInput}
                    placeholder="Password"
                    onChange={this.onChangePassword}
                    value={password}
                  />
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="CheckBox"
                    className="checkbox-input"
                    onChange={this.onChangeCheckbox}
                    checked={isChecked}
                  />
                  <label htmlFor="CheckBox" className={showPasswordText}>
                    Show Password
                  </label>
                </div>
                <button type="submit" className="login-btn">
                  Login
                </button>
                {showSubmitError && <p className="err-msg">*{errorMessage}</p>}
              </form>
            </div>
          )
        }}
      </NxtWatchContext>
    )
  }
}

export default Login
