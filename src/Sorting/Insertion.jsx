import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Insertion() {
    const location = useLocation();
    const initialArr = location.state.arr.split(",").map(Number);

    const [array, setArray] = useState(initialArr);
    const [isSorting, setIsSorting] = useState(false);
    const [comparingIndices, setComparingIndices] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [isSorted, setIsSorted] = useState(false);

    useEffect(() => {
        if (isSorting) {
            insertionSort([...array]);
        }
    }, [isSorting]);

    useEffect(() => {
        if (isSorted) {
            setTimeout(() => {
                setArray([...array]);
                setAlertMessage("Array is Sorted");
            }, 2000);
        }
    }, [isSorted]);

    const visualUpdate = async (tempArray, indices, msg) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setArray([...tempArray]);
                setAlertMessage(msg);
                setComparingIndices([...indices]);
                resolve();
            }, 2000); // Adjust delay to control visualization speed
        });
    };

    function codeToDisplay() {
        const code = `
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }`;
        return code;
    }

    const insertionSort = async (arr) => {
        let n = arr.length;

        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;

            await visualUpdate(arr, [j, i], "Sorting " + key);

            while (j >= 0 && arr[j] > key) {
                await visualUpdate(arr, [j, i], arr[j] + " > " + key);

                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                await visualUpdate(arr, [j, i], "Swapping " + arr[j] + " and " + arr[j + 1]);

                j--;
            }

            await visualUpdate(arr, [j, i], key + " is sorted");
        }

        setComparingIndices([]);
        setIsSorting(false);
        setIsSorted(true);
    };

    const handleSort = () => {
        setIsSorting(true);
        setIsSorted(false);
    };

    return (
        <div className="p-6 text-white flex flex-col">
            <div className="mx-12 p-6 text-white flex justify-center flex-col gap-6 text-center text-sm">
                <h1 className="text-xl">{location.state.algo.toUpperCase()} SORT</h1>
                <p className="text-gray-400">Insertion sort is a simple sorting algorithm that works similarly to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed in the correct position in the sorted part.</p>
            </div>
            <div className="p-6 text-white flex justify-center items-center sm:flex-row flex-col gap-6">

                <div className="flex flex-col justify-center items-center gap-6">
                    <div>
                        <h1 className="text-xl"> ANIMATION </h1>
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <div className="p-4 bg-blue-500 w-4 border "></div> i
                        <div className="p-4 bg-red-500 w-4 border "></div> j
                        <div className="p-4 bg-yellow-500 w-4 border "></div> traversed
                        <div className="p-4 bg-green-500 w-4 border "></div> Sorted
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
                                className={`border border-white p-4 m-2 ${idx === comparingIndices[0]
                                    ? 'bg-red-500'
                                    : idx < comparingIndices[1]
                                        ? 'bg-yellow-500'
                                        : idx <= comparingIndices[1]
                                            ? "bg-blue-500" : idx === comparingIndices[2]
                                                ? 'bg-[#343434]'
                                                : isSorted ? 'bg-green-500'
                                                    : 'bg-[#343434]'
                                    }`}
                            >
                                {num}
                            </div>
                        ))}
                    </div >
                    <div className="flex flex-col justify-center items-center">
                        <div>
                            <button className="bg-blue-500 px-4 p-2 mt-4 rounded text-white w-fit" onClick={handleSort} disabled={isSorting}>
                                {isSorting ? 'Sorting...' : 'Start Sorting'}
                            </button>

                        </div>
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
