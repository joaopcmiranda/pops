import { BrowserRouter, Routes, Route } from "react-router-dom";

function Dashboard() {
  return <h1>POPS Dashboard</h1>;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
