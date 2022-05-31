import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../services/api";
import { User } from "../types";
import { AppThunk, RootState } from "./store";

export interface UsersState {
  users: User[];
  fetchStatus: "idle" | "loading" | "success" | "failed";
  addStatus: "idle" | "loading" | "success" | "failed";
}

const initialState: UsersState = {
  users: [],
  fetchStatus: "idle",
  addStatus: "idle",
};

export const registerUser = createAsyncThunk(
  "users/postUser",
  async (user: Omit<User, "_id">) => {
    const { data } = await api.post("/employees", user);
    return data;
  }
);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await api.get("/employees");
  return data;
});

export const updateUser = createAsyncThunk<
  User,
  { userId: string; user: Omit<User, "_id"> }
>("users/putUser", async ({ userId, user }) => {
  await api.put(`/employees/${userId}`, user);
  return { ...user, _id: userId };
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string) => {
    await api.delete(`/employees/${userId}`);
    return userId;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload }: PayloadAction<User>) => {
          state.addStatus = "idle";
          state.users = [...state.users, payload];
        }
      )
      .addCase(registerUser.rejected, (state) => {
        state.addStatus = "failed";
      })
      .addCase(updateUser.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(
        updateUser.fulfilled,
        (state, { payload }: PayloadAction<User>) => {
          console.log({ payload });
          state.addStatus = "idle";
          const updatedUser = state.users;
          const userToUpdateIndex = updatedUser.findIndex(
            (user) => user._id === payload._id
          );
          updatedUser.splice(userToUpdateIndex, 1, payload);
          state.users = updatedUser;
        }
      )
      .addCase(updateUser.rejected, (state) => {
        state.addStatus = "failed";
      })
      .addCase(fetchUsers.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, { payload }: PayloadAction<User[]>) => {
          state.fetchStatus = "idle";
          state.users = payload;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.fetchStatus = "failed";
      })
      .addCase(
        deleteUser.fulfilled,
        (state, { payload }: PayloadAction<string>) => {
          state.fetchStatus = "idle";
          state.users = state.users.filter((user) => user._id !== payload);
        }
      )
      .addCase(deleteUser.rejected, (state, action) => {
        state.fetchStatus = "failed";
      });
  },
});

// export const { increment, decrement, incrementByAmount } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.usersSlice.users;
export const selectUsersFetchStatus = (state: RootState) =>
  state.usersSlice.fetchStatus;
export const selectUsersAddStatus = (state: RootState) =>
  state.usersSlice.addStatus;

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
