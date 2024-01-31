import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Auth {
  isAuthenticated: boolean;
}

const initialState: Auth = {
  isAuthenticated: false,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (_, action: PayloadAction<Auth>) => {
      return action.payload;
    },
    clearAuth: () => {
      return initialState;
    },
  },
});

export const { setAuth, clearAuth } = auth.actions;

export default auth.reducer;
