/**
 * Maximum number of attempts to generate a suitable color.
 * @constant {number}
 */
const MAX_ATTEMPTS = 1000;

/**
 * Generates a random hex color code.
 * @returns {string} A random hex color code in the format `#RRGGBB`.
 */
export const generateRandomHexColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

/**
 * Generates an array of random hex color codes.
 * @param {number} num - The number of hex color codes to generate.
 * @returns {string[]} An array of random hex color codes.
 */
export const generateRandomHexColorsArray = (num: number): string[] => {
    return Array.from({ length: num }, generateRandomHexColor);
};

/**
 * Converts a hex color code to its RGB components.
 * @param {string} hex - A hex color code in the format `#RRGGBB`.
 * @returns {number[]} An array containing the RGB components of the color.
 */
const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
};

/**
 * Computes the difference between two colors in RGB space.
 * @param {string} color1 - The first color in hex format.
 * @param {string} color2 - The second color in hex format.
 * @returns {number} The Euclidean distance between the two colors in RGB space.
 */
const colorDifference = (color1: string, color2: string) => {
    const [r1, g1, b1] = hexToRgb(color1);
    const [r2, g2, b2] = hexToRgb(color2);
    return Math.sqrt(
        (r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2
    );
};

/**
 * Generates an array of hex color codes that are not similar to the given background color.
 * @param {string} bgColor - The background color to avoid shades of, in hex format.
 * @param {number} num - The number of hex color codes to generate.
 * @returns {string[]} An array of hex color codes avoiding shades of the background color.
 * @throws {Error} If unable to generate the required number of suitable colors.
 */
export const generateColorsAvoidingBgColor = (bgColor: string, num: number): string[] => {
    const threshold = 100;
    let colors: string[] = [];
    let attempts = 0;

    while (colors.length < num && attempts < MAX_ATTEMPTS) {
        const newColor = generateRandomHexColor();
        if (colorDifference(newColor, bgColor) > threshold) {
            colors.push(newColor);
        }
        attempts++;
    }

    while (colors.length < num) {
        colors.push(generateRandomHexColor());
    }

    return colors;
};

/**
 * Generates an array of hex color codes that do not include any colors from the avoidColors array.
 * @param {string[]} avoidColors - An array of hex color codes to avoid.
 * @param {number} num - The number of hex color codes to generate.
 * @returns {string[]} An array of hex color codes that do not include any colors from the avoidColors array.
 */
export const generateColorsAvoidingArray = (avoidColors: string[], num: number): string[] => {
    let colors: string[] = [];

    while (colors.length < num) {
        const newColor = generateRandomHexColor();
        if (!avoidColors.includes(newColor)) {
            colors.push(newColor);
        }
    }

    return colors;
};

let previousColors: string[] = [];

/**
 * Generates an array of hex color codes, optionally remembering previously generated colors.
 * The new colors will avoid shades of the specified background color.
 * @param {string} bgColor - The background color to avoid shades of, in hex format.
 * @param {number} num - The number of hex color codes to generate.
 * @param {boolean} remember - Whether to remember previously generated colors.
 * @returns {string[]} An array of hex color codes, with or without previously generated colors, avoiding shades of the background color.
 */
export const generateColorsWithMemoryAvoidingShades = (
    bgColor: string,
    num: number,
    remember: boolean
): string[] => {
    const threshold = 100;
    let colors: string[] = [];

    if (remember) {
        colors = [...previousColors];
        const remainingColorsNeeded = num - colors.length;

        if (remainingColorsNeeded > 0) {
            const newColors = generateColorsAvoidingBgColor(bgColor, remainingColorsNeeded);
            colors = colors.concat(newColors);
        }

        previousColors = colors;
    } else {
        colors = generateColorsAvoidingBgColor(bgColor, num);
        previousColors = [];
    }

    return colors;
};
