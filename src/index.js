import * as Server from 'react-dom/server'
import { description } from '../package.json'
import './css/styles.css'
import image from './assets/asset.jpg'

const Greet = () => <h1>Hello, world!</h1>
console.log(Server.renderToString(<Greet />),description, image)