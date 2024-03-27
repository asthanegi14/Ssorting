export default function Navbar() {
    // const sortings = [
    //     {
    //         value: "insertion",
    //         text: "Insertion Sort"
    //     }, {
    //         value: "bubble",
    //         text: "Bubble Sort"
    //     }, {
    //         value: "selection",
    //         text: "Selection Sort"
    //     }, {
    //         value: "merge",
    //         text: "Merge Sort"
    //     }, {
    //         value: "quick",
    //         text: "Quick Sort"
    //     }, {
    //         value: "heap",
    //         text: "Heap Sort"
    //     }, {
    //         value: "counting",
    //         text: "Counting Sort"
    //     }, {
    //         value: "radix",
    //         text: "Radix Sort"
    //     }
    // ]
    // const searching = [
    //     {
    //         value: "linear",
    //         text: "Linear Search"
    //     }, {
    //         value: "binary",
    //         text: "Binary Search"
    //     }, {
    //         value: "bfs",
    //         text: "BFS"
    //     }, {
    //         value: "dfs",
    //         text: "DFS"
    //     }
    // ]
    return (
        <div className="text-white p-6 flex flex-row gp-4 justify-between">
            <div className="py-2 text-2xl font-bold">
                LOGO
            </div>
            {/* <div className="flex sm:flex-row flex-col gap-4">
                <div>
                    <select name="sorting" id="sort" className="bg-[#242424] text-center py-2">
                        <option value="none">Sorting</option>
                        {
                            sortings.map((item, idx) => (
                                <option key={idx} value={item.value}>{item.text}</option>
                            ))
                        }
                    </select>
                </div>

                <div>
                    <select name="searching" id="serch" className="bg-[#242424] text-center py-2">
                        <option value="none">Searching</option>
                        {
                            searching.map((item, idx) => (
                                <option key={idx} value={item.value}>{item.text}</option>
                            ))
                        }
                    </select>

                </div>
            </div> */}

        </div>
    )
}