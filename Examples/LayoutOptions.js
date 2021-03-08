import React from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { flexbox } from '@material-ui/system';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
	valueText: {
		fontWeight: "bold",
		justifyContent: "flex-start",
		
	}
}));


function App() {
	const [value, setValue] = React.useState("");
	
	const styledClasses = useStyles();
	
	const addToValue = (c) => {
		setValue(value + c);
	}

	const buttons = [];
	for (let i = 0; i < 10; i++) {
		let handler = (event) => {addToValue(i);};
		buttons.push(<Button key={i} color="primary" variant="contained" onClick={handler}>{i}</Button>);
	}
	
	return (
		<div className="App">
			{//Using Box and its flex attributes
			}
			<Box color="grey" border={1}>
				<Box display="flex" p="1rem" height={50}>
					{buttons.slice(0, 4)}
				</Box>
				<Box display="flex" p="1rem" height={50}>
					{buttons.slice(4, 8)}
				</Box>
				<Box display="flex" p="1rem" height={50}>
					{buttons.slice(8)}
				</Box>
			</Box>
			
			{//using grid and some of its parameters
			}
			<Box color="grey" border={1}>
				<Grid container spacing={2}>
					<Grid item lg={4} md={4} sm={4}>
						<Grid container justify="center" spacing={2} >
							{buttons.map((b, i) => (
								<Grid key={"gr_" + i} item>
									{b}
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			</Box>
			
			{//using html tags and inline styles, not recommended especially if you are using Material-UI layout solutions
			}
			<br/>
			<div style={{border: "1px solid black"}}>
				<div style={{height: 50, display: "flex", flexWrap: "wrap", justifyContent: "flex-start", alignContent: "flex-start"}}>
					{buttons.slice(0, 4)}
				</div>
				<div style={{height: 50, display: "flex", flexWrap: "wrap", justifyContent: "flex-start", alignContent: "flex-start"}}>
					{buttons.slice(4, 8)}
				</div>
				<div style={{height: 50, display: "flex", flexWrap: "wrap", justifyContent: "flex-start", alignContent: "flex-start"}}>
					{buttons.slice(8)}
				</div>
			</div>
			
			<Box className={styledClasses.valueText}>
				{value}
			</Box>
		</div>
	);
}

export default App;
