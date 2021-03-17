import React from 'react'

import './App.css'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, AppBar, Menu } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  
}))

function App() {

  const [selected, setSelected] = useState(null)
  const [selectedBorder, setSelectedBorder] = useState(0)

  const colours = ["primary.main",
    "secondary.main",
    "error.main",
    "warning.main",
    "info.main",
    "success.main"]

  const rectangles = []

  const selectBox = (id) => {
    setSelected(id)
  }

  for (let i = 0; i < 6; i++) {
		let handler = (event) => {
      selectBox(i)
    }
    let selectedColor = Math.floor(Math.random() * Math.floor(6))
		rectangles.push(<Box key={i} bgcolor={colours[selectedColor]} border = {selectedBorder} variant="contained" onClick={handler} p = {3}></Box>)
	}

  return (
    <div>
      <Box color="grey" border={1} width = "50%" minWidth = {200}>
        <Grid container justify="flex-start" spacing={2} >
          {rectangles.map((rect, i) => (
            <Grid key={i} item lg={2} md={4} sm={6}>
              {rect}
            </Grid>
          ))}
        </Grid>	
			</Box>
    </div>
  )
}

export default App
