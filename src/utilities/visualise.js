export function visualise(
  canvasRef,
  boxes_data,
  scores_data,
  classes_data,
  labels,
  valid_detections_data
) {
  const c = canvasRef.current;
  const ctx = c.getContext("2d");
  const font = "16px sans-serif";
  var i;
  for (i = 0; i < valid_detections_data; ++i) {
    let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4);
    x1 *= c.width;
    x2 *= c.width;
    y1 *= c.height;
    y2 *= c.height;
    const width = x2 - x1;
    const height = y2 - y1;
    const className = labels[classes_data[i]];
    const score = scores_data[i].toFixed(2);

    if (className === "nomask") {
      ctx.strokeStyle = "red"; //bounding box colour
      ctx.fillStyle = "red"; //label background colour
    } else {
      ctx.strokeStyle = "green"; //bounding box colour
      ctx.fillStyle = "green"; //label background colour
    }

    // Draw bounding box
    ctx.lineWidth = 4;
    ctx.strokeRect(x1, y1, width, height);
    // Draw label
    const textWidth = ctx.measureText(className + ":" + score).width;
    const textHeight = parseInt(font, 10); // base 10
    ctx.fillRect(x1, y1, textWidth + 4, textHeight + 4);
  }

  // Draw the text last to ensure it's on top.
  for (i = 0; i < valid_detections_data; ++i) {
    let [x1, y1, ,] = boxes_data.slice(i * 4, (i + 1) * 4);
    x1 *= c.width;
    y1 *= c.height;
    const className = labels[classes_data[i]];
    const score = scores_data[i].toFixed(2);

    ctx.fillStyle = "#000000"; //black text
    ctx.fillText(className + ":" + score, x1, y1 + 13);
  }
}
