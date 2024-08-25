export class ColorGenerator {
  private previousColors: string[] = [];

  /**
   * Generates a random hex color code.
   * @returns {string} A random hex color code in the format `#RRGGBB`.
   */
  public static generateRandomHexColor(): string {
    const array = new Uint8Array(3);
    crypto.getRandomValues(array);
    return `#${Array.from(array, (byte) => byte.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()}`;
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
        const newColors = this.generateColorsAvoidingBgColor(
          bgColor,
          remainingColorsNeeded
        );
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
  private generateColorsAvoidingBgColor(
    bgColor: string,
    num: number
  ): string[] {
    if (!ColorGenerator.isValidHexColor(bgColor)) {
      throw new Error("Invalid hex color code");
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
      console.warn("Unable to generate the required number of colors.");
    }

    return colors;
  }

  /**
   * Generates an array of hex color codes that do not include any colors from the avoidColors array.
   * @param {string[]} avoidColors - An array of hex color codes to avoid.
   * @param {number} num - The number of hex color codes to generate.
   * @returns {string[]} An array of hex color codes that do not include any colors from the avoidColors array.
   */
  public static generateColorsAvoidingArray(
    avoidColors: string[],
    num: number
  ): string[] {
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
  private static hexToRgb(hex: string): [number, number, number] {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b] as [number, number, number];
  }

  /**
   * Computes the difference between two colors in RGB space.
   * @param {string} color1 - The first color in hex format.
   * @param {string} color2 - The second color in hex format.
   * @returns {number} The Euclidean distance between the two colors in RGB space.
   */
  private colorDifference(color1: string, color2: string): number {
    const [r1, g1, b1] = ColorGenerator.hexToRgb(color1);
    const [r2, g2, b2] = ColorGenerator.hexToRgb(color2);
    return Math.sqrt((r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2);
  }

  /**
   * Generates a palette of analogous colors based on a base color.
   * @param {string} baseColor - The base color in hex format.
   * @param {number} num - The number of analogous colors to generate.
   * @returns {string[]} An array of analogous color codes.
   */
  public static generateAnalogousPalette(
    baseColor: string,
    num: number
  ): string[] {
    if (!ColorGenerator.isValidHexColor(baseColor)) {
      throw new Error("Invalid base color hex code");
    }

    const baseRgb = ColorGenerator.hexToRgb(baseColor);
    const hues: number[] = Array.from(
      { length: num },
      (_, i) => (i * 360) / num
    );
    const palette: string[] = hues.map((hue) => {
      const [r, g, b] = ColorGenerator.hslToRgb(hue, 0.5, 0.5);
      return ColorGenerator.rgbToHex(r, g, b);
    });

    return palette;
  }

  /**
   * Generates a palette of complementary colors based on a base color.
   * @param {string} baseColor - The base color in hex format.
   * @returns {string[]} An array of complementary color codes.
   */
  public static generateComplementaryPalette(baseColor: string): string[] {
    if (!ColorGenerator.isValidHexColor(baseColor)) {
      throw new Error("Invalid base color hex code");
    }

    // Convert the base color to RGB
    const baseRgb: [number, number, number] =
      ColorGenerator.hexToRgb(baseColor);

    // Convert RGB to HSL
    const baseHsl: [number, number, number] = ColorGenerator.rgbToHsl(
      ...baseRgb
    );

    const complementaryHsl: [number, number, number] = [
      (baseHsl[0] + 180) % 360,
      baseHsl[1],
      baseHsl[2],
    ];

    const complementaryRgb: [number, number, number] = ColorGenerator.hslToRgb(
      ...complementaryHsl
    );

    return [
      ColorGenerator.rgbToHex(...baseRgb),
      ColorGenerator.rgbToHex(...complementaryRgb),
    ];
  }

  /**
   * Converts RGB components to hex color code.
   * @param {number} r - Red component (0-255).
   * @param {number} g - Green component (0-255).
   * @param {number} b - Blue component (0-255).
   * @returns {string} The hex color code.
   */
  private static rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b)
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  }

  /**
   * Converts HSL values to RGB.
   * @param {number} h - The hue (0-360).
   * @param {number} s - The saturation (0-1).
   * @param {number} l - The lightness (0-1).
   * @returns {[number, number, number]} The RGB components as a tuple.
   */
  private static hslToRgb(
    h: number,
    s: number,
    l: number
  ): [number, number, number] {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r: number, g: number, b: number;

    if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
    else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
    else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
    else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
    else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255),
    ];
  }

  /**
   * Converts RGB values to HSL.
   * @param {number} r - The red component (0-255).
   * @param {number} g - The green component (0-255).
   * @param {number} b - The blue component (0-255).
   * @returns {[number, number, number]} The HSL components as a tuple.
   */
  private static rgbToHsl(
    r: number,
    g: number,
    b: number
  ): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [Math.round(h * 360), s, l];
  }
  /**
   * Generates a random color with a bias towards a certain color.
   * @param {string} biasColor - The color to bias towards in hex format.
   * @returns {string} A random color with bias.
   */
  public static generateBiasedColor(biasColor: string): string {
    if (!ColorGenerator.isValidHexColor(biasColor)) {
      throw new Error("Invalid bias color hex code");
    }

    const biasRgb = ColorGenerator.hexToRgb(biasColor);
    const randomRgb = ColorGenerator.hexToRgb(
      ColorGenerator.generateRandomHexColor()
    );
    const r = Math.round((biasRgb[0] + randomRgb[0]) / 2);
    const g = Math.round((biasRgb[1] + randomRgb[1]) / 2);
    const b = Math.round((biasRgb[2] + randomRgb[2]) / 2);

    return ColorGenerator.rgbToHex(r, g, b);
  }
}
