import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import MonthlyCalendar from "./Components/MonthlyCalendar";
import useUserToken from "./Hooks/useUserToken";
import BalanceAdjustment from "./Components/BalanceAdjustment";
import LoanEstimator from "./Components/LoanEstimator";
function App() {
  const { userToken, setUserToken } = useUserToken();

  if (!userToken) {
    return <Login setUserToken={setUserToken} />;
  }

  return (
    <div>
      <NavBar />
        <Routes>
          <Route path="/balanceAdjustment" element={<BalanceAdjustment/>}/>
          <Route path="/loanEstimator" element={<LoanEstimator/>}/>
          <Route path="/" element={<MonthlyCalendar />} />
        </Routes>
    </div>
  );
}
export default App;
