import React from 'react';
import io from 'socket.io-client';
// import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
      socket: io.connect('/')
    }
  }
  componentDidMount()
  {
    this.socket = io.connect('/')
    // console.log(socket);
    this.socket.on('message dispatched', (data) =>
    {
      console.log(data)
    })
    this.socket.on('text dispatch', (text) =>
    {
      console.log(text)
      this.setState({code: text});
    })
    
  }

  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  onChange(newValue, e,) {
    // const {socket} = this.state.socket
    this.socket.emit('update text', newValue);
    // console.log(this.state)
    // console.log('onChange', newValue, e);
    
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <div>
        <MonacoEditor
          width="800"
          height="600"
          language="javascript"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={(newValue, e) => this.onChange(newValue, e)}
          editorDidMount={this.editorDidMount}
        />
        <button onClick={() => this.yeet()}>click</button>
      </div>
    );
  }
}
export default App;
