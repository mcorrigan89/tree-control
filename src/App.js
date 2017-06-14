import React, { Component } from 'react';
import './App.css';
import FileNode from './components/FileNode';

import { appState$ } from './state/appState';

let data = require('./data.json');

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.sub = appState$.subscribe(state => {
      this.setState(Object.assign({}, this.state, state));
    });
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  showData() {
    return (this.state.data) ? this.state.data.children.map((file, index) => {
      return <FileNode key={index} index={index} depth={0} data={file} />;
    }) : null;
  }
  render() {
    return (
      <div className="container">
        <div className="file-explorer">
          <div className="title-container">
            <div className="title">{this.props.title}</div>
          </div> 
          <div className="label-container"> 
            <div className="label">{this.props.label}</div>
          </div> 
          <div className="data-wrapper">
            {this.showData()}
          </div>
          <div className="footer-container">
            <a href="/" className="footer-link">{this.props.link}</a>
            <button className="footer-button">Done</button>
          </div> 
        </div>
      </div>
    );
  }
}

export default App;
