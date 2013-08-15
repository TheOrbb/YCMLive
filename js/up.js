// js-скрипт, содержащий функции обновления "прямого эфира"
function localUpdate() // отображает последние сохраненные комментарии из локальной базы
{
	var rawCom=JSON.parse(localStorage.getItem('locJSON'));
	var newText="";
	for(var i=1; i<rawCom.data.length; i++)
	{
			var linkToAvatar;
			if(rawCom.data[i].userAvatar==null) linkToAvatar="http://static.youcomedy.me/186/img/profile/avatar_small.png";
			else linkToAvatar=rawCom.data[i].userAvatar;
			newText=newText+'<div class="nickName"><a target="_blank" class="avat" href="/user/'+rawCom.data[i].username+'">'+'<img class="avatar" src="'+linkToAvatar+'"><div class="avatarName">'+rawCom.data[i].fullname+"</a><br> пишет:</div> </div><br> ";
			newText=newText+"<div class='text'>"+rawCom.data[i].text+"</div>";
			newText=newText+'<br> <div class="toSH"><a target="_blank" href="http://youcomedy.me/'+rawCom.data[i].content_id+'"><div class="minT">→ к шутке &nbsp;</div> <img class="min" src="'+rawCom.data[i].item_small_image+'"></a></div><hr>';
	}

	newText=newText.replace(new RegExp('(/user/[A-Za-z0-9_]+)', 'g'), "http://youcomedy.me$1"); //замена относительных ссылок на абсолютные
	document.getElementById("comments").innerHTML=newText;
}

function update() //обновляет комментарии
{
	document.getElementById("but").innerHTML='<img src="images/loader.gif">'; //добавляем loader  в кнопку 
	var xhr = new XMLHttpRequest(); // для AJAX'a
	//var pat = new RegExp("/user/[A-Za-z0-9_]+"); //для замены относительных ссылок, абсолютными
	xhr.open("GET", "http://youcomedy.me/commentfeed", true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
		if(xhr.status != 200) //если не удалось загрузить
		{
			var tmp=document.getElementById("but").style.background; //старый фон
			document.getElementById("but").innerHTML="<font style='font-size: 14px'>Ошибка подключения</font>"; //вывод ошибки
			document.getElementById("but").style.background="red"; //делаем фон красным
			setTimeout(function() {
				document.getElementById("but").innerHTML='↺';
				document.getElementById("but").style.background=tmp;
			}, 1000); //через секунду возвращаем изначальное положение 
		}else
		{
			var rawCom=JSON.parse(xhr.responseText); //парсим полученный JSON 
			localStorage.setItem('locJSON', xhr.responseText); //загрузка в локальную базу
			var newText="";
			for(var i=1; i<rawCom.data.length; i++)
			{
				var linkToAvatar;
				if(rawCom.data[i].userAvatar==null) linkToAvatar="http://static.youcomedy.me/186/img/profile/avatar_small.png";
				else linkToAvatar=rawCom.data[i].userAvatar; //если нет аватара заменяем на стандартный
				newText=newText+'<div class="nickName"><a target="_blank" class="avat" href="/user/'+rawCom.data[i].username+'">'+'<img class="avatar" src="'+linkToAvatar+'"><div class="avatarName">'+rawCom.data[i].fullname+"</a><br> пишет:</div> </div><br> ";
				newText=newText+"<div class='text'>"+rawCom.data[i].text+"</div>";
				newText=newText+'<br> <div class="toSH"><a target="_blank" href="http://youcomedy.me/'+rawCom.data[i].content_id+'"><div class="minT">→ к шутке &nbsp;</div> <img class="min" src="'+rawCom.data[i].item_small_image+'"></a></div><hr>'; //составляем код комментариев
			}
			newText=newText.replace(new RegExp('(/user/[A-Za-z0-9_]+)', 'g'), "http://youcomedy.me$1"); //заменяем относительные ссылки абсолютными
			document.getElementById("comments").innerHTML=newText; //вставляем
			document.getElementById("but").innerHTML='↺'; //возвращяем значек обновления на кнопку
		}
	  }
	}
		xhr.send(); //отправляем запрос
}

function upOnLoad() // обновление при запуске 
{
	localUpdate();
	update();
}


document.getElementById("but").addEventListener("click",update); //при нажатии на кнопку
document.onload.addListener(upOnLoad()); //при загрузке
