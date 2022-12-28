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
    private static instance;
    private static readonly defaultOptions;
    private options;
    private values;
    private markers;
    private constructor();
    /**
     * Initialise the debug renderer for displaying values and markers
     */
    static initialise(options?: Partial<DebugOptions>): void;
    private static getInstance;
    /**
     * Show a debug value
     */
    static value(label: string, value: string | number, options?: Partial<DebugValue>): void;
    /**
     * Show a marker in world or screen space
     */
    static marker(label: string, value: string | number, position: vec, options?: Partial<DebugMarker>): void;
    /**
     * Render the debug values and markers onto a canvas
     */
    static draw(context: CanvasRenderingContext2D): void;
    private drawMarker;
    private drawLabel;
    private drawCross;
    private drawPlus;
    private drawDot;
}
