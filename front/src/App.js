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


function App() {
	const [haveMetamask, sethaveMetamask] = useState(true);

	const [accountAddress, setAccountAddress] = useState('');
	const [accountBalance, setAccountBalance] = useState('');

	const [isConnected, setIsConnected] = useState(false);

	const { ethereum } = window;

	const provider = new ethers.providers.Web3Provider(window.ethereum);

	const [isFormShown, setIsFormShown] = useState(false);

	const theme = createTheme({
		palette: {
			primary: {
				light: '#8561c5',
				main: '#673ab7',
				dark: '#482880',
				contrastText: '#fff',
			},
			secondary: {
				light: '#ffee33',
				main: '#ffea00',
				dark: '#b2a300',
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

	const showTransferForm = event => {
		// 👇️ only show element on click
		setIsFormShown(true);
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
									<Button variant="contained" onClick={showTransferForm}>Create order</Button>

									{/* 👇️ show elements on click */}
									{isFormShown && (
										<Box sx={{ display: 'flex', flexDirection: 'column', '& > :not(style)': { m: 1 } }}>
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
													<TextField
														id="input-with-icon-textfield"
														label="Deadline"
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<HourglassTopIcon />
																</InputAdornment>
															),
														}}
														variant="standard"
													/>

												</FormControl>
												<Button variant="contained" endIcon={<SendIcon />}>
													Pay Order
												</Button>
											</div>
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
												<Button variant="contained" endIcon={<SendIcon />}>
													Withraw
												</Button>
											</div>
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
												<Button variant="contained" endIcon={<SendIcon />}>
													Confirm
												</Button>
											</div>
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
												<Button variant="contained" endIcon={<CancelScheduleSendIcon />}>
													Cancel confirmation
												</Button>
											</div>
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
												<Button variant="contained" endIcon={<CancelScheduleSendIcon />}>
													Cancel order
												</Button>
											</div>
										</Box>




									)}
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