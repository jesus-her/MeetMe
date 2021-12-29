import React, { createContext, useReducer } from "react"
import { mainReducer } from "./reducer";

interface Quizz {
    quiestion_1?: string;
    question_2?: string;
    question_3?: boolean;
}

// Definir como luce el context y que informacion va a tener
export interface MainState {
    quizz: Quizz;
    username: string;
    isLoggedIn: boolean;
}

// Estado inicial
export const contextInicialState: MainState = {
    quizz: {
        quiestion_1: '',
        question_2: '',
        question_3: false
    },
    username: '',
    isLoggedIn: false
}

interface mainContextProps {
    mainState: MainState;
    signIn: () => void;
    logOut: () => void;
}

// Crear context
export const MainContext = createContext({} as mainContextProps)

// Create Provider
export const MainProvider = ({ children }: any) => {

    const [mainState, dispatch] = useReducer(mainReducer, contextInicialState)

    const signIn = () => dispatch({ type: 'signIn' })
    const logOut = () => dispatch({ type: 'logOut' })

    return (
        <MainContext.Provider
            value={{
                signIn,
                logOut,
                mainState
            }}
        >
            {children}
        </MainContext.Provider>
    )
}