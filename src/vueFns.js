const axios = require('axios').create();

const vueSubmitForm = async (gFormData, formData) => {
	let postData = gFormData.questions.map((i) => {
		if (i.type === "checkbox") {
			const selectedData = formData[i.title].map((j) => {
				return `${i.entry}=${j}&`;
			});

			return [...selectedData];
		}

		return `${i.entry}=${formData[i.title]}&`;
	});

	postData = postData.flat();
	postData = postData.join("");

	return await axios.post(gFormData.formAction, postData)
		.then(() => { return { code: 'success' } })
		.catch(() => { return { code: 'failed' } })
}

module.exports = {
	vueSubmitForm
}