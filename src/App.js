import "./style.css"
import {useReducer} from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton"
import {addDigit, chooseOperation, deleteDigit} from "./Actions";

export const ACTIONS = {
    ADD_DIGIT: 'add_digit',
    CHOOSE_OPERATION: 'choose_operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete_digit',
    EVALUATE: 'evaluate'
}

function reducer(state, {type, payload}) {
    switch (type) {
        case ACTIONS.ADD_DIGIT :
            return addDigit(state, payload)
        case ACTIONS.DELETE_DIGIT :
            return deleteDigit(state)
        case ACTIONS.CHOOSE_OPERATION :
            return chooseOperation(state, payload)
        case ACTIONS.CLEAR :
            return {}
        case ACTIONS.EVALUATE :
            if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
                return state
            }
            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state)
            }

    }
}

function evaluate({currentOperand, previousOperand, operation}) {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(currentOperand)) return ""
    let computation = ""
    switch (operation) {
        case "+" :
            computation = prev + current
            break
        case "-" :
            computation = prev - current
            break
        case "x" :
            computation = prev * current
            break
        case "÷" :
            computation = prev / current
            break
    }

    return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,

})
function formatOperand(operand){
    if(operand == null) return
    const [integer, decimal] = operand.split('.')
    if(decimal == null) return INTEGER_FORMATTER.format((integer))
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
    const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})

    return (
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-operand">{previousOperand} {operation}</div>
                <div className="current-operand">{formatOperand(currentOperand)}</div>
            </div>
            <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
            <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
            <OperationButton operation="÷" dispatch={dispatch}/>
            <DigitButton digit="1" dispatch={dispatch}/>
            <DigitButton digit="2" dispatch={dispatch}/>
            <DigitButton digit="3" dispatch={dispatch}/>
            <OperationButton operation="x" dispatch={dispatch}/>
            <DigitButton digit="4" dispatch={dispatch}/>
            <DigitButton digit="5" dispatch={dispatch}/>
            <DigitButton digit="6" dispatch={dispatch}/>
            <OperationButton operation="+" dispatch={dispatch}/>
            <DigitButton digit="7" dispatch={dispatch}/>
            <DigitButton digit="8" dispatch={dispatch}/>
            <DigitButton digit="9" dispatch={dispatch}/>
            <OperationButton operation="-" dispatch={dispatch}/>
            <DigitButton digit="." dispatch={dispatch}/>
            <DigitButton digit="0" dispatch={dispatch}/>
            <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
        </div>
    )
}

export default App;
