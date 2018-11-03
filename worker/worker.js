
window.onload = function () {
	var result = document.getElementById('result'),
	errorMsg = "您的浏览器不支持 Web Ｗorker!",
	oBtnStart = document.getElementById('start'),
	oBtnStop = document.getElementById('stop');


	oBtnStart.onclick = startWorker;

	oBtnStop.onclick = stopWorker;

	function startWorker(){
		if (isSupportWorker) {
			if (typeof w == 'undefined') {
				w = new Worker("demo.js"); // can't access from origin null(Chrome同源策略)
			} 
			w.onmessage = function(event){
				result.innerHTML = event.data;
			}
		} else {
			result.innerHTML = errorMsg;
		}
	}

	function isSupportWorker(){
		return typeof(Worker) != 'undefined';
	}

	function stopWorker() {
		w.terminate();
		w = undefined;
	}
}
