import { extendTheme } from '@chakra-ui/react';

const theme = {
	colors: {
		gray: {
			'50': '#F2F2F2',
			'100': '#DBDBDB',
			'200': '#C4C4C4',
			'300': '#ADADAD',
			'400': '#969696',
			'500': '#808080',
			'600': '#666666',
			'700': '#1c1c1c',
			'800': '#171717',
			'900': '#0a0a0a'
		},

		brand: {
			light: '#3D3D66',
			medium: '#434371',
			dark: '#262640'
		},
		other: {
			charcoal: '#2E4057',
			jet: '#2f2d2e',
			orange: '#f18f01',
			blue: '#048ba8'
		}
	}
};

export default extendTheme(theme);
