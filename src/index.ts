export class ColorGenerator {
    private previousColors: string[] = [];

    /**
     * Generates a random hex color code.
     * @returns {string} A random hex color code in the format `#RRGGBB`.
     */
    public static generateRandomHexColor(): string {
        const array = new Uint8Array(3);
        crypto.getRandomValues(array);
        return `#${Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
    }

    /**
     * This method checks whether the provided string adheres to the hex color code format `#RRGGBB`.
     *
     * @param hex The hex color code to validate, which should be in the format `#RRGGBB`.
     * 
     * @returns `true` if the string is a valid hex color code; `false` otherwise.
    */
    private static isValidHexColor(hex: string): boolean {
        return /^#[0-9A-F]{6}$/i.test(hex);
    }

    /**
     * Generates an array of random hex color codes.
     * @param {number} num - The number of hex color codes to generate.
     * @returns {string[]} An array of random hex color codes.
     */
    public static generateRandomHexColorsArray(num: number): string[] {
        return Array.from({ length: num }, ColorGenerator.generateRandomHexColor);
    }

    /**
     * Generates an array of hex color codes, optionally remembering previously generated colors.
     * The new colors will avoid shades of the specified background color.
     * @param {string} bgColor - The background color to avoid shades of, in hex format.
     * @param {number} num - The number of hex color codes to generate.
     * @param {boolean} remember - Whether to remember previously generated colors.
     * @returns {string[]} An array of hex color codes, with or without previously generated colors, avoiding shades of the background color.
     */
    public generateColorsWithMemoryAvoidingShades(
        bgColor: string,
        num: number,
        remember: boolean
    ): string[] {
        const threshold = 100;
        let colors: string[] = [];

        if (remember) {
            colors = [...this.previousColors];
            const remainingColorsNeeded = num - colors.length;

            if (remainingColorsNeeded > 0) {
                const newColors = this.generateColorsAvoidingBgColor(bgColor, remainingColorsNeeded);
                colors = colors.concat(newColors);
            }

            this.previousColors = colors;
        } else {
            colors = this.generateColorsAvoidingBgColor(bgColor, num);
            this.previousColors = [];
        }

        return colors;
    }

    /**
     * Generates an array of hex color codes that are not similar to the given background color.
     * @param {string} bgColor - The background color to avoid shades of, in hex format.
     * @param {number} num - The number of hex color codes to generate.
     * @returns {string[]} An array of hex color codes avoiding shades of the background color.
     * @throws {Error} If unable to generate the required number of suitable colors.
     */
    private generateColorsAvoidingBgColor(bgColor: string, num: number): string[] {
        if (!ColorGenerator.isValidHexColor(bgColor)) {
            throw new Error('Invalid hex color code');
        }
        const threshold = 100;
        const MAX_ATTEMPTS = 1000;
        let colors: string[] = [];
        let attempts = 0;

        while (colors.length < num && attempts < MAX_ATTEMPTS) {
            const newColor = ColorGenerator.generateRandomHexColor();
            if (this.colorDifference(newColor, bgColor) > threshold) {
                colors.push(newColor);
            }
            attempts++;
        }

        while (colors.length < num) {
            colors.push(ColorGenerator.generateRandomHexColor());
        }

        if (colors.length < num) {
            console.warn('Unable to generate the required number of colors.');
        }

        return colors;
    }

    /**
     * Generates an array of hex color codes that do not include any colors from the avoidColors array.
     * @param {string[]} avoidColors - An array of hex color codes to avoid.
     * @param {number} num - The number of hex color codes to generate.
     * @returns {string[]} An array of hex color codes that do not include any colors from the avoidColors array.
     */
    public static generateColorsAvoidingArray(avoidColors: string[], num: number): string[] {
        let colors: string[] = [];

        while (colors.length < num) {
            const newColor = ColorGenerator.generateRandomHexColor();
            if (!avoidColors.includes(newColor)) {
                colors.push(newColor);
            }
        }

        return colors;
    }

    /**
     * Converts a hex color code to its RGB components.
     * @param {string} hex - A hex color code in the format `#RRGGBB`.
     * @returns {number[]} An array containing the RGB components of the color.
     */
    private hexToRgb(hex: string): number[] {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
    }

    /**
     * Computes the difference between two colors in RGB space.
     * @param {string} color1 - The first color in hex format.
     * @param {string} color2 - The second color in hex format.
     * @returns {number} The Euclidean distance between the two colors in RGB space.
     */
    private colorDifference(color1: string, color2: string): number {
        const [r1, g1, b1] = this.hexToRgb(color1);
        const [r2, g2, b2] = this.hexToRgb(color2);
        return Math.sqrt(
            (r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2
        );
    }
}
