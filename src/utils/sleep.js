/**
 * Function that delay in milliseconds
 *
 * @param {number} ms
 * @returns {Promise<unknown>}
 */
function sleep(ms) {
	return new Promise((res) => setTimeout(res, ms));
}

export default sleep;
