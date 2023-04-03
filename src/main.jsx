import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { inject } from "@vercel/analytics";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (import.meta.env.MODE === "production") {
	inject();
	disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
