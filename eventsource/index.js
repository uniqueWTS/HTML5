(function () {
	// check if support EventSource
	function isSupportEventSource() {
		var ans = typeof EventSource != 'undefined';
		if (!ans) {
			alert("您的浏览器不支持HTML5 EventSource!");
		}
		return ans;
	}

	function makeSource(fileName) {
		if (isSupportEventSource) {
			var source = new EventSource(fileName);
		}
		return source;
	}

	// Firefox 无法建立到 file:///home/sam/dev/github/HTML5/eventsource/sever.php 服务器的连接
	// origin 'null' has been blocked by CORS policy: 
	// Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
	var source = makeSource('sever.php');
	source.onmessage = function (event) {
		document.getElementById('result').innerHTML += event.data + "<br>";
	}
})();