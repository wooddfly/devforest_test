const { createBundleRenderer } = require("vue-server-renderer");
const fs = require('fs');
const { join } = require('path');

const csrTemplatePath = join(process.cwd(), 'src/template/index.html');
const ssrTemplatePath = join(process.cwd(), 'src/template/index_ssr.html');

const csrTemplate = fs.readFileSync(csrTemplatePath, 'utf-8');
const template = fs.readFileSync(ssrTemplatePath, 'utf-8');

const ssrBundle = require("../../public/vue-ssr-server-bundle.json");
const clientManifest = require("../../public/vue-ssr-client-manifest.json");

const renderer = createBundleRenderer(ssrBundle, {
	template,
	clientManifest
});

module.exports = {
	getSSRPage(path) {
		const pages = [
			"/projects", //프로젝트 페이지
			"/home", //홈 테스트
		]
		return pages.indexOf(path);
	},
	checkApi(path) {
		const regExp = /api/gm;
		const is = path.match(regExp) ? 1 : 0;
		return is;
	},
	renderByClient (context) {
		return csrTemplate;
	},
	async renderByServer (context) {
		try {
			return await renderer.renderToString(context);
		} catch (e) {
			//return await renderer.renderToString(context);
			return csrTemplate;
		}
	},
	getRenderedHtml (path, context) {
		return csrTemplate;
	}
}
