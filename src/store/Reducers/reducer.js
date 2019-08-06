import ActionTypes from '../Constants/constant';

const INITIAL_STATE = {
    user: "",
    status: "",
    admins: [],
    agents: [],
    closers: [],
    Manegers: [],
    closersName: [],
    mainLoader: true
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.GETUSER:
            return ({
                ...state,
                user: action.payload
            })
        case ActionTypes.LOGOUT:
            return ({
                ...state,
                status: action.payload
            })
        case ActionTypes.ADMINS:
            for (var key in action.payload.Admin) {
                state.admins.push(action.payload.Admin[key])
            }
            for (var key1 in action.payload.Agent) {
                state.agents.push(action.payload.Agent[key1])
            }
            for (var key2 in action.payload.Closer) {
                state.closers.push(action.payload.Closer[key2])
            }
            return ({
                ...state,
                admins: state.admins,
                agents: state.agents,
                closers: state.closers,
                mainLoader: action.mainLoader
            })
        default:
            return state;
    }

}   