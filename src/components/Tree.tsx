import { Box } from '@chakra-ui/react';
import React from 'react';
import D3Tree from 'react-d3-tree';
import { useRecoilValue } from 'recoil';
import treeData from './../recoil/selectors/TreeData';

const Tree = () => {
	const data = useRecoilValue(treeData);
	return (
		<Box height='100%' width='100%' backgroundColor='gray.200'>
			<D3Tree orientation='vertical' data={data} translate={{ x: 400, y: 20 }} />
		</Box>
	);
};

export default Tree;
