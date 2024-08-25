import { ColorGenerator } from '../src/index';

describe('ColorGenerator Class', () => {
  
  describe('Static Methods', () => {

    describe('generateRandomHexColor', () => {
      it('should generate a valid hex color code', () => {
        const color = ColorGenerator.generateRandomHexColor();
        expect(color).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    describe('generateRandomHexColorsArray', () => {
      it('should generate an array of specified number of hex color codes', () => {
        const num = 5;
        const colors = ColorGenerator.generateRandomHexColorsArray(num);
        expect(colors).toHaveLength(num);
        colors.forEach((color: string) => {
          expect(color).toMatch(/^#[0-9A-F]{6}$/i);
        });
      });
    });

    describe('generateColorsAvoidingArray', () => {
      it('should generate colors not included in the avoidColors array', () => {
        const avoidColors = ['#FF0000', '#00FF00'];
        const num = 5;
        const colors = ColorGenerator.generateColorsAvoidingArray(avoidColors, num);
        expect(colors).toHaveLength(num);
        colors.forEach((color: string) => {
          expect(avoidColors).not.toContain(color);
          expect(color).toMatch(/^#[0-9A-F]{6}$/i);
        });
      });
    });

    describe('generateAnalogousPalette', () => {
      it('should generate an array of analogous colors based on a base color', () => {
        const baseColor = '#FF0000'; // Red
        const num = 5;
        const palette = ColorGenerator.generateAnalogousPalette(baseColor, num);
        expect(palette).toHaveLength(num);
        palette.forEach((color: string) => {
          expect(color).toMatch(/^#[0-9A-F]{6}$/i);
        });
      });

      it('should throw an error if base color is invalid', () => {
        const invalidColor = '#ZZZZZZ';
        expect(() => ColorGenerator.generateAnalogousPalette(invalidColor, 5)).toThrowError("Invalid base color hex code");
      });
    });

    describe('generateComplementaryPalette', () => {
      it('should generate a pair of complementary colors based on a base color', () => {
        const baseColor = '#FF0000'; // Red
        const palette = ColorGenerator.generateComplementaryPalette(baseColor);
        expect(palette).toHaveLength(2);
        palette.forEach((color: string) => {
          expect(color).toMatch(/^#[0-9A-F]{6}$/i);
        });
      });

      it('should throw an error if base color is invalid', () => {
        const invalidColor = '#ZZZZZZ';
        expect(() => ColorGenerator.generateComplementaryPalette(invalidColor)).toThrowError("Invalid base color hex code");
      });
    });

    describe('generateBiasedColor', () => {
      it('should generate a color with a bias towards the specified color', () => {
        const biasColor = '#00FF00'; // Green
        const biasedColor = ColorGenerator.generateBiasedColor(biasColor);
        expect(biasedColor).toMatch(/^#[0-9A-F]{6}$/i);
      });

      it('should throw an error if bias color is invalid', () => {
        const invalidColor = '#ZZZZZZ';
        expect(() => ColorGenerator.generateBiasedColor(invalidColor)).toThrowError("Invalid bias color hex code");
      });
    });

  });

  describe('Instance Methods', () => {
    let colorGenerator: ColorGenerator;

    beforeEach(() => {
      colorGenerator = new ColorGenerator();
    });

    describe('generateColorsWithMemoryAvoidingShades', () => {
      it('should remember previously generated colors if "remember" is true', () => {
        const bgColor = '#0000FF';
        const num = 5;
        const remember = true;

        const colorsFirstRun = colorGenerator.generateColorsWithMemoryAvoidingShades(bgColor, num, remember);
        expect(colorsFirstRun).toHaveLength(num);
        expect((colorGenerator as any).previousColors).toHaveLength(num);

        const colorsSecondRun = colorGenerator.generateColorsWithMemoryAvoidingShades(bgColor, num * 2, remember);
        expect(colorsSecondRun).toHaveLength(num * 2);
        expect((colorGenerator as any).previousColors).toHaveLength(num * 2);
      });

      it('should generate new colors if "remember" is false', () => {
        const bgColor = '#0000FF';
        const num = 5;
        const remember = false;

        const colors = colorGenerator.generateColorsWithMemoryAvoidingShades(bgColor, num, remember);
        expect(colors).toHaveLength(num);
        expect((colorGenerator as any).previousColors).toEqual([]);
      });
    });

    describe('generateColorsAvoidingBgColor', () => {
      it('should generate colors not similar to the background color', () => {
        const bgColor = '#FF0000';
        const num = 5;
        const colors = (colorGenerator as any)['generateColorsAvoidingBgColor'](bgColor, num);
        expect(colors).toHaveLength(num);
        colors.forEach((color: string) => {
          expect(color).toMatch(/^#[0-9A-F]{6}$/i);
        });
      });

      it('should handle case where max attempts are reached', () => {
        const bgColor = '#FF0000';
        const num = 1000;
        const colors = (colorGenerator as any)['generateColorsAvoidingBgColor'](bgColor, num);
        expect(colors).toHaveLength(num);
        colors.forEach((color: string) => {
          expect(color).toMatch(/^#[0-9A-F]{6}$/i);
        });
      });
    });

  });

});
