import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('Blog display', () => {
  let component
  const mockHandler = jest.fn()

  beforeEach(() => {

    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'University of Helsinki',
      url: 'wwww.helsinki.fi',
      likes: 0,
      user: {
        username: 'Theodore Tester'
      }
    }

    const user = {
      username: 'Theodore Tester'
    }

    component = render(
      <Blog blog={blog} user={user} likeBlog={mockHandler} />
    )


  })


  test('renders content', () => {

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })


  test('only title and author are rendered by default', () => {

    expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')
    expect(component.container).toHaveTextContent('University of Helsink')

    expect(component.container).not.toHaveTextContent('www.helsinki.fi')
    expect(component.container).not.toHaveTextContent('likes: 0')

  })

  test('clicking the button opens detailed display', async () => {

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('www.helsinki.fi')
    expect(component.container).toHaveTextContent('likes: 0')

  })

  test('clicking like button twice, event handler is called twice', async () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls.length).toBe(2)


  })

})