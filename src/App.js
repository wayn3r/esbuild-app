import { useState } from 'react/cjs/react.production.min'
import { description } from '../package.json'
import image from './assets/assetg'

export const App = () => {
    const [count, setCount] = useState(0)
    return (
        <div className="test">
            <h1>Hello, world!</h1> 
            <button onClick={() => setCount(count+1)}>+{count}</button>
            <p>{description}</p>
            <img src={image}  /> test serfdsfsaaa
        </div>
    )
}