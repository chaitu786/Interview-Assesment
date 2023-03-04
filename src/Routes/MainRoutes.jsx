import React from "react";
import { Route, Routes } from "react-router-dom";
import Form from "../Components/Form";
import Preview from "../Components/Preview";
const MainRoutes = () => {
   return (
      <div>
         <Routes>
            <Route path={"/"} element={<Form />}></Route>
            <Route path={"/preview"} element={<Preview />}></Route>
         </Routes>
      </div>
   );
};

export default MainRoutes;
