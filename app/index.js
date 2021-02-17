import clock from "clock";
import document from "document";
import * as messaging from "messaging";
import {getArcRatios, getTime, cos, sin} from "../common/utils";

const svg = document.getElementById("screen");
const width = Math.min(svg.width, svg.height);
const xOffset = Math.floor((svg.width - width) / 2);
const yOffset = Math.floor((svg.height - width) / 2);
const distanceBetweenArcs = Math.floor(width / 8);
const xCenter = Math.floor(svg.width / 2);
const yCenter = Math.floor(svg.height / 2);

const settings = {}; // See companion/index.js for default settings

messaging.peerSocket.addEventListener("message", ({data: {key, value}}) => {
  settings[key] = JSON.parse(value);
});

getArcs().forEach((arc, i) => {
  arc.arcWidth = Math.floor(distanceBetweenArcs / 2);
  arc.width = arc.height = width - 2 * i * distanceBetweenArcs;
  arc.x = i * distanceBetweenArcs + xOffset;
  arc.y = i * distanceBetweenArcs + yOffset;
});

getHands().forEach(hand => {
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
clock.ontick = ({date}) => {
  updateArcs(date);
  updateTicks();
  updateHands(date);
  updateText(date);
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

function setStyle(element) {
  if (settings.hasOwnProperty(`${element.id}.visible`)) {
    element.style.visibility = settings[`${element.id}.visible`] ? "visible" : "hidden";
  }
  if (settings.hasOwnProperty(`${element.id}.color`)) {
    element.style.fill = settings[`${element.id}.color`];
  }
}

function updateArcs(date) {
  const arcRatios = getArcRatios(date);
  getArcs().forEach((arc, i) => {
    arc.sweepAngle = arcRatios[i] * 360;
    setStyle(arc);
  });
}

function updateTicks() {
  setStyle(document.getElementById("ticks"));
}

function updateHands(date) {
  const arcRatios = getArcRatios(date, false); // Hands always follow 12-hour clock
  getHands().forEach((hand, i) => {
    const length = (i + 2) * distanceBetweenArcs;
    hand.x2 = xCenter + sin(arcRatios[i]) * length;
    hand.y2 = yCenter - cos(arcRatios[i]) * length;
    setStyle(hand);
  });
}

function updateText(date) {
  const text = getText();
  text.text = getTime(date);
  setStyle(text);
}