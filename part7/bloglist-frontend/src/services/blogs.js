import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async blog => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async blog => {
  const url = `${baseUrl}/${blog.id}`
  const response = await axios.put(url, blog)
  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const url = `${baseUrl}/${blog.id}`
  const response = await axios.delete(url, config)
  return response.data
}

const getComments = async id => {
  const url = `${baseUrl}/${id}/comments`
  const response = await axios.get(url)
  return response.data
}

const createComment = async (id, comment) => {
  const url = `${baseUrl}/${id}/comments`
  const response = await axios.post(url, { comment })
  return response.data
}

export default {
  getAll,
  setToken,
  createBlog,
  updateBlog,
  deleteBlog,
  getComments,
  createComment
}