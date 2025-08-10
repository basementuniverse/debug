import { vec2 } from '@basementuniverse/vec';
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
     * Margin between each line of debug text
     */
    lineMargin: number;
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
     * Default debug chart options
     */
    defaultChart: DebugChart;
    /**
     * Default debug marker options
     */
    defaultMarker: DebugMarker;
    /**
     * Default debug border options
     */
    defaultBorder: DebugBorder;
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
    tags?: string[];
};
export type DebugChart = {
    label?: string;
    values: number[];
    valueBufferSize: number;
    valueBufferStride: number;
    minValue: number;
    maxValue: number;
    barWidth: number;
    barColours?: {
        offset: number;
        colour: string;
    }[];
    align: 'left' | 'right';
    showLabel: boolean;
    padding?: number;
    font?: string;
    foregroundColour?: string;
    backgroundColour?: string;
    chartBackgroundColour?: string;
    tags?: string[];
};
export type DebugMarker = {
    label?: string;
    value?: number | string;
    position?: vec2;
    showLabel: boolean;
    showValue: boolean;
    showMarker: boolean;
    markerSize: number;
    markerLineWidth: number;
    markerStyle: 'x' | '+' | '.';
    markerImage?: HTMLImageElement | HTMLCanvasElement;
    markerColour: string;
    space: 'world' | 'screen';
    padding?: number;
    font?: string;
    labelOffset: vec2;
    foregroundColour?: string;
    backgroundColour?: string;
    tags?: string[];
};
export type DebugBorder = {
    label?: string;
    value?: number | string;
    position?: vec2;
    size?: vec2;
    radius?: number;
    showLabel: boolean;
    showValue: boolean;
    showBorder: boolean;
    borderWidth: number;
    borderStyle: 'solid' | 'dashed' | 'dotted';
    borderShape: 'rectangle' | 'circle';
    borderColour: string;
    borderDashSize: number;
    space: 'world' | 'screen';
    padding?: number;
    font?: string;
    labelOffset: vec2;
    foregroundColour?: string;
    backgroundColour?: string;
    tags?: string[];
};
export default class Debug {
    private static instance;
    private static readonly DEFAULT_OPTIONS;
    private options;
    private values;
    private charts;
    private markers;
    private borders;
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
     * Show a debug chart
     */
    static chart(label: string, value: number, options?: Partial<DebugChart>): void;
    /**
     * Remove a debug chart
     */
    static removeChart(label: string): void;
    /**
     * Show a marker in world or screen space
     */
    static marker(label: string, value: string | number, position: vec2, options?: Partial<DebugMarker>): void;
    /**
     * Show a border in world or screen space
     */
    static border(label: string, value: string | number, position: vec2, options?: Partial<DebugBorder>): void;
    /**
     * Render the debug values and markers onto a canvas
     */
    static draw(context: CanvasRenderingContext2D, tags?: string[], clear?: boolean): void;
    static clear(clearCharts?: boolean): void;
    private static prepareLabel;
    private drawLabel;
    private drawChart;
    private drawMarker;
    private drawCross;
    private drawPlus;
    private drawDot;
    private drawBorder;
    private drawRectangle;
    private drawCircle;
}
