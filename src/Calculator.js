import React, { useState, useEffect } from "react";

const Calculator = () => {
    const [count, setCount] = useState(0);
    const [conversionType, setConversionType] = useState('BRtoDE'); // 'BRtoDE' or 'DEtoBR'

    const handleConversion = () => {
        console.log("Tipo de conversão:", conversionType);
        if (conversionType === 'DEtoBR') {
            console.log("Subtraindo 5");
            setCount(prevCount => prevCount - 5); // Subtrair 5 quando convertendo de Alemanha para Brasil
        } else {
            console.log("Adicionando 5");
            setCount(prevCount => prevCount + 5); // Adicionar 5 quando convertendo de Brasil para Alemanha
        }
    };

    const handleConversionTypeChange = (type) => {
        setConversionType(type);
        // Reset count to 0 when conversion type changes
        setCount(0);
    };

    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1>Calculadora de Diferença de Tempo</h1>
            <p>Contador: {count}</p>
            <button onClick={handleConversion}>Verificar</button>
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => handleConversionTypeChange('BRtoDE')} style={{ marginRight: '10px' }}>
                    Converter Brasil para Alemanha
                </button>
                <button onClick={() => handleConversionTypeChange('DEtoBR')}>
                    Converter Alemanha para Brasil
                </button>
            </div>
        </div>
    );
};

export default Calculator;
