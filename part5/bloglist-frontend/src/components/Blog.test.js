import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Tests 5.13-5.16', () => {
    let component
    beforeEach(() => {
        const blog = {
            author: 'Jukka Jukkanen',
            title: 'Miten blogataan',
            url: 'www.fi',
            likes: 12,
            user: { username: 'jukkis' }
        }
        component = render(
            <Blog blog={blog} user={{ username: 'jukkis' }}  />
        )
    })
    test('renders title and author of blog, but not likes and url', () => {
        const div = component.container.querySelector('.extendedView')
        expect(div).toHaveStyle('display: none')
        expect(component.container).toHaveTextContent('Jukka Jukkanen')
    })

    test('url and likes visible when button has been clicked', () => {
        const button = component.getByText('view')
        fireEvent.click(button)
        const div = component.container.querySelector('.extendedView')
        expect(div).not.toHaveStyle('display: none')
    })

})