import CustomGameImage from '../../assets/images/home/one.png' 
import TwoPlayerImage from '../../assets/images/home/two.png'
import OnlineGameImage from '../../assets/images/home/online.png'
import TrainingImage from '../../assets/images/home/training.png'
import { ROUTES } from '../../config/common/routes'
export const GAME_OPTIONS = [
    {
        title : 'Custom Game',
        color : '#4BABFF',
        active : false,
        image : CustomGameImage,
        link : ROUTES.HOME
    },
    {
        title : 'Two Players',
        color : '#4B7BFF',
        active : true,
        image : TwoPlayerImage,
        link : ROUTES.TWO_PLAYER_GAME
    },
    {
        title : 'Game Online',
        color : '#4B4BFF',
        active : false,
        image : OnlineGameImage,
        link : ROUTES.HOME
    },
    {
        title : 'Training Game',
        color : '#6E4BFF',
        active : false,
        image: TrainingImage,
        link : ROUTES.HOME
    }
]