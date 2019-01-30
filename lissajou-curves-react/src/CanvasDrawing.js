import React, { Component } from 'react';

export default class CanvasDrawing extends Component {

  cirleWidth = 60;
  radius = this.cirleWidth / 2 - 5;

  cols = this.width / this.cirleWidth;
  rows = this.rows / this.cirleWidth;
  curves = undefined;

  constructor(props) {
    super(props);

    this.draw = this.draw.bind(this);
    this.showPoints = this.showPoints.bind(this);
    this.drawHorizontalLines = this.drawHorizontalLines.bind(this);
    this.drawVerticalLines = this.drawVerticalLines.bind(this);
    this.initializeArrays = this.initializeArrays.bind(this);
    this.state = { intersect: {} }
  }

  componentDidMount() {
    this.initializeArrays()
  }

  componentDidUpdate() {
    this.draw()
  }

  render() {
    const { width, height } = this.props;

    this.cols = width / this.cirleWidth;
    this.rows = height / this.cirleWidth;
    this.width = width;
    this.height = height;
    //console.log(this.width)
    return (
      <canvas
        ref="canvas"
        width={width}
        height={height}
      />
    );
  }

  initializeArrays() {
    this.curves = []
    for (let i = 0; i < this.cols - 1; i++) {
      this.curves.push([]);
      for (let j = 0; j < this.rows - 1; j++) {
        this.curves[i].push([]);
      }
    }
  }
  draw() {
    const { angle, width, height } = this.props;
    const ctx = this.refs.canvas.getContext("2d");

    ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);

    for (let i = 0; i < this.cols - 1; i++) {
      let cx = this.cirleWidth + i * this.cirleWidth + this.cirleWidth / 2;
      let cy = this.cirleWidth / 2;

      //circles
      ctx.beginPath();
      ctx.arc(cx, cy, this.radius, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cy, cx, this.radius, 0, 2 * Math.PI);
      ctx.stroke();

      let x = this.radius * Math.cos(angle * (i + 1) - Math.PI/2);
      let y = this.radius * Math.sin(angle * (i + 1)- Math.PI/2);

      let ccx = cx + x;
      let ccy = cy + y;

      let rcx = cy + x;
      let rcy = cx + y;
      this.showPoints(ctx, ccx, ccy);
      this.drawHorizontalLines(ctx, ccx, ccy, height);

      this.showPoints(ctx, rcx, rcy);
      this.drawVerticalLines(ctx, rcx, rcy, width);

      //this

      for (let j = 0; j < this.cols - 1; j++) {
        let y1 = this.radius * Math.sin(angle * (j + 1)- Math.PI/2);
        let rcy1 = cy + y1 + (j + 1) * this.cirleWidth;
        ctx.beginPath();
        ctx.arc(ccx, rcy1, 2, 0, 2 * Math.PI);
        this.curves[i][j].push({ x: ccx, y: rcy1 });
        ctx.stroke();
      }
    }
    if (angle <= 2 * Math.PI) {
      //debugger;
      for (let i = 0; i < this.cols - 1; i++) {
        for (let j = 0; j < this.rows - 1; j++) {
          ctx.beginPath()
          ctx.moveTo(this.curves[i][j][0].x, this.curves[i][j][0].y);
          for (let k = 1; k < this.curves[0][1].length; k++) {
            ctx.lineTo(this.curves[i][j][k].x, this.curves[i][j][k].y);
          }
          ctx.stroke()
        }
      }
    } else {
      this.initializeArrays()
    }


  }

  drawVerticalLines(ctx, x, y, width) {
    ctx.beginPath();
    ctx.globalAlpha = 0.5
    ctx.moveTo(x, y);
    ctx.lineTo(width, y);
    ctx.stroke();
    ctx.globalAlpha = 1
  }

  drawHorizontalLines(ctx, x, y, height) {
    ctx.beginPath();
    ctx.globalAlpha = 0.5
    ctx.moveTo(x, y);
    ctx.lineTo(x, height);
    ctx.stroke();
    ctx.globalAlpha = 1
  }

  showPoints(ctx, cx, cy) {
    ctx.beginPath();
    ctx.arc(cx, cy, 2, 0, 2 * Math.PI);
    ctx.stroke();
  }
}