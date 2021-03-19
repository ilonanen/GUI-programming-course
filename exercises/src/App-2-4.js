import React from 'react'

import './App.css'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, FormControl, Button, Grid, Dialog, DialogTitle, DialogActions, AppBar, Toolbar, Menu, MenuItem, IconButton, Slider, Radio, RadioGroup, FormControlLabel } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  bgBox: {
    color: "white",
    border: 1,
    width: "40%",
    minWidth: 200,
    padding: 10
  },
  formControl: {
    margin: theme.spacing(3),
    align: "left"
  }
  
}))

function App() {

  const [selected, setSelected] = useState(null)
  const [newColour, setNewColour] = useState("")
  const [spacing, setSpacing] = useState(2)
	const [anchorEl, setAnchorEl] = useState(null)
  const [anchorElColors, setAnchorElColors] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [spacingDialogOpen, setSpacingDialogOpen] = useState(false)

  var colours = ["text.primary",
    "warning.main",
    "secondary.main",
    "error.main",
    "info.main",
    "success.main"]

  const rectangles = []

  const selectBox = (id) => {
    selected === id ? 
    setSelected(null) :
    setSelected(id)
  }

  const changeColour = (colour) => {
    setNewColour(colour)
    colours[selected] = newColour
  
    setAnchorElColors(null)
    setAnchorEl(null)
  }

  const addNewBox = (event) => {
    setNewColour(event.target.value)
    colours.push(newColour)
    var i = rectangles.length
    rectangles.push(
      <Box 
        accessKey = {i} 
        bgcolor = {colours[i]} 
        variant = "contained" 
        borderColor = "white"
        border = {selected === i ? 2 : 0}
        boxShadow = {selected === i ? 0 : 4} 
        onClick = {handler} 
        p = {3}
      />
    )
    console.log(rectangles)
    closeAddDialog(event)
  }

  const handler = (event) => {
    selectBox(parseInt(event.target.accessKey))
  }

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = (event) => {
    setAnchorEl(null)
  }

  const openEditMenu = (event) => {
    setAnchorElColors(event.currentTarget)
  }
  
  const closeEditMenu = (event) => {
    setAnchorElColors(false)
  }

  const openAddMenu = (event) => {
    closeMenu(event)
    setAddDialogOpen(true)
  }

  const openSpacingDialog = (event) => {
    closeMenu(event)
    setSpacingDialogOpen(true)
  }

  const closeSpacingDialog = (event) => {
    setSpacingDialogOpen(false)
  }

  const setNewSpacing = (event, newSpacing) => {
    console.log(newSpacing)
    setSpacing(newSpacing)
  }

  const openAddDialog = (event) => {
    closeMenu(event)
    setAddDialogOpen(true)
  }

  const closeAddDialog = (event) => {
    setAddDialogOpen(false)
  }

// nämä pitää siirtää stateen, jotta päivittyvät.
// Attribuutit props-objectissa
// 0:
// $$typeof: Symbol(react.element)
// key: null
// props:
// accessKey: 0
// bgcolor: "text.primary"
// border: 0
// borderColor: "white"
// boxShadow: 4

  for (let i = 0; i < 6; i++) {
		rectangles.push(
      <Box 
        accessKey = {i} 
        bgcolor = {colours[i]} 
        variant = "contained" 
        borderColor = "white"
        border = {selected === i ? 2 : 0}
        boxShadow = {selected === i ? 0 : 4} 
        onClick = {handler} 
        p = {3}
        />
    )
	}

  const styledClasses = useStyles()

  return (
    <div>
        <AppBar position = "static">
          <Toolbar>
          <IconButton 
            edge = "start" 
            className = {styledClasses.menuButton} 
            color = "inherit" 
            onClick = {openMenu}
            >
              <MenuIcon />
            </IconButton>
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
                <MenuItem disabled = {selected === null} onClick = {openEditMenu}>Edit box colour</MenuItem>
                <MenuItem onClick = {openSpacingDialog}>Adjust spacing</MenuItem>
                <MenuItem onClick = {openAddDialog}>Add box</MenuItem>
                <MenuItem>Delete box</MenuItem>
              </Menu>
              <Menu
                id = "menu-colours"
                anchorEl = {anchorElColors}
                anchorOrigin = {{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin = {{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open = {Boolean(anchorElColors)}
                onClose = {closeEditMenu}
                >
                  <MenuItem name = "primary.main" onClick = {(e) => changeColour("primary.main")}><Box color = "primary.main">Blue</Box></MenuItem>
                  <MenuItem name = "secondary.main" onClick = {(e) => changeColour("secondary.main")}><Box color = "secondary.main">Red</Box></MenuItem>
                  <MenuItem name = "success.main" onClick = {(e) => changeColour("success.main")}><Box color = "success.main">Green</Box></MenuItem>
              </Menu>
              <h2>Box box box</h2>
          </Toolbar>
        </AppBar>

      <div>
        <Box className = {styledClasses.bgBox}>
          <Grid container spacing = {spacing} justify = "flex-start">
            {rectangles.map((rectangle, i) => (
              <Grid key = {i} item lg = {2} md = {4} sm = {6}>
                {rectangle}
              </Grid>
            ))}
          </Grid>	
        </Box>
      </div>
      <div>
        <Dialog
          open = {spacingDialogOpen}
          onClose = {closeSpacingDialog}>
            <DialogTitle>Set Spacing</DialogTitle>
            <DialogActions>
              <Slider
                value = {spacing}
                onChange = {setNewSpacing}
                step = {1}
                min = {0}
                max = {10}
                marks
                valueLabelDisplay = "auto"
              />           
            </DialogActions>
        </Dialog>
        <Dialog
          open = {addDialogOpen}
          onClose = {closeAddDialog}  
        >
          <DialogTitle>Add a new rectangle</DialogTitle>
          <DialogActions>
            <FormControl className = {styledClasses.formControl}>
              <RadioGroup name = "newboxcolor" defaultValue = "text.primary">
                <FormControlLabel
                  value = "text.primary"
                  control = {<Radio color = "default" />}
                  label = "Black"
                  />
                <FormControlLabel
                  value = "secondary.main"
                  control = {<Radio color = "secondary" />}
                  label = "Red"
                  />
                <FormControlLabel
                  value = "primary.main"
                  control = {<Radio color = "primary" />}
                  label = "Blue"
                  />
              </RadioGroup>
              <Button color = "primary" variant = "outlined" onClick = {addNewBox}>Add new</Button>
              <Button color = "secondary" variant = "outlined" onClick = {closeAddDialog}>Cancel</Button>
            </FormControl>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default App
