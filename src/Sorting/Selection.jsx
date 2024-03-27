import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// 4, 8, 5, 1, 0, 2, 9

export default function Insertion() {
    const location = useLocation();
    const initialArr = location.state.arr.split(",").map(Number);

    const [array, setArray] = useState(initialArr);
    const [isSorting, setIsSorting] = useState(false);
    const [comparingIndices, setComparingIndices] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        if (isSorting) {
            selectionSort([...array]);
        }
    }, [isSorting]);

    useEffect(() => {
        if (isSorted) {
            setTimeout(() => {
                setArray([...array]);
            }, 2000);
        }
    }, [isSorted]);

    const visualUpdate = async (tempArray, indices, msg) => {
        // indices stores i, min, j indexes
        return new Promise((resolve) => {
            setTimeout(() => {
                setArray([...tempArray]);
                setComparingIndices([...indices]);
                setAlertMessage(msg);
                resolve();
            }, 2000);
        });
    };

    function codeToDisplay() {
        const code =
            `for (let i = 0; i < n-1; i++) {
    let min_idx = i;
    for (let j = i+1; j < n; j++) {
        if (arr[j] < arr[min_idx]) {
            min_idx = j;
        }
    }
    let temp = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = temp;
}`;
        return code;
    }

    const selectionSort = async (arr) => {
        let n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            let min_idx = i;

            await visualUpdate(arr, [i, min_idx], "min = " + arr[min_idx]);

            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[min_idx]) {
                    await visualUpdate(arr, [i, min_idx, j], arr[j] + " < " + arr[min_idx] + ", Update min to " + arr[j]);

                    min_idx = j;
                }
                else {
                    await visualUpdate(arr, [i, min_idx, j], arr[j] + " >= " + arr[min_idx]);
                }
            }

            await visualUpdate(arr, [i, min_idx], "Swpping " + arr[min_idx] + " and " + arr[i]);

            let temp = arr[min_idx];
            arr[min_idx] = arr[i];
            arr[i] = temp;

            await visualUpdate(arr, [i, min_idx], "Swapped " + arr[min_idx] + " and " + arr[i]);
        }

        setComparingIndices([]);
        setAlertMessage("Array Sorted");
        setIsSorting(false);
        setIsSorted(true);
    };

    const handleSort = () => {
        setIsSorting(true);
        setIsSorted(false);
    };

    return (
        <div className="p-6 text-white flex flex-col">
            <div className="mx-12 p-6 text-white flex justify-center flex-col gap-6 text-sm text-center">
                <h1 className="text-xl">{location.state.algo.toUpperCase()} SORT</h1>
                <p className="text-gray-400">Selection sort is a simple and efficient sorting algorithm that works by repeatedly selecting the smallest (or largest) element from the unsorted portion of the list and moving it to the sorted portion of the list. </p>
            </div>
            <div className="p-6 text-white flex justify-center sm:flex-row flex-col gap-6">

                <div className="flex flex-col gap-6 justify-center items-center">
                    <div>
                        <h1 className="text-xl"> ANIMATION </h1>
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <div className="p-4 bg-blue-500 w-4 border "></div> i
                        <div className="p-4 bg-red-500 w-4 border "></div> j
                        <div className="p-4 bg-yellow-500 w-4 border "></div> min
                        <div className="p-4 bg-green-500 w-4 border "></div> sorted
                    </div>

                    <h2>Original Array</h2>
                    <div className="flex p-2">
                        {initialArr.map((num, idx) => (
                            <div
                                key={idx}
                                className="border border-white p-4 m-2 bg-[#343434]"
                            >
                                {num}
                            </div>
                        ))}
                    </div>

                    <p className="p-2 text-green-500">{alertMessage}</p>

                    <div className="flex flex-row justify-center">
                        {array.map((num, idx) => (
                            <div
                                key={idx}
                                className={`border border-white p-4 m-2 ${idx === comparingIndices[1]
                                    ? 'bg-yellow-500'
                                    : idx === comparingIndices[2]
                                        ? 'bg-red-500'
                                        : idx === comparingIndices[0] ? "bg-blue-500" : idx < comparingIndices[0]
                                            ? 'bg-green-500'
                                            : isSorted
                                                ? "bg-green-500" : 'bg-[#343434]'
                                    }`}
                            >
                                {num}
                            </div>
                        ))}
                    </div >
                    <button className="bg-blue-500 p-2 mt-4 rounded text-white" onClick={handleSort} disabled={isSorting}>
                        {isSorting ? 'Sorting...' : 'Start Sorting'}
                    </button>
                </div >
                <div className="text-white flex flex-col">
                    <h1>CODE</h1>
                    <pre className="bg-[#343434] text-gray-400 m-4 text-wrap sm:p-2 p-6"><code>{codeToDisplay()}</code></pre>
                </div>
            </div>
        </div >
    );
}
