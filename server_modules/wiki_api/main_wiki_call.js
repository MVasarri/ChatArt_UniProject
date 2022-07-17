'use strict'
import {api} from './utils.js';

const defaultOptions = {
	apiUrl: 'http://en.wikipedia.org/w/api.php',
	origin: '*'
};


function wiki(options = {}) {
	if (this instanceof wiki) {
		// eslint-disable-next-line
		console.log(
			'Please do not use wikijs ^1.0.0 as a class. Please see the new README.'
		);
	}

	const apiOptions = Object.assign({}, defaultOptions, options);
	console.log('apiOptions: \n', apiOptions);

	async function dataWiki(title) {
		const paramWiki = {
			"prop": "description|pageimages|extracts",
			"generator": "search",
			"redirects": 1,
			"formatversion": "2",
			"piprop": "thumbnail|name|original",
			"pithumbsize": "1080",
			"pilicense": "any",
			"descprefersource": "central",
			"exintro": 1,
			"explaintext": 1,
			"exsectionformat": "wiki",
			"gsrsearch": title,
			"gsrnamespace": "0",
			"gsrinterwiki": 1,
			"gsrenablerewrites": 1,
			"gsrsort": "relevance"
		};
		let result = await api(apiOptions, paramWiki);
		console.log('result api function: \n',result)

		result = await result.query.pages; 
		console.log("filtriamo solo l'elemento di resupt con le informazioni result.query.pages: \n", result )

		for (var key = 0; key < result.length; key++) {
			if (result[key].pageid === undefined ||
				result[key].title === undefined ||
				result[key].description === undefined ||
				result[key].thumbnail === undefined ||
				result[key].pageimage === undefined ||
				result[key].extract === undefined) {
				result.splice(key, 1); //elomina un elemento dall'id key
				key--;
			} else {
				result[key] = {
					pageid: result[key].pageid,
					title: result[key].title,
					description: result[key].description,
					imageName: result[key].pageimage,
					imageSource: result[key].thumbnail.source,
					abstract: result[key].extract
				};
			}
		}
		//console.log('result post eliminazione risultati, con elementi null nella query:	\n', result)
		//result[1]
		return result;
	}

	return {
		dataWiki
	};
}

const _wiki = wiki;
export { _wiki as wiki };
