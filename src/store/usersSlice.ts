import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../services/api";
import { User } from "../types";
import { AppThunk, RootState } from "./store";

export interface UsersState {
  users: User[];
  status: "idle" | "loading" | "success" | "failed";
}

const initialState: UsersState = {
  users: [],
  status: "idle",
};

export const registerUser = createAsyncThunk(
  "users/postUser",
  async (user: Omit<User, "_id">) => {
    const response = await api.post("/employees", user);
    return response.data;
  }
);
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await api.get("/employees");
  return data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    increment: (state: UsersState) => {},
    decrement: (state: UsersState) => {},
    incrementByAmount: (state: UsersState, action: PayloadAction<number>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload }: PayloadAction<User>) => {
          state.status = "idle";
          state.users = [...state.users, payload];
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        console.log({ action });
        state.status = "failed";
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, { payload }: PayloadAction<User[]>) => {
          state.status = "idle";
          state.users = payload;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log({ action });
        state.status = "failed";
      });
  },
});

export const { increment, decrement, incrementByAmount } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.usersSlice.users;
export const selectUsersRequestStatus = (state: RootState) =>
  state.usersSlice.status;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default usersSlice.reducer;
