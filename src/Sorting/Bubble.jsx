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
            insertionSort([...array]);
        }
        if (isSorted) {
            setTimeout(() => {
                setArray([...array]);
            }, 2000);
        }
    }, [isSorting]);



    const visualUpdate = async (tempArray, indices, msg) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setArray([...tempArray]);
                setAlertMessage(msg);
                setComparingIndices([...indices]);
                resolve();
            }, 2000);
        });
    };

    function codeToDisplay() {
        const code = `
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }`;
        return code;
    }



    const insertionSort = async (arr) => {
        let n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {

                if (arr[j] > arr[j + 1]) {
                    await visualUpdate(arr, [j, n - i, j + 1, n - i - 1], arr[j] + " > " + arr[j + 1]);

                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;

                    await visualUpdate(arr, [j, n - i, j + 1, n - i - 1], "Swapped " + arr[j] + ", " + arr[j + 1]);
                }
                else {
                    await visualUpdate(arr, [j, n - i, j + 1, n - i - 1], "No swapping needed");
                }
            }

            await visualUpdate(arr, [n - i], arr[n - i - 1] + " is sorted");
        }

        setIsSorting(false);
        setIsSorted(true);
        setComparingIndices([]);
    }

    const handleSort = () => {
        setIsSorting(true);
        setIsSorted(false);
    };


    return (
        <div className="p-6 text-white flex flex-col">
            <div className="mx-12 p-6 text-white flex justify-center flex-col gap-6 text-center text-sm">
                <h1 className="text-xl">{location.state.algo.toUpperCase()} SORT</h1>
                <p className="text-gray-400">Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.</p>
            </div>
            <div className="p-6 text-white flex justify-center sm:flex-row flex-col gap-6">

                <div className="flex flex-col gap-6 justify-center items-center">
                    <div>
                        <h1 className="text-xl"> ANIMATION </h1>
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <div className="p-4 bg-blue-500 w-4 border "></div> Unsorted
                        <div className="p-4 bg-red-500 w-4 border "></div> j
                        <div className="p-4 bg-yellow-500 w-4 border "></div> comparing
                        <div className="p-4 bg-green-500 w-4 border "></div> Sorted
                        <div className="p-4 bg-gradient-to-t from-red-500 to-blue-500 w-4 border "></div> i==j
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
                                className={`border border-white p-4 m-2 ${(idx === comparingIndices[0] && idx === comparingIndices[1]) ? "bg-gradient-to-t from-red-500 to to-blue-500" : idx === comparingIndices[0]
                                    ? 'bg-red-500'
                                    : idx === comparingIndices[2]
                                        ? 'bg-yellow-500'
                                        : idx < comparingIndices[1]
                                            ? 'bg-blue-500'
                                            : isSorted ? 'bg-green-500'
                                                : 'bg-[#343434]'
                                    }`}
                            >
                                {num}
                            </div>
                        ))}
                    </div >
                    <div className="flex flex-col justify-center items-center">
                        <button className="bg-blue-500 px-4 p-2 mt-4 rounded text-white w-fit" onClick={handleSort} disabled={isSorting}>
                            {isSorting ? 'Sorting...' : 'Start Sorting'}
                        </button>
                    </div>
                </div >
                <div className="text-white flex flex-col">
                    <h1>CODE</h1>
                    <pre className="bg-[#343434] text-gray-400 m-4 text-wrap sm:p-2 p-6"><code>{codeToDisplay()}</code></pre>
                </div>
            </div>
        </div >
    );
}