let basicSubColor = "#e66465";

//add new key=>value to the HTML5 storage
function SaveItem() {

	let name = document.forms.UniversitySchedule.name.value;
	let data = document.forms.UniversitySchedule.data.value;
	localStorage.setItem(name, data);
	doShowAll();

}
//------------------------------------------------------------------------------
//change an existing key=>value in the HTML5 storage
function ModifyItem() {
	let name1 = document.forms.UniversitySchedule.name.value;
	let data1 = document.forms.UniversitySchedule.data.value;
	//check if name1 is already exists

	//check if key exists
	if (localStorage.getItem(name1) != null) {
		//update
		localStorage.setItem(name1, data1);
		document.forms.UniversitySchedule.data.value = localStorage.getItem(name1);
	}


	doShowAll();
}
//-------------------------------------------------------------------------
//delete an existing key=>value from the HTML5 storage
function RemoveItem() {
	let name = document.forms.UniversitySchedule.name.value;
	document.forms.UniversitySchedule.data.value = localStorage.removeItem(name);
	doShowAll();
}
//-------------------------------------------------------------------------------------
//restart the local storage
function ClearAll() {
	localStorage.clear();
	doShowAll();
}

function checkIndexes() {
	let str1 = "indexSub";
	let str2 = "indexAss";

	if (!localStorage.getItem(str1)) {
		localStorage.setItem(str1, 0);
	}

	if (!localStorage.getItem(str2)) {
		localStorage.setItem(str2, 0);
	}
}

function addToSubIndex() {
	let str = "indexSub";
	let index = localStorage.getItem(str);
	localStorage.setItem(str, Number(index) + 1);
}

function getCurrentSubIndex() {
	let str = "indexSub";
	let index = localStorage.getItem(str);
	return index;
}

function addToAssIndex() {
	let str = "indexAss";
	let index = localStorage.getItem(str);
	localStorage.setItem(str, Number(index) + 1);
}

function getCurrentAssIndex() {
	let str = "indexAss";
	let index = localStorage.getItem(str);
	return index;
}

function addSub() {
	let key = "sub" + getCurrentSubIndex();
	addToSubIndex();
	let name = document.forms.UniversitySchedule.subName.value;
	let color = document.forms.UniversitySchedule.subColor.value;

	if (name && color) {
		let subObj = {
			name,
			color
		};
		let value = JSON.stringify(subObj);
		localStorage.setItem(key, value);
		doShowAll();
		document.forms.UniversitySchedule.subName.value = "";
		document.forms.UniversitySchedule.subColor.value = "#e66465";
	} else {
		alert("Моля ти се въведи правилни данни, Диче.");
	}
}

function deleteSub(key) {
	document.getElementById('add-sub').style.display = "none";
	localStorage.removeItem(key);
	doShowAll();
}

function getEditSub(key) {
	displaySub(key);
}

function editSub(key) {
	let name = document.forms.UniversitySchedule.subName.value;
	let color = document.forms.UniversitySchedule.subColor.value;

	if (name && color) {
		let subObj = {
			name,
			color
		};
		let value = JSON.stringify(subObj);
		localStorage.setItem(key, value);
		doShowAll();
		document.forms.UniversitySchedule.subName.value = "";
		document.forms.UniversitySchedule.subColor.value = basicSubColor;
		displaySub();
	}
}

function addAss() {
	let key = "ass" + getCurrentAssIndex();
	addToAssIndex();
	let description = document.forms.UniversitySchedule.assDesc.value;
	let subject = document.forms.UniversitySchedule.assSub.value;
	let date = document.forms.UniversitySchedule.assDate.value;

	if (description && subject && date) {
		let assObj = {
			description,
			subject,
			date
		};
		let value = JSON.stringify(assObj);
		localStorage.setItem(key, value);
		doShowAll();
		document.forms.UniversitySchedule.assDesc.value = "";
		document.forms.UniversitySchedule.assSub.value = "";
		document.forms.UniversitySchedule.assDate.value = "";
	} else {
		alert("Моля ти се въведи правилни данни, Диче.");
	}	
}
//--------------------------------------------------------------------------------------
// dynamically populate the table with shopping list items
//below step can be done via PHP and AJAX too. 
function doShowAll() {
	if (CheckBrowser()) {
		checkIndexes();

		displayCalendar();

		displayLegend();


		let key = "";
		let list = "<tr><th>Item</th><th>Value</th></tr>\n";
		let i = 0;
		//for more advance feature, you can set cap on max items in the cart
		for (i = 0; i <= localStorage.length - 1; i++) {
			key = localStorage.key(i);
			list += "<tr><td>" + key + "</td>\n<td>"
				+ localStorage.getItem(key) + "</td></tr>\n";
		}
		//if no item exists in the cart
		if (list == "<tr><th>Item</th><th>Value</th></tr>\n") {
			list += "<tr><td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
		}
		//bind the data to html table
		//you can use jQuery too....
		document.getElementById('list').innerHTML = list;
	} else {
		alert('Cannot save shopping list as your browser does not support HTML 5');
	}
}

function displayLegend() {
	let key = "";
	let list = "";
	let i = 0;
	//for more advance feature, you can set cap on max items in the cart
	for (i = 0; i <= localStorage.length - 1; i++) {
		key = localStorage.key(i);

		if (key.startsWith("sub")) {
			let obj = JSON.parse(localStorage.getItem(key));

			list += `<li style="color: ${obj.color};">${obj.name} <a onclick="getEditSub('${key}')">Р</a> <a onclick="deleteSub('${key}')">X</a></li>`;
		}
	}

	document.getElementById('sub-ul').innerHTML = list;
}

function getAssArr() {
	let key = "";
	let arr = [];
	let i = 0;
	//for more advance feature, you can set cap on max items in the cart
	for (i = 0; i <= localStorage.length - 1; i++) {
		key = localStorage.key(i);

		if (key.startsWith("ass")) {
			let obj = {key, value: JSON.parse(localStorage.getItem(key))};
			arr.push(obj);
		}
	}	

	return arr;
}

function getAssColor(index) {
	let color = "";

	for (i = 0; i <= localStorage.length - 1; i++) {
		key = localStorage.key(i);

		if (key === index) {
			let obj = JSON.parse(localStorage.getItem(key));
			color = obj.color;
			break;
		}
	}

	return color;
}

function displayCalendar() {
	let objArr = getAssArr();

	let countOfDays = 35;
	let today = new Date();
	let todayDayOfWeek = today.getDay();

	let begginingDay = today.getDate() - todayDayOfWeek + 1;
	let begginingOfCalendar = new Date(today.getFullYear(), today.getMonth(), begginingDay);

	let days = ['Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота', 'Неделя'];

	let weeks = "<tr>";

	for (let i = 0; i < days.length; i++) {
		let tdw = "";
		if (i === todayDayOfWeek - 1) {
			tdw = `<td class="currDay">${days[i]}</td>`;
		} else {
			tdw = `<td>${days[i]}</td>`;
		}

		weeks += tdw;
	}

	weeks += "</tr><tr>";

	for (let i = 1; i <= countOfDays; i++) {
		let currDay = new Date();
		currDay.setDate(begginingOfCalendar.getDate() + i - 1);
		let td = `<td><a onclick="loadInfo('${currDay}')">${currDay.getDate()}<ul>`;

		objArr.forEach(obj => {
			let color = getAssColor(obj.value.subject);
			let date = new Date(obj.value.date);
			if (date.setHours(0, 0, 0, 0) == currDay.setHours(0, 0, 0, 0)) {
				td += `<li style="color: ${color}"></li>`;
			}
		});

		td += "</ul></a></td>";
		weeks += td;

		if (i % 7 == 0) {
			weeks += "</tr>";
			weeks += "<tr>";
		}
	}

	document.getElementById('weeks').innerHTML = weeks;
}

//--------------------------------------------------------------------------------------
// dynamically load the info of date
function loadInfo(date) {
	console.log("date");
	console.log(date);
}
//--------------------------------------------------------------------------------------
// display and remove forms
function displaySub(key) {
	var element = document.getElementsByClassName("sub-btn");

	if (element.length !== 0) {
    	element[0].remove();		
	}

	if (key) {
		document.getElementById('add-sub').style.display = "block";
		document.getElementById('add-ass').style.display = "none";

		let obj = JSON.parse(localStorage.getItem(key));

		document.forms.UniversitySchedule.subName.value = obj.name;
		document.forms.UniversitySchedule.subColor.value = obj.color;

		document.getElementById("add-sub").insertAdjacentHTML("beforeend", 
		`<input type="button" class="sub-btn" value="Редактиране" onclick="editSub('${key}')">`);
	} else {
		if (document.getElementById('add-sub').style.display === "none") {
			if (document.getElementById('add-ass').style.display === "block") {
				document.getElementById('add-ass').style.display = "none";
			}
			document.getElementById("add-sub").insertAdjacentHTML("beforeend", 
			'<input type="button" class="sub-btn"  value="Добави" onclick="addSub()">');
			document.forms.UniversitySchedule.subName.value = "";
			document.forms.UniversitySchedule.subColor.value = basicSubColor;
			document.getElementById('add-sub').style.display = "block";
		} else {
			document.getElementById('add-sub').style.display = "none";
		}
	}
}
function displayAss() {
	if (document.getElementById('add-ass').style.display === "none") {
		if (document.getElementById('add-sub').style.display === "block") {
			document.getElementById('add-sub').style.display = "none";
		}

		loadSelect();

		document.getElementById('add-ass').style.display = "block";
	} else {
		document.getElementById('add-ass').style.display = "none";
	}
}

function loadSelect() {
	let key = "";
	let list = "";
	let i = 0;
	//for more advance feature, you can set cap on max items in the cart
	for (i = 0; i <= localStorage.length - 1; i++) {
		key = localStorage.key(i);
		if (key.startsWith("sub")) {
			let subObj = JSON.parse(localStorage.getItem(key));
			list += `<option value="${key}">${subObj.name}</option>`;

		}
	}

	document.getElementById('assSub').innerHTML += list;
}

/*
 =====> Checking the browser support
 //this step may not be required as most of modern browsers do support HTML5
 */
//below function may be redundant
function CheckBrowser() {
	if ('localStorage' in window && window['localStorage'] !== null) {
		// we can use localStorage object to store data
		return true;
	} else {
		return false;
	}
}
//-------------------------------------------------
/*
You can extend this script by inserting data to database or adding payment processing API to shopping cart..
*/