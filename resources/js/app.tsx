import React from "react";
import {render} from "react-dom";
import {createRoot} from "react-dom/client";
import App from "./components/App";

const container = document.getElementById('app');
// @ts-ignore
const root = createRoot(container)
root.render(<App />);
