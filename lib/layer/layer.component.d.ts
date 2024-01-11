import { EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AnyLayer, EventData, Layer } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { LayerEvents } from '../map/map.types';
import * as i0 from "@angular/core";
export declare class LayerComponent implements OnInit, OnDestroy, OnChanges, Layer, LayerEvents {
    private mapService;
    id: AnyLayer['id'];
    source?: Layer['source'];
    type: AnyLayer['type'];
    metadata?: Layer['metadata'];
    sourceLayer?: Layer['source-layer'];
    filter?: Layer['filter'];
    layout?: Layer['layout'];
    paint?: Layer['paint'];
    before?: string;
    minzoom?: Layer['minzoom'];
    maxzoom?: Layer['maxzoom'];
    layerClick: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    layerDblClick: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    layerMouseDown: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    layerMouseUp: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    layerMouseEnter: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    layerMouseLeave: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    layerMouseMove: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    layerMouseOver: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    layerMouseOut: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    layerContextMenu: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    layerTouchStart: EventEmitter<import("mapbox-gl").MapTouchEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    layerTouchEnd: EventEmitter<import("mapbox-gl").MapTouchEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    layerTouchCancel: EventEmitter<import("mapbox-gl").MapTouchEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    /**
     * @deprecated Use layerClick instead
     */
    click: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    /**
     * @deprecated Use layerDblClick instead
     */
    dblClick: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    /**
     * @deprecated Use layerMouseDown instead
     */
    mouseDown: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    /**
     * @deprecated Use layerMouseUp instead
     */
    mouseUp: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    /**
     * @deprecated Use layerMouseEnter instead
     */
    mouseEnter: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    /**
     * @deprecated Use layerMouseLeave instead
     */
    mouseLeave: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    /**
     * @deprecated Use layerMouseMove instead
     */
    mouseMove: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    /**
     * @deprecated Use layerMouseOver instead
     */
    mouseOver: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    /**
     * @deprecated Use layerMouseOut instead
     */
    mouseOut: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    /**
     * @deprecated Use layerContextMenu instead
     */
    contextMenu: EventEmitter<import("mapbox-gl").MapMouseEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    /**
     * @deprecated Use layerTouchStart instead
     */
    touchStart: EventEmitter<import("mapbox-gl").MapTouchEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    /**
     * @deprecated Use layerTouchEnd instead
     */
    touchEnd: EventEmitter<import("mapbox-gl").MapTouchEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    /**
     * @deprecated Use layerTouchCancel instead
     */
    touchCancel: EventEmitter<import("mapbox-gl").MapTouchEvent & {
        features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & EventData>;
    private layerAdded;
    private sub;
    constructor(mapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
    private warnDeprecatedOutputs;
    static ɵfac: i0.ɵɵFactoryDeclaration<LayerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LayerComponent, "mgl-layer", never, { "id": { "alias": "id"; "required": false; }; "source": { "alias": "source"; "required": false; }; "type": { "alias": "type"; "required": false; }; "metadata": { "alias": "metadata"; "required": false; }; "sourceLayer": { "alias": "sourceLayer"; "required": false; }; "filter": { "alias": "filter"; "required": false; }; "layout": { "alias": "layout"; "required": false; }; "paint": { "alias": "paint"; "required": false; }; "before": { "alias": "before"; "required": false; }; "minzoom": { "alias": "minzoom"; "required": false; }; "maxzoom": { "alias": "maxzoom"; "required": false; }; }, { "layerClick": "layerClick"; "layerDblClick": "layerDblClick"; "layerMouseDown": "layerMouseDown"; "layerMouseUp": "layerMouseUp"; "layerMouseEnter": "layerMouseEnter"; "layerMouseLeave": "layerMouseLeave"; "layerMouseMove": "layerMouseMove"; "layerMouseOver": "layerMouseOver"; "layerMouseOut": "layerMouseOut"; "layerContextMenu": "layerContextMenu"; "layerTouchStart": "layerTouchStart"; "layerTouchEnd": "layerTouchEnd"; "layerTouchCancel": "layerTouchCancel"; "click": "click"; "dblClick": "dblClick"; "mouseDown": "mouseDown"; "mouseUp": "mouseUp"; "mouseEnter": "mouseEnter"; "mouseLeave": "mouseLeave"; "mouseMove": "mouseMove"; "mouseOver": "mouseOver"; "mouseOut": "mouseOut"; "contextMenu": "contextMenu"; "touchStart": "touchStart"; "touchEnd": "touchEnd"; "touchCancel": "touchCancel"; }, never, never, false, never>;
}
