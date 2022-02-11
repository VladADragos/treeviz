import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import './index.css';
import theme from './theme/theme';
ReactDOM.render(
	<React.StrictMode>
		<RecoilRoot>
			<ChakraProvider theme={theme}>
				{/* todo: make a custom color theme */}
				<App />
			</ChakraProvider>
		</RecoilRoot>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
