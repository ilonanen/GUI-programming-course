import React, { useEffect } from 'react'

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
    padding: theme.spacing(3),
    marginLeft: theme.spacing(2),
    justifyContent: "flex-start"
  }
  
}))

function App() {

  const [colours, setColours] = useState(["text.primary",
  "secondary.main",
  "warning.main",
  "info.main",
  "error.main",
  "success.main"]
  )
  const [boxes, setBoxes] = useState([])
  const [selected, setSelected] = useState(null)
  const [newboxcolor, setNewboxcolor] = useState("text.primary")
  const [spacing, setSpacing] = useState(2)
	const [anchorEl, setAnchorEl] = useState(null)
  const [anchorElColors, setAnchorElColors] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [spacingDialogOpen, setSpacingDialogOpen] = useState(false)
  



  useEffect(() => {
    var rectangles = []
    const handler = (event) => {
      selected === parseInt(event.target.id) ? 
      setSelected(null) :
      setSelected(parseInt(event.target.id))
    }
    for (let i = 0; i < colours.length; i++) {
      rectangles.push(
        <Box 
          id = {i} 
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
    setBoxes(rectangles)
  }, [colours, selected, setSelected])



  const changeColour = (colour) => {
    var tempcolours = colours
    tempcolours[selected] = colour
    setColours([...tempcolours])
    setAnchorElColors(null)
    setAnchorEl(null)
  }

  const setNewBoxColour = (event) => {
    setNewboxcolor(event.target.value)
    // console.log(newboxcolor)
  }

  const addNewBox = (event) => {
    var tempcolours = colours
    tempcolours.push(newboxcolor)
    setColours([...tempcolours])
    closeAddDialog(event)
    setNewboxcolor("text.primary")
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
    // console.log(newSpacing)
    setSpacing(newSpacing)
  }

  const openAddDialog = (event) => {
    closeMenu(event)
    setAddDialogOpen(true)
  }

  const closeAddDialog = (event) => {
    setAddDialogOpen(false)
  }

  const deleteBox = (event) => {
    var tempcolours = colours
    tempcolours.splice(selected, 1)
    setColours([...tempcolours])
    closeMenu(event)
    setSelected(null)
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
                <MenuItem disabled = {selected === null} onClick = {deleteBox}>Delete box</MenuItem>
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
                  <MenuItem name = "warning.main" onClick = {(e) => changeColour("warning.main")}><Box color = "warning.main">Yellow</Box></MenuItem>
                  <MenuItem name = "info.main" onClick = {(e) => changeColour("info.main")}><Box color = "info.main">Light blue</Box></MenuItem>
                  <MenuItem name = "text.primary" onClick = {(e) => changeColour("text.primary")}><Box color = "text.primary">Black</Box></MenuItem>

              </Menu>
              <h2>Box box box</h2>
          </Toolbar>
        </AppBar>

      <div>
        <Box className = {styledClasses.bgBox}>
          <Grid container spacing = {spacing} justify = "flex-start">
            <DisplayBoxes boxes = {boxes} />
          </Grid>	
        </Box>
      </div>
      <div>
        <Dialog
          open = {spacingDialogOpen}
          onClose = {closeSpacingDialog}
          fullWidth
          padding = {3}>
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
          <DialogActions className = {styledClasses.formControl}>
            <FormControl>
              <RadioGroup name = "newboxcolor" defaultValue = "text.primary" onChange = {setNewBoxColour}>
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
                <FormControlLabel
                  value = "success.main"
                  control = {<Radio color = "default" />}
                  label = "Green"
                  />
                <FormControlLabel
                  value = "warning.main"
                  control = {<Radio color = "default" />}
                  label = "Yellow"
                  />
              </RadioGroup>
              <br />
              <Button color = "primary" variant = "outlined" onClick = {addNewBox}>Add new</Button>
              <Button color = "secondary" variant = "outlined" onClick = {closeAddDialog}>Cancel</Button>
            </FormControl>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

function DisplayBoxes({boxes}) {
  return (
    boxes.map((box, i) => (
      <Grid key = {i} item lg = {2} md = {4} sm = {6}>
        {box}
      </Grid>
    ))
  )
}

export default App
