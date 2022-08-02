import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import People from "./routes/people/People";
import Cats from "./routes/cat/Cats";
import Cat from "./routes/cat/Cat";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="people" element={<People />} />
        <Route path="cats" element={<Cats />}>
          <Route
            index
            element={
              <main style={{ padding: "1rem" }}>
                <p>Select a cat</p>
              </main>
            }
          />
          <Route path=":catId" element={<Cat />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
