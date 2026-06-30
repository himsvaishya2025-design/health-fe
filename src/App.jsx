import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/Dashboard/Dashboard";

import Trainers from "./pages/Trainers/Trainer";
import Packages from "./pages/Packages/Packages";
import MembersList from "./pages/Members/MembersList";
import MembersPage from "./pages/Members/MembersPage";
import AddMember from "./pages/Members/AddMember"
import EditMember from "./pages/Members/EditMember";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="members" element={<MembersList />} />
            <Route path="members/add" element={<AddMember/>} />
               <Route path="members/edit/:memberId" element={<EditMember/>} />
          <Route path="trainers" element={<Trainers />} />
          <Route path="packages" element={<Packages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;