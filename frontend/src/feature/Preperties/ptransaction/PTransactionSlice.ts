import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locName: "",
  locId: "",
  consignorName: "",
  consignorId: "",
  consigneeName: "",
  consigneeId: "",
};
export const PTransactionSlice = createSlice({
  name: "PTransaction",
  initialState,
  reducers: {
    handlePLocation: (state, actions) => {
      const { id, name } = actions.payload;
      state.locId = id;
      state.locName = name;
    },
    handlePConsignor: (state, actions) => {
      const { id, name } = actions.payload;
      state.consignorId = id;
      state.consignorName = name;
    },
    handlePConsignee: (state, actions) => {
      const { id, name } = actions.payload;
      state.consigneeId = id;
      state.consigneeName = name;
    },
  },
});
export const { handlePLocation, handlePConsignor, handlePConsignee } =
  PTransactionSlice.actions;
export default PTransactionSlice.reducer;
