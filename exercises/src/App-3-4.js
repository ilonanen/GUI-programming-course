import React from 'react'

import './App.css'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Switch, Dialog, DialogTitle, DialogContent, TextField } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        display: 'flex',
        flexGrow: 1
    },
    table: {
      minWidth: 520,
      minHeight: 600,
      border: 1
    },
    dialogue: {
        marginLeft: theme.spacing(2),
        padding: theme.spacing(3),
        justifyContent: "flex-start"
        
    }
  })
)

function App() {

    const [events, setEvents] = useState([
        {id: 1, date: '2021-04-02', eventname: 'Good Friday', private: ''},
        {id: 4, date: '2021-04-03', eventname: 'Saturday business', private: 'Private'},
        {id: 2, date: '2021-04-04', eventname: 'Easter Sunday', private: ''},
        {id: 3, date: '2021-04-05', eventname: 'Easter Monday', private: ''}
    ]) // hard-coded for demonstration
    const [newEvent, setNewEvent] = useState({id: 0, date: '', eventname: '', private: ''})
    const [dialogOpen, setDialogOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const [sortingOn, setSortingOn] = useState(false)

    const handleDialogOpen = (event) => {
        setDialogOpen(true)
    }
    
    const closeDialog = () => {
        setNewEvent({id: 0, date: '', eventname: '', private: ''})
        setDialogOpen(false)
    }

    const saveEvent = (event) => {
        if (newEvent.eventname === '' || newEvent.date === '') {
            setAlertOpen(true)
        }
        else {
            var id = events.length + 1
            setNewEvent({...newEvent, id: id})
            setEvents([...events, newEvent])
            setNewEvent({id: 0, date: '', eventname: '', private: ''})
            closeDialog()
        }
    }

    const handleEventChange = (event) => {
        setNewEvent({...newEvent, [event.target.name]: event.target.value})
    }

    const handlePrivacyChange = (event) => {
        event.target.checked ?
        setNewEvent({...newEvent, private: 'Private'}) : 
        setNewEvent({...newEvent, private: ''})
    }

    const closeAlertDialog = (event) => {
        setAlertOpen(false)
    }

    const handleSort = (event) => {
        setSortingOn(event.target.checked)
    }

    const columns = [
        {field: 'eventname', headerName: 'Event', sortable: false, width: 200},
        {field: 'date', headerName: 'Date', sortable: sortingOn, width: 160},
        {field: 'private', headerName: 'Private', sortable: sortingOn, width: 160}
        ]

    const classes = useStyles()

    return (
        <div className = "root">
            <Button color = "primary" onClick = {handleDialogOpen}>Add a new event</Button>
            <Switch color = "primary" onChange = {handleSort} />Sortable
{            
            // <TableContainer component = {Paper}>
            //     <Table stickyHeader className = {classes.table}>
            //         <TableHead>
            //             <TableRow>
            //                 <TableCell>Event</TableCell>
            //                 <TableCell><TableSortLabel active = {sortingOn}>Date</TableSortLabel></TableCell> 
            //                 <TableCell><TableSortLabel>Private</TableSortLabel></TableCell>
            //             </TableRow>
            //         </TableHead>
            //         <TableBody>
            //             {events.map((ev, id) => (
            //                 <TableRow key = {id}>
            //                     <TableCell component = "th" scope = "row">{ev.eventname}</TableCell>
            //                     <TableCell>{ev.date}</TableCell>
            //                     <TableCell>{ev.privacy ? "Private" : ""}</TableCell>
            //                 </TableRow>
            //             ))}
            //         </TableBody>
            //     </Table>
            // </TableContainer>
}  

            <DataGrid autoHeight rows = {events} columns = {columns} className = {classes.table} />
            <Dialog open = {dialogOpen} onClose = {closeDialog} maxWidth = "sm">
                <DialogTitle>Add event</DialogTitle>
                <DialogContent class = {classes.dialogue}>
                    <TextField 
                        autoFocus
                        variant = "outlined"
                        name = "eventname"
                        label = "Event title"
                        value = {newEvent.eventname}
                        onChange = {handleEventChange}
                        /> 
                    <p>
                        <TextField 
                            type = "date"
                            name = "date"
                            value = {newEvent.date}
                            onChange = {handleEventChange}
                            />
                    </p>
                    <p>
                        <Switch 
                            name = "privacy"
                            color = "secondary"
                            onChange = {handlePrivacyChange}
                            /> Private event
                    </p>
                    <Button variant = "contained" color = "primary" onClick = {saveEvent}>Save</Button>
                </DialogContent>
            </Dialog>
            <Dialog open = {alertOpen} onClose = {closeAlertDialog}>
                <DialogContent className = {classes.dialogue}>
                    <p>You must enter event title and date!</p>
                    <Button variant = "contained" color = "secondary" onClick = {closeAlertDialog}>OK</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default App