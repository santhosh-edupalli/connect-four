import React from 'react'
import { Grid, Box, Typography, Divider, CardMedia, Tooltip } from '@material-ui/core'
import { Copyright, PlayCircleOutline } from '@material-ui/icons'
import History from '../../compounds/History/History'
import mainImage from '../../assets/images/4inarow.png'
import { LABELS } from '../../config/common/labels'
import { GAME_OPTIONS } from '../../config/home'
import './Home.css'


export default function Home() {
    return (
        <Grid container direction="column" justify="center" alignItems="center" className='rootContainer'>
            <Box className="root">
                <Grid className='header' container direction="column" justify="flex-end" alignItems="flex-start">
                    <Typography className="title" align="left" variant="subtitle1">{ LABELS.TITLE }</Typography>
                    <Typography className="subtitle" align="left" variant="caption">{ LABELS.SUB_TITLE}</Typography>
                </Grid>
                <Grid container direction="column" className='main'>
                    <Grid className="main-item">
                        <Grid className="play-button-container" container  direction="column" justify="center" alignContent="flex-start">
                            <Box className="wrapper-play-button">
                                <Box className='play-button'>
                                    <PlayCircleOutline className="play-button-icon"/>
                                    <p className="play-button-text">{LABELS.PLAY}</p>
                                </Box>
                            </Box>
                        </Grid>
                        <CardMedia
                            className='mainImage'
                            image={mainImage}
                        />
                    </Grid>
                    <Divider className="divider"/>
                    <Grid className="main-item">
                        <Grid className="height-100" container justify="space-between" alignItems="center" >
                            {
                                GAME_OPTIONS.map((option,index) => {
                                    return (
                                        <Tooltip key={index} title={option.active ? '' : LABELS.COMING_SOON}>
                                        <Grid onClick={()=>{if(option.active){History.push(option.link)}}} style={{backgroundColor : `${option.color}`}} className="game-option-container">
                                            <Grid className="" container justify="flex-start" alignItems="center">
                                                <Box className="game-option-image-wrapper">
                                                <CardMedia className="game-option-image"
                                                    image={option.image}
                                                ></CardMedia>
                                                </Box>
                                                <button className="game-option-title">{option.title}</button>
                                            </Grid>
                                        </Grid>
                                        </Tooltip>
                                    )
                                })
                            }

                        </Grid>
                    </Grid>
                </Grid>
                <Box className="footer">
                    <Grid className="footerPanel" container direction="column" justify="flex-end" alignItems="flex-start">
                        <Grid className="trademark" container alignItems="center">
                            <Copyright className="footText" style={{marginRight:'5px'}}/>
                            <Typography className="footText" align="left" display="inline" variant="subtitle1">{ LABELS.TRADEMARK }</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    );
}
