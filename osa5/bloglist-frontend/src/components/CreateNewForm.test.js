import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateNewForm from './CreateNewForm'

describe('<CreateNewForm />', () => {

  test('<CreateNewForm /> updates parent state and calls onSubmit', () => {
    const createNew = jest.fn()

    const component = render(
      <CreateNewForm addBlog={createNew} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'Testing of forms could be easier' }
    })

    fireEvent.change(author, {
      target: { value: 'Yours truly' }
    })

    fireEvent.change(url, {
      target: { value: 'www.reactjs.org' }
    })

    fireEvent.submit(form)

    expect(createNew.mock.calls.length).toBe(1)

    const mockContents = createNew.mock.calls[0][0]

    expect(mockContents.title).toBe('Testing of forms could be easier')
    expect(mockContents.author).toBe('Yours truly')
    expect(mockContents.url).toBe('www.reactjs.org')
  })

})