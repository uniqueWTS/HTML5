(function () {
	window.onload = function(){
	/* Begin variables */
		var oBtnSubmit = document.getElementById('btn-submit'),
		form           = document.forms.newRecord,
		name           = document.getElementById('fullname'),
		birthday       = document.getElementById('birthday'),
		table          = document.getElementById('loadRecord'),
		tbody          = table.getElementsByTagName('tbody')[0],
		db             = 'birthNote';
	/* End variables */	

		/*
			检查是否支持web存储, 初始化数据库, 打印生日列表
		 */
		init();

		// 提交表单
		form.onsubmit = function (ev) {
			ev.preventDefault();
			if (isSupportStorage) {
				save(get());
				display();
			} 
		}

	/* Begin Functions */

		// 获取表单输入
		function get() {
			var data = {
				name: name.value,
				birthday: birthday.value
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
				if (!localStorage[db]) {
					localStorage[db] = JSON.stringify({});
				}
				display();
			}
			else {
				alert("您的浏览器不支持 Web 存储!");
			}
		}

		// 保存到localStorage
		function save(data) {
			var database = JSON.parse(localStorage[db]),
			name         = data.name;
			if (database[name]) {
				alert(name + "已经存在!");
			} else { // 不存在则保存
				database[name]   = data;
				localStorage[db] = JSON.stringify(database);
			}
		}

		// 打印全部生日信息
		function display() {
			var database    = JSON.parse(localStorage[db]);
			tbody.innerHTML = "";
			for( var name in database) {
				tbody.innerHTML += "<tr><td>" + name + "</td><td>" + database[name].birthday + "</td></tr>";
			}
		}
	/* End Functions */
	};
})();