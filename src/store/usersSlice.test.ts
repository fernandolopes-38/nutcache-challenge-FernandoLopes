import usersReducer, { UsersState } from "./usersSlice";

describe("users reducer", () => {
  const initialState: UsersState = {
    users: [],
    status: "idle",
  };
  it("should handle initial state", () => {
    expect(usersReducer(undefined, { type: "unknown" })).toEqual({
      users: [],
      status: "idle",
    });
  });
  // it('should handle increment', () => {
  //   const actual = usersReducer(initialState, increment());
  //   expect(actual.value).toEqual(4);
  // });
  // it('should handle decrement', () => {
  //   const actual = usersReducer(initialState, decrement());
  //   expect(actual.value).toEqual(2);
  // });
  // it('should handle incrementByAmount', () => {
  //   const actual = usersReducer(initialState, incrementByAmount(2));
  //   expect(actual.value).toEqual(5);
  // });
});
