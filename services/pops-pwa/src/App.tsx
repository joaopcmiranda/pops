import { BrowserRouter, Routes, Route } from "react-router-dom";

function Dashboard(): JSX.Element {
  return <h1>POPS Dashboard</h1>;
}

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
