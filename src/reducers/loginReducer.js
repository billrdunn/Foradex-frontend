// import loginService from '../services/login'

const loginReducer = (state = null, action = {}) => {

  switch (action.type) {
    case 'LOGIN':
      return action.data

    case 'LOGOUT':
      // state = null
      return null

    case 'INIT_USER':
      return action.user

    default:
      return state
  }
}

export const initialiseLoggedInUser = () => {
  console.log('initialising logged in user...');
  const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
  if (loggedInUserJSON) {
    const user = JSON.parse(loggedInUserJSON)
    // blogService.setToken(user.token)
    return {
      type: 'INIT_USER',
      user
    }
  }

  return {
    type: 'INIT_USER',
    user: null
  }
}

// export const login = (user) => async (dispatch) => {
//   try {
//     const response = await loginService.login(user)
//     console.log('user after login:>> ', response)

//     window.localStorage.setItem('loggedBlogappUser', JSON.stringify(response))
//     dispatch({
//       type: 'LOGIN',
//       data: response,
//     })
//     dispatch(updateNotification(`user ${user.username} logged in`, 3, false))
//   } catch (exception) {
//     console.log('invalid credentials')
//     dispatch(updateNotification('invalid credentials', 3, true))
//   }
// }

// export const logout = () => {
//   window.localStorage.removeItem('loggedBlogappUser')
//   return async (dispatch) => {
//     dispatch({
//       type: 'LOGOUT',
//     })
//   }
// }

export default loginReducer
