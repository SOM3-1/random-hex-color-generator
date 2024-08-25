Here's the updated `README.md` file with accurate descriptions for each method:

```markdown
# Random Hex Color Generator

A TypeScript package for generating random hex color codes with advanced options including avoiding certain colors or shades. This package is useful for creating unique color schemes or avoiding specific colors in your projects.

## Installation

To install the package, run:

npm install random-hex-color-generator
```

## Usage

First, import the functions from the package:

```typescript
import { generateRandomHexColor, generateRandomHexColorsArray, generateColorsAvoidingBgColor, generateColorsAvoidingArray, generateColorsWithMemoryAvoidingShades } from 'random-hex-color-generator';
```

### Methods

#### `generateRandomHexColor()`

Generates a single random hex color code.

- **Returns:** `string` - A random hex color code in the format `#RRGGBB`.

**Example:**

```typescript
const color = generateRandomHexColor();
console.log(color); // e.g., "#A3C1AD"
```

#### `generateRandomHexColorsArray(num: number)`

Generates an array of random hex color codes.

- **Parameters:**
  - `num` (`number`): The number of hex color codes to generate.
  
- **Returns:** `string[]` - An array of random hex color codes.

**Example:**

```typescript
const colors = generateRandomHexColorsArray(5);
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
const colors = generateColorsAvoidingBgColor("#FFFFFF", 3);
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
const colors = generateColorsAvoidingArray(avoidColors, 3);
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
const colors = generateColorsWithMemoryAvoidingShades("#FFFFFF", 5, true);
console.log(colors); // e.g., ["#E57373", "#F06292", "#BA68C8", "#64B5F6", "#4DB6AC"]
```

## License

This package is licensed under the [MIT License](LICENSE).

## Class Definitions

### `ColorGenerator`

This class provides static and instance methods to generate hex color codes.

#### Methods

- **`generateRandomHexColor()`**: Generates a single random hex color code.
- **`generateRandomHexColorsArray(num: number)`**: Generates an array of random hex color codes.
- **`generateColorsAvoidingBgColor(bgColor: string, num: number)`**: Generates an array of hex color codes avoiding shades of a specified background color.
- **`generateColorsAvoidingArray(avoidColors: string[], num: number)`**: Generates an array of hex color codes that do not include any colors from a specified array.
- **`generateColorsWithMemoryAvoidingShades(bgColor: string, num: number, remember: boolean)`**: Generates an array of hex color codes, optionally remembering previously generated colors and avoiding shades of a specified background color.

**Note**: The `ColorGenerator` class contains internal methods and utilities used for color generation, but these are not exposed for direct use.

## License

This package is licensed under the [MIT License](LICENSE).