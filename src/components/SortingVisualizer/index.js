import { useState, useEffect } from "react";
import './sortingvisualizer.scss';

const SortingVisualizer = () => {

    const [array, setArray] = useState([]);
    const [swapIndices, setSwapIndices] = useState([]);
    const delay = 100;

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

    const mergeSort = (array, func) => {
        if (array.length < 2) return array;

        if (!func){
            func = (left, right) => {
                return left < right ? -1 : left > right ? 1 : 0;
            }
        }

        let mid = Math.floor(array.length / 2);
        const left = mergeSort(array.slice(0, mid), func);
        const right = mergeSort(array.slice(mid), func);

        return merge(left, right, func)
    }

    const merge = (left, right, func) => {
        let merged = [];

        while (left.length && right.length){
            switch(func(left[0], right[0])){
                case -1:
                    merged.push(left.shift());
                    break;
                case 0:
                    merged.push(left.shift());
                    break;
                case 1:
                    merged.push(right.shift());
                    break;
            }
        }
        merged = merged.concat(left, right);
        return merged;
    }

    const quickSort = (array) => {

        if (array.length <= 1) return array;

        let pivot = array[0]
        const left = array.slice(1).filter((el) => el < pivot);
        const right = array.slice(1).filter((el) => el >= pivot);

        const sortedLeft = quickSort(left);
        const sortedRight = quickSort(right);

        return [...sortedLeft, pivot, ...sortedRight];
    }

    // const heapify = (array, length, parentIndex) => {
    //     let largest = parentIndex;
    //     let left = parentIndex * 2 + 1;
    //     let right = left + 1;

    //     if (left < length && array[left] > array[largest]){
    //         largest = left;
    //     }
    //     if (right < length && array[right] > array[largest]){
    //         largest = right;
    //     }

    //     if (largest !== parentIndex) {
    //         let temp = array[largest];
    //         array[largest] = array[parentIndex];
    //         array[parentIndex] = temp;
    //     }

    //     return array;
    // }

    const heapSort = (array) => {
        let arrayClone = array.slice();
        let heapSize;

        const maxHeapify = (i) => {
            let left = 2 * i + 1;
            let right = 2 * i + 2;
            let largest;
    
            if (left <= heapSize && arrayClone[left] > arrayClone[i]){
                largest = left;
            } else {
                largest = i;
            }
    
            if (right <= heapSize && arrayClone[right] > arrayClone[largest]){
                largest = right;
            } 
    
            if (largest !== i){
                let temp = arrayClone[i];
                arrayClone[i] = arrayClone[largest];
                arrayClone[largest] = temp;
                maxHeapify(largest);
            }
        }
    
        const buildMaxHeap = () => {
            heapSize = arrayClone.length - 1;
            for (let i = Math.floor(heapSize / 2); i >= 0; i--){
                maxHeapify(i);
            }
        }
    
        buildMaxHeap();
        for (let i = arrayClone.length; i >=0; i--){
            let temp = arrayClone[0];
            arrayClone[0] = arrayClone[i];
            arrayClone[i] = temp;
            heapSize--;
            maxHeapify(0);
        }
    
        return arrayClone;
    }

    // const bubbleSort = (array, func) => {
    //     const arrayClone = array?.slice();
    //     let sorted = false;

    //     while (!sorted){
    //         sorted = true;

    //         for(let i = 1, n = arrayClone?.length; i < n; i++ ){
    //             if (arrayClone[i - 1] > arrayClone[i]){
    //                 sorted = false;
    //                 let swap = arrayClone[i - 1];
    //                 arrayClone[i - 1] = arrayClone[i]
    //                 arrayClone[i] = swap;
    //             }
    //         }
    //     }

    //     return arrayClone;
    // }



    const bubbleSortWithAnimation = async (array, updateArray) => {
        const arrayClone = array?.slice();
        let sorted = false;
      
        while (!sorted) {
          sorted = true;
      
          for (let i = 1, n = arrayClone?.length; i < n; i++) {
            if (arrayClone[i - 1] > arrayClone[i]) {
              sorted = false;
      
              // Swap elements
              let swap = arrayClone[i - 1];
              arrayClone[i - 1] = arrayClone[i];
              arrayClone[i] = swap;
      
              // Update the array with animation
              await updateArray([...arrayClone]);
              await new Promise(resolve => setTimeout(resolve, delay)); // Introduce delay
            }
          }
        }
      
        return arrayClone;
      };

    return(
        <>
            <div className="array-bar-container">
                {array.map((value, idx) => {
                    return(
                        <div 
                            className="array-bar" 
                            key={idx}
                            style={{height: `${Math.floor(value/2)}px`}}
                        >
                        </div>
                    )
                })}
            </div>
            <div className="button-container">
                <button onClick={() => resetArray()}>Generate New Array</button>
                <button onClick={() => setArray(mergeSort(array))}>Merge Sort</button>
                <button onClick={() => setArray(quickSort(array))}>Quick Sort</button>
                <button onClick={() => setArray(heapSort(array))}>Heap Sort</button>
                <button>Insertion Sort</button>
                <button onClick={() => bubbleSortWithAnimation(array, setArray)}>Bubble Sort</button>
            </div>
        </>

    )
}

export default SortingVisualizer;