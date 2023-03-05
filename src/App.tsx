import {useState} from 'react'
import './App.css'
import {ExampleMessenger} from "./components/messaging";

function App() {
    const [count, setCount] = useState(0)

    return (
        <ExampleMessenger/>
    )
}

export default App
