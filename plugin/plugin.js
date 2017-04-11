// mastodon toot boxing

const	Promise = require("bluebird"),
	https = require("https");

// we find the URL of the atom XML page by issuing a HEAD request to the
// HTML toot URL and looking at the link header whose type is application/atom+xml
function urler(line, host, author, num){
	return new Promise(function(resolve, reject){
		var options = {
			method: "HEAD",
			hostname: host,
			port: 443,
			path: `/@${author}/${num}`,
		};
		https.request(options, function(res){
			var linkHeader = res.headers.link;
			if (!linkHeader) {
				console.log("Mastodon boxin: link header not found");
				console.log('line:', line);
				console.log('host:', host);
				console.log('author:', author);
				console.log('num:', num);
				console.log("headers:", res.headers);
				return reject(new Error("link header not found"));
			}
			var m = linkHeader.match(/<([^ >]+)>;.*;\s*type="?application\/atom\+xml"?/);
			if (!m) return reject(new Error("No match in link header"));
			resolve(m[1]);
		}).end();
	});
}

// from the jquery-like context of the input page
// build and return the html to send to the clients
function box($, line){
	var	entry = $("entry"),
		$box = $("<div class=mastodon>"),
		$toot = $("<div class=mastodon-toot>").appendTo($box),
		$left = $("<div class=mastodon-left>").appendTo($toot),
		$right = $("<div class=mastodon-right>").appendTo($toot),
		$head = $("<div class=mastodon-head>").appendTo($right),
		$content = $("<div class=mastodon-content>").appendTo($right);
	//console.log("entry:", entry.html());
	$("<a class=mastodon-author-name>")
	.text(entry.find("author name").text())
	.attr("title", entry.find("author email").text())
	.attr("href", entry.find("author uri").text())
	.appendTo($head);
	$("<a class=mastodon-time>")
	.text(entry.find("entry published").text().replace(/T/, ' '))
	.attr("href", line)
	.appendTo($head);
	var avatarSrc = entry.find("author link[rel=avatar]");
	if (avatarSrc.length) {
		$("<img class=mastodon-avatar>").attr("src", avatarSrc.attr("href")).appendTo($left);
	}
	// the following line is a trick to have a correct parsing to get rid of the &gt;, &apos;, etc.
	var contentHTML = $("<textarea>").html(entry.find("content").html()).val();
	$content.html(contentHTML);
	return $('<div>').append($box).html();
}

exports.init = function(miaou){
	miaou.lib("page-boxers").register({
		name: "Mastodon",
		pattern: /^\s*https:\/\/([^\/]+)\/(?:@|users\/)(\w+)(?:\/updates)?\/(\d+)\s*$/,
		urler,
		box,
	});
}

