import { combineReducers } from 'redux'
import { twoPlayerGame } from "./twoPlayerGame"
  
const mainReducer = combineReducers({
    twoPlayerGame: twoPlayerGame,
});
  
export default mainReducer