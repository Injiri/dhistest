import { useReducer } from 'react'

const types = {
    INPUT: 0,
    RESET: 1,
    SUBMIT: 2,
    UPDATE: 3,
}

const status = {
    DEFAULT: 0,
    VALID: 1,
    ERROR: 2,
}

const reducer = (state, action) => {
    switch (action.type) {
        case types.INPUT: {
            return {
                ...state,
                code: action.code,
                resetDisabled: action.code === state.originalCode,
                submitDisabled: ['', state.originalCode].includes(action.code),
                status: status.DEFAULT,
            }
        }
        case types.RESET: {
            return {
                ...state,
                code: state.originalCode,
                resetDisabled: true,
                submitDisabled: true,
                status: status.DEFAULT,
            }
        }
        case types.SUBMIT: {
            return {
                ...state,
                resetDisabled: true,
                submitDisabled: true,
                status: status.LOADING,
            }
        }
        case types.UPDATE: {
            const success = action.status === status.VALID
            return {
                ...state,
                status: action.status,
                originalCode: success ? state.code : state.originalCode,
                resetDisabled: success,
                submitDisabled: success,
            }
        }
        default: {
            return state
        }
    }
}

export const useCode = code => {
    const [state, dispatch] = useReducer(reducer, {
        code: code,
        originalCode: code,
        resetDisabled: true,
        submitDisabled: true,
        status: status.DEFAULT,
    })

    return [state, dispatch, types, status]
}
