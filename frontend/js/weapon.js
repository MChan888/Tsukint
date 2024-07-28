function fetchWeaponInfo() {
	const weapons = [
		{ wName: "AWP", wType: "scopedRifle", wPrice: 4750, wOrigin: "UK", pId: 1 },
		{ wName: "M4A4", wType: "rifle", wPrice: 3100, wOrigin: "US", pId: 2 },
		{ wName: "AK47", wType: "rifle", wPrice: 2700, wOrigin: "RUS", pId: 3 },
		{ wName: "Karambit", wType: "melee", wPrice: 9999, wOrigin: "ARG", pId: 4 },
		{ wName: "MP9", wType: "submachinegun", wPrice: 1350, wOrigin: "US", pId: 5 },
	];
	return weapons;
}

function mapWName(wName) {
	switch (wName) {
		case "scopedRifle":
			return "Francotirador";
		case "rifle":
			return "Rifle";
		case "melee":
			return "Cuchillo";
		case "submachinegun":
			return "Subfusil";
		default:
			return "";
	}
}

function addRowToTable(name, type, origin, price, elementId) {
	var table = document.getElementById(elementId);

	var newRow = table.insertRow();

	var nameCell = newRow.insertCell(0);
	var typeCell = newRow.insertCell(1);
	var originCell = newRow.insertCell(2);
	var priceCell = newRow.insertCell(3);

	nameCell.textContent = name;
	typeCell.textContent = mapWName(type);
	originCell.textContent = origin;
	priceCell.textContent = price;
}

function displayWeapons(weapInfo) {
	console.log(weapInfo);
	if (weapInfo) {
		weapInfo.forEach((element) => {
			addRowToTable(element.wName, element.wType, element.wOrigin, element.wPrice, "weapons_table");
		});
	}
}

const weaponInfo = fetchWeaponInfo();
displayWeapons(weaponInfo);
