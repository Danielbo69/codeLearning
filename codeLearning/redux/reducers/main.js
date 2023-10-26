import {
    Dimensions
} from 'react-native'

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window")
const RADIUS = 25

export const ADD_COMMAND = 'ADD_COMMAND'
export const RUN_COMMANDS = 'RUN_COMMANDS'
export const SET_LEVEL_INITIAL_STATE = 'SET_LEVEL_INITIAL_STATE'
export const RESTART_PLAYER_SETTINGS = 'RESTART_PLAYER_SETTINGS'
export const SET_FORBIDDEN_COORDS = 'SET_FORBIDDEN_COORDS'
export const CHANGE_BUTTON_STATUS = 'CHANGE_BUTTON_STATUS'
export const RESTART_STEPS = 'RESTART_STEPS'
export const LOG_IN = 'LOG_IN'
export const NEW_LEVEL = 'NEW_LEVEL'

const initialState = {
    steps: [],
    user_data: {
        uid: null,
        userName: null,
        userEmail: null,
        userLevel: 5
    },
    character_position: {
        rotation: 0,
        x: WIDTH / 2 - RADIUS,
        y: HEIGHT / 2 - RADIUS
    },
    character_original_position: {
        rotation: 0,
        x: WIDTH / 2 - RADIUS,
        y: HEIGHT / 2 - RADIUS
    },
    target_position: {
        x: WIDTH / 5 - RADIUS,
        y: HEIGHT / 5 - RADIUS
    },
    danger_zone: [],
    forbidden_coords: [],
    disabled_buttons: false,
    activeLoop: false
}

const reduce = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMAND:
            return {
                ...state,
                steps: action.steps,
                activeLoop: action.activeLoop
            }
        case RUN_COMMANDS:
            return {
                ...state,
                character_position: action.character_position
            }
        case NEW_LEVEL:
            return {
                ...state,
                user_data: action.user_data
            }
        case SET_LEVEL_INITIAL_STATE:
            return {
                ...state,
                character_position: action.character_position,
                character_original_position: action.character_position,
                target_position: action.target_position,
                danger_zone: action.danger_zone,
                activeLoop: false
            }
        case RESTART_PLAYER_SETTINGS:
            return {
                ...state,
                character_position: action.character_original_position,
                // steps: [],
                activeLoop: false
            }
        case SET_FORBIDDEN_COORDS:
            return {
                ...state,
                forbidden_coords: action.forbidden_coords
            }
        case RESTART_STEPS:
            return {
                ...state,
                steps: action.steps
            }
        case CHANGE_BUTTON_STATUS:
            return {
                ...state,
                disabled_buttons: action.disabled_buttons
            }
        case LOG_IN:
            return {
                ...state,
                user_data: action.user_data
            }
        default:
            return {
                ...state,
                steps: []
            }
    }
}
export default reduce