export function addDigit(state, payload){
    if (state.overwrite) {
        return {
            ...state,
            currentOperand: payload.digit,
            overwrite: false,
        }
    }
    if (payload.digit === "0" && state.currentOperand === "0") {
        return state
    }
    if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
    }
    return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
    }
}

export function deleteDigit(state) {
    if (state.overwrite) {
        return {
            ...state,
            overwrite: false,
            currentOperand: null
        }
    }

    if (state.currentOperand == null) return state
    if (state.currentOperand.length === 1) {
        return {...state, currentOperand: null}
    }

    return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
    }
}

export function chooseOperation(state, payload) {
    if (state.currentOperand == null && state.previousOperand == null) {
        return state
    }

    if (state.currentOperand == null) {
        return {
            ...state,
            operation: payload.operation
        }
    }

    if (state.previousOperand == null) {
        return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null
        }
    }

    return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
    }
}