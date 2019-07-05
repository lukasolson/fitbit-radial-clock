export function getArcRatios(date, is24Hour = true) {
	const secs = date.getSeconds() / 60;
	const mins = (date.getMinutes() + secs) / 60;
	const hours = (date.getHours() + mins);
	return [is24Hour ? hours / 24 : hours % 12 / 12, mins, secs];
}

export function getTime(date, is24Hour = true) {
  const mins = date.getMinutes();
  const hours = getHours(date, is24Hour);
  return `${hours}:${mins < 10 ? '0' + mins : mins}`;
}

function getHours(date, is24Hour = true) {
  const hours = date.getHours();
  if (is24Hour) return hours;
  if (hours % 12 === 0) return 12;
  return hours % 12;
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
