// js-скрипт работающий в фоне
function gen() //открывает новую вкладку youcomedy.me/add и вставляет в него выбранный контент
{
	return function(info, tab)
	{
		if(info.mediaType=="image")  //добавляет картинку
		{
			chrome.tabs.create({url: "http://youcomedy.me/add"}, function(tab) {
				var t="document.getElementById('upload-input-link').value='"+info.srcUrl+"'; ";
				t=t+"document.getElementById('upload-submit-btn').click();"
				chrome.tabs.executeScript(tab.id, {code: t, runAt: "document_end"});
			});
		}else //добавляет текстовую шутку
		{
			chrome.tabs.create({url: "http://youcomedy.me/add"}, function(tab) {
				var g="document.getElementsByClassName('upload__tabButton')[1].click();";
				g=g+" document.getElementsByName('Text[content]')[0].value='"+info.selectionText+"'; ";
				chrome.tabs.executeScript(tab.id, {code: g, runAt: "document_end"});
			});
		}
	}
}

var parent = chrome.contextMenus.create({"title": "Добавить шутку в YouComedy.Me", "contexts" : ["image", "selection"], "type" : "normal", "onclick": gen()}); //создание кнопки в контекстном меню бразуера

chrome.tabs.onUpdated.addListener(function(a, b, tab) {  //встраивание кнопок добавления на YouTube и Coub и Vk
	//----YouTube----
	var YouTubeLink = new RegExp("^(http|https)\://www.youtube.com/watch\?"); //регулярка, соответствующаяя ютубу
	if(YouTubeLink.test(tab.url)) //если ютуб
	{
		//alert('YouTube');
		if(b.status=="complete") { //после полной загрузки страницы встроить кнопку (код лежит в js/YoutubeToYCM.js)
			chrome.tabs.executeScript(tab.id, {file: "js/YoutubeToYCM.js", runAt: "document_end"});
			//alert(10);
		}
	}
	var YouTube2YCM = new RegExp("^(http|https)\://add2ycm.www.youtube.com/watch\?"); //регулярка, соответствующая ссылке на добавление видео
	if(YouTube2YCM.test(tab.url)) 
	{
		var tmpReg = new RegExp("()add2ycm.()");
		var ur=tab.url.replace(tmpReg, "$1$2"); //восстанавливаем ссылку на добавление видео в стандартный вид

		if(b.status=="complete") //при загрузке закрыть эту вкладку и открыть новую вкладку youcumedy.me/add и вставить туда ссылку на видео
		{
			chrome.tabs.create({url: "http://youcomedy.me/add"}, function(tab) {
				var t="document.getElementById('upload-input-link').value='"+ur+"'; ";
				t=t+"document.getElementById('upload-submit-btn').click();"
				chrome.tabs.executeScript(tab.id, {code: t, runAt: "document_end"});
			}); 
			chrome.tabs.remove(tab.id, function() {});
		}
	}
	//----/YouTube----
	//----Coub----
	var CoubLink = new RegExp("^(http|https)\://coub.com/view/"); //регулярка, соответствующая коубу
	if(CoubLink.test(tab.url)) //если коуб
	{
		if(b.status=="complete") { //при полной загрузке встроить кнопку (код в js/CoubToYCM.js) и слегка подправить CSS, что бы икнока не вылезала
			chrome.tabs.executeScript(tab.id, {file: "js/CoubToYCM.js", runAt: "document_end"});
			chrome.tabs.insertCSS(tab.id, {code: "#YCMIcon {background-image: url(http://cs418320.vk.me/v418320858/820c/mqwuqFjeHm8.jpg);}  #YCMI { width: 20px; height: 20px;}"});
		}
	}
	var Coub2YCM = new RegExp("^(http|https)\://add2ycm.coub.com/view/"); //регулярка, соответствующая ссылке на добавление коуба
	if(Coub2YCM.test(tab.url))
	{
		var tmpReg = new RegExp("()add2ycm.()"); //восстанавливаем ссылку на добавление коуба в стандартный вид
		var ur=tab.url.replace(tmpReg, "$1$2");

		if(b.status=="complete") //при загрузке закрыть эту вкладку и открыть новую вкладку youcumedy.me/add и вставить туда ссылку на коуб
		{
			chrome.tabs.create({url: "http://youcomedy.me/add"}, function(tab) {
				var t="document.getElementById('upload-input-link').value='"+ur+"'; ";
				t=t+"document.getElementById('upload-submit-btn').click();"
				chrome.tabs.executeScript(tab.id, {code: t, runAt: "document_end"});
			});
			chrome.tabs.remove(tab.id, function() {});
		}
	}
	//----/Coub----
	//----Vk----
	var VkLink = new RegExp("^(http|https)\://vk.com");
	if(VkLink.test(tab.url))
	{
		if(b.status=="complete") {
			//alert('vk');
			chrome.tabs.executeScript(tab.id, {file: "js/VkToYCM.js", runAt: "document_end"});
		}
	}
	var Vk2YCM = new RegExp("^(http|https)\://add2ycm.vvvk.com/video");
	if(Vk2YCM.test(tab.url))
	{
		var tmpReg = new RegExp("()add2ycm.vv()"); //восстанавливаем ссылку на добавление vk в стандартный вид
		var ur=tab.url.replace(tmpReg, "$1$2");

		if(b.status=="complete") //при загрузке закрыть эту вкладку и открыть новую вкладку youcumedy.me/add и вставить туда ссылку на vk
		{
			chrome.tabs.create({url: "http://youcomedy.me/add"}, function(tab) {
				var t="document.getElementById('upload-input-link').value='"+ur+"'; ";
				t=t+"document.getElementById('upload-submit-btn').click();"
				chrome.tabs.executeScript(tab.id, {code: t, runAt: "document_end"});
			});
			chrome.tabs.remove(tab.id, function() {});
		}
	}
	//----/Vk----
});

var timer=chrome.alarms.create("timeUp", {periodInMinutes: 1.5}); //таймер обновления

chrome.alarms.onAlarm.addListener(function(al) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://youcomedy.me/commentfeed", true);
	xhr.onreadystatechange = function() {
		if(xhr.status == 200)
		{
			var tmpData=JSON.parse(xhr.responseText);
			var lastData=JSON.parse(localStorage.getItem('ycmExt__feed'));
			if(tmpData.data[1].id != lastData.data[1].id)
			{
				chrome.browserAction.setBadgeText({text: ""+(tmpData.data[1].id-lastData.data[1].id) });
			}
		}
	}
	xhr.send();
});

