import { EventEmitter, InjectionToken, NgZone } from '@angular/core';
import * as MapboxGl from 'mapbox-gl';
import { Observable } from 'rxjs';
import { LayerEvents, MapEvent, MapImageData, MapImageOptions } from './map.types';
import * as i0 from "@angular/core";
export declare const MAPBOX_API_KEY: InjectionToken<unknown>;
export interface SetupMap {
    accessToken?: string;
    customMapboxApiUrl?: string;
    mapOptions: Omit<MapboxGl.MapboxOptions, 'bearing' | 'pitch' | 'zoom'> & {
        bearing?: [number];
        pitch?: [number];
        zoom?: [number];
    };
    mapEvents: MapEvent;
}
export interface SetupLayer {
    layerOptions: MapboxGl.Layer;
    layerEvents: LayerEvents;
}
export interface SetupPopup {
    popupOptions: MapboxGl.PopupOptions;
    popupEvents: {
        open: EventEmitter<void>;
        close: EventEmitter<void>;
        popupOpen: EventEmitter<void>;
        popupClose: EventEmitter<void>;
    };
}
export interface SetupMarker {
    markersOptions: {
        pitchAlignment?: MapboxGl.MarkerOptions['pitchAlignment'];
        rotationAlignment?: MapboxGl.MarkerOptions['rotationAlignment'];
        offset?: MapboxGl.MarkerOptions['offset'];
        anchor?: MapboxGl.MarkerOptions['anchor'];
        draggable?: MapboxGl.MarkerOptions['draggable'];
        element: HTMLElement;
        feature?: GeoJSON.Feature<GeoJSON.Point>;
        lngLat?: MapboxGl.LngLatLike;
        clickTolerance?: MapboxGl.MarkerOptions['clickTolerance'];
    };
    markersEvents: {
        markerDragStart: EventEmitter<MapboxGl.Marker>;
        markerDrag: EventEmitter<MapboxGl.Marker>;
        markerDragEnd: EventEmitter<MapboxGl.Marker>;
        dragStart: EventEmitter<MapboxGl.Marker>;
        drag: EventEmitter<MapboxGl.Marker>;
        dragEnd: EventEmitter<MapboxGl.Marker>;
    };
}
export type MovingOptions = MapboxGl.FlyToOptions | (MapboxGl.AnimationOptions & MapboxGl.CameraOptions) | MapboxGl.CameraOptions;
export declare class MapService {
    private zone;
    private readonly MAPBOX_API_KEY;
    mapInstance: MapboxGl.Map;
    mapCreated$: Observable<void>;
    mapLoaded$: Observable<void>;
    mapEvents: MapEvent;
    private mapCreated;
    private mapLoaded;
    private markersToRemove;
    private popupsToRemove;
    private imageIdsToRemove;
    private subscription;
    constructor(zone: NgZone, MAPBOX_API_KEY: string | null);
    setup(options: SetupMap): void;
    destroyMap(): void;
    updateProjection(projection: MapboxGl.MapboxOptions['projection']): void;
    updateMinZoom(minZoom: number): void;
    updateMaxZoom(maxZoom: number): void;
    updateMinPitch(minPitch: number): void;
    updateMaxPitch(maxPitch: number): void;
    updateRenderWorldCopies(status: boolean): void;
    updateScrollZoom(status: boolean): void;
    updateDragRotate(status: boolean): void;
    updateTouchPitch(status: boolean): void;
    updateTouchZoomRotate(status: boolean): void;
    updateDoubleClickZoom(status: boolean): void;
    updateKeyboard(status: boolean): void;
    updateDragPan(status: boolean): void;
    updateBoxZoom(status: boolean): void;
    updateStyle(style: MapboxGl.Style): void;
    updateMaxBounds(maxBounds: MapboxGl.LngLatBoundsLike): void;
    changeCanvasCursor(cursor: string): void;
    queryRenderedFeatures(pointOrBox?: MapboxGl.PointLike | [MapboxGl.PointLike, MapboxGl.PointLike], parameters?: {
        layers?: string[];
        filter?: any[];
    }): GeoJSON.Feature<GeoJSON.GeometryObject>[];
    panTo(center: MapboxGl.LngLatLike, options?: MapboxGl.AnimationOptions): void;
    move(movingMethod: 'jumpTo' | 'easeTo' | 'flyTo', movingOptions?: MovingOptions, zoom?: number, center?: MapboxGl.LngLatLike, bearing?: number, pitch?: number): void;
    addLayer(layer: SetupLayer, bindEvents: boolean, before?: string): void;
    removeLayer(layerId: string): void;
    addMarker(marker: SetupMarker): MapboxGl.Marker;
    removeMarker(marker: MapboxGl.Marker): void;
    createPopup(popup: SetupPopup, element: Node): MapboxGl.Popup;
    addPopupToMap(popup: MapboxGl.Popup, lngLat: MapboxGl.LngLatLike, skipOpenEvent?: boolean): void;
    addPopupToMarker(marker: MapboxGl.Marker, popup: MapboxGl.Popup): void;
    removePopupFromMap(popup: MapboxGl.Popup, skipCloseEvent?: boolean): void;
    removePopupFromMarker(marker: MapboxGl.Marker): void;
    addControl(control: MapboxGl.Control | MapboxGl.IControl, position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'): void;
    removeControl(control: MapboxGl.Control | MapboxGl.IControl): void;
    loadAndAddImage(imageId: string, url: string, options?: MapImageOptions): Promise<void>;
    addImage(imageId: string, data: MapImageData, options?: MapImageOptions): void;
    removeImage(imageId: string): void;
    addSource(sourceId: string, source: MapboxGl.AnySourceData): void;
    getSource<T extends MapboxGl.AnySourceImpl>(sourceId: string): T;
    removeSource(sourceId: string): void;
    setAllLayerPaintProperty(layerId: string, paint: MapboxGl.BackgroundPaint | MapboxGl.FillPaint | MapboxGl.FillExtrusionPaint | MapboxGl.LinePaint | MapboxGl.SymbolPaint | MapboxGl.RasterPaint | MapboxGl.CirclePaint): void;
    setAllLayerLayoutProperty(layerId: string, layout: MapboxGl.BackgroundLayout | MapboxGl.FillLayout | MapboxGl.FillExtrusionLayout | MapboxGl.LineLayout | MapboxGl.SymbolLayout | MapboxGl.RasterLayout | MapboxGl.CircleLayout): void;
    setLayerFilter(layerId: string, filter: any[]): void;
    setLayerBefore(layerId: string, beforeId: string): void;
    setLayerZoomRange(layerId: string, minZoom?: number, maxZoom?: number): void;
    fitBounds(bounds: MapboxGl.LngLatBoundsLike, options?: MapboxGl.FitBoundsOptions): void;
    fitScreenCoordinates(points: [MapboxGl.PointLike, MapboxGl.PointLike], bearing: number, options?: MapboxGl.AnimationOptions & MapboxGl.CameraOptions): void;
    applyChanges(): void;
    private createMap;
    private removeMarkers;
    private removePopups;
    private removeImages;
    private findLayersBySourceId;
    private hookEvents;
    private assign;
    static ɵfac: i0.ɵɵFactoryDeclaration<MapService, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MapService>;
}
