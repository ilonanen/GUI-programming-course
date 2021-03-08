import React from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function App() {
	const [number1, setNumber1] = React.useState("");
	const [operator, setOperator] = React.useState("");
	const [number2, setNumber2] = React.useState("");
	
	const onButton = (key) => {
		if (typeof key == "number") {
			if (operator != "")
				setNumber2(number2 + key);
			else
				setNumber1(number1 + key);
		} else {
			if (key == "=") {
				if (number1 != "" && number2 != "") {
					if (operator == "+") {
						setNumber1(parseInt(number1) + parseInt(number2));
					} else if (operator == "-") {
						setNumber1(parseInt(number1) - parseInt(number2));
					}
					setOperator("");
					setNumber2("");
				}
			} else if (key == "c") {
				setNumber1("");
				setNumber2("");
				setOperator("");
			} else {
				setOperator(key);
			}
		}
	}
	
	return (
		<Box>
			<Paper style={{width: 400, textAlign: 'center',}}>
				<Box><TextField id={"number1"} disabled={true} variant="outlined" fullWidth value={number1} /></Box>
				<Box><TextField id={"operator"} disabled={true} variant="outlined" fullWidth value={operator} /></Box>
				<Box><TextField id={"number2"} disabled={true} variant="outlined" fullWidth value={number2} /></Box>
				<Box>
					<Button variant="contained" id={"4"} onClick={(e) => {onButton(7)}}>7</Button>
					<Button variant="contained" id={"4"} onClick={(e) => {onButton(8)}}>8</Button>
					<Button variant="contained" id={"4"} onClick={(e) => {onButton(9)}}>9</Button>
					<Button variant="contained" id={"4"} onClick={(e) => {onButton("+")}}>+</Button>
				</Box>
				<Box>
					<Button variant="contained" id={"4"} onClick={(e) => {onButton(4)}}>4</Button>
					<Button variant="contained" id={"4"} onClick={(e) => {onButton(5)}}>5</Button>
					<Button variant="contained" id={"4"} onClick={(e) => {onButton(6)}}>6</Button>
					<Button variant="contained" id={"4"} onClick={(e) => {onButton("-")}}>-</Button>
				</Box>
				<Box>
					<Button variant="contained" id={"4"} onClick={(e) => {onButton(1)}}>1</Button>
					<Button variant="contained" id={"4"} onClick={(e) => {onButton(2)}}>2</Button>
					<Button variant="contained" id={"4"} onClick={(e) => {onButton(3)}}>3</Button>
					<Button variant="contained" id={"4"} onClick={(e) => {onButton("=")}}>=</Button>
				</Box>
				<Box>
					<Button variant="contained" id={"4"} onClick={(e) => {onButton(0)}}>0</Button>
					<Button variant="contained" id={"4"} onClick={(e) => {onButton("c")}}>c</Button>
				</Box>
			</Paper>
		</Box>
	);
}

export default App;
