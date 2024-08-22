import { readable } from 'svelte/store';

const THRESHOLD_MOBILE = 600;

export const isMobile = readable(true, (set) => {
	const listener = () => set(window.screen.width <= THRESHOLD_MOBILE);

	listener();
	window.addEventListener('resize', listener, true);

	return () => window.removeEventListener('resize', listener);
});
