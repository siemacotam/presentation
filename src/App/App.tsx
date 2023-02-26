import { CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { AddSlide, Home } from "src/pages";
import { useAppDispatch } from "src/store/hooks";
import { setState } from "src/store/reducers/slidesReducer/slidesReducer";
import { AppWrapper, HeaderTitle, StyledHeader } from "./App.styled";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const state = localStorage.getItem("slides");
    if (state) {
      dispatch(setState(JSON.parse(state)));
    }
  }, []);

  return (
    <AppWrapper>
      <StyledHeader>
        <HeaderTitle>Presentation app</HeaderTitle>
      </StyledHeader>
      <CssBaseline />
      <Routes>
        <Route index element={<Home />} />
        <Route path="add" element={<AddSlide />} />
        <Route path="edit/:id" element={<AddSlide edit />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;
