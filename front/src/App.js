import { useState, useEffect } from 'react';

import { ethers } from 'ethers';
import logo from './logo.svg';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import NumbersIcon from '@mui/icons-material/Numbers';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function App() {
	const [haveMetamask, sethaveMetamask] = useState(true);

	const [accountAddress, setAccountAddress] = useState('');
	const [accountBalance, setAccountBalance] = useState('');

	const [isConnected, setIsConnected] = useState(false);

	const { ethereum } = window;

	const provider = new ethers.providers.Web3Provider(window.ethereum);

	const [isTransferShown, setIsTransferShown] = useState(false);
	const [isWOrderShown, setIsWOrderShown] = useState(false);
	const [isCancelConfirmShown, setIsCancelConfirmShown] = useState(false);
	const [isCancelOrderShown, setIsCancelOrderShown] = useState(false);
	const [isConfirmOrderShown, setIsConfirmOrderShown] = useState(false);
	const [isWOwnerShown, setIsWOwnerShown] = useState(false);
	const [isConsultOrderShown, setIsConsultOrderShown] = useState(false);
	const [value, setValue] = React.useState(dayjs());

	const theme = createTheme({
		palette: {
			primary: {
				light: '#8561c5',
				main: '#673ab7',
				dark: '#482880',
				contrastText: '#fff',
			},
			secondary: {
				light: '#637bfe',
				main: '#3d5afe',
				dark: '#2a3eb1',
				contrastText: '#fff',
			},
			mode: 'dark',
		},
	});

	useEffect(() => {
		const { ethereum } = window;
		const checkMetamaskAvailability = async () => {
			if (!ethereum) {
				sethaveMetamask(false);
			}
			sethaveMetamask(true);
		};
		checkMetamaskAvailability();
	}, []);

	const connectWallet = async () => {
		try {
			if (!ethereum) {
				sethaveMetamask(false);
			}

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});

			let balance = await provider.getBalance(accounts[0]);
			let bal = ethers.utils.formatEther(balance);

			setAccountAddress(accounts[0]);
			setAccountBalance(bal);
			setIsConnected(true);
		} catch (error) {
			setIsConnected(false);
		}
	};

	const hideAll = () => {
		setIsTransferShown(false);
		setIsWOrderShown(false);
		setIsCancelConfirmShown(false);
		setIsCancelOrderShown(false);
		setIsConfirmOrderShown(false);
		setIsWOwnerShown(false);
		setIsConsultOrderShown(false);
	};

	const showTransfer = event => {
		// 👇️ only show element on click
		hideAll();
		setIsTransferShown(true);
	};

	const showWOrder = event => {
		// 👇️ only show element on click
		hideAll();
		setIsWOrderShown(true);
	};

	const showCancelConfirm = event => {
		// 👇️ only show element on click
		hideAll();
		setIsCancelConfirmShown(true);
	};

	const showCancelOrder = event => {
		// 👇️ only show element on click
		hideAll();
		setIsCancelOrderShown(true);
	};

	const showConfirmOrder = event => {
		// 👇️ only show element on click
		hideAll();
		setIsConfirmOrderShown(true);
	};

	const showWOwner = event => {
		// 👇️ only show element on click
		hideAll();
		setIsWOwnerShown(true);
	};

	const showConsultOrder = event => {
		// 👇️ only show element on click
		hideAll();
		setIsConsultOrderShown(true);
	};


	return (
		<div className="App">
			<header className="App-header">
				<ThemeProvider theme={theme}>
					{haveMetamask ? (
						<div className="App-header">
							{isConnected ? (
								<div className="card">
									<div className="card-row">
										<h3>Wallet Address:</h3>
										<p>
											{accountAddress.slice(0, 4)}...
											{accountAddress.slice(38, 42)}
										</p>
									</div>
									<div className="card-row">
										<h3>Wallet Balance:</h3>
										<p>{accountBalance}</p>
									</div>
								</div>
							) : (
								<img src={logo} className="App-logo" alt="logo" />
							)}

							{isConnected ? (
								<div>
									<p className="info">🎉 Connected Successfully</p>
									<ButtonGroup color="secondary" aria-label="medium secondary button group">
										<Button variant="outlined" onClick={showTransfer} disableElevation>Create order</Button>
										<Button variant="outlined" onClick={showWOrder} disableElevation>Withdraw order</Button>
										<Button variant="outlined" onClick={showConfirmOrder} disableElevation>Confirm order</Button>
										<Button variant="outlined" onClick={showCancelConfirm} disableElevation>Cancel confirmation</Button>
										<Button variant="outlined" onClick={showCancelOrder} disableElevation>Cancel order</Button>
										<Button variant="outlined" onClick={showConsultOrder} disableElevation>Consult order</Button>
										<Button variant="outlined" onClick={showWOwner} disableElevation>Withdraw Owner Balance</Button>
									</ButtonGroup>


									<Box sx={{ display: 'flex', flexDirection: 'column', '& > :not(style)': { m: 1 } }}>
										{/* 👇️ show elements on click */}
										{isTransferShown && (
											<div sx={{ display: 'flex', justifyContent: 'flex-start' }}>
												<h3 style={{ color: 'white' }}>Create order</h3>
												<FormControl variant="standard">
													<TextField
														id="input-with-icon-textfield"
														label="Amount"
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<AttachMoneyIcon />
																</InputAdornment>
															),
														}}
														variant="standard"
													/>
												</FormControl>
												<FormControl variant="standard">
													<TextField
														id="input-with-icon-textfield"
														label="Recipient Address"
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<AlternateEmailIcon />
																</InputAdornment>
															),
														}}
														variant="standard"
													/>
												</FormControl>
												<FormControl variant="standard">

													<DateTimePicker
														renderInput={(props) => <TextField {...props} />}
														label="Deadline"
														value={value}
														onChange={(newValue) => {
															setValue(newValue);
														}}
													/>

												</FormControl>
												<IconButton variant="contained">
													<SendIcon />
												</IconButton>
											</div>
										)}
										{isWOrderShown && (
											<div>
												<h3 style={{ color: 'white' }}>Withdraw order</h3>
												<FormControl variant="standard">
													<TextField
														id="input-with-icon-textfield"
														label="Order ID"
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<NumbersIcon />
																</InputAdornment>
															),
														}}
														variant="standard"
													/>

												</FormControl>
												<IconButton variant="contained">
													<SendIcon />
												</IconButton>
											</div>
										)}
										{isConfirmOrderShown && (
											<div>
												<h3 style={{ color: 'white' }}>Confirm order</h3>
												<FormControl variant="standard">
													<TextField
														id="input-with-icon-textfield"
														label="Order ID"
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<NumbersIcon />
																</InputAdornment>
															),
														}}
														variant="standard"
													/>

												</FormControl>
												<IconButton variant="contained">
													<SendIcon />
												</IconButton>
											</div>
										)}
										{isCancelConfirmShown && (
											<div>
												<h3 style={{ color: 'white' }}>Cancel confirmation</h3>
												<FormControl variant="standard">
													<TextField
														id="input-with-icon-textfield"
														label="Order ID"
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<NumbersIcon />
																</InputAdornment>
															),
														}}
														variant="standard"
													/>

												</FormControl>
												<IconButton variant="contained">
													<CancelScheduleSendIcon />
												</IconButton>
											</div>
										)}
										{isCancelOrderShown && (
											<div>
												<h3 style={{ color: 'white' }}>Cancel order</h3>
												<FormControl variant="standard">
													<TextField
														id="input-with-icon-textfield"
														label="Order ID"
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<NumbersIcon />
																</InputAdornment>
															),
														}}
														variant="standard"
													/>

												</FormControl>
												<IconButton variant="contained">
													<CancelScheduleSendIcon />
												</IconButton >
											</div>
										)}
									</Box>





								</div>
							) : (
								<button className="btn" onClick={connectWallet}>
									Connect
								</button>
							)}
						</div>
					) : (
						<p>Please Install MataMask</p>
					)}
				</ThemeProvider>
			</header>
		</div>

	);
}

export default App;