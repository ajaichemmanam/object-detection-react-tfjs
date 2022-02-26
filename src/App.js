import React, { useRef } from "react";
import MaskDetection from "./components/mask";
import "./App.css";
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const videoConstraints = {
    width: 750,
    height: 500,
    facingMode: "user",
  };
  return (
    <div className="App">
      <h1>Real Time Object Detection</h1>
      <div className="App-header">
        <Webcam
          className="webcam"
          ref={webcamRef}
          videoConstraints={videoConstraints}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
          }}
        />

        <canvas
          className="canvas"
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
          }}
        />
      </div>
      <MaskDetection webcamRef={webcamRef} canvasRef={canvasRef} />
    </div>
  );
}

export default App;
