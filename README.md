
# Hex Color Randomizer

A TypeScript package for generating random hex color codes with advanced options, including avoiding certain colors or shades. This package is useful for creating unique color schemes or avoiding specific colors in your projects.

## Features

- Generate a single random hex color code.
- Generate an array of random hex color codes.
- Avoid generating colors similar to a specified background color.
- Avoid generating colors from a specified list.
- Optionally remember previously generated colors and avoid shades of a specified background color.
- Generate colors biased towards a specific color.
- Create palettes of analogous or complementary colors.

## Installation

To install the package, run:
```
npm install hex-color-randomizer
```

## Usage

First, import the class from the package:

```typescript
import { ColorGenerator } from 'hex-color-randomizer';
```

### Methods

#### `generateRandomHexColor()`

Generates a single random hex color code.

- **Returns:** `string` - A random hex color code in the format `#RRGGBB`.

**Example:**

```typescript
const color = ColorGenerator.generateRandomHexColor();
console.log(color); // e.g., "#A3C1AD"
```

#### `generateRandomHexColorsArray(num: number)`

Generates an array of random hex color codes.

- **Parameters:**
  - `num` (`number`): The number of hex color codes to generate.
  
- **Returns:** `string[]` - An array of random hex color codes.

**Example:**

```typescript
const colors = ColorGenerator.generateRandomHexColorsArray(5);
console.log(colors); // e.g., ["#E57373", "#F06292", "#BA68C8", "#64B5F6", "#4DB6AC"]
```

#### `generateColorsAvoidingBgColor(bgColor: string, num: number)`

Generates an array of hex color codes that are not similar to a specified background color.

- **Parameters:**
  - `bgColor` (`string`): The background color to avoid shades of, in hex format (e.g., `#FFFFFF`).
  - `num` (`number`): The number of hex color codes to generate.
  
- **Returns:** `string[]` - An array of hex color codes avoiding shades of the background color.

- **Throws:** `Error` - If it cannot generate the required number of suitable colors within the maximum attempts.

**Example:**

```typescript
const colors = ColorGenerator.generateColorsAvoidingBgColor("#FFFFFF", 3);
console.log(colors); // e.g., ["#E57373", "#F06292", "#BA68C8"]
```

#### `generateColorsAvoidingArray(avoidColors: string[], num: number)`

Generates an array of hex color codes that do not include any colors from a specified array of colors to avoid.

- **Parameters:**
  - `avoidColors` (`string[]`): An array of hex color codes to avoid.
  - `num` (`number`): The number of hex color codes to generate.
  
- **Returns:** `string[]` - An array of hex color codes that do not include any colors from the `avoidColors` array.

**Example:**

```typescript
const avoidColors = ["#FF0000", "#00FF00"];
const colors = ColorGenerator.generateColorsAvoidingArray(avoidColors, 3);
console.log(colors); // e.g., ["#E57373", "#F06292", "#BA68C8"]
```

#### `generateColorsWithMemoryAvoidingShades(bgColor: string, num: number, remember: boolean)`

Generates an array of hex color codes, optionally remembering previously generated colors and avoiding shades of a specified background color.

- **Parameters:**
  - `bgColor` (`string`): The background color to avoid shades of, in hex format (e.g., `#FFFFFF`).
  - `num` (`number`): The number of hex color codes to generate.
  - `remember` (`boolean`): Whether to remember previously generated colors. If `true`, previously generated colors will be kept in memory and new colors will be appended to this list. If `false`, previously generated colors will be cleared.
  
- **Returns:** `string[]` - An array of hex color codes, which may include previously generated colors depending on the `remember` parameter.

**Example:**

```typescript
const colors = ColorGenerator.generateColorsWithMemoryAvoidingShades("#FFFFFF", 5, true);
console.log(colors); // e.g., ["#E57373", "#F06292", "#BA68C8", "#64B5F6", "#4DB6AC"]
```

#### `generateBiasedColor(biasColor: string)`

Generates a random color with a bias towards a certain color.

- **Parameters:**
  - `biasColor` (`string`): The color to bias towards in hex format (e.g., `#FF0000`).
  
- **Returns:** `string` - A random color biased towards the specified color.

- **Throws:** `Error` - If the bias color is invalid.

**Example:**

```typescript
const biasedColor = ColorGenerator.generateBiasedColor("#FF0000");
console.log(biasedColor); // e.g., "#FF7F7F"
```

#### `generateAnalogousPalette(baseColor: string, num: number)`

Generates a palette of analogous colors based on a base color.

- **Parameters:**
  - `baseColor` (`string`): The base color in hex format (e.g., `#FF0000`).
  - `num` (`number`): The number of analogous colors to generate.
  
- **Returns:** `string[]` - An array of analogous color codes.

- **Throws:** `Error` - If the base color is invalid.

**Example:**

```typescript
const analogousPalette = ColorGenerator.generateAnalogousPalette("#FF0000", 5);
console.log(analogousPalette); // e.g., ["#FF0000", "#FF3F00", "#FF7F00", "#FFBF00", "#FFFF00"]
```

#### `generateComplementaryPalette(baseColor: string)`

Generates a palette of complementary colors based on a base color.

- **Parameters:**
  - `baseColor` (`string`): The base color in hex format (e.g., `#FF0000`).
  
- **Returns:** `string[]` - An array of complementary color codes.

- **Throws:** `Error` - If the base color is invalid.

**Example:**

```typescript
const complementaryPalette = ColorGenerator.generateComplementaryPalette("#FF0000");
console.log(complementaryPalette); // e.g., ["#FF0000", "#00FFFF"]
```

## Example

Here’s an example of using the package to generate random colors while avoiding certain shades:

```typescript
import { ColorGenerator } from 'hex-color-randomizer';

const initialColors = ColorGenerator.generateColorsAvoidingBgColor("#FF0000", 5);
console.log('Initial colors:', initialColors);

const moreColors = ColorGenerator.generateColorsWithMemoryAvoidingShades("#FF0000", 5, true);
console.log('More colors:', moreColors);
```

## License

This package is licensed under the [MIT License](LICENSE).
