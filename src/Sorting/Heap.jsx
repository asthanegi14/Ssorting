import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Tree from 'react-d3-tree';

// 2, 10, 4, 7, 1, 8, 9, 3, 6, 5

export default function Heap() {
    const location = useLocation();
    const initialArr = location.state ? location.state.arr.split(",").map(Number) : [];

    const [array, setArray] = useState(initialArr);
    const [isSorting, setIsSorting] = useState(false);
    const [comparingIndices, setComparingIndices] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [treeData, setTreeData] = useState([]);

    useEffect(() => {
        if (isSorting) {
            heapSort([...array]);
        }
        if (isSorted) {
            setTimeout(() => {
                setArray([...array]);
            }, 3000);
        }
    }, [isSorted]);

    useEffect(() => {
        setTreeData([arrayToTree(array, 0)]);
    }, [array]);


    const arrayToTree = (arr, index) => {
        if (index < arr.length) {
            return {
                name: `${arr[index]}`,
                children: [
                    arrayToTree(arr, 2 * index + 1),
                    arrayToTree(arr, 2 * index + 2)
                ].filter(c => c)
            };
        }
        return undefined;
    };

    const visualUpdate = (tempArray, indices, msg) => {
        return new Promise(resolve => {
            setTimeout(() => {
                setArray([...tempArray]);
                setAlertMessage(msg);
                setComparingIndices([...indices]);
                resolve();
            }, 3000);
        });
    };


    function codeToDisplay() {
        const code = `quicksort(array, low, high):
        if low < high:
          pivot = partition(array, low, high)
          quicksort(array, low, pivot - 1)
          quicksort(array, pivot + 1, high)
      
      partition(array, low, high):
        pivot = array[high]
        i = low - 1
        for j in range(low, high):
          if array[j] <= pivot:
            i += 1
            array[i], array[j] = array[j], array[i]
        array[i + 1], array[high] = array[high], array[i + 1]
        return i + 1`;

        return code;
    }

    const heapSort = async (arr) => {
        // Build max heap

        await visualUpdate([...arr], [-1, -1, -1], "Building Max Heap");

        for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
            await heapify(arr, arr.length, i);
        }

        for (let i = arr.length - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];

            await visualUpdate([...arr], [0, i, -1], "swapped " + arr[0] + " and " + arr[i]);
            await heapify(arr, i, 0);
        }

        setIsSorted(true);
        return arr;
    };

    const heapify = async (arr, n, i) => {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        await visualUpdate(arr, [largest, left, right], "Heapifying the binary tree");

        if (left < n && arr[left] > arr[largest]) {
            await visualUpdate([...arr], [largest, left, right], arr[left] + " is greater then " + arr[largest] + ", so swap them");

            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            await visualUpdate([...arr], [largest, left, right], arr[right] + " is greater then " + arr[largest] + ", so swap them");

            largest = right;
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];

            await visualUpdate([...arr], [largest, i, -1], "Swapped " + arr[i] + " and " + arr[largest]);
            await heapify(arr, n, largest);
        }

        return;
    };


    const handleSort = async () => {
        setIsSorting(true);
        setIsSorted(false);

        const sortedArray = await heapSort([...array]);
        setArray(sortedArray);
        await visualUpdate(sortedArray, [], "Array is Sorted");

        setIsSorting(false);
        setIsSorted(true);
    };



    return (
        <div className="p-6 text-white flex flex-col">
            <div className="mx-12 p-6 text-white flex justify-center flex-col gap-6 text-sm text-center">
                <h1 className="text-xl">{location.state.algo.toUpperCase()} SORT</h1>
                <p className="text-gray-400">
                    Heap sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to the selection sort where we first find the minimum element and place the minimum element at the beginning. Repeat the same process for the remaining elements.
                </p>
            </div>
            <div className="p-6 text-white flex justify-center sm:flex-row flex-col gap-6">

                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-xl"> ANIMATION </h1>
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <div className="p-4 bg-red-500 w-4 border "></div> i
                        <div className="p-4 bg-yellow-500 w-4 border "></div> left
                        <div className="p-4 bg-blue-500 w-4 border "></div> right
                        <div className="p-4 bg-green-500 w-4 border "></div> Sorted
                    </div>
                    <div className="flex flex-row justify-center">
                        <div className="flex flex-col justify-around ">
                            <div className="flex justify-around">
                                {initialArr.map((num, idx) => (
                                    <div
                                        key={idx}
                                        className="border border-white p-4 m-2 bg-[#343434]"
                                    >
                                        {num}
                                    </div>

                                ))}
                            </div>

                            <div className="mb-4">
                                <h2>Diagram:- </h2>
                                <div className="flex gap-4 justify-center items-center mb-4">
                                    <div className="p-4 bg-red-500 w-4 border "></div>
                                    <p>{`<`}</p>
                                    <div className="p-4 bg-yellow-500 w-4 border "></div>
                                    <p>Swap them</p>
                                </div>
                                <div className="flex gap-4 justify-center items-center">
                                    <div className="p-4 bg-red-500 w-4 border "></div>
                                    <p>{`<`}</p>
                                    <div className="p-4 bg-blue-500 w-4 border "></div>
                                    <p>Swap them</p>
                                </div>
                            </div>

                            <p className="text-green-500 text-sm">{alertMessage}</p>

                            <div className="flex justify-around">
                                {array.map((num, idx) => (
                                    <div
                                        key={idx}
                                        className={`border border-white p-4 m-2 ${idx === comparingIndices[0]
                                            ? 'bg-red-500'
                                            : idx === comparingIndices[1]
                                                ? 'bg-yellow-500'
                                                : idx === comparingIndices[2]
                                                    ? 'bg-blue-500'
                                                    : isSorted ? 'bg-green-500'
                                                        : 'bg-[#343434]'
                                            }`}
                                    >
                                        {num}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div >
                    <div className="flex flex-col justify-center items-center">
                        <button className="bg-blue-500 px-4 p-2 mt-4 rounded text-white w-fit" onClick={handleSort} disabled={isSorting}>
                            {isSorting ? 'Sorting...' : 'Start Sorting'}
                        </button>
                    </div>
                </div >
                <div className="w-[100vh] h-[100vh] flex flex-col items-center justify-center">
                    <p className="text-sm text-red-500">If the tree is not properly fitting then try to zoom it out or just move the tree with cursor.</p>
                    <p className="text-sm text-yellow-500">You can also hide the child nodes by clicking on the parent node.</p>
                    {treeData.length > 0 && (
                        <Tree data={treeData} orientation="vertical" translate={{ x: 270, y: 50 }} />

                    )}
                </div>
            </div>
            <div className="text-white flex flex-col">
                <h1>CODE</h1>
                <pre className="bg-[#343434] text-sm text-gray-400 m-4 text-wrap sm:p-2 p-6"><code>{codeToDisplay()}</code></pre>
            </div>
        </div >
    );
}
