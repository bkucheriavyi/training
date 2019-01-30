import React, { Component } from 'react';
import CanvasDrawing from './CanvasDrawing.js'
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = { angle: 0 };
    this.tick = this.tick.bind(this);
  }

  componentDidMount(){
    requestAnimationFrame(this.tick);
  }

  tick() {
    let { angle } = this.state;
    if(angle <= 2* Math.PI){
      angle = angle + 0.01;
    }else{
      angle = 0.01;
    }
    
    this.setState({ angle });
    requestAnimationFrame(this.tick);
  }

  render(){
    return <CanvasDrawing width={600} height={600} angle={this.state.angle}></CanvasDrawing>
  }
}

export default App;
