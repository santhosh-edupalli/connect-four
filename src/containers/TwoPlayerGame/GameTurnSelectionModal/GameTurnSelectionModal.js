import React, { Component } from 'react'
import { Grid, Typography, FormControl, Button, DialogContent, Dialog, RadioGroup, FormControlLabel, Radio, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { LABELS } from '../../../config/common/labels'
import { GAME_TURN_SELECTION_CONFIG } from '../../../config/twoPlayerGame'

const styles = (theme) => ({
    option:{
        backgroundColor: '#EFF3FF',
        border: '1px solid #70707026',
        borderRadius: '15px',
        opacity: 1,
        width:'100%',
        margin: '5px 0px'
    },
    optionContainer:{
        width :'100%',
        padding:'0px 31px'
    },
    popover:{
        width:'480px'
    },
    divider:{
        width  : '85%',
        margin : '15px auto !important'
    },
    button:{
        width:'35%',
        background: '#FFF', 
        borderRadius: '16px',
        color: '#cc0000', 
        cursor: 'pointer', 
        boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.15)'
    },
    prButton:{
        width : '35%',
        borderRadius: '16px',
        cursor: 'pointer', 
        boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.15)'
    },
    title:{
        letterSpacing: '0px',
        color: '#424242',
        opacity: 1,
        fontWeight : 500
    },
    radio: {
        '&$checked': {
          color: '#4B8DF8'
        }
    },
    checked: {}
});

class GameTurnSelectionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            selectedTurn: ''
        };
    }
    modalClose = (e) => {
        this.setState({
            open: false
        })
        this.props.onClose()
    }
    handleChangeTurn = (e) => {
        this.props.onSetTurn(this.state.selectedTurn)
        this.setState({
            open: false
        })
        this.props.onClose()
    }
    handleRadioButtonSelection = (e) => {
        e.stopPropagation()
        this.setState({
            selectedTurn: parseInt(e.target.value)
        })
    }
    componentDidMount(){
        this.setState({
            selectedTurn : this.props.selectedValue
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                open={this.state.open}
                onClose={this.modalClose}
            >
            <DialogContent>
                <Grid className={classes.popover} container direction="column" justify="space-between" alignItems="center">
                    <Grid container justify="center">
                        <Typography className={classes.title}>{LABELS.WHO_STARTS}</Typography>
                    </Grid>

                    <Grid container alignItems="center" justify="flex-start">
                        <FormControl className={classes.optionContainer} component="fieldset">
                            <RadioGroup value={this.state.selectedTurn} onChange={this.handleRadioButtonSelection}>
                                {
                                    GAME_TURN_SELECTION_CONFIG.map((turn, index) => {
                                       return (
                                            <FormControlLabel className={classes.option} key={index} value={turn.id} control={<Radio classes={{root: classes.radio, checked: classes.checked}} />} label={turn.value} />
                                        )
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Divider className={classes.divider}/>
                    <Grid container justify="space-around">
                        <Button className={classes.button} onClick={this.modalClose}>Cancel</Button>
                        <Button className={classes.prButton}variant="contained" color='primary' onClick={this.handleChangeTurn}>Ok</Button>
                    </Grid>
                </Grid>
            </DialogContent>
            </Dialog >
        );
    }
}



export default withStyles(styles)(GameTurnSelectionModal)