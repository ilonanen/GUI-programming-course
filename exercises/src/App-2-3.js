import React from 'react'
import { useState } from 'react'
import { Box, AppBar, Toolbar, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    theText: {
      marginLeft: theme.spacing(2),
      fontSize: 20,
      fontWeight: "bold",
      justifyContent: "flex-start"
    },
    bgBox: {
        padding: 4,
    }
  }))

function App() {
const [text, setText] = useState("Hello world")
const [newtext, setNewText] = useState("")
const [dialogOpen, setDialogOpen] = useState(false)



const handleTextUpdate = (event) => {
    setText(newtext)
    setNewText("")
    handleClose()
}

const handleDialog = (event) => {
    setDialogOpen(true)
}

const handleClose = (event) => {
    setDialogOpen(false)
}

const handleTextChange = (event) => {
    setNewText(event.target.value)
}

const styledClasses = useStyles()

return (
    <div>
        <AppBar position = "static">
        <Toolbar>
            <Button color = "inherit" onClick = {handleDialog}>Edit text</Button>

        </Toolbar>
        </AppBar>
        <Box className = {styledClasses.bgBox}>
            <Typography className = {styledClasses.theText}>{text}</Typography>
        </Box>
        <Dialog onClose = {handleClose} open = {dialogOpen} maxWidth = "sm" padding = {5}>
            <DialogTitle>About</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    variant = "outlined"
                    label = "New text"
                    value = {newtext}
                    onChange = {handleTextChange}
                />
                <br />
                <Button color = "primary" onClick = {handleTextUpdate}>OK</Button>
                <Button color = "secondary" onClick = {handleClose}>Cancel</Button>
            </DialogContent>
        </Dialog>
    </div>

)
}

export default App