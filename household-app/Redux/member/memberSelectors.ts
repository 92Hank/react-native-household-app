import { RootState } from "../store";

export const selectMember = (state: RootState) => state.memberState.members;
