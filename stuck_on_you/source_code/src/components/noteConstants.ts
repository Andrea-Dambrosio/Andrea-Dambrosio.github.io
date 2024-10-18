import { Dispatch, ReactElement,  SetStateAction } from "react";

export const DraggableAnimations = {
     whileTap: {
         scale: 0.9,
         rotate: -5,
     },
     whileHover: { scale: 1.1, rotate: 5 },
    drag: true,
};

export const colors = [
    "rgba(128, 38, 39, 0.40)",
    "rgba(128, 61, 34, 0.40)",
    "rgba(128, 84, 32, 0.40)",
    "rgba(128, 98, 30, 0.40)",
    "rgba(57, 104, 30, 0.40)",
    "rgba(27, 103, 100, 0.40)",
    "rgba(32, 75, 128, 0.40)",
    "rgba(123, 44, 85, 0.40)",
] as const;
export type NoteType = ReactElement<NoteProps>;
export interface NoteProps {
    constraint: React.MutableRefObject<null>;
    index: number;
}
export type Color = (typeof colors)[number];
export interface UnSelectedNoteProps {
    i: number;
}
export type SelectedNoteProps = {
    i: number;
    setSelected: Dispatch<SetStateAction<boolean>>
};
