const getType = (pType) => {
    switch (pType) {
        case "tt":
            return "Terrorista";
        default:
            return "Antiterrorista";
    }
};

const fetchAllPlayers = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/player");
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

const createPlayer = async () => {
    const pName = document.getElementById("pName");
	const pType = document.getElementById("pType");
	const pOrigin = document.getElementById("pOrigin");
	const pAge = document.getElementById("pAge");

    await fetch('http://localhost:5000/api/player', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            pName: pName.value,
            pType: pType.value,
            pOrigin: pOrigin.value,
            pAge: pAge.value,
        })
    }).then(() => {
       window.location.reload()
    }).catch(err => {
        console.err(err)
        throw new Error("ERROR EN FETCH DE CREAR PLAYER")
    })
}

fetchAllPlayers().then((res) => {
    res.forEach((e) => {
        addRowToTable(e.pName, getType(e.pType), e.pOrigin, e.pAge, generatePlayerUrl(e.pId));
    });
});