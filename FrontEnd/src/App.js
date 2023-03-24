import "./App.css";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import MonthlyCalendar from "./Components/MonthlyCalendar";
import useUserToken from "./Hooks/useUserToken";

function App() {
  const { userToken, setUserToken } = useUserToken();

  if (!userToken) {
    return <Login setUserToken={setUserToken} />;
  }

  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MonthlyCalendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
