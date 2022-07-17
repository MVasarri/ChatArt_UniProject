import fetch from 'node-fetch';
import { stringify } from 'querystring';

const fetchOptions = {
	method: 'GET',
	mode: 'cors',
	credentials: 'omit'
};

async function get_request(url, Options_fetch) {
	console.log('options_fetch:	\n',Options_fetch);
	const res = await fetch(url, Options_fetch);
	console.log('risultato crudo del fetch:	\n', res );
	let data;
	try {
		data = await res.json();//assuming data is json
		console.log('json rel res del fetch:	\n', data);
	} catch (error) {
		console.log('errore --> fetch json_________________')
		throw error;
	}
	return data;
}

async function api(apiOptions, params = {}) {
	const qs = Object.assign(
		{
			format: 'json',
			action: 'query',
			redirects: ''
		},
		params
	);
	// Remove undefined properties
	Object.keys(qs).forEach(key => {
		if (qs[key] === undefined) {
			delete qs[key];
		}
	});
	if (apiOptions.origin) {
		qs.origin = apiOptions.origin;
	}
	console.log('qs:	\n', qs);
	const url = `${apiOptions.apiUrl}?${stringify(qs)}`;
	console.log('__________________');
	console.log('qs con querystring.stringify:\n', stringify(qs));
	console.log('url:	\n', url);
	return get_request(
		url,
		Object.assign({ headers: apiOptions.headers }, fetchOptions)
	);
}

const _api = api;
export { _api as api };
