function addUrlParameter(name, elementId) {
	let searchParams = new URLSearchParams(window.location.search);
	let element = document.getElementById(elementId);
	if (element) {
		searchParams.set(name, element.value);
		window.location.search = searchParams.toString();
	}
}

function generatePlayerUrl(id) {
	return "/player/?id=" + id;
}

function redirectPlayerUrl(id) {
	return window.location.assign(generatePlayerUrl(id.toString()));
}
