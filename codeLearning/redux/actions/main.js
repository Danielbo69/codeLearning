export const ADD_COMMAND = 'ADD_COMMAND'
export const RUN_COMMANDS = 'RUN_COMMANDS'
export const SET_LEVEL_INITIAL_STATE = 'SET_LEVEL_INITIAL_STATE'
export const RESTART_PLAYER_SETTINGS = 'RESTART_PLAYER_SETTINGS'
export const SET_FORBIDDEN_COORDS = 'SET_FORBIDDEN_COORDS'
export const CHANGE_BUTTON_STATUS = 'CHANGE_BUTTON_STATUS'
export const RESTART_STEPS = 'RESTART_STEPS'
export const LOG_IN = 'LOG_IN'
export const NEW_LEVEL = 'NEW_LEVEL'

export const logIn = (user_data) => {
    console.log('user_data: ', user_data)
    return dispatch => {
        dispatch({
            type: LOG_IN,
            user_data
        })
    }
}

export const newLevel = (user_data) => {
    return dispatch => {
        dispatch({
            type: NEW_LEVEL,
            user_data
        })
    }
}

export const addCommand = (steps, command_data, activeLoop) => {
    steps.push(command_data)
    if (command_data.command === 'loop' && !activeLoop) {
        activeLoop = true
    }
    // console.log('steps: ', steps)
    return dispatch => {
        dispatch({
            type: ADD_COMMAND,
            steps,
            activeLoop
        })
    }
}

export const runCommands = (character_position, command) => {
    let {
        rotation,
        x,
        y
    } = character_position
    // console.log(`running commands: ${command.command} / ${command.command_value} / ${rotation} / ${x} / ${y }`)
    if (command.command === 'rotate') {
        rotation = Math.abs(rotation + command.command_value) === 360
            ? 0
            : rotation + command.command_value
    } else if (command.command === 'step') {
        x = rotation === 0
            ? x += command.command_value * 20
            : rotation === 180
                ? x += command.command_value * -20
                : x
        y = rotation === 90
            ? y += command.command_value * 20
            : rotation === 270
                ? y += command.command_value * -20
                : y
    }
    // console.log(`positional changSes done: ${x} / ${y} / ${rotation}`)
    return dispatch => {
        dispatch({
            type: RUN_COMMANDS,
            character_position: {
                rotation,
                x,
                y
            }
        })
    }
}

export const setLevelInitialState = (character_position, target_position, danger_zone) => {
    return dispatch => {
        dispatch({
            type: SET_LEVEL_INITIAL_STATE,
            character_position,
            target_position,
            danger_zone
        })
    }
}

export const restartPlayerSettings = (character_original_position) => {
    return dispatch => {
        dispatch({
            type: RESTART_PLAYER_SETTINGS,
            character_original_position
        })
    }
}

export const restartSteps = () => {
    return dispatch => {
        dispatch({
            type: RESTART_STEPS,
            steps: []
        })
    }
}

export const setForbiddenCoords = (forbidden_coords) => {
    return dispatch => {
        dispatch({
            type: SET_FORBIDDEN_COORDS,
            forbidden_coords
        })
    }
}
export const changeButtonsState = (disabled_buttons) => {
    return dispatch => {
        dispatch({
            type: CHANGE_BUTTON_STATUS,
            disabled_buttons
        })
    }
}