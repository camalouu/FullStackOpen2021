import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../Blog'

const blog = {
  author: 'someone',
  title: 'jealousy',
  url: 'sdfs.com',
  likes: 23,
  user: { username: 'zafar' }
}
const user = {
  username: 'zafar'
}

test('blog title and author', () => {

  const component = render(<Blog blog={blog} user={user} />)
  expect(component.container).toHaveTextContent('someone')
  expect(component.container).toHaveTextContent('jealousy')
  expect(component.container).not.toHaveTextContent('sdfs.com')
  expect(component.container).not.toHaveTextContent('like')

})

test('url and likes are shown when btn clicked', () => {
  const component = render(<Blog blog={blog} user={user} />)
  const button = component.getByText('view')
  fireEvent.click(button)

  const url = component.getByText(blog.url)
  expect(url).toBeDefined()

  const likes = component.getByText(blog.likes)
  expect(likes).toBeDefined()
})