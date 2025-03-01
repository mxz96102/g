/**
 * ported from https://github.com/okikio/native/blob/master/packages/animate/src/custom-easing.ts
 */
import { bezier } from './bezier-easing';

export const convertToDash = (str: string) => {
  str = str.replace(/([A-Z])/g, (letter) => `-${letter.toLowerCase()}`);

  // Remove first dash
  return str.charAt(0) === '-' ? str.substr(1) : str;
};

export const limit = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * The format to use when defining custom easing functions
 */
export type TypeEasingFunction = (
  t: number,
  params?: (string | number)[],
  duration?: number,
) => number;
export type TypeColor = string | number | (string | number)[];
export type TypeRGBAFunction = (color: TypeColor) => number[];

/**
  Easing Functions from anime.js, they are tried and true, so, its better to use them instead of other alternatives 
*/
export const Quad: TypeEasingFunction = (t) => Math.pow(t, 2);
export const Cubic: TypeEasingFunction = (t) => Math.pow(t, 3);
export const Quart: TypeEasingFunction = (t) => Math.pow(t, 4);
export const Quint: TypeEasingFunction = (t) => Math.pow(t, 5);
export const Expo: TypeEasingFunction = (t) => Math.pow(t, 6);
export const Sine: TypeEasingFunction = (t) => 1 - Math.cos((t * Math.PI) / 2);
export const Circ: TypeEasingFunction = (t) => 1 - Math.sqrt(1 - t * t);
export const Back: TypeEasingFunction = (t) => t * t * (3 * t - 2);

export const Bounce: TypeEasingFunction = (t) => {
  let pow2: number,
    b = 4;
  while (t < ((pow2 = Math.pow(2, --b)) - 1) / 11) {}
  return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - t, 2);
};

export const Elastic: TypeEasingFunction = (t, params: (string | number)[] = []) => {
  const [amplitude = 1, period = 0.5] = params;
  const a = limit(Number(amplitude), 1, 10);
  const p = limit(Number(period), 0.1, 2);
  if (t === 0 || t === 1) return t;
  return (
    -a *
    Math.pow(2, 10 * (t - 1)) *
    Math.sin(((t - 1 - (p / (Math.PI * 2)) * Math.asin(1 / a)) * (Math.PI * 2)) / p)
  );
};

export const Spring: TypeEasingFunction = (
  t: number,
  params: (string | number)[] = [],
  duration?: number,
) => {
  let [mass = 1, stiffness = 100, damping = 10, velocity = 0] = params;

  mass = limit(mass as number, 0.1, 1000);
  stiffness = limit(stiffness as number, 0.1, 1000);
  damping = limit(damping as number, 0.1, 1000);
  velocity = limit(velocity as number, 0.1, 1000);

  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  const a = 1;
  const b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;

  let progress = duration ? (duration * t) / 1000 : t;
  if (zeta < 1) {
    progress =
      Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
  } else {
    progress = (a + b * progress) * Math.exp(-progress * w0);
  }

  if (t === 0 || t === 1) return t;
  return 1 - progress;
};

/**
 * Cache the durations at set easing parameters
 */
export const EasingDurationCache: Map<string | TypeEasingFunction, number> = new Map();

/**
 * The threshold for an infinite loop
 */
export const INTINITE_LOOP_LIMIT = 10000;

/** Convert easing parameters to Array of numbers, e.g. "spring(2, 500)" to [2, 500] */
export const parseEasingParameters = (str: string) => {
  const match = /(\(|\s)([^)]+)\)?/.exec(str);
  return match
    ? match[2].split(',').map((value) => {
        const num = parseFloat(value);
        return !Number.isNaN(num) ? num : value.trim();
      })
    : [];
};

/**
 * The spring easing function will only look smooth at certain durations, with certain parameters.
 * This functions returns the optimal duration to create a smooth springy animation based on physics
 *
 * Note: it can also be used to determine the optimal duration of other types of easing function, but be careful of 'in-'
 * easing functions, because of the nature of the function it can sometimes create an infinite loop, I suggest only using
 * `getEasingDuration` for `spring`, specifically 'out-spring' and 'spring'
 */
export const getEasingDuration = (easing: string | TypeEasingFunction = 'spring') => {
  if (EasingDurationCache.has(easing)) return EasingDurationCache.get(easing);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const easingFunction = typeof easing == 'function' ? easing : getEasingFunction(easing as string);
  const params = typeof easing == 'function' ? [] : parseEasingParameters(easing);
  const frame = 1 / 6;

  let elapsed = 0;
  let rest = 0;
  let count = 0;

  while (++count < INTINITE_LOOP_LIMIT) {
    elapsed += frame;
    if (easingFunction(elapsed, params, undefined) === 1) {
      rest++;
      if (rest >= 16) break;
    } else {
      rest = 0;
    }
  }

  const duration = elapsed * frame * 1000;
  EasingDurationCache.set(easing, duration);
  return duration;
};

/** 
  These Easing Functions are based off of the Sozi Project's easing functions 
  https://github.com/sozi-projects/Sozi/blob/d72e44ebd580dc7579d1e177406ad41e632f961d/src/js/player/Timing.js
*/
export const Steps: TypeEasingFunction = (t: number, params = []) => {
  const [steps = 10, type] = params as [number, string];
  const trunc = type == 'start' ? Math.ceil : Math.floor;
  return trunc(limit(t, 0, 1) * steps) / steps;
};

// @ts-ignore
export const Bezier: TypeEasingFunction = (t: number, params: number[] = []) => {
  const [mX1, mY1, mX2, mY2] = params;
  return bezier(mX1, mY1, mX2, mY2)(t);
};

/** The default `ease-in` easing function */
export const easein: TypeEasingFunction = bezier(0.42, 0.0, 1.0, 1.0);

/** Converts easing functions to their `out`counter parts */
export const EaseOut = (ease: TypeEasingFunction): TypeEasingFunction => {
  return (t, params = [], duration?: number) => 1 - ease(1 - t, params, duration);
};

/** Converts easing functions to their `in-out` counter parts */
export const EaseInOut = (ease: TypeEasingFunction): TypeEasingFunction => {
  return (t, params = [], duration?: number) =>
    t < 0.5 ? ease(t * 2, params, duration) / 2 : 1 - ease(t * -2 + 2, params, duration) / 2;
};

/** Converts easing functions to their `out-in` counter parts */
export const EaseOutIn = (ease: TypeEasingFunction): TypeEasingFunction => {
  return (t, params = [], duration?: number) => {
    return t < 0.5
      ? (1 - ease(1 - t * 2, params, duration)) / 2
      : (ease(t * 2 - 1, params, duration) + 1) / 2;
  };
};

/**
 * The default list of easing functions, do note this is different from {@link EASING}
 */
export const EasingFunctions: Record<string, TypeEasingFunction> = {
  steps: Steps,
  'step-start': (t) => Steps(t, [1, 'start']),
  'step-end': (t) => Steps(t, [1, 'end']),

  linear: (t) => t,
  'cubic-bezier': Bezier,
  ease: (t) => Bezier(t, [0.25, 0.1, 0.25, 1.0]),

  in: easein,
  out: EaseOut(easein),
  'in-out': EaseInOut(easein),
  'out-in': EaseOutIn(easein),

  'in-quad': Quad,
  'out-quad': EaseOut(Quad),
  'in-out-quad': EaseInOut(Quad),
  'out-in-quad': EaseOutIn(Quad),

  'in-cubic': Cubic,
  'out-cubic': EaseOut(Cubic),
  'in-out-cubic': EaseInOut(Cubic),
  'out-in-cubic': EaseOutIn(Cubic),

  'in-quart': Quart,
  'out-quart': EaseOut(Quart),
  'in-out-quart': EaseInOut(Quart),
  'out-in-quart': EaseOutIn(Quart),

  'in-quint': Quint,
  'out-quint': EaseOut(Quint),
  'in-out-quint': EaseInOut(Quint),
  'out-in-quint': EaseOutIn(Quint),

  'in-expo': Expo,
  'out-expo': EaseOut(Expo),
  'in-out-expo': EaseInOut(Expo),
  'out-in-expo': EaseOutIn(Expo),

  'in-sine': Sine,
  'out-sine': EaseOut(Sine),
  'in-out-sine': EaseInOut(Sine),
  'out-in-sine': EaseOutIn(Sine),

  'in-circ': Circ,
  'out-circ': EaseOut(Circ),
  'in-out-circ': EaseInOut(Circ),
  'out-in-circ': EaseOutIn(Circ),

  'in-back': Back,
  'out-back': EaseOut(Back),
  'in-out-back': EaseInOut(Back),
  'out-in-back': EaseOutIn(Back),

  'in-bounce': Bounce,
  'out-bounce': EaseOut(Bounce),
  'in-out-bounce': EaseInOut(Bounce),
  'out-in-bounce': EaseOutIn(Bounce),

  'in-elastic': Elastic,
  'out-elastic': EaseOut(Elastic),
  'in-out-elastic': EaseInOut(Elastic),
  'out-in-elastic': EaseOutIn(Elastic),

  spring: Spring,
  'spring-in': Spring,
  'spring-out': EaseOut(Spring),
  'spring-in-out': EaseInOut(Spring),
  'spring-out-in': EaseOutIn(Spring),
};

/**
 * Convert string easing to their proper form
 */
export const complexEasingSyntax = (ease: string) =>
  convertToDash(ease)
    .replace(/^ease-/, '') // Remove the "ease-" keyword
    .replace(/(\(|\s).+/, '') // Remove the function brackets and parameters
    .toLowerCase()
    .trim();

/** Re-maps a number from one range to another. Numbers outside the range are not clamped to 0 and 1, because out-of-range values are often intentional and useful. */
export const getEasingFunction = (ease: string) => {
  return EasingFunctions[complexEasingSyntax(ease)] || EasingFunctions.linear;
};

/**
 * Allows you to register new easing functions
 */
export const registerEasingFunction = (key: string, fn: TypeEasingFunction) => {
  Object.assign(EasingFunctions, {
    [key]: fn,
  });
};

/**
 * Allows you to register multiple new easing functions
 */
export const registerEasingFunctions = (...obj: typeof EasingFunctions[]) => {
  Object.assign(EasingFunctions, ...obj);
};
