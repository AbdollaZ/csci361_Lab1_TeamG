import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  userType: string;
  token: string;
  avatar: string;

  govId: string;
  farmName: string;
  farmLocation: string;
}
interface AuthState {
  user: IUser;
}

const INITIAL_STATE_AUTH: AuthState = {
  // @ts-ignore
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE_AUTH,
  reducers: {
    setUserAction(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    updateUserAction(state, action: PayloadAction<Partial<IUser>>) {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    logout(state) {
      state.user = INITIAL_STATE_AUTH.user;
    },
  },
});

export const { setUserAction, updateUserAction, logout } = authSlice.actions;

export { INITIAL_STATE_AUTH, authSlice };

export default authSlice.reducer;
