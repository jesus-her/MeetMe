import { MainState } from "./Context"

type MainAction =
    | { type: 'signIn' }
    | { type: 'logOut' };

export const mainReducer = (state: MainState, action: MainAction) => {
    switch (action.type) {
        case 'signIn':
            return {
                ...state,
                isLoggedIn: true,
                username: 'logged-user'
            }

        case 'logOut':
            return {
                ...state,
                isLoggedIn: false,
                username: ''
            }

        default: return state
    }
}