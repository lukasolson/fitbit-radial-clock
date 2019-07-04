import clock from "clock";
import document from "document";
import * as messaging from "messaging";
import { getArcRatios, getTime } from "../common/utils";

const svg = document.getElementById("screen");
const width = Math.min(svg.width, svg.height);
const xOffset = Math.floor((svg.width - width) / 2);
const yOffset = Math.floor((svg.height - width) / 2);
const distanceBetweenArcs = Math.floor(width / 8);
const xCenter = Math.floor(svg.width / 2);
const yCenter = Math.floor(svg.height / 2);

const settings = {}; // See companion/index.js for default settings
const is24Hour = false;

messaging.peerSocket.onmessage = ({data: {key, value}}) => {
  settings[key] = JSON.parse(value);
  const [id, settingKey] = key.split(".");
  const el = document.getElementById(id);
  if (settingKey === "visible") {
    el.style.visibility = settings[key] ? "visible" : "hidden";
  } else if (id === "text") {
    el.style.fill = settings[key];
  } else {
    el.style.fill = settings[key];
  }
}

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

clock.granularity = "seconds";
clock.ontick = (evt) => {
  const arcRatios = getArcRatios(evt.date, is24Hour);
  
  getArcs().forEach((arc, i) => {
    arc.sweepAngle = arcRatios[i] * 360;
  });
  
  getHands().forEach((hand, i) => {
    const length = (i + 2) * distanceBetweenArcs;
    hand.x2 = xCenter + Math.sin(arcRatios[i] * 2 * Math.PI) * length;
    hand.y2 = yCenter - Math.cos(arcRatios[i] * 2 * Math.PI) * length;
  });
  
  getText().text = getTime(evt.date);
}

function getArcs() {
  return document.getElementsByClassName("arc");
}

function getHands() {
  return document.getElementsByClassName("hand");
}

function getText() {
  return document.getElementsByClassName("text")[0];
}

function isVisible({id}) {
  return settings[`${id}.visible`];
}

function getColor({id}) {
  return settings[`${id}.color`] || "white";
}