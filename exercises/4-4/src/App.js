import React from 'react'
import { useState } from 'react'
import { InputBase, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import MenuBar from './components/Menu'
import chick from './chick.jpg'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: theme.spacing(2)
  },
  header: {
    fontSize: '2rem',
    fontWeight: 'bold',
    flexGrow: 1,
    alignSelf: 'flex-end'
  }
})
)

function App() {

  const [text, setText] = useState({header: 'Happy Easter', content: 'Here\'s a chick for ya'})
  const [image, setImage] = useState(chick)
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])

  const handleInput = (event) => {
    setText({...text, [event.target.id]: event.target.value})
    setUndoStack([...undoStack, text])
    setRedoStack([])
  }

  const pasteText = (event) => {
		let paste = event.clipboardData.getData('text')
    if (paste) {
      let [pasteheader, ...pastecont] = paste.split('\n')
      pastecont = pastecont.join(' ')
      setText({header: pasteheader, content: pastecont})
      setUndoStack([...undoStack, text])
      setRedoStack([])
      event.preventDefault()
    }
	}
	
	const copyText = (event) => {
    var texttocopy = text.header + '\n' + text.content
		event.clipboardData.setData('text/plain', texttocopy)
		event.preventDefault()
	}

  const copy = (event) => {
    var texttocopy = text.header + '\n' + text.content
    navigator.clipboard.writeText(texttocopy)
  }

  const handleDragStart = (event) => {
		event.dataTransfer.setData("image/jpeg", event.target.src)
		event.dataTransfer.dropEffect = "copy"
	}
	
	const handleOnDrop = (event) => {
		event.preventDefault()
		let file = event.dataTransfer.files[0]
		if (file) {
			let reader = new FileReader()
			reader.onloadend = function(e) {
				setImage(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}

	const handleDragEnter = (event) => {
		event.preventDefault()
		let file = event.dataTransfer.files[0]
		if (file) {
			event.preventDefault()
		}
	}	

	const handleDragOver = (event) => {
		event.preventDefault()
		event.dataTransfer.dropEffect = "copy"
	}

  const undo = () => {
    setRedoStack([...redoStack, text])
    var tempUndoStack = undoStack
    setText(undoStack[undoStack.length - 1])
    tempUndoStack.pop()
    setUndoStack([...tempUndoStack])
  }

  const redo = () => {
    var tempRedoStack = redoStack
    setText(redoStack[redoStack.length - 1])
    tempRedoStack.pop()
    setRedoStack([...tempRedoStack])
    setUndoStack([...undoStack, text])
  }

  const classes = useStyles()

  return (
    <div onPaste = {pasteText} onCopy = {copyText}>
      <MenuBar copy = {copy} undo = {undo} redo = {redo} undoDisabled = {(undoStack.length === 0)} redoDisabled = {(redoStack.length === 0)} />
      <Box className = {classes.root}>
      <InputBase 
        className = {classes.header}
        id = 'header'
        value = {text.header}
        onChange = {handleInput}
        fullWidth
        />
      <Box>
				<img src={image} 
					alt = "Easterchick In Plant" 
					id = "image" 
					draggable = {true} 
          onDragStart = {handleDragStart} 
					onDragEnter = {handleDragEnter}
					onDrop = {handleOnDrop} 
					onDragOver = {handleDragOver}
          />
			</Box>
      <InputBase 
        id = 'content'
        value = {text.content}
        onChange = {handleInput}
        fullWidth
        />
      </Box>
    </div>
  );
}

export default App;
