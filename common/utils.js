import {preferences} from "user-settings";

function is24Hour() {
  return preferences.clockDisplay === "24h";
}

export function getArcRatios(date, is24h = is24Hour()) {
  const secs = date.getSeconds() / 60;
  const mins = (date.getMinutes() + secs) / 60;
  const hours = (date.getHours() + mins);
  return [is24h ? hours / 24 : hours % 12 / 12, mins, secs];
}

export function getTime(date) {
  const mins = date.getMinutes();
  const hours = getHours(date);
  return `${hours}:${mins < 10 ? "0" + mins : mins}`;
}

function getHours(date) {
  const hours = date.getHours();
  if (is24Hour()) return hours;
  return hours % 12 === 0 ? 12 : hours % 12;
}

function radian(ratio) {
  return 2 * Math.PI * ratio;
}

export function sin(ratio) {
  return Math.sin(radian(ratio));
}

export function cos(ratio) {
  return Math.cos(radian(ratio));
}
