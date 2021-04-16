import React from 'react'
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Undo, Redo } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    }
})
)

function MenuBar(props) {

    const classes = useStyles()

    return (
        <div>
            <AppBar position = 'static'>
                <Toolbar padding = {4} justify-content = 'flex-start' >
                    <Button 
                        color = 'inherit' 
                        className = {classes.menuButton}
                        onClick = {props.copy}>
                        Copy text
                    </Button>
                    <IconButton 
                        edge = 'start' 
                        color = 'inherit' 
                        onClick = {props.undo} 
                        disabled = {props.undoDisabled}
                        >
                        <Undo />
                    </IconButton>

                    <IconButton 
                        edge = 'start' 
                        color = 'inherit' 
                        onClick = {props.redo} 
                        disabled = {props.redoDisabled}
                        >
                        <Redo />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default MenuBar