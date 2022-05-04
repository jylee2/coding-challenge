import { memo } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import OverdueSales from "./components/OverdueSales";

const App = () => {
  return (
    <>
      <Navbar />
      <OverdueSales />
    </>
  );
};

export default memo(App);
