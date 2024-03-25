// Source: https://stackoverflow.com/a/74243445/6425704
export const sha256 = async (data: string) => {
	const textAsBuffer = new TextEncoder().encode(data);
	const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const digest = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
	return digest;
};
