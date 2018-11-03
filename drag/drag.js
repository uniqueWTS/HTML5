
	// drag allowDrop drop
	function drag(ev) {
		ev.dataTransfer.setData("logo", ev.target.id);
	}

	function allowDrop(ev) {
		ev.preventDefault();
	}

	function drop(ev){
		ev.preventDefault();
		var id = ev.dataTransfer.getData("logo");
		ev.target.appendChild(document.getElementById(id));
	}
