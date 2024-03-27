import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


// 4, 8, 5, 1, 0, 2, 9

export default function Merge() {
    const location = useLocation();
    const initialArr = location.state.arr.split(",").map(Number);

    const [array, setArray] = useState(initialArr);
    const [isSorting, setIsSorting] = useState(false);
    const [comparingIndices, setComparingIndices] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [preArray, setPreArray] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        if (isSorting) {
            mergeSort([...array]);
        }
        if (isSorted) {
            setTimeout(() => {
                setArray([...array]);
                setPreArray([]);
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
            }, 2000);
        });
    };

    const preUpdate = async (left, right, msg) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setPreArray([...preArray, [...left, ...right]]);
                setAlertMessage(msg);
                // console.log(preArray);
                resolve();
            }, 2000);
        });
    };

    function codeToDisplay() {
        const code = `function mergeSort(array)
        if length of array <= 1
            return array
        middle = length of array / 2
        leftArray = mergeSort(first half of array)
        rightArray = mergeSort(second half of array)
        return merge(leftArray, rightArray)`;

        return code;
    }

    const mergeSort = async (arr) => {
        if (arr.length <= 1) {
            return arr;
        }

        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        await preUpdate(left, right, "Updating left and right sub-arrays");

        const leftSorted = await mergeSort(left);
        const rightSorted = await mergeSort(right);

        await preUpdate(left, right, "left and right sub-arrays are sorted separately");

        const merged = await merge(leftSorted, rightSorted);

        return merged;
    };

    const merge = async (left, right) => {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {

                await visualUpdate(result, [leftIndex, rightIndex], left[leftIndex] + " < " + right[rightIndex] + ", puting them in sorted order");

                result.push(left[leftIndex++]);
            } else {
                await visualUpdate(
                    result,
                    [leftIndex, rightIndex],
                    `${left[leftIndex]} ${left[leftIndex] > right[rightIndex] ? ">" : "=="} ${right[rightIndex]}, puting them in sorted order`
                );


                result.push(right[rightIndex++]);
            }
        }

        result = result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));

        await visualUpdate(result, [leftIndex, rightIndex], "this is sorted order");

        return result;
    };


    const handleSort = async () => {
        setIsSorting(true);
        setIsSorted(false);

        const sortedArray = await mergeSort([...array]);
        setArray(sortedArray);
        await visualUpdate(sortedArray, []);

        setIsSorting(false);
        setIsSorted(true);
    };



    return (
        <div className="p-6 text-white flex flex-col">
            <div className="mx-12 p-6 text-white flex justify-center flex-col gap-6 text-center text-sm">
                <h1 className="text-xl">{location.state.algo.toUpperCase()} SORT</h1>
                <p className="text-gray-400">Merge sort is defined as a sorting algorithm that works by dividing an array into smaller subarrays, sorting each subarray, and then merging the sorted subarrays back together to form the final sorted array.
                    <br />
                    In simple terms, we can say that the process of merge sort is to divide the array into two halves, sort each half, and then merge the sorted halves back together. This process is repeated until the entire array is sorted.</p>
            </div>
            <div className="p-6 text-white flex justify-center items-center sm:flex-row flex-col gap-6">

                <div className="flex flex-col justify-center items-center gap-6">
                    <div>
                        <h1 className="text-xl"> ANIMATION </h1>
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <div className="p-4 bg-red-500 w-4 border "></div> Left Subarray
                        <div className="p-4 bg-yellow-500 w-4 border "></div> compare
                        <div className="p-4 bg-blue-500 w-4 border "></div> Right Subarray
                        <div className="p-4 bg-green-500 w-4 border "></div> Sorted
                    </div>
                    <div className="flex flex-row justify-center">
                        <div className="flex flex-col justify-around ">
                            <div className="flex justify-around">
                                {initialArr.map((num, idx) => (
                                    <div
                                        key={idx}
                                        className="border border-white p-4 m-2 bg-[#343434]">
                                        {num}
                                    </div>
                                ))}
                            </div>
                            {preArray.length > 0 && <h2>For this subarray</h2>}
                            {preArray.map((subArray, subArrayIdx) => (
                                <div key={subArrayIdx} className="flex flex-row">
                                    {subArray.map((num, idx) => (
                                        <div
                                            key={idx}
                                            className={`border border-white p-4 m-2 ${idx < Math.floor(subArray.length / 2) ? "bg-red-500" : "bg-blue-500"
                                                }`}
                                        >
                                            {num}
                                        </div>
                                    ))}
                                </div>
                            ))}

                            <p className="text-green-500 p-2">{alertMessage}</p>
                            <h2 className="m-4">
                                {isSorting ? "Sorting..." : "This is the sorted subarray"}
                            </h2>


                            <div className="flex justify-around">
                                {array.map((num, idx) => (
                                    <div
                                        key={idx}
                                        className={`border border-white p-4 m-2 ${(idx === comparingIndices[0] || idx === comparingIndices[1]) ? "bg-yellow-500" : isSorted ? "bg-green-500" : "bg-[#343434]"} `}>
                                        {num}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div >
                    <div className="flex flex-col justify-center items-center">
                        <div>
                            <button className="bg-blue-500 px-4 p-2 mt-4 rounded text-white w-fit" onClick={handleSort} disabled={isSorting}>
                                {isSorting ? 'Sorting...' : 'Start Sorting'}
                            </button>

                        </div>
                    </div>
                </div >
                <div className="text-white flex flex-col justify-center items-center">
                    <h1 className="text-xl">CODE</h1>
                    <pre className="bg-[#343434] text-gray-400 m-4 text-wrap sm:p-2 p-6"><code>{codeToDisplay()}</code></pre>
                </div>
            </div>
        </div >
    );
}
