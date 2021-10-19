import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlog from '../Newblog'

test('new blog form test', () => {
  const createBlog = jest.fn()
  const component = render(
    <NewBlog createBlog={createBlog} />
  )
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const title = component.container.querySelector('#title')
  const blogform = component.container.querySelector('#blogform')

  fireEvent.change(author, {
    target: { value: 'someone' }
  })

  fireEvent.change(title, {
    target: { value: 'title' }
  })

  fireEvent.change(url, {
    target: { value: 'url' }
  })

  fireEvent.submit(blogform)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('someone')
  expect(createBlog.mock.calls[0][0].url).toBe('url')
  expect(createBlog.mock.calls[0][0].title).toBe('title')
})