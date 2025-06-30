import { chunk } from "stunk";

// Global Approach
// - Alternativelyinstead of string, you can track the title of the modal specifically
// - "London" | "Geography" | "Mathematics"
export const globalModalState = chunk<string | undefined>(undefined);
