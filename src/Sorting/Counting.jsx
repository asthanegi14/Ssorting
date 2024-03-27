import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Counting() {
    const location = useLocation();
    const initialArr = location.state.arr.split(",").map(Number);

    const [array, setArray] = useState(initialArr);
    const [isSorting, setIsSorting] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [max, setMax] = useState('');
    const [msg, setMsg] = useState('');
    const [compareIndex, setCompareIndex] = useState([]);
    const [compareCountIndex, setCompareCountIndex] = useState([]);
    const [countArray, setCountArray] = useState([]);

    useEffect(() => {
        if (isSorting) {
            countingSort([...array]);
        }
        if (isSorted) {
            setTimeout(() => {
                setArray([...array]);
            }, 800);
        }
    }, [isSorted]);

    const visualUpdate = async (tempArray, msg) => {
        return new Promise((resolve) => {
            let delay = 0;
            for (let i = 0; i < tempArray.length; i++) {
                setTimeout(() => {
                    setArray([...tempArray.slice(0, i), tempArray[i], ...tempArray.slice(i + 1)]);
                    setAlertMessage(msg);
                }, delay);
                delay += 800;
            }

            setTimeout(() => {
                setCompareIndex();
                setCompareCountIndex();
                resolve();
            }, delay);
        });
    };

    const countUpdate = async (tempArray, idx, msg) => {
        // idx contains i, sum[i] indexes
        return new Promise((resolve) => {
            let delay = 0;
            for (let i = 0; i < tempArray.length; i++) {
                setTimeout(() => {
                    console.log("idx = " + idx);
                    setCountArray([...tempArray]);
                    if (idx[1] == -1) {
                        setCompareIndex(-1);
                        setCompareCountIndex(idx[0]);
                    }
                    else {
                        setCompareIndex(idx[0]);
                        setCompareCountIndex(initialArr[idx]);
                    }

                    setMsg(msg);
                }, delay);
                delay += 1000;
            }

            setTimeout(() => {
                resolve();
            }, delay);
        });
    }

    function codeToDisplay() {
        const code = `for i from 0 to n-1
    count[A[i]]++
for i from 1 to k
    count[i] += count[i-1]
for i from n-1 downto 0
    result[count[A[i]]-1] = A[i]
    count[A[i]]--
for i from 0 to n-1
    A[i] = result[i]`;
        return code;
    }

    const getMax = (arr) => {
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    };

    const countingSort = async (arr) => {
        const max = getMax(arr);
        await setMax(max);
        const count = new Array(max + 1).fill(0);
        await countUpdate([...count], [-1], "");

        for (let i = 0; i < arr.length; i++) {
            count[arr[i]]++;
            const msg = "Increase count of index " + arr[i];
            await countUpdate([...count], [i], msg);
        }

        for (let i = 1; i <= max; i++) {
            count[i] += count[i - 1];
            const msg = "Sum up " + count[i - 1] + " and " + (count[i] - count[i - 1]) + " and put it in index " + i;
            await countUpdate([...count], [i, -1], msg);
        }

        const output = new Array(arr.length);

        for (let i = arr.length - 1; i >= 0; i--) {
            output[count[arr[i]] - 1] = arr[i];
            const msg = "Decreasing the count of index " + arr[i];
            count[arr[i]]--;
            await countUpdate([...count], [i, -1], msg);
            await visualUpdate([...output], [`Placing ${arr[i]} in the sorted order`]);
        }

        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
        }
        await visualUpdate([...arr], ["Sorted Sucessfully"]);

        return arr;
    };

    const handleSort = async () => {
        setIsSorting(true);
        setIsSorted(false);

        const sortedArray = await countingSort([...array]);
        setArray(sortedArray);
        await visualUpdate(sortedArray, []);

        setIsSorting(false);
        setIsSorted(true);
    };

    return (
        <div className="p-6 text-white flex flex-col">
            <div className="mx-12 p-6 text-white text-sm flex justify-center flex-col gap-6 text-center">
                <h1 className="text-xl">{location.state.algo.toUpperCase()} SORT</h1>
                <p className="text-gray-400">
                    Counting Sort is a non-comparison-based sorting algorithm that works well when there is limited range of input values. It is particularly efficient when the range of input values is small compared to the number of elements to be sorted. The basic idea behind Counting Sort is to count the frequency of each distinct element in the input array and use that information to place the elements in their correct sorted positions.
                </p>
                <i className="text-red-400 font-bold">It is applicable for +ve values only</i>
            </div>
            <div className="p-6 text-white flex justify-center sm:flex-row flex-col gap-6">

                <div className="flex flex-col justify-center items-center gap-6">
                    <div>
                        <h1 className="text-xl"> ANIMATION </h1>
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <div className="p-4 bg-[#343434] w-4 border "></div> Original
                        <div className="p-4 bg-blue-500 w-4 border "></div> max
                        <div className="p-4 bg-red-500 w-4 border "></div> Current
                        <div className="p-4 bg-green-500 w-4 border "></div> Sorted
                    </div>
                    <div className="flex flex-row justify-center">
                        <div className="flex flex-col justify-around ">
                            <h2>Original Array</h2>
                            <div className="flex justify-around">
                                {initialArr.map((num, idx) => (
                                    <div
                                        key={idx}
                                        className={`border border-white p-4 m-2 ${num === max ? "bg-blue-500" : "bg-[#343434]"}`}>
                                        {num}
                                    </div>
                                ))}
                            </div>

                            {max &&
                                <p className="m-4 text-sm text-gray-400">Maximum element is {max}. It has {max.toString().length} digits, so we will create count array of size {max + 1} </p>}
                            <p className="text-green-500">{alertMessage}</p>
                            <div className="flex justify-around">
                                {array && array.map((num, idx) => (
                                    <div
                                        key={idx}
                                        className={`border border-white p-4 m-2 ${idx === compareIndex ? "bg-red-500" : isSorted ? "bg-green-500" : "bg-[#343434]"} `}
                                    >
                                        {num}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="text-green-500">{msg}</p>
                    {countArray.length > 0 && <h2>Count Array:-</h2>}
                    <div className="flex justify-center">
                        {countArray.map((count, idx) => (
                            <div key={idx} className={`m-1 ${idx === compareCountIndex ? "bg-red-500" : "bg-[#343434]"}  border border-white text-white p-4`}>{count}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center items-center">
                        <button className="bg-blue-500 px-4 p-2 mt-4 rounded text-white w-fit" onClick={handleSort} disabled={isSorting}>
                            {isSorting ? 'Sorting...' : 'Start Sorting'}
                        </button>
                    </div>
                </div>
                <div className="text-white flex flex-col">
                    <h1>CODE</h1>
                    <pre className="bg-[#343434] text-sm text-gray-400 m-4 text-wrap sm:p-2 p-6"><code>{codeToDisplay()}</code></pre>
                </div>
            </div>
        </div>
    );
}
