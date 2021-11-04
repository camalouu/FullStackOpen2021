import React, { useEffect } from 'react'
import { getFromLocal } from './reducers/loginReducer'
import Notification from './components/Notification'
import Login from './components/Login'
import Navigation from './components/Navigation'
import Blogs from './components/Blogs'
import NewBlog from './components/Newblog'
import Togglabe from './components/Togglabe'
import Users from './components/Users'
import User from './components/User'
import { Redirect, Route, Switch } from 'react-router'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.loggedInUser)

  useEffect(() => {
    dispatch(getFromLocal())
  }, [])

  return (
    <div>
      <Navigation user={user} />
      <Notification />
      <Switch>
        <Route path='/login'>
          <Togglabe buttonLabel='Log in'>
            <Login />
          </Togglabe>
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          {user.username ? <Users /> : <Redirect to='/login' />}
        </Route>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/'>
          <h1>Blogs</h1>
          {user.username && <Togglabe buttonLabel='Create new blog'>
            <NewBlog />
          </Togglabe>}
          <Blogs />
        </Route>
      </Switch>
    </div>
  )
}

export default App