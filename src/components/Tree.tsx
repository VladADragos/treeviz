import React, { useEffect } from 'react';
import D3Tree from 'react-d3-tree'
import { useRecoilState, useRecoilValue } from 'recoil';
import treeData from './../recoil/selectors/TreeData'
const Tree = () => {
    const data = useRecoilValue(treeData);
    return <D3Tree data={data} translate={{ x: 250, y: 330 }} />;
};

export default Tree;
