//add new key=>value to the HTML5 storage
function SaveItem() {
			
	var name = document.forms.UniversitySchedule.name.value;
	var data = document.forms.UniversitySchedule.data.value;
	localStorage.setItem(name, data);
	doShowAll();
	
}
//------------------------------------------------------------------------------
//change an existing key=>value in the HTML5 storage
function ModifyItem() {
	var name1 = document.forms.UniversitySchedule.name.value;
	var data1 = document.forms.UniversitySchedule.data.value;
	//check if name1 is already exists
	
//check if key exists
			if (localStorage.getItem(name1) !=null)
			{
			  //update
			  localStorage.setItem(name1,data1);
			  document.forms.UniversitySchedule.data.value = localStorage.getItem(name1);
			}
		
	
	doShowAll();
}
//-------------------------------------------------------------------------
//delete an existing key=>value from the HTML5 storage
function RemoveItem() {
	var name = document.forms.UniversitySchedule.name.value;
	document.forms.UniversitySchedule.data.value = localStorage.removeItem(name);
	doShowAll();
}
//-------------------------------------------------------------------------------------
//restart the local storage
function ClearAll() {
	localStorage.clear();
	doShowAll();
}
//--------------------------------------------------------------------------------------
// dynamically populate the table with shopping list items
//below step can be done via PHP and AJAX too. 
function doShowAll() {
	if (CheckBrowser()) {
		displayCalendar();

		displayLegend();


		var key = "";
		var list = "<tr><th>Item</th><th>Value</th></tr>\n";
		var i = 0;
		//for more advance feature, you can set cap on max items in the cart
		for (i = 0; i <= localStorage.length-1; i++) {
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
	var key = "";
	var list = "";
	var i = 0;
	//for more advance feature, you can set cap on max items in the cart
	for (i = 0; i <= localStorage.length-1; i++) {
		key = localStorage.key(i);
		list += "<li>" + key + " - "
				+ localStorage.getItem(key) + "</li>";
	}

	document.getElementById('sub-ul').innerHTML = list;
}

function displayCalendar() {
	var countOfDays = 35;
	var today = new Date();
	var todayDayOfWeek = today.getDay();

	var begginingDay = today.getDate() - todayDayOfWeek + 1;
	var begginingOfCalendar = new Date(today.getFullYear(), today.getMonth(), begginingDay);

	var days = ['Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота', 'Неделя'];

	var weeks = "<tr>";

	for (let i = 0; i < days.length; i++) {
		var tdw = "";
		if (i === todayDayOfWeek - 1) {
			tdw = `<td class="currDay">${days[i]}</td>`;
		} else {
			tdw = `<td>${days[i]}</td>`;
		}
		
		weeks += tdw;
	}

	weeks += "</tr><tr>";

	for (let i = 1; i <= countOfDays; i++) {
		var currDay = new Date();
		currDay.setDate(begginingOfCalendar.getDate() + i - 1);
		let td = `<td><a onclick="loadInfo('${currDay}')">${currDay.getDate()}</a></td>`;
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
function displaySub() {
	if (document.getElementById('add-sub').style.display === "none") {
		if (document.getElementById('add-ass').style.display === "block") {
			document.getElementById('add-ass').style.display = "none";
		}
		document.getElementById('add-sub').style.display = "block";
	} else {
		document.getElementById('add-sub').style.display = "none";
	}
}
function displayAss() {
	if (document.getElementById('add-ass').style.display === "none") {
		if (document.getElementById('add-sub').style.display === "block") {
			document.getElementById('add-sub').style.display = "none";
		}
		document.getElementById('add-ass').style.display = "block";
	} else {
		document.getElementById('add-ass').style.display = "none";
	}
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