import React, { useEffect } from 'react'
import { getFromLocal } from './reducers/loginReducer'
import { Redirect, Route, Switch } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Login from './components/Login'
import Navigation from './components/Navigation'
import Blogs from './components/Blogs'
import NewBlog from './components/Newblog'
import Togglabe from './components/Togglabe'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { Container } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.loggedInUser)

  useEffect(() => {
    dispatch(getFromLocal())
  }, [])

  return (
    <Container className="p-3">
      <Navigation user={user} />
      <Notification />
      <Switch>
        <Route path='/login'>
          <Togglabe buttonLabel='Log in' show={true}>
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
          {user.username && <Togglabe buttonLabel='Create new blog' show={false}>
            <NewBlog />
          </Togglabe>}
          <Blogs />
        </Route>
      </Switch>
    </Container>
  )
}

export default App