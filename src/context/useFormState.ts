"use client";

import { create } from "zustand";

type State = {
  values: { [key: string]: any };
};

type Actions = {
  setValue: (key: string, value: any) => void;
};

export const useFormState = create<State & Actions>((set) => ({
  values: {},
  setValue: (key, value) =>
    set((prev) => ({ values: { ...prev.values, [key]: value } })),
}));
