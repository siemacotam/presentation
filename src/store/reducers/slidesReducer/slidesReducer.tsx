import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Slide } from "src/global";
import type { RootState } from "../../store";
import { initialState } from "./slidesReducer.const";

const saveInLocalStorage = (state: Slide[]) => {
  localStorage.setItem("slides", JSON.stringify(state));
};

export const slidesSlice = createSlice({
  name: "slides",
  initialState,
  reducers: {
    addSlide: (state, action: PayloadAction<Slide>) => {
      let newState = { ...state, slides: [...state.slides, action.payload] };
      saveInLocalStorage(newState.slides);
      return newState;
    },
    editSlide: (state, action: PayloadAction<Slide>) => {
      let newState = {
        ...state,
        slides: state.slides.map((el) => {
          if (el.id === action.payload.id) {
            return action.payload;
          } else {
            return el;
          }
        }),
      };
      saveInLocalStorage(newState.slides);
      return newState;
    },
    deleteSlide: (state, action: PayloadAction<string>) => {
      let newState = {
        ...state,
        slides: state.slides.filter((el) => el.id !== action.payload),
      };
      saveInLocalStorage(newState.slides);
      return newState;
    },
    setState: (state, action: PayloadAction<Slide[]>) => {
      return {
        ...state,
        slides: action.payload,
      };
    },
    setIcons: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        icons: action.payload,
      };
    },
  },
});

export const { addSlide, deleteSlide, editSlide, setState, setIcons } =
  slidesSlice.actions;

export const selectCount = (state: RootState) => state.slides;

export default slidesSlice.reducer;
