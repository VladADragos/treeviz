import React, { useContext } from 'react';
import D3Tree from 'react-d3-tree'
import { RawNodeDatum } from 'react-d3-tree/lib/types/common';
import EditorContext from '../context/EditorContext';


const Tree = () => {
    const { text, errors } = useContext(EditorContext);
    console.log(errors);
    let data = { name: "error" };
    try {
        data = JSON.parse(text);
    } catch (error) {
    }
    return (

        <D3Tree data={data} translate={{ x: 250, y: 330 }} />
    );
};

export default Tree;
