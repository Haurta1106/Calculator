import { OperationCanceledException } from "typescript";

export function calculate(button: string, state: State) {
    if(IsNumberButton(button)) {
        return handleNumberButton(button,state)
    }

    if(IsOperatorButton(button)) {
        return handleOperatorButton(button,state)
    }

    if(IsDotButton(button)) {
        return handleDotButton(state)
    }

    if(IsDeleteButton(button)) {
        return handleDeleteButton(state)
    }

    if(IsAllClearButton(button)) {
        return handleAllClearButton(state)
    }

    if(IsEqualButton(button)) {
        return handleEqualButton(state)
    }
    
    return state;
}

export interface State {
    current: string;
    operand: number;
    operator: string | null;
    isNextClear: boolean;
}
function IsNumberButton(button: string) {
    return (
        button === "0" ||
        button === "1" ||
        button === "2" ||
        button === "3" ||
        button === "4" ||
        button === "5" ||
        button === "6" ||
        button === "7" ||
        button === "8" ||
        button === "9" 
    );
}

function handleNumberButton(button: string, state: State): State {
    if (state.isNextClear) {
        return {
            current: button,
            operand: state.operand,
            operator: state.operator,
            isNextClear: false
        }
    }

    if(state.current === "0") {
        return {
            current: button,
            operand: state.operand,
            operator: state.operator,
            isNextClear: false
        }
    };

    return{
        current: state.current + button,
        operand: state.operand,
        operator: state.operator,
        isNextClear: false
    };
}

function IsOperatorButton(button: string) {
    return (
        button === "+" ||
        button === "-" 
    );
}

function handleOperatorButton(button:string,state: State): State{
    if (state.operator === null) {
        return{
            current: state.current,
            operand: parseFloat(state.current),
            operator: button,
            isNextClear: true
        }
    }
    const nextValue = operate(state)
    return{
        current: button,
        operand: nextValue,
        operator: button,
        isNextClear: true
    }
}

function IsDotButton(button: string) {
    return button === "."
}

function handleDotButton(state: State): State {
    if (state.current.indexOf('.') !== -1) {
        return state
    }
    return{
        current: state.current + ".",
        operand: state.operand,
        operator: state.operator,
        isNextClear: false
    }
}

function IsDeleteButton(button: string) {
    return button === "D";
}

function handleDeleteButton(state: State): State {
    if (state.current.length === 1) {
        return{
            current: "0",
            operand: state.operand,
            operator: state.operator,
            isNextClear: false
        }
    }
    return{
        current: state.current.substring(0, state.current.length - 1),
        operand: state.operand,
        operator: state.operator,
        isNextClear: false
    }
}

function IsAllClearButton(button: string) {
    return button === "AC";
}

function  handleAllClearButton(state: State): State {
    return{
        current: "0",
        operand: 0,
        operator: null,
        isNextClear: false
    }
}

function IsEqualButton(button: string) {
    return button === "=";
}

function handleEqualButton(state: State): State {
    if (state.operator === null) {
        return state
    }
    const nextValue = operate(state).toString()
    return{
        current: nextValue,
        operand: state.operand,
        operator: null,
        isNextClear: true
    }
}

function operate(state: State): number {
    const current = parseFloat(state.current)
    if (state.operator === "+") {
        return state.operand + current
    }
    if (state.operator === "-") {
        return state.operand - current
    }
    return current;
}