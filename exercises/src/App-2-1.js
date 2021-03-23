import React from 'react'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Radio, RadioGroup, FormControlLabel } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  colours: {
    marginRight: theme.spacing(4),
    fontSize: 40,
    fontWeight: "bold",
    fontColor: props => props.colour,
  },
  menubox: {
    justifyContent: "flex-center",
    bgColor: "white",
    border: 1,
    width: "20%",
    minWidth: 80,
    padding: 10
  }
}))


function App() {
  const [colour, setColour] = useState("default")

  const handleNewColour = (event) => {
    setColour(event.target.value)
  }

  const classes = useStyles({colour: colour})

  return (
    <Box className = {classes.menubox}>
      <Box className = {classes.colours} color = {colour}>
        {// not using typography because of limited colours
        }
        COLOURS
      </Box>
      <Box border = {1} padding = {2}>
        <RadioGroup name = "newboxcolor" onChange = {handleNewColour}>
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
            value = "info.main"
            control = {<Radio color = "primary" />}
            label = "Blue"
            />
          <FormControlLabel
            value = "success.main"
            control = {<Radio color = "default" />}
            label = "Green"
            />
        </RadioGroup>
      </Box>
    </Box>
  )
}

export default App
