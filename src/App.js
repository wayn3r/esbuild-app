import { description } from '../package.json'
import image from './assets/asset.jpg'

export const App = () => {
    return (
        <div className="test">
            <h1>Hello, world!</h1>
            <p>{description}</p>
            <img src={image}  />
        </div>
    )
}