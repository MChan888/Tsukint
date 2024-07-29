function getPlayerIdFromUrl() {
	let searchParams = new URLSearchParams(window.location.search);
	return searchParams.get("id");
}

function mapFloat(float) {
	switch (float) {
		case 1:
			return "Deplorable";
		case 2:
			return "Bastante Desgastado";
		case 4:
			return "Casi Nuevo";
		case 5:
			return "Recién Fabricado";
		default:
			return "Algo Desgastado";
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
		{ sName: "Neon Revolution", sType: "rifle", sMPrice: 25.99, sFloat: 3, pId: 2, ...weapons[3] },
		{ sName: "Neo Noir", sType: "sniper", sMPrice: 99.99, sFloat: 2, pId: 2, ...weapons[1] },
	];
	const skins3 = [];

	const players = {
		1: { pName: "ElChancho", pAge: 25, pOrigin: "Taiwan", pType: "ct", skins: skins1 },
		2: { pName: "ElGusanito", pAge: 25, pOrigin: "Argentina", pType: "tt", skins: skins2 },
		3: { pName: "ElQuique", pAge: 24, pOrigin: "Perú", pType: "tt", skins: skins3 },
	};

	return players[playerId];
}

const fetchPlayerSkinsInfo = async () => {
	const id = getPlayerIdFromUrl();
	try {
		const response = await fetch("http://localhost:5000/api/skins/" + id);
		if (!response.ok) {
			throw new Error("Error in response");
		}
		const data = await response.json();
		return data;
	} catch (e) {
		console.error("Problema:", e);
		throw error;
	}
};

const createSkinForPlayer = async () => {
	const id = getPlayerIdFromUrl();
	const response = await fetch("http://localhost:5000/api/skins", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			pId: id,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			const element = document.getElementById("skin_generated");
			if (data) {
				element.innerHTML = `
					<h2>Felicidades!</h2>
					<h4>Ganaste un:</h4>
					<p>${data.sName + " " + data.wName}</p>
					<p>en estado ${mapFloat(data.sFloat)}</p>
				`;
				return data;
			} else {
				element.innerHTML = `<p>No hay skins disponibles</p>`;
			}
		})
		.catch((error) => console.error("Error:", error));

	return response;
};

const addNewSkinToTable = async () => {
	createSkinForPlayer().then((res) => {
		console.log(res);
		addRowToTable(res.sName, res.wName, res.sMPrice, mapFloat(res.sFloat), "weapons_table");
	});
};

// Function to display player information
function displayPlayerInfo(playerInfo) {
	const playerInfoDiv = document.getElementById("edit_player");
	const isCt = playerInfo.pType === "ct" ? "selected" : "";
	if (playerInfo) {
		playerInfoDiv.innerHTML = `
			<label for="pName">Nombre del jugador:</label>
			<input type="text" id="pName" value=${playerInfo.pName} />
			<label for="pType">Bando:</label>
			<select name="pType" id="pType">
				<option value="tt">Terrorista</option>
				<option value="ct" ${isCt}>Anti Terrorista</option>
			</select>
			<label for="pOrigin">Nacionalidad:</label>
			<input type="text" id="pOrigin" value=${playerInfo.pOrigin} />
			<label for="pAge">Edad:</label>
			<input type="number" id="pAge" value=${playerInfo.pAge} />
			<br>
			<button onclick="modifyPlayerInfo()" class="generate_skin_button"><h3>Guardar cambios</h3></button>
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
			addRowToTable(element.sName, element.wName, element.sMPrice, mapFloat(element.sFloat), "weapons_table");
		});
	}
}

const modifyPlayerInfo = async () => {
	const id = getPlayerIdFromUrl()
	const pName = document.getElementById("pName");
	const pType = document.getElementById("pType");
	const pOrigin = document.getElementById("pOrigin");
	const pAge = document.getElementById("pAge");

	await fetch('http://localhost:5000/api/player/'+id, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			pName: pName.value,
			pType: pType.value,
			pOrigin: pOrigin.value,
			pAge: pAge.value
		}),
	}).catch(err =>{
		console.error(err);
		throw new Error("Error al editar el jugador");
	})
};

// Main execution
const playerId = getPlayerIdFromUrl();
const playerInfo = fetchPlayerMockInfo(playerId);
fetchPlayerSkinsInfo()
	.then((res) => displayPlayerWeaponSkins(res))
	.catch((e) => {
		console.error(e);
		throw new Error("ERROR EN EL FETCH DE SKINS");
	});
displayPlayerInfo(playerInfo);
