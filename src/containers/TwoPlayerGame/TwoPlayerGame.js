import React, { Component } from 'react'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Grid, IconButton, Box, Divider, Button, CardMedia } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import History from '../../compounds/History/History'
import GameBoard from './GameBoard/GameBoard'
import GameTurnSelectionModal from './GameTurnSelectionModal/GameTurnSelectionModal'
import GameNumberSelectionModal from './GameNumberSelectionModal/GameNumberSelectionModal'
import * as jobActions from '../../actions/twoPlayerGame'
import { ROUTES } from '../../config/common/routes'
import { LABELS } from '../../config/common/labels'
import { GAME_TURN_SELECTION_CONFIG } from '../../config/twoPlayerGame'
import Player1Avtar from '../../assets/images/home/avatar01.png'
import Player2Avtar from '../../assets/images/home/avatar02.png'
import GameNumberAvtar from '../../assets/images/home/winner.png'
import GameTurnAvtar from '../../assets/images/home/run.png'
import './TwoPlayerGame.css'

const styles = theme => ({
    
})
class TwoPlayerGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player1 : '',
            player1Image:Player1Avtar,
            player2 : '',
            player2Image:Player2Avtar,
            numberOfGames : 5,
            turnId : 1,
            openGameTurnModal : false,
            openGameNumberModal : false
        };
    }
    handleStartClick = () =>{
        if(this.state.player1 === '' || this.state.player2 === ''){
            this.setState({
                errorMessage : 'Please fill in the names'
            })
        }else{
            this.setState({
                errorMessage : ''
            })
            this.props.setGameSetup({
                player1 : this.state.player1,
                player2 : this.state.player2,
                player1Image :this.state.player1Image,
                player2Image : this.state.player2Image,
                numberOfGames : this.state.numberOfGames,
                turnId : this.state.turnId
            })
        }
    }
    handleEndTournament = () => {
        this.setState({
            player1 : '',
            player2 : '',
            numberOfGames : 5,
            turnId : 1,
        })
    }
    render() {
        return (
            <Grid container className="root-container">
                <Grid className="app-bar" container alignItems="center">
                    <IconButton onClick={() =>{ History.push(ROUTES.HOME) }}>
                        <ArrowBack/>
                    </IconButton>
                    <p className="header-title">{LABELS.TWO_PLAYER_GAME}</p>
                </Grid>
                {
                    this.props.twoPlayerGame.gameStarted ?

                    <GameBoard onEndTournament={this.handleEndTournament}/> :

                    <Box className="main-root players_wrap">
                        <Grid>
                            <Grid className="panel text-left">
                                <label for="player1ImageInput">
                                    <Grid className="panel-image d-inblock">
                                        <div className="player-image-container">
                                            <img alt="player1" className="player-image" src={this.state.player1Image}></img>
                                        </div>
                                    </Grid>
                                </label>
                                <input id="player1ImageInput" type='file' className="file-input" onChange={(e) =>{this.setState({player1Image : URL.createObjectURL(e.target.files[0])})}}/>
                                
                                <Grid className="panel-input d-inblock">
                                    <p>{LABELS.PLAYER01}</p>
                                    <input placeholder={LABELS.PLAYER01NAME} onChange={(e)=>{this.setState({player1 : e.target.value,errorMessage : ''})}}/>
                                </Grid>
                            </Grid>
                            <Grid className="panel">
                                <label for="player2ImageInput">
                                    <Grid className="panel-image">
                                        <div className="player-image-container">
                                            <img alt="player2" className="player-image" src={this.state.player2Image}></img>
                                        </div>
                                    </Grid>
                                </label>
                                <input id="player2ImageInput" type='file' className="file-input" onChange={(e) =>{this.setState({player2Image : URL.createObjectURL(e.target.files[0])})}}/>
                                
                                <Grid className="panel-input">
                                    <p>{LABELS.PLAYER02}</p>
                                    <input placeholder={LABELS.PLAYER01NAME} onChange={(e)=>{this.setState({player2 : e.target.value,errorMessage : ''})}}/>
                                </Grid>
                            </Grid>
                            <Grid className="panel">
                                <Grid className="panel-image">
                                    <CardMedia
                                        image={GameNumberAvtar}
                                    />
                                </Grid>
                                <Grid className="panel-input">
                                    <p>{LABELS.NUMBER_OF_GAMES}</p>
                                    <p onClick={()=>{this.setState({openGameNumberModal : true})}}>{this.state.numberOfGames}</p>
                                </Grid>
                                {
                                    this.state.openGameNumberModal ?
                                        <GameNumberSelectionModal
                                            selectedValue ={this.state.numberOfGames}
                                            onSetGameNumber={(value)=>{this.setState({numberOfGames : value})}}
                                            onClose={()=>{this.setState({openGameNumberModal : false})}}/> : null
                                }
                            </Grid>
                            <Grid className="panel">
                                <Grid className="panel-image">
                                    <CardMedia
                                        image={GameTurnAvtar}
                                    />
                                </Grid>
                                <Grid className="panel-input">
                                    <p>{LABELS.WHO_STARTS}</p>
                                    <p onClick={() =>{this.setState({openGameTurnModal : true})}}>{GAME_TURN_SELECTION_CONFIG.filter((object)=>object.id === this.state.turnId)[0].value}</p>
                                </Grid>
                                {
                                    this.state.openGameTurnModal ? 
                                        <GameTurnSelectionModal
                                            selectedValue={this.state.turnId} 
                                            onSetTurn ={(value)=>{this.setState({turnId : value})}}
                                            onClose={() =>{this.setState({openGameTurnModal : false})}}/> : null
                                }
                            </Grid>
                            <p className='error-message'>{this.state.errorMessage}</p>
                        </Grid>

                        <Divider/>
                        
                        <Grid>
                            <Button className="startgame__button" onClick={this.handleStartClick}>{LABELS.START_GAME}</Button>
                        </Grid>
                    </Box>                    
                }
                
            </Grid>         
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TwoPlayerGame))