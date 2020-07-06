import React, { Component } from 'react'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Grid, Box, Divider, Button, CardMedia } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import { GAME_CONFIG } from '../../../config/twoPlayerGame'
import * as jobActions from '../../../actions/twoPlayerGame'
import * as GAME_UTILITIES from './GameBoardWorker'
import './GameBoard.css'
import { LABELS } from '../../../config/common/labels'

const styles = theme => ({
    mainRoot :{
        display:'flex',
        width : '67.18%',
        height: '77.7vh',
        margin:'0 auto !important',
        backgroundColor: '#F5F5F5',
        boxShadow: '0px 3px 6px #00000029',
        border: '1px solid #F7F7F7',
        borderRadius: '30px',
        opacity: 1
    }
})
class GamePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playBoard : [],
            player01 : 1,
            player02 : 2,
            currentPlayer : null,
            gameOver : false,
            message: '',
            steps: []
        };
    }
    componentDidMount(){
        this.initBoard()
    }
    initBoard = () =>{
        let playBoard = [];
        for (let i = 0; i < GAME_CONFIG.NO_OF_ROWS; i++) {
            let row = [];
            for (let j = 0; j < GAME_CONFIG.NO_OF_COLUMNS; j++) {
                row.push(null) 
            }
            playBoard.push(row);
        }

        let currentPlayer = GAME_UTILITIES.getPlayer(this.props.twoPlayerGame.touranamentInfo,this.props.twoPlayerGame.gameConfig.turnId) 
    
        this.setState({
            playBoard,
            currentPlayer: currentPlayer,
            gameOver: false,
            message: ''
        });
    }
    handlePlayMove = (c) => {
        if (!this.state.gameOver) {
            let board = this.state.playBoard;
            let steps = this.state.steps;
            for (let r = GAME_CONFIG.NO_OF_ROWS-1 ; r >= 0; r--) {
                if (!board[r][c]) {
                    board[r][c] = this.state.currentPlayer;
                    steps.push({row:r,column:c})
                    break;
                }
            }      
            let result = GAME_UTILITIES.checkforResult(board, GAME_CONFIG.NO_OF_ROWS, GAME_CONFIG.NO_OF_COLUMNS);
            if (result === this.state.player01 || result === this.state.player02 || result === 3) {
                this.setState({ playBoard : board, gameOver: true});
                this.props.addGameResult(result)
                setTimeout(this.handleGameEnd(result),300)
            }else {
                this.setState({ playBoard : board, steps:steps, currentPlayer: this.changePlayer() });
            }
        }
    }
    changePlayer = () =>{
        return (this.state.currentPlayer === this.state.player01) ? this.state.player02 : this.state.player01;
    }
    handleEndTournament = () => {
        this.props.endTournament()
        this.props.onEndTournament()
    }
    handleGameEnd = (result) =>{
        let tInfo = this.props.twoPlayerGame.touranamentInfo
        let player1Score = _.countBy(tInfo)[1];
        let player2Score = _.countBy(tInfo)[2];
        if(player1Score && player1Score === Math.ceil(tInfo.length / 2) ){
            this.setState({
                message : `${this.props.twoPlayerGame.gameConfig.player1}, you won tournament.`
            })
        }else if(player2Score && player2Score === Math.ceil(tInfo.length / 2)){
            this.setState({
                message : `${this.props.twoPlayerGame.gameConfig.player2}, you won tournament.`
            })
        }else {
            let message =''
            switch(result){
                case 1:
                    message = `${this.props.twoPlayerGame.gameConfig.player1}, you won Game ${this.props.twoPlayerGame.touranamentInfo.indexOf(0)}.`
                    break;
                case 2:
                    message = `${this.props.twoPlayerGame.gameConfig.player2}, you won Game ${this.props.twoPlayerGame.touranamentInfo.indexOf(0)}.`
                    break;
                case 3:
                    message = 'Match is draw'
                    break;
                default:
            }
            this.setState({
                message : message
            })
        } 
    }
    handleUndoClick = () =>{
        let board = this.state.playBoard;
        let steps = this.state.steps;
        if(steps.length > 0 && board.length > 0){
            let lastStep = steps.pop()
            board[lastStep.row][lastStep.column] = null
            this.setState({
                playBoard : board,
                steps : steps,
                currentPlayer : this.changePlayer()
            })
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Box className={classes.mainRoot}>
                <Box className='board-wrapper'>
                    <Box className='board'>
                        <Grid className='height-100 board-elements' container direction="column">
                            {   
                                this.state.playBoard.map((Row, rowIndex) => {return(
                                    <Box key={rowIndex} style={{height:'12.5%'}}>
                                        <Grid className="height-100" container alignItems="center">
                                        {
                                            Row.map((column, columnIndex) => {return(
                                                <Box flexGrow={1} className="height-100 board-cell" key={`${rowIndex}-${columnIndex}`} onClick={()=>{this.handlePlayMove(columnIndex)}}>
                                                   {
                                                        column ? 
                                                            <Grid className={`${column ===1 ? 'player1-' : 'player2-'}board-cell-container`} >
                                                            <CardMedia
                                                                style={{width:'50px',height:'50px'}}
                                                                image={column === 1 ? this.props.twoPlayerGame.gameConfig.player1Image : this.props.twoPlayerGame.gameConfig.player2Image}
                                                   /></Grid> : null
                                                   }
                                                </Box>
                                            )})
                                        }
                                        </Grid>
                                    </Box>
                                )})
                            }
                        </Grid>
                    </Box>
                </Box>
                <Box className="statistics-panel">
                    <Grid className="statictics-container" container alignContent="center" direction="column">
                        <h2>{`${this.props.twoPlayerGame.gameConfig.numberOfGames} ${LABELS.GAMES_TOURNAMENT}`}</h2>
                        {
                            this.state.gameOver ?
                            <Box>
                                <h1>{LABELS.CONGRATULATIONS}</h1>
                                <h3>{this.state.message}</h3>
                            </Box> :
                            <h3>{`${LABELS.PLAYING_GAME} ${this.props.twoPlayerGame.touranamentInfo.indexOf(0) + 1 }`}</h3>
                        
                        }
                        <Grid className="panel twoplayersgame_pl1">
                            <Grid style={{border: '8px solid #37ac5d'}} className={`${this.state.currentPlayer === 1 ? 'active':''} panel-image d-inblock`}>
                                <CardMedia
                                    image={this.props.twoPlayerGame.gameConfig.player1Image}
                                    style={{width:'30px',height:'40px', margin:'10px auto'}}
                                />
                            </Grid>
                            <Grid className="panel-input  d-inblock">
                                <p>{LABELS.PLAYER01}</p>
                                <h3>{this.props.twoPlayerGame.gameConfig.player1}</h3>
                            </Grid>
                            <Grid className="panel-input  d-inblock">
                                <p>{LABELS.SCORE}</p>
                                <h3>{_.countBy(this.props.twoPlayerGame.touranamentInfo)[1] || 0}</h3>
                            </Grid>
                        </Grid>
                        <Grid className="panel twoplayersgame_pl2">
                            <Grid style={{border: '8px solid #f8d146'}} className={`${this.state.currentPlayer === 1 ? '':'active'} panel-image d-inblock`}>
                                <CardMedia
                                    image={this.props.twoPlayerGame.gameConfig.player2Image}
                                    style={{width:'30px',height:'40px', margin:'10px auto'}}
                                />
                            </Grid>
                            <Grid className="panel-input  d-inblock">
                                <p>{LABELS.PLAYER02}</p>
                                <h3>{this.props.twoPlayerGame.gameConfig.player2}</h3>
                            </Grid>
                            <Grid className="panel-input  d-inblock">
                                <p>{LABELS.SCORE}</p>
                                <h3>{_.countBy(this.props.twoPlayerGame.touranamentInfo)[2] || 0}</h3>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid>
                        {   
                            this.state.gameOver ?
                            <Button className="startgame__button" onClick={this.initBoard}>{LABELS.NEXT_GAME}</Button>:
                            <Button className="startgame__button" onClick={this.handleUndoClick}>{LABELS.UNDO_STEP}</Button>
                        }
                        <Button className="endgame__button" onClick={this.handleEndTournament}>{LABELS.END_TOURNAMENT}</Button>
                    </Grid>
                </Box>
            </Box>         
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        twoPlayerGame: state.twoPlayerGame
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(jobActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GamePanel))