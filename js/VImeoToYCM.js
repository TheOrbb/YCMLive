localStorage.setItem("lastHtml", document.getElementById('tools').innerHTML);

var onceReg = new RegExp('YouComedy');
if(!onceReg.test(localStorage.getItem("lastHtmlVk")))
{
	var VimParse= new RegExp("vimeo.com/()");
	var newUrl=location.href.replace(VimParse, "add2ycm.vimeo.com/$1");
	var newButt='<a onclick="location.href=\''+newUrl+'\'" id="addycm" class="download btn iconify_down_b" title="Add2YCM">Добавить на YouComedy.Me</a> ';
	newButt=newButt+"<style> #addycm:before { content: '☺' } </style>"
	document.getElementById('tools').innerHTML=localStorage.getItem("lastHtml")+newButt;
}

