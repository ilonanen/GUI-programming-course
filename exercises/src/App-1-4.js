import React from 'react'
import { useState } from 'react'
import { Grid, Paper, Checkbox, Button } from '@material-ui/core'


function App() {

  const [dist, setDist] = useState({
    mousedist: false,
    wheeldist: false
  })
  const [speed, setSpeed] = useState({
    mousespeed: false,
    wheelspeed: false
  })

  const { mousedist, wheeldist } = dist
  const { mousespeed, wheelspeed } = speed
  
  const [ trackedMouseDist, setMouseDist ] = useState(0)
  const [ trackedWheelDist, setWheelDist ] = useState(0)
  const [ trackedMouseSpeed, setMouseSpeed ] = useState(0)
  const [ trackedWheelSpeed, setWheelSpeed ] = useState(0)

  const [ origMouseDist, setOrigMouseDist ] = useState(0)
  const [ timestampMouse, setTimeStampMouse ] = useState(new Date())
  const [ origWheelDist, setOrigWheelDist ] = useState(0)
  const [ timestampWheel, setTimeStampWheel ] = useState(new Date())

  const handleChange = (event) => {
    setDist({ ...dist, [event.target.name]: event.target.checked})
  }

  const handleSpeedChange = (event) => {
    setSpeed({ ...speed, [event.target.name]: event.target.checked})

    if (mousespeed) {
      setOrigMouseDist(trackedMouseDist)
      setTimeStampMouse(Date.now())
    }
    
    if (wheelspeed) {
      setOrigWheelDist(trackedWheelDist)
      setTimeStampWheel(Date.now())
    }
  }

  const trackMouseDist = () => {
    setMouseDist(trackedMouseDist + 1)
  }

  const trackWheelDist = () => {
    setWheelDist(trackedWheelDist + 1)
  }

  const trackMouseSpeed = () => {
    setMouseDist(trackedMouseDist + 1)
    var dt = Date.now() - timestampMouse
    var distance = trackedMouseDist - origMouseDist
    setMouseSpeed(Math.round(distance / dt * 1000))
  }

  const trackWheelSpeed = () => {
    setWheelDist(trackedWheelDist + 1)
    var dt = Date.now() - timestampWheel
    var distance = trackedWheelDist - origWheelDist
    setWheelSpeed(Math.round(distance / dt * 1000))
  }

  const handleReset = (event) => {
    setMouseDist(0)
    setWheelDist(0)
    setMouseSpeed(0)
    setWheelSpeed(0)
    setTimeStampMouse(Date.now())
    setTimeStampWheel(Date.now())
    setOrigMouseDist(0)
    setOrigWheelDist(0)
  }

  return (
    <Grid 
      container 
      spacing = {1}
      direction = 'row' 
      justify = 'flex-center'
      style = {{width: '50%', margin: 'auto'}}
    >
      <Grid container
        spacing = {1} 
      >
        <Grid container direction = 'row'>
          <Grid item  xs = {2}>
          </Grid>
          <Grid item  xs = {2}>
            <h3>Mouse</h3>
          </Grid>
          <Grid item  xs = {2}>
            <h3>Wheel</h3>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item  xs = {2}>
            <h3>Distance</h3>
          </Grid>
          <Grid item  xs = {2}>
            <Checkbox
              checked = {mousedist}
              onChange = {handleChange}
              name = 'mousedist'
            />
          </Grid>
          <Grid item  xs = {2}>
            <Checkbox 
              checked = {wheeldist}
              onChange = {handleChange}
              name = 'wheeldist'
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item  xs = {2}>
            <h3>Speed</h3>
          </Grid>
          <Grid item xs = {2}>
            <Checkbox
              checked = {mousespeed}
              onChange = {handleSpeedChange}
              name = 'mousespeed'
            />
          </Grid>
          <Grid item xs = {2}>
            <Checkbox 
              checked = {wheelspeed}
              onChange = {handleSpeedChange}
              name = 'wheelspeed'
            />
          </Grid>
        </Grid>
        <Grid container xs = {6}
          align = "center"
        >
          <p>
            The mouse has moved {trackedMouseDist} units with the speed of {trackedMouseSpeed} units/second. <br />
            The scroll wheel has moved {trackedWheelDist} units with the speed of {trackedWheelSpeed} units/second. <br />
            <Button 
              variant = 'outlined'
              color = 'primary'
              onClick = {handleReset}
            >
              Reset distances
            </Button>
          </p>
        </Grid>
      </Grid>
      <Grid container xs = {6}
        spacing = {1}
      >
        <Paper
          elevation = {1}
          style = {{width: '100%', minHeight: 300, margin: 'auto'}}
        >
          <div
            style = {{width: '100%', minHeight: 300, margin: 'auto'}}
            onMouseMove = {speed.mousespeed ? trackMouseSpeed : dist.mousedist ? trackMouseDist : null}
            onWheel = {speed.wheelspeed ? trackWheelSpeed : dist.wheeldist ? trackWheelDist : null}
          >
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default App
