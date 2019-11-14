import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()
const store = mockStore({})

import SearchBar from './index'

it('Mount renders SearchBar component', () => {
  const wrapper = mount(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  )

  expect(wrapper.find('input')
  .hasClass('search'))
  .equal(true)
})

it('SearchBar Submit', () => {
  const onSubmitFn = jest.fn()
  const wrapper = mount(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  )

  wrapper
  .find('input')
  .simulate('change', {
    target: {
      value: 'Test'
    }
  })
})