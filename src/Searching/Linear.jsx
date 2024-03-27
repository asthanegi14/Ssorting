import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Linear() {
    const location = useLocation();
    const initialArr = location.state.arr.split(",").map(Number);
    const valueToFind = parseInt(location.state.toBeSearched);
    const [isSearching, setIsSearching] = useState(false);
    const [comparingIndex, setComparingIndex] = useState(null);
    const [isSearched, setIsSearched] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        if (isSearching) {
            linearSearch([...initialArr]);
        }
    }, [isSearching]);

    const visualUpdate = async (index, msg) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setAlertMessage(msg);
                setComparingIndex(index);
                resolve();
            }, 2000);
        });
    };

    function codeToDisplay() {
        const code = `
        for (let i = 0; i < n; i++) {
            if (arr[i] === x) {
                return i;
            }
        }
        return -1;
        `;
        return code;
    }

    const linearSearch = async (arr) => {
        let n = arr.length;
        let found = false;
        for (let i = 0; i < n; i++) {
            if (arr[i] != valueToFind) {
                await visualUpdate(i, `${arr[i]} and ${valueToFind} are not equal`);
            }
            if (arr[i] === valueToFind) {
                await visualUpdate(i, `${valueToFind} is found at index ${i}`);

                found = true;
                break;
            }
        }

        if (!found) {
            await setAlertMessage(`${valueToFind} not found in the array.`);
        }

        setTimeout(() => {
            setIsSearching(false);
            setIsSearched(true);
        }, 2000);
    };

    const handleSort = () => {
        setIsSearching(true);
        setIsSearched(false);
        setComparingIndex(null);
        setAlertMessage('');
    };

    return (
        <div className="p-6 text-white flex flex-col">
            <div className="mx-12 p-6 text-white flex justify-center flex-col gap-6 text-center text-sm">
                <h1 className="text-xl">{location.state.algo.toUpperCase()} SEARCH</h1>
                <p className="text-gray-400">
                    Linear Search is a sequential search algorithm that goes through each element of a list until the desired element is found or the search reaches the end of the data set.
                </p>
            </div>
            <div className="p-6 text-white flex justify-center sm:flex-row flex-col gap-6">
                <div className="flex flex-col gap-6 justify-center items-center">
                    <div>
                        <h1 className="text-xl"> ANIMATION </h1>
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <div className="p-4 bg-red-500 w-4 border "></div> i
                    </div>
                    <h2>Original Array</h2>
                    <div className="flex p-2">
                        {initialArr.map((num, idx) => (
                            <div
                                key={idx}
                                className={`border border-white p-4 m-2 ${idx === comparingIndex ? "bg-red-500" : "bg-[#343434]"}`}
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
