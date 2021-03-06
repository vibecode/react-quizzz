import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import './index.scss'
import 'normalize.css'
import * as serviceWorker from './serviceWorker'
import smoothscroll from 'smoothscroll-polyfill'
import WebFont from 'webfontloader'

smoothscroll.polyfill()

WebFont.load({
  google: {
    families: ['Open+Sans:300,400']
  }
})

const store = configureStore()
const rootElement = document.getElementById('root')

function render(Component) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  )
}

render(<App />)

if (module.hot) {
  module.hot.accept('./App', () => {
    render(<App />)
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
