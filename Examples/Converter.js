import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const RATE = 1.09;

function App() {
	// useState hooks are used here to store information.
	// initial values are set as part of this.
	const [euros, setEuros] = React.useState(0);
	const [dollars, setDollars] = React.useState(0);
	const [doRound, setRounding] = React.useState(false);
	const [bgColor, setBackground] = React.useState(25);

	// event handlers follow, these functions are linked to 
	// components to react interaction with them
	
	const updateRounding = (event) => {
		setRounding(event.target.checked);
	}
	
	const clear = (event) => {
		setEuros(0);
		setDollars(0);
	}
	
	const updateEuros = (event) => {
		// event object contains the new value.
		// If the entered text does not parse as a float
		// this method doesn't go further.
		const eurs = parseFloat(event.target.value);
		setEuros(eurs);
		const dlrs = doRound?Math.round(eurs*RATE):eurs*RATE;
		setDollars(dlrs);
	}
	
	const updateDollars = (event) => {
		const dlrs = parseFloat(event.target.value);
		setDollars(dlrs);
		const eurs = doRound?Math.round(dlrs/RATE):dlrs/RATE;
		setEuros(eurs);
	}

	const mouseMove = (event) => {
		// Here mouse coordinates found in the event are used.
		// Somewhat random way to come up with a number between 0..255 to be used for a color
		const nc = (Math.max(0, Math.min(0.5, (event.clientX / event.target.clientWidth / 2))) * 256 + 127)&0xff;
		let rgb = (nc).toString(16).length >= 2?nc.toString(16):"0"+nc.toString(16);
		setBackground("#"+rgb+rgb+rgb);
	}
	
	return (
		<div className="App" style={{background: bgColor}} onMouseMove={mouseMove}>
			<Box>
				<TextField id="euros" label="Euros" value={euros} onChange={updateEuros} />
				<TextField id="dollars" label="Dollars" value={dollars} onChange={updateDollars} />
			</Box>
			<FormControlLabel control={
					<Checkbox checked={doRound} onChange={updateRounding} value="primary"  />
				} 
				label="Rounding"
			/>
			<Button variant="contained" color="primary" onClick={clear} >
				clear
			</Button>
		</div>
	);
}

export default App;
