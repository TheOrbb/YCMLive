// user links regexp
var re = new RegExp('(/user/[A-Za-z0-9_]+)', 'g');

//comments template
var feedTmpl = [
	'<div class="comment">',
		'<a class="comment__thumb _left" style="background-image:url({userAvatar});" href="http://youcomedy.me/user/{username}" target="_blank"></a>',
		'<a class="comment__thumb _right" style="background-image:url({item_small_image});" href="http://youcomedy.me/{content_id}" target="_blank"></a>',
		'<div class="comment__text">',
			'<a class="comment__title" href="http://youcomedy.me/user/{username}" target="_blank">{fullname}</a>: {text}',
		'</div>',
	'</div>'
].join('');

//local storage util
grot = new function(){
	var PREFIX = 'ycmExt__';

	this.get = function(key){
		return JSON.parse(localStorage.getItem(PREFIX + key));
	};
		
	this.set = function(key, val){
		localStorage.setItem(PREFIX + key, typeof val !== 'string' ? JSON.stringify(val) : val);
	};
	
	this.clear = function(){
		var ls = localStorage;
		for (var key in ls){
			key.match(PREFIX) && ls.removeItem(key);
		}
	};
};

//micro templating
function t(s, d){
	for (var p in d){
		s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
	}
	return s;
}

function onError()
{
	document.getElementById('loader').src="images/error-icon.png";
	setTimeout(function() { document.getElementById('loader').style.display="none"; }, 1000);
}

function updateData(init, from, updVw, err){
	var xhr = new XMLHttpRequest;
	xhr.open('GET', 'http://youcomedy.me/commentfeed', true);
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4){
			if(xhr.status==200){
					grot.set(from, xhr.responseText);
					if(updVw) { init && updVw(grot.get(from)['data']); }
					//chrome.browserAction.setBadgeText({text: ""});
					try 
					{
						document.getElementById('loader').style.display="none";
					}catch(e)
					{
						//nothing
					}
			}else {
					if(err) { err() };
			}
		}
	};
	xhr.send();
}

function updateView(data){
	var text = '';
	var i, len;
	
	if (data){
		chrome.browserAction.setBadgeText({text: ""});
		for (i = 0, len = data.length; i < len; i++){
			text += t(feedTmpl, {
				username: data[i]['username'],
				fullname: data[i]['fullname'],
				content_id: data[i]['content_id'],
				text: data[i]['text'].replace(re, 'http://youcomedy.me$1'),
				userAvatar: data[i]['userAvatar'] || 'http://static.youcomedy.me/img/profile/avatar_small.png',
				item_small_image: data[i]['item_small_image'] || 'http://youcomedy.me/common/img/items/aa.jpg'
			});
		}
		
		document.getElementById('comments').innerHTML = text;
	}
}

function updateFeed(init){
	var data = grot.get('feed') || {};
	data = data['data'];
	data && updateView(data);
	updateData(init, 'feed', updateView, onError );
}

