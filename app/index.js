import clock from "clock";
import document from "document";
import * as messaging from "messaging";
import { getArcRatios, getTime, cos, sin } from "../common/utils";

const svg = document.getElementById("screen");
const width = Math.min(svg.width, svg.height);
const xOffset = Math.floor((svg.width - width) / 2);
const yOffset = Math.floor((svg.height - width) / 2);
const distanceBetweenArcs = Math.floor(width / 8);
const xCenter = Math.floor(svg.width / 2);
const yCenter = Math.floor(svg.height / 2);

const settings = {}; // See companion/index.js for default settings

messaging.peerSocket.onmessage = ({data: {key, value}}) => {
  settings[key] = JSON.parse(value);
  const [id, settingKey] = key.split(".");
  const el = document.getElementById(id);
  if (settingKey === "visible") {
    el.style.visibility = settings[key] ? "visible" : "hidden";
  } else {
    el.style.fill = settings[key];
  }
};

getArcs().forEach((arc, i) => {
  arc.arcWidth = Math.floor(distanceBetweenArcs / 2);
  arc.width = arc.height = width - 2 * i * distanceBetweenArcs;
  arc.x = i * distanceBetweenArcs + xOffset;
  arc.y = i * distanceBetweenArcs + yOffset;
});

getHands().forEach((hand, i) => {
  hand.x1 = xCenter;
  hand.y1 = yCenter;
});

getTicks().forEach((tick, i, ticks) => {
  tick.x1 = xCenter + sin(i / ticks.length) * distanceBetweenArcs * 3;
  tick.y1 = yCenter - cos(i / ticks.length) * distanceBetweenArcs * 3;
  tick.x2 = xCenter + sin(i / ticks.length) * distanceBetweenArcs * 4;
  tick.y2 = yCenter - cos(i / ticks.length) * distanceBetweenArcs * 4;
});

clock.granularity = "seconds";
clock.ontick = evt => {
  const arcRatios = getArcRatios(evt.date);

  getArcs().forEach((arc, i) => {
    arc.sweepAngle = arcRatios[i] * 360;
  });

  getHands().forEach((hand, i) => {
    const length = (i + 2) * distanceBetweenArcs;
    hand.x2 = xCenter + sin(arcRatios[i]) * length;
    hand.y2 = yCenter - cos(arcRatios[i]) * length;
  });

  getText().text = getTime(evt.date);
};

function getArcs() {
  return document.getElementsByClassName("arc");
}

function getTicks() {
  return document.getElementsByClassName("tick");
}

function getHands() {
  return document.getElementsByClassName("hand");
}

function getText() {
  return document.getElementById("text");
}
