const fetchWeaponInfo = async () => {
	try {
		const response = await fetch("http://localhost:5000/api/weapons");
		if (!response.ok) {
			throw new Error("Error in response");
		}
		const data = await response.json();
		return console.log(data);
	} catch (e) {
		console.error("Problema:", e);
		throw error;
	}
};

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
