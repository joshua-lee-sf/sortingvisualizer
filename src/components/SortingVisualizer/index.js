import { useState, useEffect } from "react";
import './sortingvisualizer.scss';

const SortingVisualizer = () => {

    const [array, setArray] = useState([]);

    useEffect(()=> {
        resetArray();
    },[])

    const resetArray = () => {
        const array = [];
        for (let i = 0; i < 100; i++){
            array.push(randomIntFromInterval(5, 1000))
        };
        setArray(array);
    }

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    return(
        <div className="array-bar-container">
            {array.map((value, idx) => {
                return(
                    <div 
                        className="array-bar" 
                        key={idx}
                        style={{height: `${value}px`}}
                    >
                    </div>
                )
            })}
        </div>
    )
}

export default SortingVisualizer;