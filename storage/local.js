(function () {
	window.onload = function(){
		/* Begin variables */
		var oBtnNew    = document.getElementById('btn-new'),
		oBtnSearchName = document.getElementById('btn-searchName'),
		oBtnUpdate     = document.getElementById('btnUpdate'),
		oBtnRemove     = document.getElementById('btnRemove'),
		oBtnClear = document.getElementById('btnClear'),
		table          = document.getElementById('loadRecord'),
		tbody          = table.getElementsByTagName('tbody')[0],
		db             = 'birthNote'; //区别于其它localStorage的数据
		/* End variables */	

		// 初始化: 检查是否支持web存储, 初始化数据库, 打印生日列表
			init();

		// 新增
		oBtnNew.onclick = function (ev) {
			ev.preventDefault();
				save(get());
				displayAll();
		}

		// 查询
		oBtnSearchName.onclick = function(ev){
			ev.preventDefault();
			displaySearchName();
		};

		// 更改
		oBtnUpdate.onclick = function (ev) {
			ev.preventDefault();
			update();
			// displayAll();
		}

		// 删除
		oBtnRemove.onclick = function (ev) {
			ev.preventDefault();
			remove();
			displayAll();
		}

		oBtnClear.onclick = function(ev){
			if (confirm("您确定要清空数据库吗？")) {
				localStorage.clear();
				displayAll();
			}
		}

		/* Begin Functions */

		// 获取表单输入
		function get() {
			var name = document.getElementById('fullname'),
			birthday = document.getElementById('birthday'),
			data = {
					name: name.value,
					birthday: birthday.value,
					db: db
				};
			return data;
		}

		// 检测是否支持Storage
		function isSupportStorage() {
			return typeof Storage != 'undefined'? true : false;
		}

		// 初始化localStorage
		function init() {
			if (isSupportStorage) {
				displayAll();
			}
			else {
				alert("您的浏览器不支持 Web 存储!");
			}
		}

		function save(data) {
			if (localStorage[data.name]) { 
				alert("名字已经存在!");
			} else { // 名字不存在, 则转化为字符串对象保存
				localStorage.setItem(data.name.toString(), JSON.stringify(data));
			}
		}

		// 打印全部生日信息
		function displayAll() {
			tbody.innerHTML = "";
			for(var property in localStorage) {
				if (typeof localStorage[property] != 'string') { continue; }
				var person = JSON.parse(localStorage[property]);
				if (person.db = db) {
					writeRow(tbody, person);
				}
			}
		}

		function writeRow(ele, obj) {
			var html = "<tr>";
			for(var p in obj){
				html += "<td>"+ obj[p] +"</td>";
			}
			html += "</tr>";
			ele.innerHTML += html;
		}

		function displaySearchName(key) {
			key = typeof key == 'undefined' ? document.getElementById('searchName').value : key;
			tbody.innerHTML = '';
			if (localStorage[key] && typeof localStorage[key] == 'string') {
				var person = JSON.parse(localStorage[key]);
				if (person.db == db && person.name == key) {
					writeRow(tbody, person);
				}
			}
		}

		function update() {
			var oldName = document.getElementById('nameBeforeUpdate').value,
			newName = document.getElementById('nameAfterUpdate').value,
			newBirth = document.getElementById('birthAfterUpdate').value,
			dat = localStorage[oldName];
			if (dat && typeof dat == 'string') {
					var data = JSON.parse(dat);
					data.name = newName;
					data.birthday = newBirth;
					localStorage.setItem(newName,JSON.stringify(data));
					localStorage.removeItem(oldName);
					displaySearchName(newName);
			} else {
				alert("您输入的姓名不存在!");
			}
		}

		function remove() {
			var name = document.getElementById('removeName').value;
			if (localStorage[name]) {
					localStorage.removeItem(name);
			} else {
				alert("您输入的姓名不存在!");
			}
		}
	/* End Functions */
};
})();