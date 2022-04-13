import React, { useEffect, useRef } from "react";
import Quill from "../../../images/quill.png";
import Eraser from "../../../images/eraser.png";
import "./Canvas.css";
const Canvas = ({
  canvaImage,
  setCanvaImage,
  pickColor,
  setPickColor,
  ...props
}) => {
  const canvasRef = useRef(null);
  let myCanvas = null;
  let ctx = null;
  let lines = JSON.parse(sessionStorage.getItem("lines")) ?? [];
  const setMyCanvas = (canvas) => (myCanvas = canvas);
  const setCtx = (Ctx) => (ctx = Ctx);
  const setLines = (arr) => {
    const data = JSON.stringify(arr);
    sessionStorage.setItem("lines", data);
    lines = arr;
  };
  const mouse = {
    isPressed: false,
    up: null,
    down: null,
    current: null,
    setUp: function (e) {
      this.isPressed = false;
      this.up = this.getPosition(e);
    },
    setDown: function (e) {
      this.isPressed = true;
      this.down = this.getPosition(e);
    },
    setCurrent: function (e) {
      this.current = this.getPosition(e);
    },
    getPosition: (e) => {
      let rect = myCanvas.getBoundingClientRect();
      const position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      return position;
    },
  };
  const draw = () => {
    clearCanvas();
    if (canvaImage)
      ctx.drawImage(canvaImage, 0, 0, myCanvas.width, myCanvas.height);
    lines.forEach((line) => {
      drawLine(line);
    });
  };
  const drawImage = (e) => {
    if (e.target.files) {
      clearCanvas();
      sessionStorage.clear();
      let imageFile = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = (e) => {
        let img = new Image();
        img.src = e.target.result;
        img.onload = (ev) => {
          myCanvas.width = img.width;
          myCanvas.height = img.height;
          ctx.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);
        };
        setCanvaImage(img);
      };
    }
  };
  const drawLine = (line) => {
    ctx.beginPath();
    ctx.moveTo(line.start.x, line.start.y);
    ctx.lineTo(line.end.x, line.end.y);
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.strokeStyle = line.color;
    ctx.stroke();
    ctx.closePath();
  };
  const eraser = ({ x, y }) => {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
  };
  const onMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    mouse.setDown(e);
    if (props.isPen) {
      const line = {
        start: mouse.down,
        end: mouse.down,
        color: pickColor,
      };
      setLines([...lines, line]);
      draw();
    } else {
      eraser(mouse.down);
    }
  };
  const onMouseMove = (e) => {
    if (!mouse.isPressed) return;
    mouse.setCurrent(e);
    if (props.isPen) {
      let line = {
        start: mouse.down,
        end: mouse.current,
        color: pickColor,
      };
      let lineArr = lines;
      lineArr.pop();
      lineArr.push(line);
      setLines(lineArr);
      draw();
    } else {
      eraser(mouse.current);
    }
  };
  const onMouseUp = (e) => mouse.setUp(e);

  const clearCanvas = () =>
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  useEffect(() => {
    let myCanvas = canvasRef.current;
    let ctx = myCanvas.getContext("2d");
    ctx.globalCompositeOperation = "source-over";
    ctx.translate(0.5, 0.5);
    myCanvas.width = 600;
    myCanvas.height = 500;
    // myCanvas.style.width = "600px";
    // myCanvas.style.height = "600px";
    setMyCanvas(myCanvas);
    setCtx(ctx);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    draw();
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });
  return (
    <div className="canvas bg-white d-flex flex-column  justify-content-center  p-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="mt-2 ml-md-3 ml-1">
          <label className="custom-file-upload p-2">
            <input onChange={(e) => drawImage(e)} type="file" />
            Choose an image
          </label>
        </div>
        <div className="color-picker d-flex align-items-center">
          <span>Color Picker</span>
          <div className="d-flex flex-column">
            <div className="d-flex my-1">
              <div
                className={`box mx-1 ${pickColor === "red" ? "selected" : ""}`}
                id="red"
                onClick={(e) => setPickColor("red")}
              ></div>
              <div
                className={`box mx-1 ${
                  pickColor === "black" ? "selected" : ""
                }`}
                id="black"
                onClick={(e) => setPickColor("black")}
              ></div>
              <div
                className={`box mx-1 ${pickColor === "blue" ? "selected" : ""}`}
                id="blue"
                onClick={(e) => setPickColor("blue")}
              ></div>
            </div>
            <div className="d-flex my-1">
              <div
                className={`box mx-1 ${
                  pickColor === "green" ? "selected" : ""
                }`}
                id="green"
                onClick={(e) => setPickColor("green")}
              ></div>
              <div
                className={`box mx-1 ${
                  pickColor === "yellow" ? "selected" : ""
                }`}
                id="yellow"
                onClick={(e) => setPickColor("yellow")}
              ></div>
              <div
                className={`box mx-1 ${
                  pickColor === "orange" ? "selected" : ""
                }`}
                id="orange"
                onClick={(e) => setPickColor("orange")}
              ></div>
            </div>
          </div>
        </div>
        <div
          className="tools mr-md-3 mr-1"
          onClick={() => props.setIsPen(!props.isPen)}
        >
          <img
            src={props.isPen ? Eraser : Quill}
            width="25px"
            height="25px"
            alt="tool"
          />
        </div>
      </div>
      <canvas id="canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default Canvas;
