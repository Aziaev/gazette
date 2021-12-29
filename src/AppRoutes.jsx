import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Newspapers from "./pages/Newspapers";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Newspapers />} />
          {/*  <Route path="teams" element={<Teams />}>*/}
          {/*    <Route path=":teamId" element={<Team />} />*/}
          {/*    <Route path="new" element={<NewTeamForm />} />*/}
          {/*    <Route index element={<LeagueStandings />} />*/}
          {/*  </Route>*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
