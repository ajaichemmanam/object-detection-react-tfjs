import React, { useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { visualise } from "../utilities/visualise";
// import Webcam from "react-webcam";

function MaskDetection(props) {
  console.log("MaskDetection props: ", props);
  const webcamRef = props.webcamRef;
  const canvasRef = props.canvasRef;

  const labels = ["incorrectly", "mask", "nomask"];

  const runModel = async () => {
    const net = await tf.loadGraphModel("./mask_model/model.json");
    console.log(net);

    //  Loop and detect face
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const img = tf.browser.fromPixels(video); // take img from the camera
      const processed = tf.image
        .resizeBilinear(img, [320, 320])
        .div(255.0) // normalize
        .expandDims(0);
      const obj = await net.executeAsync(processed);

      const [boxes, scores, classes, valid_detections] = obj;
      const boxes_data = boxes.dataSync();
      const scores_data = scores.dataSync();
      const classes_data = classes.dataSync();
      console.log(classes_data[0]);
      const valid_detections_data = valid_detections.dataSync()[0];

      tf.dispose(obj);

      visualise(
        canvasRef,
        boxes_data,
        scores_data,
        classes_data,
        labels,
        valid_detections_data
      );

      tf.dispose(boxes);
      tf.dispose(scores);
      tf.dispose(classes);
      tf.dispose(valid_detections);
      tf.dispose(img);
      tf.dispose(processed);
      tf.dispose(boxes_data);
      tf.dispose(scores_data);
      tf.dispose(classes_data);
    }
  };

  useEffect(() => {
    runModel();
  }, []);

  return <div>Mask Detection</div>;
}

export default MaskDetection;
