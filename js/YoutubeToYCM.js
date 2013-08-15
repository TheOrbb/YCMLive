// js-скрипт добавляющий кнопку на ютуб
var scrip="var pat = new RegExp('^http://()'); location.href=location.href.replace(pat, 'http://add2ycm.$1');" //код при нажатии на кнопку

var newButt='<span><button id="watch-like" type="button" onclick="'+scrip+'" class=" yt-uix-button yt-uix-button-text yt-uix-button-size-default yt-uix-tooltip" title="Добавить видео в YCM" data-unlike-tooltip="Добавить видео в YCM" data-position="bottomright" data-like-tooltip="Добавить видео в YCM" data-button-toggle="true" data-orientation="vertical" data-force-position="true" role="button">    <span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-watch-like" src="http://cs418320.vk.me/v418320858/820c/mqwuqFjeHm8.jpg" alt="Добавить видео в YCM" title=""><span class="yt-uix-button-valign"></span></span><span class="yt-uix-button-content">Добавить видео в YCM</span></button></span>'; //код добавляемой кнопки

document.getElementById("watch-like-dislike-buttons").innerHTML=document.getElementById("watch-like-dislike-buttons").innerHTML+newButt; //добавляем
