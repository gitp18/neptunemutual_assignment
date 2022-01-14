import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';




const WalletCardEthers = (props) => {
	const [active, setActive] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [chainId, setChainId] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [provider, setProvider] = useState(null);
	

	const connectWalletHandler = () => {
		//console.log(window.ethereum.isConnected() ,'--------', window.ethereum,'-----',defaultAccount);
		
		if (window.ethereum && defaultAccount == null) {
			// set ethers provider
			setProvider(new ethers.providers.Web3Provider(window.ethereum));

			// connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				setConnButtonText('Disconnect Wallet');
				setDefaultAccount(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			});
			setActive(false);
		} else if (!window.ethereum){
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		} else if (defaultAccount != null){
			//console.log('do disconnect code here!');
			//window.ethereum.close();	//window.ethereum.disable(); //window.ethereum.revoke()
			//if(provider.close) {
				//provider.clearCachedProvider();
				//await web3Modal.clearCachedProvider();
				setProvider(null);
			//}			
			  setDefaultAccount(null);
			  props.handleClose();
		}
	}

	useEffect(() => {
		if(defaultAccount){
			provider.getBalance(defaultAccount)
			.then(balanceResult => {
				setUserBalance(ethers.utils.formatEther(balanceResult));
			});
			provider.getNetwork(defaultAccount)
			.then(chainIdResult => {
				setChainId(chainIdResult.chainId);
			});
		};
	}, [defaultAccount]);
	
	return (
		<div className="popup-box">
			<div className="box">
				<span className="close-icon" onClick={props.handleClose}>x</span>
				{active ? 
				<div>
					<h4>Wallet Details</h4>
					<p className="errMsg">Wallet not connected. Please click the "Connect Now" button below.</p>
					<button className="blue" onClick={connectWalletHandler}>{connButtonText}</button>&nbsp;
					<button className="red" onClick={props.handleClose}>Cancel</button>
				</div>
				:
				<div>
					<h4>Wallet Details</h4>
					<table>
						<tbody>
							<tr><th>Key</th><th>Value</th></tr>
							<tr><td>Account</td><td>{defaultAccount}</td></tr>
							<tr><td>Chain Id</td><td>{chainId}</td></tr>
							<tr><td>Balance</td><td>{userBalance}</td></tr>
						</tbody>
					</table>

					{!errorMessage ?
						<button className="red" onClick={connectWalletHandler}>{connButtonText}</button>
					:
						<p className="errMsg">{errorMessage}</p>
					}
				</div>
				}
			</div>
		</div>

	);
}

export default WalletCardEthers;