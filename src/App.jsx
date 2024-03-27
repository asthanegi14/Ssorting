import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Insertion from "./Sorting/Insertion";
import Bubble from "./Sorting/Bubble";
import Selection from "./Sorting/Selection";
import Merge from "./Sorting/Merge";
import Quick from "./Sorting/Quick";
import Heap from "./Sorting/Heap";
import Radix from "./Sorting/Radix";
import Counting from "./Sorting/Counting";
import Linear from "./Searching/Linear";
import Binary from "./Searching/Binary";
import BFS from "./Searching/BFS";
import DFS from "./Searching/DFS";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const routers = createBrowserRouter([
    {
      path: '/',
      element: <Home></Home>
    },
    {
      path: '/sorting/insertion',
      element: <Insertion></Insertion>
    },
    {
      path: '/sorting/bubble',
      element: <Bubble></Bubble>
    },
    {
      path: '/sorting/selection',
      element: <Selection></Selection>
    },
    {
      path: '/sorting/merge',
      element: <Merge></Merge>
    },
    {
      path: '/sorting/quick',
      element: <Quick></Quick>
    },
    {
      path: '/sorting/heap',
      element: <Heap></Heap>
    },
    {
      path: '/sorting/radix',
      element: <Radix></Radix>
    },
    {
      path: '/sorting/counting',
      element: <Counting></Counting>
    },
    {
      path: '/searching/linear',
      element: <Linear></Linear>
    },
    {
      path: '/searching/binary',
      element: <Binary></Binary>
    },
    // {
    //   path: '/searching/bfs',
    //   element: <BFS></BFS>
    // },
    // {
    //   path: '/searching/dfs',
    //   element: <DFS></DFS>
    // },

  ]);
  return (
    <div>
      {/* <Navbar /> */}
      <RouterProvider router={routers} />
    </div>
  )
}

export default App
