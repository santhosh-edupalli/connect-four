import * as actionTypes from "../../actions/twoPlayerGame/actionTypes"

const initialState = {
    gameStarted : false,
    gameConfig  : {



        player1 : 'Himaja',
        player2 : 'Santhosh',
        numberOfGames : 5,
        turnId : 1


    },
    touranamentInfo : [0,0,0,0,0]
}

export const twoPlayerGame = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_GAME_SETUP:
            return{
                ...state,
                gameStarted : true,
                gameConfig  : action.config,
                touranamentInfo : new Array(action.config.numberOfGames).fill(0)
            }
        case actionTypes.ADD_GAME_RESULT:
            let newTournamentInfo = state.touranamentInfo
            newTournamentInfo[newTournamentInfo.indexOf(0)] = action.player
            return{
                ...state,
                touranamentInfo : newTournamentInfo
            }
        case actionTypes.END_TOURNAMENT:
            return{
                ...initialState
            }
        default:
            return {
                ...state
            };
    }
};
