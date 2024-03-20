import { BrowserRouter, Routes, Route } from "react-router-dom";
import Links from "./Links";
import Try1 from "./Try1/Try1";
import Try2 from "./Try2/Try2";
import Init from "./Init/Init";
import WithoutWallet from "./WithoutWallet/WithoutWallet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Links />} />
        <Route path="/try1" element={<Try1 />} />
        <Route path="/try2" element={<Try2 />} />
        <Route path="/init" element={<Init />} />
        <Route path="/withoutwallet" element={<WithoutWallet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
