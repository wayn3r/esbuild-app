import { StrictMode } from 'react'
import { render } from 'react-dom'
import { App } from './App'
import './css/styles.css'

const root = document.getElementById('root')
render(<StrictMode><App /></StrictMode>, root)