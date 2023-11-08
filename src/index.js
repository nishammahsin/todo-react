import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { MyApp } from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MyApp />
  </StrictMode>
);
