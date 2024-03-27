import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Binary() {
    const location = useLocation();
    const initialArr = location.state.arr.split(",").map(Number);
    const [array, setArray] = useState([...initialArr].sort((a, b) => a - b)); // sorted array

    const valueToFind = parseInt(location.state.toBeSearched);
    const [isSearching, setIsSearching] = useState(false);
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(initialArr.length - 1);
    const [comparingIndex, setComparingIndex] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        if (isSearching) {
            binarySearch([...array]);
        }
    }, [isSearching, array]);

    const visualUpdate = async (indices, msg) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("indices = " + indices);
                setComparingIndex([...indices]);
                setAlertMessage(msg);
                resolve();
            }, 4000);
        });
    };

    function codeToDisplay() {
        const code = `
        while (low <= high) {
            mid = Math.floor((low + high) / 2);
            if (arr[mid] === x) {
                return mid;
            } else if (arr[mid] < x) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
        `;
        return code;
    }

    const binarySearch = async (arr) => {
        let lowIndex = low;
        let highIndex = high;

        while (lowIndex <= highIndex) {
            let midIndex = Math.floor((lowIndex + highIndex) / 2);

            await visualUpdate([lowIndex, highIndex, midIndex], "");

            if (arr[midIndex] === valueToFind) {

                await visualUpdate([-1, -1, midIndex], `${valueToFind} found at index ${midIndex}`);

                setIsSearching(false);
                setIsSearched(true);
                return;
            } else if (arr[midIndex] < valueToFind) {

                lowIndex = midIndex + 1;

                await visualUpdate([lowIndex, highIndex, midIndex], `${arr[midIndex] + "<" + valueToFind}, so assigning ${midIndex + 1} to lowIndex.`);
                // setLow(midIndex + 1);
            } else {

                highIndex = midIndex - 1;

                await visualUpdate([lowIndex, highIndex, midIndex], `${arr[midIndex] + ">" + valueToFind}, so assigning ${midIndex - 1} to highIndex.`);
                // setHigh(midIndex - 1);
            }
        }

        await visualUpdate([-1, -1, -1]);
        setAlertMessage(`${valueToFind} not found in the array.`);

        setTimeout(() => {
            setIsSearching(false);
            setIsSearched(true);
        }, 4000);
    };

    const handleSort = () => {
        setIsSearching(true);
        setIsSearched(false);
        setLow(0);
        setHigh(initialArr.length - 1);
        setComparingIndex([-1, -1, -1]);
        setAlertMessage('');
    };

    return (
        <div className="p-6 text-white flex flex-col">
            <div className="mx-12 p-6 text-white flex justify-center flex-col gap-6 text-center text-sm">
                <h1 className="text-xl">{location.state.algo.toUpperCase()} SEARCH</h1>
                <p className="text-gray-400">
                    Binary Search is defined as a searching algorithm used in a sorted array by repeatedly dividing the search interval in half. The idea of binary search is to use the information that the array is sorted and reduce the time complexity to O(log N).
                </p>
            </div>
            <div className="p-6 text-white flex justify-center sm:flex-row flex-col gap-6">
                <div className="flex flex-col gap-6 justify-center items-center">
                    <div>
                        <h1 className="text-xl"> ANIMATION </h1>
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <div className="p-4 bg-yellow-500 w-4 border "></div> mid

                        <div className="p-4 bg-red-500 w-4 border "></div> low

                        <div className="p-4 bg-blue-500 w-4 border "></div> high
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

                    <h2>Sorted Array</h2>
                    <div className="flex p-2">
                        {/* comparingIndex:- {comparingIndex} */}
                        {array.map((num, idx) => (
                            <div
                                key={idx}
                                className={`border border-white p-4 m-2 ${idx == comparingIndex[0] ? "bg-red-500" : idx == comparingIndex[1] ? "bg-blue-500" : idx == comparingIndex[2] ? "bg-yellow-500" : "bg-[#343434]"}`}
                            >
                                {num}
                            </div>
                        ))}
                    </div>

                    <p className="p-2 text-green-500">{alertMessage}</p>
                    <div className="flex flex-col justify-center items-center">
                        <button className="bg-blue-500 px-4 p-2 mt-4 rounded text-white w-fit" onClick={handleSort} disabled={isSearching}>
                            {isSearching ? 'Searching...' : 'Start Searching'}
                        </button>
                    </div>
                </div>
                <div className="text-white flex flex-col">
                    <h1>CODE</h1>
                    <pre className="bg-[#343434] text-gray-400 m-4 text-wrap sm:p-2 p-6"><code>{codeToDisplay()}</code></pre>
                </div>
            </div>
        </div>
    );
}
