import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealMode = 'up' | 'down' | 'left' | 'right' | 'fade';

function parseMode(raw: string | undefined): RevealMode {
	if (raw === 'down' || raw === 'left' || raw === 'right' || raw === 'fade') return raw;
	return 'up';
}

function buildFromVars(mode: RevealMode): gsap.TweenVars {
	const base: gsap.TweenVars = { autoAlpha: 0 };
	switch (mode) {
		case 'up':
			return { ...base, y: 40 };
		case 'down':
			return { ...base, y: -28 };
		case 'left':
			return { ...base, x: -40 };
		case 'right':
			return { ...base, x: 40 };
		case 'fade':
		default:
			return base;
	}
}

export function initScrollReveal(): void {
	const mm = gsap.matchMedia();

	// Run only when this query matches — not inside a single "reduceMotion" named query
	// whose handler otherwise never runs for (prefers-reduced-motion: no-preference).
	mm.add('(prefers-reduced-motion: reduce)', () => {
		const revealNodes = gsap.utils.toArray<HTMLElement>('[data-reveal]');
		if (revealNodes.length === 0) {
			return () => {};
		}
		gsap.set(revealNodes, {
			autoAlpha: 1,
			x: 0,
			y: 0,
			clearProps: 'visibility',
		});
		return () => {};
	});

	mm.add('(prefers-reduced-motion: no-preference)', () => {
		const revealNodes = gsap.utils.toArray<HTMLElement>('[data-reveal]');
		if (revealNodes.length === 0) {
			return () => {};
		}

		const triggers: ScrollTrigger[] = [];

		revealNodes.forEach((el: HTMLElement) => {
			const mode = parseMode(el.dataset.reveal);
			const delay = Number.parseFloat(el.dataset.revealDelay ?? '0') || 0;
			const fromVars = buildFromVars(mode);

			const tween = gsap.from(el, {
				...fromVars,
				duration: Number.parseFloat(el.dataset.revealDuration ?? '') || 0.85,
				delay,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: el,
					start: el.dataset.revealStart ?? 'top 90%',
					toggleActions: 'play none none none',
					once: true,
				},
			});
			const st = tween.scrollTrigger;
			if (st) triggers.push(st);
		});

		return () => {
			triggers.forEach((t) => t.kill());
		};
	});
}
