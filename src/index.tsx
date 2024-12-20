import ReactDOM from 'react-dom/client'
import './scss/app.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './redux/store'

// const root = ReactDOM.createRoot(document.getElementById('root')!)
const rootElem = document.getElementById('root')
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem)

  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  )
}
