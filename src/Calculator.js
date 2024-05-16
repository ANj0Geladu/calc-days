import { useState } from "react"

const Calculator = () =>{
    const [ count, setCount] = useState(0)
    const incrementByFive = () =>{
        setCount(preventCount => preventCount +5)
    }
    return( 
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1>calculadora de diferencça de tempo</h1>
            <p>contador: {count}</p>
            <button onClick={ incrementByFive}>verificar</button>
        </div>
    )
 }
 export default Calculator