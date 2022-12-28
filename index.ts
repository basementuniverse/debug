import { vec } from '@basementuniverse/vec';

export type DebugOptions = {
  /**
   * Edge of screen margin
   */
  margin: number;

  /**
   * Space between debug text and background
   */
  padding: number;

  /**
   * The font to use when rendering debug text
   */
  font: string;

  /**
   * Line height of debug text
   */
  lineHeight: number;

  /**
   * Foreground colour of debug text
   */
  foregroundColour: string;

  /**
   * Background colour of debug text
   */
  backgroundColour: string;

  /**
   * Default debug value options
   */
  defaultValue: DebugValue;

  /**
   * Default debug marker options
   */
  defaultMarker: DebugMarker;
};

export type DebugValue = {
  label?: string;
  value?: number | string;
  align: 'left' | 'right';
  showLabel: boolean;
  padding?: number;
  font?: string;
  foregroundColour?: string;
  backgroundColour?: string;
};

export type DebugMarker = {
  label?: string;
  value?: number | string;
  position?: vec;
  showLabel: boolean;
  showValue: boolean;
  showMarker: boolean;
  markerSize: number;
  markerStyle: 'x' | '+' | '.';
  markerColour: string;
  space: 'world' | 'screen';
  padding?: number;
  font?: string;
  labelOffset: vec;
  foregroundColour?: string;
  backgroundColour?: string;
};

export default class Debug {
  private static instance: Debug;

  private static readonly defaultOptions: DebugOptions = {
    margin: 10,
    padding: 4,
    font: '10pt Lucida Console, monospace',
    lineHeight: 12,
    foregroundColour: '#fff',
    backgroundColour: '#333',
    defaultValue: {
      align: 'left',
      showLabel: true,
    },
    defaultMarker: {
      showLabel: true,
      showValue: true,
      showMarker: true,
      markerSize: 6,
      markerStyle: 'x',
      markerColour: '#ccc',
      space: 'world',
      labelOffset: vec(10),
    },
  };

  private options: DebugOptions;

  private values: Map<string, DebugValue>;

  private markers: Map<string, DebugMarker>;

  private constructor(options?: Partial<DebugOptions>) {
    this.options = Object.assign({}, Debug.defaultOptions, options ?? {});
    this.values = new Map<string, DebugValue>();
    this.markers = new Map<string, DebugMarker>();
  }

  /**
   * Initialise the debug renderer for displaying values and markers
   */
  public static initialise(options: Partial<DebugOptions> = {}) {
    if (Debug.instance !== undefined) {
      throw new Error('Debug has already been initialised');
    }
    Debug.instance = new Debug(options);
  }

  private static getInstance(): Debug {
    if (Debug.instance === undefined) {
      throw new Error('Debug not properly initialised');
    }

    return Debug.instance;
  }

  /**
   * Show a debug value
   */
  public static value(
    label: string,
    value: string | number,
    options?: Partial<DebugValue>
  ) {
    const instance = Debug.getInstance();

    instance.values.set(label, Object.assign(
      { label, value },
      instance.options.defaultValue,
      options
    ));
  }

  /**
   * Show a marker in world or screen space
   */
  public static marker(
    label: string,
    value: string | number,
    position: vec,
    options?: Partial<DebugMarker>
  ) {
    const instance = Debug.getInstance();

    instance.markers.set(label, Object.assign(
      { label, value, position },
      instance.options.defaultMarker,
      options
    ));
  }

  /**
   * Render the debug values and markers onto a canvas
   */
  public static draw(context: CanvasRenderingContext2D) {
    const instance = Debug.getInstance();

    // Draw world-space markers
    context.save();
    instance.markers.forEach(marker => {
      if (marker.space === 'world') {
        instance.drawMarker(context, marker);
      }
    });
    context.restore();

    // Draw values and screen-space markers
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    let position: vec;
    let leftY = instance.options.margin;
    let rightY = instance.options.margin;
    const lineHeight = (instance.options.lineHeight + instance.options.padding * 2);
    instance.values.forEach(value => {
      switch (value.align) {
        case 'left':
          position = vec(instance.options.margin, leftY);
          leftY += lineHeight;
          break;
        case 'right':
          position = vec(context.canvas.clientWidth - instance.options.margin, rightY);
          rightY += lineHeight;
          break;
      }
      instance.drawLabel(
        context,
        (value.showLabel ? `${value.label}: ` : '') + `${value.value}`,
        position,
        value.align,
        value.padding ?? instance.options.padding,
        value.font ?? instance.options.font,
        value.foregroundColour ?? instance.options.foregroundColour,
        value.backgroundColour ?? instance.options.backgroundColour
      );
    });
    instance.markers.forEach(marker => {
      if (marker.space === 'screen') {
        instance.drawMarker(context, marker);
      }
    });
    context.restore();

    // Clear values and markers ready for next frame
    instance.values.clear();
    instance.markers.clear();
  }

  private drawMarker(context: CanvasRenderingContext2D, marker: DebugMarker) {
    context.save();
    const position = marker.position ?? vec();
    if (marker.showLabel || marker.showValue) {
      this.drawLabel(
        context,
        (marker.showLabel ? `${marker.label}: ` : '') + (marker.showValue ? `${marker.value}` : ''),
        vec.add(position ?? vec(), marker.labelOffset),
        'left',
        marker.padding ?? this.options.padding,
        marker.font ?? this.options.font,
        marker.foregroundColour ?? this.options.foregroundColour,
        marker.backgroundColour ?? this.options.backgroundColour
      );
    }
    if (marker.showMarker) {
      context.lineWidth = 2;
      context.strokeStyle = context.fillStyle = marker.markerColour;
      switch (marker.markerStyle) {
        case 'x':
          this.drawCross(context, position, marker.markerSize);
          break;
        case '+':
          this.drawPlus(context, position, marker.markerSize);
          break;
        case '.':
          this.drawDot(context, position, marker.markerSize);
          break;
      }
    }
    context.restore();
  }

  private drawLabel(
    context: CanvasRenderingContext2D,
    text: string,
    position: vec,
    align: 'left' | 'right',
    padding: number,
    font: string,
    foregroundColour: string,
    backgroundColour: string
  ) {
    context.save();
    context.font = font;
    context.textBaseline = 'top';
    const backgroundSize = {
      width: context.measureText(text).width + padding * 2,
      height: this.options.lineHeight + padding * 2,
    };
    const x = align === 'right' ? (position.x - backgroundSize.width) : position.x;

    // Draw background
    context.fillStyle = backgroundColour;
    context.fillRect(
      x - padding,
      position.y - padding,
      backgroundSize.width,
      backgroundSize.height
    );

    // Draw text
    context.fillStyle = foregroundColour;
    context.fillText(text, x, position.y);
    context.restore();
  }

  private drawCross(context: CanvasRenderingContext2D, position: vec, size: number) {
    context.beginPath();
    const halfSize = size / 2;
    context.moveTo(position.x - halfSize, position.y - halfSize);
    context.lineTo(position.x + halfSize, position.y + halfSize);
    context.moveTo(position.x - halfSize, position.y + halfSize);
    context.lineTo(position.x + halfSize, position.y - halfSize);
    context.stroke();
  }

  private drawPlus(context: CanvasRenderingContext2D, position: vec, size: number) {
    context.beginPath();
    const halfSize = size / 2;
    context.moveTo(position.x, position.y - halfSize);
    context.lineTo(position.x, position.y + halfSize);
    context.moveTo(position.x - halfSize, position.y);
    context.lineTo(position.x + halfSize, position.y);
    context.stroke();
  }

  private drawDot(context: CanvasRenderingContext2D, position: vec, size: number) {
    context.beginPath();
    context.arc(position.x, position.y, size / 2, 0, Math.PI * 2);
    context.fill();
  }
}
