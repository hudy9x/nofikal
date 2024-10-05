import { IField, IRowDetail } from "@/models/type";
import { createGlobalState } from "./_global";

// Example usage:
export const useCounterState = createGlobalState(0);
export const useFieldState = createGlobalState<IField[]>([])
export const useRowState = createGlobalState<IRowDetail[]>([])
export const useRowUpdateState = createGlobalState(0);

