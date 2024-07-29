function generatePlayerUrl(id) {
	return "/player/?id=" + id;
}

function addRowToTable(name, type, origin, age, url) {
	var table = document.getElementById("player_table");

	var newRow = table.insertRow();

	var nameCell = newRow.insertCell(0);
	var typeCell = newRow.insertCell(1);
	var originCell = newRow.insertCell(2);
	var ageCell = newRow.insertCell(3);

	var link = document.createElement("a");
	var subline = document.createElement("u");
	link.href = url;
	link.textContent = name;

	nameCell.appendChild(link);
	nameCell.appendChild(subline);

	typeCell.textContent = type;
	originCell.textContent = origin;
	ageCell.textContent = age;
}
