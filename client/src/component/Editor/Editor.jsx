import React,{useState} from 'react'
import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css';

function Editor({editorValue, updateValue}) {
    const [value, setValue] = useState('');

    return <ReactQuill   theme="snow" value={editorValue} onChange={updateValue} />;
}

export default Editor
