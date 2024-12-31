import {Redirect, Route} from 'react-router-dom'
import cookie from 'js-cookie'

const ProtectedRoute = props => {
  const token = cookie.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
