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

    function handleSubmit(event) {
        event.preventDefault();

        if (!arr || !algo || (name === "Searching" && !srch)) {
            alert("Please fill in all required fields.");
            return;
        }

        history(`${path}`, { state: { arr: arr, algo: algo, toBeSearched: srch } });
    }

    return (
        <div className="p-6 text-white flex justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
                <div className="flex gap-2"><p className="text-red-500">*</p>
                    <h1> Enter your values below separated by comma</h1>
                </div>
                <input type="text" placeholder="Enter values here" className="placeholder-[#a5a4a4] bg-[#353434] text-center p-2 rounded" onChange={(e) => { setArr(e.target.value) }} />

                {name == "Searching" ?
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2"><p className="text-red-500">*</p>

                            <h1>Enter value to be searched</h1>
                        </div>
                        <input required type="text" placeholder="Enter values here" className="placeholder-[#a5a4a4] bg-[#353434] text-center p-2 rounded" onChange={(e) => { setSrch(e.target.value) }} />
                    </div> : ""
                }
                <div className="flex gap-2"><p className="text-red-500">*</p>
                    <label htmlFor="typeOfText">Select your type</label>
                </div>
                <select name="choose" id="pic" className="bg-[#353434] text-center py-2" onChange={(e) => { setState(e.target.value === "sort") }}>
                    <option value="sort">Sorting</option>
                    <option value="search">Search</option>
                </select>

                <div className="flex gap-2"><p className="text-red-500">*</p>
                    <h1>Select your {name} Algorithm</h1>
                </div>
                {state ?
                    <select required name="sorting" id="sort" className="bg-[#353434] text-center py-2" onChange={(e) => { setAlgo(e.target.value) }}>
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

                <button type="submit" className="bg-blue-800 p-2 mt-4 rounded">Check Results</button>
            </form>
        </div>
    )
}
