import React from 'react'
import { useState } from 'react'
import { AppBar, Toolbar, Menu, MenuItem, Button, Typography, Dialog, DialogTitle, DialogContent } from '@material-ui/core'

  function App() {
    const [text, setText] = useState("Hello world")
    const [anchorEl, setAnchorEl] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)


    const openMenu = (event) => {
        setAnchorEl(event.currentTarget)
      }
    
    const closeMenu = (event) => {
        setAnchorEl(null)
      }

    const handleTextupdate = (event) => {
        setText(event.currentTarget.getAttribute("value"))
        closeMenu()
    }

    const handleAbout = (event) => {
        setDialogOpen(true)
    }

    const handleAboutClose = (event) => {
        setDialogOpen(false)
    }

    return (
        <div>
          <AppBar position = "static">
            <Toolbar>
                <Button color = "inherit" onClick = {handleAbout}>About</Button>
                <Button color = "inherit" onClick = {openMenu}>Edit text</Button>
            </Toolbar>
          </AppBar>
          <Menu
                id = "menu-appbar"
                anchorEl = {anchorEl}
                anchorOrigin = {{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin = {{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open = {Boolean(anchorEl)}
                onClose = {closeMenu}
              >
                <MenuItem value = "Hello!" onClick = {handleTextupdate}>Text 1</MenuItem>
                <MenuItem value = "Good morning world!" onClick = {handleTextupdate}>Text 2</MenuItem>
              </Menu>
          <Typography variant = "h3">{text}</Typography>
            <Dialog onClose = {handleAboutClose} open = {dialogOpen} maxWidth = "sm" padding = {5}>
                <DialogTitle>About</DialogTitle>
                <DialogContent>
                    <Typography variant = "body1"><p>(c) Ilona Engblom, 2021</p></Typography>
                    <Button color = "primary" onClick = {handleAboutClose}>OK</Button>
                </DialogContent>
            </Dialog>
        </div>

    )
  }

export default App