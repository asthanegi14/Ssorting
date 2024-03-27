import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [arr, setArr] = useState("");
    const [state, setState] = useState(true);
    const [algo, setAlgo] = useState("");
    const [srch, setSrch] = useState("");
    const name = state ? "Sorting" : "Searching";
    const history = useNavigate();
    const path = `/${name}/${algo}`;

    const sortings = [
        {
            value: "insertion",
            text: "Insertion Sort"
        }, {
            value: "bubble",
            text: "Bubble Sort"
        }, {
            value: "selection",
            text: "Selection Sort"
        }, {
            value: "merge",
            text: "Merge Sort"
        }, {
            value: "quick",
            text: "Quick Sort"
        }, {
            value: "heap",
            text: "Heap Sort"
        }, {
            value: "counting",
            text: "Counting Sort"
        }, {
            value: "radix",
            text: "Radix Sort"
        }
    ]
    const searching = [
        {
            value: "linear",
            text: "Linear Search"
        }, {
            value: "binary",
            text: "Binary Search"
        },
        // {
        //     value: "bfs",
        //     text: "BFS"
        // }, {
        //     value: "dfs",
        //     text: "DFS"
        // }
    ]

    function setArrayValues() {
        history(`${path}`, { state: { arr: arr, algo: algo, toBeSearched: srch } });
    }

    return (
        <div className="p-6 text-white flex justify-center">
            <div className="flex flex-col gap-4 p-4">
                <h1>Enter your values below separated by comma</h1>
                <input type="text" placeholder="Enter values here" className="placeholder-[#a5a4a4] bg-[#353434] text-center p-2 rounded" onChange={(e) => { setArr(e.target.value) }} />

                {name == "Searching" ?
                    <div className="flex flex-col gap-4">
                        <h1>Enter value to be searched</h1>
                        <input type="text" placeholder="Enter values here" className="placeholder-[#a5a4a4] bg-[#353434] text-center p-2 rounded" onChange={(e) => { setSrch(e.target.value) }} />
                    </div> : ""
                }

                <label htmlFor="typeOfText">Select your type</label>
                <select name="choose" id="pic" className="bg-[#353434] text-center py-2" onChange={(e) => { setState(e.target.value === "sort") }}>
                    <option value="sort">Sorting</option>
                    <option value="search">Search</option>
                </select>
                <h1>Select your {name} Algorithm</h1>

                {state ?
                    <select name="sorting" id="sort" className="bg-[#353434] text-center py-2" onChange={(e) => { setAlgo(e.target.value) }}>
                        <option value="none">Select Sorting Algorithm</option>
                        {
                            sortings.map((item, idx) => (
                                <option key={idx} value={item.value}>{item.text}</option>
                            ))
                        }
                    </select>
                    :
                    <select name="searching" id="search" className="bg-[#353434] text-center py-2" onChange={(e) => { setAlgo(e.target.value) }}>
                        <option value="none">Select Searching Algorithm</option>
                        {
                            searching.map((item, idx) => (
                                <option key={idx} value={item.value}>{item.text}</option>
                            ))
                        }
                    </select>
                }

                <button className="bg-blue-800 p-2 mt-4 rounded" onClick={setArrayValues}>Check Results</button>
            </div>
        </div>
    )
}
