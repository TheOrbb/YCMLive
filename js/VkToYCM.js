//alert(0);
setTimeout(function() {
	if(document.getElementById('mv_content').childNodes[0])
	{
	//alert(1);
		var videoId=document.getElementById('mv_content').childNodes[0].childNodes[1].childNodes[1].id;
		var vkParse = new RegExp('video_background()');
		var newUrl=videoId.replace(vkParse, "http://add2ycm.vvvk.com/video$1");
		//alert(newUrl);

		localStorage.setItem("lastHtmlVk", document.getElementById('mv_controls_line').innerHTML) //записываем в базу изначальный код кнопок

		var onceReg = new RegExp('YouComedy');
		if(!onceReg.test(localStorage.getItem("lastHtmlVk"))) //что бы не дублировалось
		{
			//alert(11);
			//var scrip="location.href='"+newUrl+"';

			var newButt='<span class="toYCM"><span class="divider">|</span><a href="'+newUrl+'" style="color: rgb(160, 160, 160); font-weight: bold;">Добавить в YouComedy.Me</a></span>';

			document.getElementById('mv_controls_line').innerHTML=localStorage.getItem("lastHtmlVk")+newButt;
		}
	}
}, 1000);
