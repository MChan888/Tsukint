// Function to get the player ID from the URL
function getPlayerIdFromUrl() {
    let searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("id")
}

function addRowToTable(name, type, origin, price, elementId) {
    var table = document.getElementById(elementId);

    var newRow = table.insertRow();

    var nameCell = newRow.insertCell(0);
    var typeCell = newRow.insertCell(1);
    var originCell = newRow.insertCell(2);
    var priceCell = newRow.insertCell(3);

    nameCell.textContent = name;
    typeCell.textContent = type;
    originCell.textContent = origin;
    priceCell.textContent = price;
}

// Function to fetch player information
function fetchPlayerInfo(playerId) {
    // For demonstration, we'll use a placeholder player data
    // In a real-world scenario, you would fetch this data from a server

    const weapons2 = [
        {wName: "AWP", wType: "sniper", wPrice: 4750, wOrigin: "UK", pId: 1},
        {wName: "M4A4", wType: "rifle", wPrice: 3100, wOrigin: "RUS", pId: 1},
    ]
    const weapons = [
        {wName: "AWP", wType: "sniper", wPrice: 4750, wOrigin: "UK", pId: 1},
        {wName: "M4A4", wType: "rifle", wPrice: 3100, wOrigin: "RUS", pId: 2},
        {wName: "AK47", wType: "rifle", wPrice: 2700, wOrigin: "US", pId: 3},
    ]

    const players = {
        "1": { pName: "ElChancho", pAge: 25, pOrigin: "Taiwan", pType: "Antiterrorista", weapons: weapons2},
        "2": { pName: "ElGusanito", pAge: 25, pOrigin: "Argentina", pType: "Terrorista",  weapons: [weapons[1]] },
        "3": { pName: "ElQuique", pAge: 24, pOrigin: "Perú", pType: "Terrorista",  weapons: [weapons[2]] },
        // Add more player data as needed
    };

    return players[playerId];
}

// Function to display player information
function displayPlayerInfo(playerInfo) {
    const playerInfoDiv = document.getElementById('player_info');
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
function displayPlayerWeapons(playerInfo) {
    if (playerInfo) {
        playerInfo.weapons.forEach(element => {
            addRowToTable(element.wName, element.wType, element.wOrigin, element.wPrice, 'weapons_table')
        });
    }
}


// Main execution
const playerId = getPlayerIdFromUrl();
const playerInfo = fetchPlayerInfo(playerId);
displayPlayerInfo(playerInfo);
displayPlayerWeapons(playerInfo)
