// js-скрипт, содержащий функции обновления "прямого эфира"

(function(){

var bg = chrome.extension.getBackgroundPage();
var setInterval = bg.setInterval;
var console = bg.console;
var updateInterval;

//init
updateFeed(true);
updateInterval = setInterval(updateFeed, 15000);

})();
