const changeSkinBoxView = () => {
	const element = document.getElementById("skin_info");
	if (element) {
		element.removeChild;
	}
};

const createSkinmodel = async (name, type) => {
	await fetch("http://localhost:5000/api/skins/model", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			modelName: name,
			wId: type,
		}),
	})
		.then(() => window.location.assign("/"))
		.catch((error) => console.error("Error:", error));
};

const submitCreateSkinModel = () => {
	const name = document.getElementById("wName").value;
	const type = document.getElementById("wType").value;

	if (!name || !type) {
		return alert("No dejes los espacios en blanco!");
	}
	return createSkinmodel(name, type);
};
