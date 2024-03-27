import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


// 4, 8, 5, 1, 0, 2, 9

export default function Quick() {
    const location = useLocation();
    const initialArr = location.state.arr.split(",").map(Number);
    const [array, setArray] = useState(initialArr);
    const [isSorting, setIsSorting] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const [leftRight, setLeftRight] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [preArray, setPreArray] = useState([]);

    useEffect(() => {
        if (isSorting) {
            quickSort([...array]);
        }
        if (isSorted) {
            setTimeout(() => {
                setArray([...array]);
                setPreArray([]);
            }, 2000);
        }
    }, [isSorted]);

    const visualUpdate = async (tempArray, indices, msg) => {
        //indices stores pivot, start, end, msg indexes
        return new Promise((resolve) => {
            setTimeout(() => {
                setArray([...tempArray]);
                setLeftRight([...indices]);
                setAlertMessage(msg);
                resolve();
            }, 5000);
        });
    };

    const preUpdate = async (tempArray) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setPreArray(tempArray);
                resolve();
            }, 1000);
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

    const quickSort = async (arr, start = 0, end = arr.length - 1) => {
        if (start >= end) {
            return arr;
        }

        const index = await partition(arr, start, end);

        await quickSort(arr, start, index - 1);
        await quickSort(arr, index + 1, end);
        return arr;
    };

    const partition = async (arr, start, end) => {
        const pivotValue = arr[end];
        let pivotIndex = start;


        await visualUpdate([...arr], [end, start, pivotIndex], "Updating current sorting subarray...");
        await preUpdate(arr.slice(start, end + 1));


        for (let i = start; i < end; i++) {
            if (arr[i] <= pivotValue) {
                if (arr[i] == pivotValue) {
                    await visualUpdate([...arr], [end, i, pivotIndex], arr[i] + " == " + pivotValue);
                }
                else {
                    await visualUpdate([...arr], [end, i, pivotIndex], arr[i] + " < " + pivotValue);

                    [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];

                    await visualUpdate([...arr], [end, i, pivotIndex], arr[i] + ", " + arr[pivotIndex] + " ---> swapping");
                }
                pivotIndex++;
                await visualUpdate([...arr], [end, i, pivotIndex], "PivotIndex + 1 = " +
                    pivotIndex);
            }
            if (arr[i] > pivotValue) {
                await visualUpdate([...arr], [end, i, pivotIndex], arr[i] + " > " + pivotValue + " ---> do nothing");
            }
        }

        [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];

        await visualUpdate([...arr], [pivotIndex, start, end], "Swapped " + arr[end] + " and " + arr[pivotIndex]);

        const mesg = pivotIndex == end ? "" : pivotValue + " is in its correct position, and now all the elements before " + pivotValue + " is smaller then it and values after it are greater.";
        await visualUpdate([...arr], [pivotIndex, start, end], mesg);

        return pivotIndex;
    };

    const handleSort = async () => {
        setIsSorting(true);
        setIsSorted(false);

        const sortedArray = await quickSort([...array]);
        setArray(sortedArray);
        await visualUpdate(sortedArray, []);

        setIsSorting(false);
        setIsSorted(true);
    };



    return (
        <div className="p-6 text-white flex flex-col text-sm">
            <div className="mx-12 p-6 text-white text-sm flex justify-center flex-col gap-6 text-center">
                <h1 className="text-xl">{location.state.algo.toUpperCase()} SORT</h1>
                <p className="text-gray-400">
                    QuickSort is a sorting algorithm based on the Divide and Conquer algorithm that picks an element as a pivot and partitions the given array around the picked pivot by placing the pivot in its correct position in the sorted array.
                </p>
            </div>
            <div className="p-6 text-white flex justify-center flex-col gap-6">

                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-xl"> ANIMATION </h1>
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <div className="p-4 bg-red-500 w-4 border "></div> curr
                        <div className="p-4 bg-yellow-500 w-4 border "></div> PivotValue / End
                        <div className="p-4 bg-blue-500 w-4 border "></div> PivotIndex
                        <div className="p-4 bg-green-500 w-4 border "></div> Sorted
                        <div className="p-4 bg-gradient-to-t from-red-500 to-blue-500 w-4 border "></div> curr == PivotIndex
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
                            {preArray.length > 0 &&
                                <div>
                                    <h2 className="p-2">Current Sorting Subarray</h2>
                                    <div className="flex justify-around">
                                        {preArray.map((num, idx) => (
                                            <div
                                                key={idx}
                                                className="border border-white p-4 m-2 bg-[#343434]"
                                            >
                                                {num}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }

                            <h2 className="m-2">{isSorting ? "Sorting..." : "Sorted"}</h2>

                            <div className="text-wrap text-green-500 p-2">{alertMessage}</div>
                            <div className="flex justify-around">
                                {array.map((num, idx) => (
                                    <div
                                        key={idx}
                                        className={`border border-white p-4 m-2 ${(idx == leftRight[1] && idx == leftRight[2]) ? "bg-gradient-to-t from-red-500 to to-blue-500" : idx == leftRight[1]
                                            ? 'bg-red-500'
                                            : idx == leftRight[2]
                                                ? 'bg-blue-500'
                                                : idx === leftRight[0]
                                                    ? 'bg-yellow-500'
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
                        <div>
                            <button className="bg-blue-500 px-4 p-2 mt-4 rounded text-white w-fit" onClick={handleSort} disabled={isSorting}>
                                {isSorting ? 'Sorting...' : 'Start Sorting'}
                            </button>

                        </div>
                        <div>
                            <h2 className="py-4">Process Diagram</h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-2">
                                    <p className="border border-white p-2 bg-red-500">curr</p>
                                    <p className="p-2">{`>`}</p>
                                    <p className="border border-white p-2 bg-yellow-500">Pivot</p>
                                    <p className="p-2">{`--->`}</p>
                                    <p className="p-2 text-green-400">Pass</p>
                                </div>
                                <div className="flex">
                                    <div>
                                        <div className="flex">
                                            <p className="border border-white p-2 bg-red-500">curr</p>
                                            <p className="p-2">{`<=`}</p>
                                            <p className="border border-white p-2 bg-yellow-500">Pivot</p>
                                        </div>
                                    </div>
                                    <p className="p-2">{`--->`}</p>
                                    <div className="flex flex-col gap-4 border border-white p-2">
                                        <div className="flex border border-white p-2">

                                            <p>1.</p>
                                            <div className="flex p-2">
                                                <p className="border border-white p-2 bg-red-500">curr</p>
                                                <p className="p-2">{`>`}</p>
                                                <p className="border border-white p-2 bg-blue-500">PivotIndex</p>
                                            </div>
                                            <p className="py-4 p-2">{`--->`}</p>
                                            <p className="flex gap-4 p-2">
                                                <p className="p-2">Swap</p>
                                                <div className="flex gap-4">
                                                    <p className="border border-white p-2 bg-red-500">curr</p>
                                                    <p className="py-2">and</p>
                                                    <p className="border border-white p-2 bg-blue-500">PivotIndex</p>
                                                </div>

                                            </p>
                                        </div>
                                        <div className=" flex border border-white p-2">
                                            <div className="flex">
                                                <p className="pr-2">2.</p>
                                                <p className="border border-white p-2 bg-red-500">curr</p>
                                                <p className="p-2">{`==`}</p>
                                                <p className="border border-white p-2 bg-blue-500">PivotIndex</p><p className="p-2">{`--->`}</p>
                                            </div>
                                            <p className="text-green-500 p-2">Pass</p>
                                        </div>
                                    </div>
                                    <div className="flex p-2 justify-center items-center">
                                        <p className="p-2">{`--->`}</p>
                                        <div>
                                            <p className="p-2 flex border border-white">
                                                <p className="text-red-">curr</p>+1
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div >
                <div className="text-white flex flex-col">
                    <div>
                        <h1>CODE</h1>
                        <pre className="bg-[#343434] text-sm text-gray-400 m-4 text-wrap sm:p-2 p-6"><code>{codeToDisplay()}</code></pre>
                    </div>
                </div>
            </div>
        </div >
    );
}
