// import { gsap } from 'gsap';

// import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js';
// gsap.registerPlugin(ScrollToPlugin);

// global.gsap = gsap;

// gsap.defaults({
// 	overwrite: 'auto',
// });

class ProjectApp {
	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.classes = {
			// Signal: require('./classes/Signal').default,
			Cart: require('./classes/Cart').default,
		};
		this.components = {};
		this.helpers = {};
		this.modules = {};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');
		});
	}
}

global.ProjectApp = new ProjectApp();

if (module.hot) {
	module.hot.accept();
}

console.log(global.ProjectApp);

window.addEventListener('DOMContentLoaded', () => {
	new global.ProjectApp.classes.Cart().init();
	const burger = document.querySelector('.header__toggle-cart');
	const cart = document.querySelector('.cart-right-side');
	burger.addEventListener('click', () => {
		cart.classList.toggle('opened');
	});
});
