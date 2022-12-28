# Game Component: Debug

A component for rendering debug output on a canvas.

## How to use

Initialise debug before use:

```ts
import Debug from '@basementuniverse/debug';

Debug.initialise();
```

Render the debug output:

```ts
class Game {
  // ...

  public draw(context: CanvasRenderingContext2D) {
    // Draw everything else...

    Debug.draw(context);
  }
}
```

Show a value in a corner of the screen:

```ts
Debug.value('FPS', game.fps);
```

Show a marker somewhere on the screen:

```ts
Debug.marker('player', player.name, player.position);
```

## Options

```ts
const options = { ... };
Debug.initialise(options);
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `margin` | `number` | `10` | Edge of screen margin |
| `padding` | `number` | `4` | Padding between debug text and background |
| `font` | `string` | `10pt Lucida Console, monospace` | The font to use |
| `lineHeight` | `number` | `12` | The height of a line of text |
| `foregroundColour` | `string` | `#fff` | The colour of the text |
| `backgroundColour` | `string` | `#333` | The colour of the background |
| `defaultValue` | `DebugValue` | (see below) | Default options for values |
| `defaultMarker` | `DebugMarker` | (see below) | Default options for markers |

### Value options

```ts
const options = { ... };
Debug.value('FPS', game.fps, options);
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `'left' | 'right'` | `'left'` | Screen alignment |
| `showLabel` | `boolean` | `true` | Show the label |
| `padding` | `number` | `4` | Padding between debug text and background |
| `font` | `string` | `10pt Lucida Console, monospace` | The font to use |
| `foregroundColour` | `string` | `#fff` | The colour of the text |
| `backgroundColour` | `string` | `#333` | The colour of the background |

### Marker options

```ts
const options = { ... };
Debug.marker('player', player.name, player.position, options);
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `showLabel` | `boolean` | `true` | Show the label |
| `showValue` | `boolean` | `true` | Show the value |
| `showMarker` | `boolean` | `true` | Show a marker icon |
| `markerSize` | `number` | `6` | The size of the marker icon in px |
| `markerStyle` | `'x' | '+' | '.'` | `'x'` | The style of the marker icon |
| `markerColour` | `string` | `#ccc` | The colour of the marker icon |
| `space` | `'world' | 'screen'` | `'world'` | Position this marker in world or screen space |
| `padding` | `number` | `4` | Padding between debug text and background |
| `font` | `string` | `10pt Lucida Console, monospace` | The font to use |
| `labelOffset` | `vec` | `{ x: 10, y: 10 }` | The offset of the label from the marker |
| `foregroundColour` | `string` | `#fff` | The colour of the text |
| `backgroundColour` | `string` | `#333` | The colour of the background |
