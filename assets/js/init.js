skel.init({
	reset: 'full',
	breakpoints: {
		'global': { range: '*', href: '/assets/css/style.css', lockViewport: true, viewport: 'minimal-ui' }
	}
});
window.onload = function() {
	document.body.className = '';
}
window.ontouchmove = function() {
	return false;
}
window.onorientationchange = function() {
	document.body.scrollTop = 0;
}