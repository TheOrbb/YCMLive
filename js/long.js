function getFontHeight(font) {
        var parent = document.createElement("span");
        parent.appendChild(document.createTextNode("height"));
        document.body.appendChild(parent);
        parent.style.cssText = "font: " + font + "; white-space: nowrap; display: inline;";
        var height = parent.offsetHeight;
        document.body.removeChild(parent);
        return height;
    }

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
 
    for(var i = 0; i < words.length; i++) {
 
        var testLine = line + words[i] + ' ';
        var testWidth = context.measureText(testLine).width;
 
        if(testWidth > maxWidth) {
 
                context.fillText(line, x, y);
                line = words[i] + ' ';
                y += lineHeight;
        }
        else
            line = testLine;
 
    }
 
        context.fillText(line, x, y);
	return y+lineHeight;
}


function drawLost(imgData)
{
	cc.height=0;
	cc.width=0;
	for(var i=0; i<imgData.length; i++)
	{
		if(typeof imgData[i]=='object')
		{
			if(imgData[i].width>cc.width)
			{
				cc.width=imgData[i].width;
			}
		}
	}

	ctx.fillStyle=bgColor;
	ctx.fillRect(0, 0, cc.width, cc.height); //фон
	ctx.fillStyle=textColor;
	ctx.font = textFont;
	var nowH=0;
	for(var i=0; i<imgData.length; i++)
	{
		if((typeof imgData[i])=='object')
		{
			ctx.drawImage( imgData[i], (cc.width-imgData[i].width)/2, nowH);
			nowH+=imgData[i].height;
		}else
		{
			nowH=wrapText(ctx, imgData[i], cc.width/2, nowH+lineHeight, cc.width, lineHeight);
		}
	}

	cc.height=nowH;

	ctx.fillStyle=bgColor;
	ctx.fillRect(0, 0, cc.width, cc.height); //фон
	ctx.fillStyle=textColor;
	ctx.font = textFont;
	ctx.textAlign="center";
	nowH=0;
	for(var i=0; i<imgData.length; i++)
	{
		if((typeof imgData[i])=='object')
		{
			ctx.drawImage( imgData[i], (cc.width-imgData[i].width)/2, nowH);
			nowH+=imgData[i].height;
		}else
		{
			nowH=wrapText(ctx, imgData[i], cc.width/2, nowH+lineHeight, cc.width, lineHeight);
		}
	}
}

function countOfStore()
{
	var result=0;
	var base = document.getElementById('files').childNodes;
	for(var i=0; i<base.length; i++)
	{
		if(base[i].childNodes[1].className=="ur") result++;
	}
	return result;
}

function renderLost()
{
	ctx.textAlign="center";
	wrapText(ctx, "Загрузка...", cc.width/2, 25, cc.width, lineHeight); //сообщение о загрузке данных

	var imgData = new Array();
	var base = document.getElementById('files').childNodes;
	var count=0, collect=countOfStore()+1;
	for(var i=0; i<base.length; i++)
	{
		if(base[i].className=='item_pic')
		{
			var im = new Image();
			if(base[i].childNodes[1].className=="ur") //из базы
			{
				im.src=base[i].childNodes[1].innerHTML;
			}else //добавлено пользователем
			{
				var file=base[i].childNodes[1].files[0];
				var reader = new FileReader();
				reader.onload = function(e) {
					im.src=e.target.result;
				}
				reader.readAsDataURL(file);
			}
			im.onload=function(){
				count++;
				if(count==collect)
				{
					drawLost(imgData);
				}
			}
			imgData.push(im);
		}else if(base[i].className=='item_text')
		{
			imgData.push(base[i].childNodes[5].value);
		}
	}




	//плашка
	var plash = new Image();
	plash.src="images/plash.jpg";
	plash.onload=function(){
		count++;
		if(count==collect)
		{
			drawLost(imgData);
		}
	}
	imgData.push(plash);

}


function loadFromStorage()
{
	for(var i=0; i<data.length; i++)
	{
			var newDiv = document.createElement('div');
			newDiv.className="item_pic";
			newDiv.id='item_'+document.getElementById('files').childNodes.length;
			newDiv.innerHTML = 'Картинка: <strong class="ur">'+data[i]+'</strong>  <button class="upBt"">↑</button><button>↓</button><button>☒</button>';
			document.getElementById('files').appendChild(newDiv);
	}
	setFunc();
}



function swapElem(far, near)
{
	if(near > -1 && far < document.getElementById('files').childNodes.length+1)
	{

		document.getElementById('files').insertBefore(document.getElementById('files').childNodes[far], document.getElementById('files').childNodes[near]); //работает
	}
}

function removeElem(index)
{
	document.getElementById('files').removeChild(document.getElementById('files').childNodes[index]);
}

function setFunc() {
	for(var i=0; i<document.getElementById('files').childNodes.length; i++)
	{
		if(document.getElementById('files').childNodes[i].className=='item_pic')
		{
			document.getElementById('files').childNodes[i].childNodes[3].onclick = function() {
				var index=Array.prototype.slice.call(document.getElementById('files').childNodes).indexOf(this.parentNode);
				swapElem(index, index-1);
				//молчи, мне и так стыдно за этот ужас...
			}
			document.getElementById('files').childNodes[i].childNodes[4].onclick = function() {
				var index=Array.prototype.slice.call(document.getElementById('files').childNodes).indexOf(this.parentNode);
				swapElem(index+1, index);
			}
			document.getElementById('files').childNodes[i].childNodes[5].onclick = function() {
				var index=Array.prototype.slice.call(document.getElementById('files').childNodes).indexOf(this.parentNode);
				removeElem(index);
			}
		}else
		{
			document.getElementById('files').childNodes[i].childNodes[1].onclick = function() {
				var index=Array.prototype.slice.call(document.getElementById('files').childNodes).indexOf(this.parentNode);
				swapElem(index, index-1);

			}
			document.getElementById('files').childNodes[i].childNodes[2].onclick = function() {
				var index=Array.prototype.slice.call(document.getElementById('files').childNodes).indexOf(this.parentNode);
				swapElem(index+1, index);
			}
			document.getElementById('files').childNodes[i].childNodes[3].onclick = function() {
				var index=Array.prototype.slice.call(document.getElementById('files').childNodes).indexOf(this.parentNode);
				removeElem(index);
			}
		}
	}
}

/// --- --- Далее программа --- ---


var data = new Array();

if(localStorage['longStore']==null || localStorage['longStore']=='')
{
	data = [];
}else
{
	data = JSON.parse(localStorage['longStore']);
}

var bgColor="#ffffff";

var textColor="#000000";

var textSS=16;

var textFont="normal "+textSS+"pt Trebuchet MS";

var lineHeight=getFontHeight(textFont);

var cc = document.getElementById('canv');

var ctx=cc.getContext('2d');




document.getElementById('accep').onclick = function() {
	bgColor=document.getElementById('backCol').value;
	textColor=document.getElementById('textCol').value;
	textSS=document.getElementById('textSiz').value;
	textFont="normal "+textSS+"pt Sans-Serif";
	lineHeight=getFontHeight(textFont);
	renderLost();
}

document.getElementById('addPic').onclick = function() {
	var newDiv = document.createElement('div');
	newDiv.className="item_pic";
	newDiv.id='item_'+document.getElementById('files').childNodes.length;
	newDiv.innerHTML = 'Картинка: <input type="file"></input>  <button class="upBt"">↑</button><button>↓</button><button>☒</button>';
	document.getElementById('files').appendChild(newDiv);
	setFunc();
}

document.getElementById('addText').onclick = function() {
	var newDiv = document.createElement('div');
	newDiv.className="item_text";
	newDiv.id='item_'+document.getElementById('files').childNodes.length;
	newDiv.innerHTML = 'Текст  <button class="upBt">↑</button><button>↓</button><button>☒</button><br><textarea></textarea>';
	document.getElementById('files').appendChild(newDiv);
	setFunc();
}

document.getElementById('creatOpen').onclick = function() {
	var temp = document.createElement('a');
	temp.href=cc.toDataURL();
	temp.target="_blank";
	localStorage['longStore']='';
	temp.click();
}

document.getElementById('creatLoad').onclick = function() {
	var temp = document.createElement('a');
	temp.href=cc.toDataURL();
	temp.download = "Длиннопост.png";
	localStorage['longStore']='';
	temp.click();
}

loadFromStorage();

renderLost();

setFunc();
