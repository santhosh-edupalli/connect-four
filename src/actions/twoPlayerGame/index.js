import * as actionTypes from './actionTypes'

export function setGameSetup(config){
    return{
      type: actionTypes.SET_GAME_SETUP,
      config
    }
}

export function endTournament(){
    return{
      type:actionTypes.END_TOURNAMENT
    }
}

export function addGameResult(player){
  return{
    type :actionTypes.ADD_GAME_RESULT,
    player
  }
}