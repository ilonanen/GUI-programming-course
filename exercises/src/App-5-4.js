import React, { useState, useEffect, useRef } from 'react'
import { 
    AppBar, 
    Toolbar, 
    Button, 
    Box,
    Dialog, 
    DialogContent, 
    DialogTitle, 
    TextField, 
    FormLabel, 
    FormControlLabel, 
    Radio, 
    RadioGroup 
} from '@material-ui/core'
import { CirclePicker } from 'react-color'

function App() {

    const [circles, setCircles] = useState([
        {index: 0, colour: '#D33115', text: '', a: 0.9, x: 200, y: 200, r: 200}, 
        {index: 1, colour: '#FCC400', text: '', a: 0.75, x: 400, y: 200, r: 200}, 
        {index: 2, colour: '#0062B1', text: '', a: 0.6, x: 300, y: 375, r: 200}
    ])
    const [newCircle, setNewCircle] = useState({index: 0, colour: '#ffffff', text: '', a: 0.0, x: 0, y: 0, r: 200})
    const [i, seti] = useState(0)
    const [open, setOpen] = useState(false)
    const [canvasSize, setCanvasSize] = useState({w: 600, h: 600})
    const [zoom, setZoom] = useState(1.0) // for scaling into smaller windows than 600 x 600
	const [printMode, setPrintMode] = React.useState(false)

    const canvasRef = useRef(null)

    window.onbeforeprint = (event) => {
		setPrintMode(true)
	}
	
	window.onafterprint = (event) => {
		setPrintMode(false)
	}

    const drawCircles = ((ctx) => {

        ctx.strokeStyle = '#000' // outlines

        circles.forEach(circle => {
            if (circle.text && !printMode) {
                ctx.globalAlpha = circle.a
                ctx.beginPath()
                ctx.fillStyle = circle.colour
                ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI*2, true)
                ctx.fill()
                ctx.closePath()
            }
        })

        // draw outlines on top of the circles
        circles.forEach(circle => {
            if (circle.text) {
                ctx.globalAlpha = 1
                ctx.beginPath()
                ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI*2, true)
                ctx.stroke()
                ctx.closePath()
            }
        })

        // rendering the texts
        ctx.globalAlpha = 1
        ctx.font = '12px Arial'
        ctx.fillStyle = '#000'
        ctx.textAlign = 'center'
        
        // could have made like with the circles but this was simpler 
        // than adding extra text coordinates in the state objects
        if (circles[0].text) {ctx.fillText(circles[0].text, 120, 200)}
        if (circles[1].text) {ctx.fillText(circles[1].text, 470, 200)}
        if (circles[2].text) {ctx.fillText(circles[2].text, 300, 425)}

        if (circles[0].text && circles[1].text) {
        ctx.fillText(circles[0].text + ' + ', 300, 140)
        ctx.fillText(circles[1].text, 300, 150)
        }

        if (circles[1].text && circles[2].text) {
        ctx.fillText(circles[1].text + ' + ', 425, 320)
        ctx.fillText(circles[2].text, 425, 330)
        }
        
        if (circles[0].text && circles[2].text) {
        ctx.fillText(circles[0].text + ' + ', 175, 320)
        ctx.fillText(circles[2].text, 175, 330)
        }

        if (circles[0].text && circles[1].text && circles[2].text) {
        ctx.fillText(circles[0].text + ' + ', 300, 260)
        ctx.fillText(circles[1].text + ' + ', 300, 270)
        ctx.fillText(circles[2].text, 300, 280)
        }
    })

    window.onresize = (event) => {
        // 50 px extra height for the appbar
        if (window.innerWidth < 600 || window.innerHeight < 650) {
            setCanvasSize({...canvasSize, w: Math.min(window.innerWidth, 600)})
            setCanvasSize({...canvasSize, h: Math.min((window.innerHeight - 50), 600)})
            setZoom(Math.min(window.innerWidth, (window.innerHeight - 50)) / 600)
        }
        else {
            setCanvasSize({w: 600, h: 600})
            setZoom(1.0)
        }
	}

    const openDialog = () => {
        setOpen(true)
    }

    const closeDialog = (event) => {
        setOpen(false)
        seti(0)
    }

    const handleColour = (color, event) => {
        console.log(color)
        setNewCircle({...newCircle, colour: color.hex})
    }

    const handleText = (event) => {
        setNewCircle({...newCircle, text: event.target.value})
    }

    const handleSave = () => {
        var tempCircles = circles
        tempCircles[i] = newCircle
        setCircles([...tempCircles])
    }

    const handleRadio = (event) => {
        setNewCircle(circles[event.target.value])
        seti(event.target.value)
    }

    const clearAlert = () => {
        // For 'real' use this needs an "are you sure" alert dialog, but not in this exercise
        setCircles([
            {index: 0, colour: '#D33115', text: '', a: 0.9, x: 200, y: 200, r: 200}, 
            {index: 1, colour: '#FCC400', text: '', a: 0.75, x: 400, y: 200, r: 200}, 
            {index: 2, colour: '#0062B1', text: '', a: 0.6, x: 300, y: 375, r: 200}
        ])
    }

    const mouseCoordinates = (event) => {
        // Getting the mouse coordinates on canvas
        // code from the course example app
        let h = canvasRef.current.height
        let w = canvasRef.current.width
        let transform = new DOMMatrix()
        transform = transform.translateSelf(w / 2, h / 2, 0)
        transform = transform.scaleSelf(zoom, zoom, 1)
        transform = transform.translate(-w / 2, -h / 2, 0)        
        transform = transform.invertSelf()        
        var rect = event.target.getBoundingClientRect()
        let domP = new DOMPoint(event.clientX - rect.left, event.clientY - rect.top)
        let domPTransformed = transform.transformPoint(domP)
        return domPTransformed
    }

    const edit = (event) => {
        var mousec = mouseCoordinates(event)

        circles.forEach(circle => {
            // calculate whether the mouse coordinates are less than the radius from the circle centre coordinates
            var dx = mousec.x - circle.x
            var dy = mousec.y - circle.y
            if (Math.sqrt(dx*dx + dy*dy) < circle.r) {
                seti(circle.index)  // picks the matching circle for edit
                setNewCircle(circles[circle.index])
                openDialog()
                return
            }
            
        })
    }

    useEffect(() => {
        let ctx = canvasRef.current.getContext('2d')
        ctx.clearRect(0, 0, canvasSize.w, canvasSize.h)
        ctx.save()
        ctx.translate(canvasSize.w / 2, (canvasSize.h) / 2)
        ctx.scale(zoom, zoom)
        ctx.translate(-canvasSize.w / 2, -canvasSize.h / 2)
        drawCircles(ctx)
        ctx.restore()
    })

    return (
        <div>
            <AppBar position = 'static' color = 'default'>
                <Toolbar justify-content = 'flex-start' >
                    <Button 
                        color = 'inherit' 
                        onClick = {openDialog}>
                        Make & edit Diagram
                    </Button>
                    <Button
                        color = 'inherit'
                        onClick = {clearAlert}>
                        Clear diagram
                    </Button>

                </Toolbar>
            </AppBar>
            <Box style = {{padding: 6}}>
                <canvas
                    id = "Canvas"
                    width={canvasSize.w}
                    height={canvasSize.h}
                    ref={canvasRef}
                    onMouseDown = {edit}
                />
            </Box>
            <Dialog open = {open} onClose = {closeDialog} >
                <DialogTitle>Edit the Venn Diagram</DialogTitle>
                <DialogContent style = {{ marginLeft: "1rem", padding: "1rem", justifyContent: "flex-start"}}>
                        <p>
                            <FormLabel>Select the part you want to edit</FormLabel>
                            <RadioGroup row name = 'id' value = {i} onChange = {handleRadio}>
                                <FormControlLabel value = "0" control = {<Radio />} label = "Upper left" />
                                <FormControlLabel value = "1" control = {<Radio />} label = "Upper right" />
                                <FormControlLabel value = "2" control = {<Radio />} label = "Lower" />
                            </RadioGroup>
                        </p>
                        <p>
                            <TextField
                                label = "Text for selected part"
                                value = {newCircle.text}
                                onChange = {handleText}
                                fullWidth
                            />
                        </p>
                        <p>
                            <p><FormLabel>Pick your colour</FormLabel></p>
                            <CirclePicker
                                color = {newCircle.colour} 
                                onChangeComplete = {handleColour}
                            />
                        </p>
                        <Button onClick = {handleSave} color = 'primary' align = 'right'>Apply</Button>
                        <Button onClick = {closeDialog} color = 'default'>Close</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default App