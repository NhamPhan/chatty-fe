/**
 * @typedef {import("@mui/material").Theme} Theme
 */

/**
 * Get calculated page height
 *
 * @param {Theme} theme
 * @returns {string}
 */
function getPageHeight(theme) {
	const topSpacing =
		Number(theme.mixins.toolbar.minHeight) + Number.parseInt(theme.spacing(1));

	return `calc(100vh - ${topSpacing}px)`;
}

export default getPageHeight;
