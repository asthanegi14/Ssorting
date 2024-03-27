import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Radix() {
    const location = useLocation();
    const initialArr = location.state.arr.split(",").map(Number);

    const [array, setArray] = useState(initialArr);
    const [isSorting, setIsSorting] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [max, setMax] = useState('');

    useEffect(() => {
        if (isSorting) {
            radixSort([...array]);
        }
        if (isSorted) {
            setTimeout(() => {
                setArray([...array]);
            }, 2000);
        }
    }, [isSorted]);

    const visualUpdate = async (tempArray, msg) => {
        return new Promise((resolve) => {
            let delay = 0;
            for (let i = 0; i < tempArray.length; i++) {
                setTimeout(() => {
                    setArray([...tempArray]);
                    setAlertMessage(msg);
                }, delay);
                delay += 800;
            }

            setTimeout(() => {
                setAlertMessage("Sorted Sucessfully");
                resolve();
            }, delay);
        });
    };


    function codeToDisplay() {
        const code =
            `for j = 1 to d do
    int count[10] = {0};
    for i = 0 to n do
        count[key of(A[i]) in pass j]++
        
    for k = 1 to 10 do
        count[k] = count[k] + count[k-1]
        
    for i = n-1 downto 0 do
        result[ count[key of(A[i])] ] = A[j]
        count[key of(A[i])]--
        
    for i=0 to n do
        A[i] = result[i]
        
    end for(j)
end func`;
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

    const countSort = async (arr, exp) => {
        const output = new Array(arr.length);
        const count = new Array(10).fill(0);

        for (let i = 0; i < arr.length; i++) {
            count[Math.floor(arr[i] / exp) % 10]++;
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (let i = arr.length - 1; i >= 0; i--) {
            output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
            count[Math.floor(arr[i] / exp) % 10]--;
        }

        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
        }
    };

    const radixSort = async (arr) => {
        const max = getMax(arr);
        await setMax(max);
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            countSort(arr, exp);
            await visualUpdate([...arr], ["Sorted according to " + exp + "'s digit"]);
        }

        return arr;
    };

    const handleSort = async () => {
        setIsSorting(true);
        setIsSorted(false);

        const sortedArray = await radixSort([...array]);
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
                    Radix Sort is a linear sorting algorithm that sorts elements by processing them digit by digit. It is an efficient sorting algorithm for integers or strings with fixed-size keys.
                </p>
                <i className="text-red-400 font-bold">It is applicable for +ve values only</i>
            </div>
            <div className="p-6 text-white flex justify-center sm:flex-row flex-col gap-6">

                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-xl"> ANIMATION </h1>
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <div className="p-4 bg-red-500 w-4 border "></div> i
                        <div className="p-4 bg-[#343434] w-4 border "></div> Original
                        <div className="p-4 bg-blue-500 w-4 border "></div> max
                        {/* <div className="p-4 bg-[#343434] w-4 border "></div> Original Array */}
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

                            {max &&
                                <p className="m-4 text-sm text-gray-400">Maximum element is {max}. It has {max.toString().length} digits, so we will iterate {max.toString().length} times</p>}
                            <p className="m-4 text-sm text-green-400">
                                {alertMessage}
                            </p>
                            <div className="flex justify-around">
                                {array && array.map((num, idx) => (
                                    <div
                                        key={idx}
                                        className={`border border-white p-4 m-2 ${isSorted ? "bg-green-500" : "bg-[#343434]"} `}
                                    >
                                        {num}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button className="bg-blue-500 p-2 mt-4 rounded text-white" onClick={handleSort} disabled={isSorting}>
                        {isSorting ? 'Sorting...' : 'Start Sorting'}
                    </button>
                </div >
                <div className="text-white flex flex-col">
                    <h1>CODE</h1>
                    <pre className="bg-[#343434] text-sm text-gray-400 m-4 text-wrap sm:p-2 p-6"><code>{codeToDisplay()}</code></pre>
                </div>
            </div>
        </div >
    );
}
