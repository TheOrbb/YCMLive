//js-скрипт добавляющий кнопку в Coub
localStorage.setItem("lastHtml", document.getElementsByClassName("buttons_new")[0].innerHTML) //записываем в базу изначальный код кнопок

var scrip="var pat = new RegExp('^http://()'); location.href=location.href.replace(pat, 'http://add2ycm.$1');"; //код, исполняющийся при нажатии

var newButt='<div class="coubButton like" data-coub-id="292552" onclick="'+scrip+'"><div class="iconWrap"><div class="icon" data-prompt="Like" id="YCMIcon"><img src="http://cs418320.vk.me/v418320858/820c/mqwuqFjeHm8.jpg" id="YCMI"></div></div><div class="counterContainer"><div class="preloadableCoubLikesDropdown counter blueFrame" data-id="1c1xscy9" data-reload="true" data-type="coub_likes" data-url="/dropdowns_data/coub_likes_list"><div class="dropdownHandler"><span class="checkSmall"></span><div class="value"><span class="number" style="font-size: 20px;">☺</span></div><span class="uncheckSmall"></span></div></div></div></div>'; //код добавляемой кнопки

document.getElementsByClassName("buttons_new")[0].innerHTML=localStorage.getItem("lastHtml")+newButt; //заменяем изначальный код кнопок на новый
