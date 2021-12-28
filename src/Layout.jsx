import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Layout() {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      ,
    </Box>
  );
}
