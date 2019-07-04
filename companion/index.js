import * as messaging from "messaging";
import { settingsStorage } from "settings";

const defaultSettings = {
  "hourArc.color": "#FFEE58",
  "minuteArc.color": "#FFA726",
  "secondArc.color": "#EF5350",
  "hourHand.color": "#FFEE58",
  "minuteHand.color": "#FFA726",
  "secondHand.color": "#EF5350",
  "text.color": "white",
  "hourArc.visible": true,
  "minuteArc.visible": true,
  "secondArc.visible": true,
  "hourHand.visible": false,
  "minuteHand.visible": false,
  "secondHand.visible": false,
  "text.visible": true
};

Object.keys(defaultSettings).forEach(key => {
  if (settingsStorage.getItem(key) !== null) return;
  settingsStorage.setItem(key, JSON.stringify(defaultSettings[key]));
});

messaging.peerSocket.onopen = () => {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    sendData(key, settingsStorage.getItem(key));
  }
};

settingsStorage.onchange = ({key, newValue}) => {
  sendData(key, newValue);
};

function sendData(key, value) {
  if (messaging.peerSocket.readyState !== messaging.peerSocket.OPEN) return;
  messaging.peerSocket.send({key, value});
}