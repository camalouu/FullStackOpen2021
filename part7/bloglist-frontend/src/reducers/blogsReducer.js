import blogService from '../services/blogs'
import { addNotification } from './notificationReducer'

export const addBlog = blog =>
  async dispatch => {
    try {
      const createdBlog = await blogService.createBlog(blog)
      dispatch({
        type: 'ADD_BLOG',
        data: createdBlog
      })
      dispatch(addNotification(`${blog.title} added!`))
    } catch ({ response }) {
      dispatch(addNotification(response.data.error))
    }
  }

export const removeBlog = blog =>
  async dispatch => {
    try {
      await blogService.deleteBlog(blog)
      dispatch({
        type: 'REMOVE_BLOG',
        data: { id: blog.id }
      })
      dispatch(addNotification(`${blog.title} deleted`))
    } catch ({ response }) {
      dispatch(addNotification(response.data.error))
    }
  }

export const likeBlog = blog =>
  async dispatch => {
    try {
      await blogService.updateBlog(
        {
          ...blog,
          user: blog.user.id,
          likes: blog.likes + 1
        })
      dispatch({
        type: 'LIKE_BLOG',
        data: { id: blog.id }
      })
      dispatch(addNotification(`${blog.title} liked`))
    } catch ({ response }) {
      dispatch(addNotification(response.data.error))
    }
  }

export const initilizeBlogs = () =>
  async dispatch => {
    const blogs = await blogService.getAll()
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    dispatch(
      {
        type: 'INIT_BLOGS',
        data: sortedBlogs
      }
    )
  }


const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return [...state].concat(action.data)
    case 'LIKE_BLOG':
      return state.map(b =>
        b.id === action.data.id ?
          { ...b, likes: b.likes + 1 } : b)
    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== action.data.id)
    default: return state
  }
}

export default blogsReducer