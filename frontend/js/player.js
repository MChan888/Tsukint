function getPlayerIdFromUrl() {
	let searchParams = new URLSearchParams(window.location.search);
	return searchParams.get("id");
}

function mapFloat(float){
	switch(float){
		case 1:
			return "Deplorable"
		case 2:
			return "Bastante Desgastado"
		case 4:
			return "Casi Nuevo"
		case 5:
			return "Recién Fabricado"
		default:
			return "Algo Desgastado"
	}
}

function addRowToTable(name, weaponName, marketPrice, float, elementId) {
	var table = document.getElementById(elementId);

	var newRow = table.insertRow();

	var nameCell = newRow.insertCell(0);
	var wNameCell = newRow.insertCell(1);
	var sMPriceCell = newRow.insertCell(2);
	var floatCell = newRow.insertCell(3);

	nameCell.textContent = name;
	wNameCell.textContent = weaponName;
	sMPriceCell.textContent = marketPrice;
	floatCell.textContent = float;
}

function fetchPlayerMockInfo(playerId) {
	// For demonstration, we'll use a placeholder player data
	// In a real-world scenario, you would fetch this data from a server


	const weapons = [
		{ wName: "AWP", wType: "scopedRifle", wPrice: 4750, wOrigin: "UK", pId: 1 },
		{ wName: "M4A4", wType: "rifle", wPrice: 3100, wOrigin: "US", pId: 2 },
		{ wName: "AK47", wType: "rifle", wPrice: 2700, wOrigin: "RUS", pId: 3 },
		{ wName: "Karambit", wType: "melee", wPrice: 9999, wOrigin: "ARG", pId: 4 },
		{ wName: "MP9", wType: "submachinegun", wPrice: 1350, wOrigin: "US", pId: 5 },
	];
	const skins1 = [
		{ sName: "Asiimov", sType: "sniper", sMPrice: 29.99, sFloat: 1, pId: 1, ...weapons[1] },
		{ sName: "Asiimov", sType: "rifle", sMPrice: 3100, sFloat: 5, pId: 1, ...weapons[3] },
	];
	const skins2 = [
		{ sName: "Neon Revolution", sType: "rifle", sMPrice: 25.99 , sFloat: 3, pId: 2, ...weapons[3] },
		{ sName: "Neo Noir", sType: "sniper", sMPrice: 99.99, sFloat: 2, pId: 2, ...weapons[1] },
	];
	const skins3 = [];

	const players = {
		1: { pName: "ElChancho", pAge: 25, pOrigin: "Taiwan", pType: "Antiterrorista", skins: skins1 },
		2: { pName: "ElGusanito", pAge: 25, pOrigin: "Argentina", pType: "Terrorista", skins: skins2 },
		3: { pName: "ElQuique", pAge: 24, pOrigin: "Perú", pType: "Terrorista", skins: skins3 },
	};

	return players[playerId];
}

const fetchPlayerSkinsInfo = async () => {
	const id = getPlayerIdFromUrl()
	try {
		const response = await fetch("http://localhost:5000/api/skins/"+id);
		if (!response.ok) {
			throw new Error("Error in response");
		}
		const data = await response.json();
		return data;
	} catch (e) {
		console.error("Problema:", e);
		throw error;
	}
}



const createSkinForPlayer = async () => {
	const id = getPlayerIdFromUrl()
	await fetch("http://localhost:5000/api/skins", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			pId: id,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			const element = document.getElementById("skin_generated");
			if(data){
				element.innerHTML = `
					<h2>Felicidades!</h2>
					<h4>Ganaste un:</h4>
					<p>${data.sName+" "+data.wName}</p>
					<p>en estado ${mapFloat(data.sFloat)}</p>
				`
			}
			else {
				element.innerHTML = `<p>No hay skins disponibles</p>`;
			}
		})
		.catch((error) => console.error("Error:", error));
};

// Function to display player information
function displayPlayerInfo(playerInfo) {
	const playerInfoDiv = document.getElementById("player_info");
	if (playerInfo) {
		playerInfoDiv.innerHTML = `
            <p>Nombre: ${playerInfo.pName}</p>
            <p>Bando: ${playerInfo.pType}</p>
            <p>Nacionalidad: ${playerInfo.pOrigin}</p>
            <p>Edad: ${playerInfo.pAge}</p>
        `;
	} else {
		playerInfoDiv.innerHTML = `<p>No se encuentra el jugador</p>`;
	}
}

// Function to display player information
function displayPlayerWeaponSkins(playerInfo) {
	console.log(playerInfo);
	if (playerInfo) {
		playerInfo.forEach((element) => {
			addRowToTable(element.sName, element.wName , element.sMPrice, mapFloat(element.sFloat), "weapons_table");
		});
	}
}

// Main execution
const playerId = getPlayerIdFromUrl();
const playerInfo = fetchPlayerMockInfo(playerId);
const playerSkins = fetchPlayerSkinsInfo();
displayPlayerInfo(playerInfo);
displayPlayerWeaponSkins(playerSkins);
