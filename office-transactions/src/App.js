import OfficeTransactions from './OfficeTransactions';
import NewTransaction from './NewTransaction';
import './App.css';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OfficeTransactions />} />
      <Route path="/newtransaction" element={<NewTransaction />} />
    </Routes>
  );
}

export default App;
