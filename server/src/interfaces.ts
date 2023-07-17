export const Increment = 1;
export const Decrement = -1;
export const Direction = {
    increment: Increment,
    decrement: Decrement,
} as const;

export type Direction = (typeof Direction)[keyof typeof Direction];

export const ButtonTypeCounter = "counter";
export const ButtonTypeToggle = "toggle";
export const ButtonTypeCountdown = "countdown";
export const ButtonType = {
    counter: ButtonTypeCounter,
    toggle: ButtonTypeToggle,
    countdown: ButtonTypeCountdown,
} as const;

export type ButtonType = (typeof ButtonType)[keyof typeof ButtonType];

export interface Button {
    id: number;
    buttonType: ButtonType;
    direction?: Direction;
    name: string;
    initialValue?: number;
    initialState?: boolean;
    countdownDuration?: number;
}

export interface CreateButtonQuery {
    name: string;
    buttonType: ButtonType;
    direction?: Direction;
    initialValue?: number;
    initialState?: boolean;
    countdownDuration?: number;
}

export interface ButtonPanel {
    id: number;
    name: string;
}

export interface Action {
    id: number;
    type: string;
    timestamp: number;
    resourceId: number;
    resourceType: string;
}
