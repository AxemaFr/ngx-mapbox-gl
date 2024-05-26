import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { deprecationWarning } from '../utils.mjs';
import { MapService } from './map.service.mjs';
import * as i0 from "@angular/core";
import * as i1 from "./map.service.mjs";
class MapComponent {
    get mapInstance() {
        return this.mapService.mapInstance;
    }
    constructor(mapService) {
        this.mapService = mapService;
        /* Added by ngx-mapbox-gl */
        this.movingMethod = 'flyTo';
        this.mapResize = new EventEmitter();
        this.mapRemove = new EventEmitter();
        this.mapMouseDown = new EventEmitter();
        this.mapMouseUp = new EventEmitter();
        this.mapMouseMove = new EventEmitter();
        this.mapClick = new EventEmitter();
        this.mapDblClick = new EventEmitter();
        this.mapMouseOver = new EventEmitter();
        this.mapMouseOut = new EventEmitter();
        this.mapContextMenu = new EventEmitter();
        this.mapTouchStart = new EventEmitter();
        this.mapTouchEnd = new EventEmitter();
        this.mapTouchMove = new EventEmitter();
        this.mapTouchCancel = new EventEmitter();
        this.mapWheel = new EventEmitter();
        this.moveStart = new EventEmitter();
        this.move = new EventEmitter();
        this.moveEnd = new EventEmitter();
        this.mapDragStart = new EventEmitter();
        this.mapDrag = new EventEmitter();
        this.mapDragEnd = new EventEmitter();
        this.zoomStart = new EventEmitter();
        this.zoomEvt = new EventEmitter();
        this.zoomEnd = new EventEmitter();
        this.rotateStart = new EventEmitter();
        this.rotate = new EventEmitter();
        this.rotateEnd = new EventEmitter();
        this.pitchStart = new EventEmitter();
        this.pitchEvt = new EventEmitter();
        this.pitchEnd = new EventEmitter();
        this.boxZoomStart = new EventEmitter();
        this.boxZoomEnd = new EventEmitter();
        this.boxZoomCancel = new EventEmitter();
        this.webGlContextLost = new EventEmitter();
        this.webGlContextRestored = new EventEmitter();
        this.mapLoad = new EventEmitter();
        this.mapCreate = new EventEmitter();
        this.idle = new EventEmitter();
        this.render = new EventEmitter();
        this.mapError = new EventEmitter();
        this.data = new EventEmitter();
        this.styleData = new EventEmitter();
        this.sourceData = new EventEmitter();
        this.dataLoading = new EventEmitter();
        this.styleDataLoading = new EventEmitter();
        this.sourceDataLoading = new EventEmitter();
        this.styleImageMissing = new EventEmitter();
        /**
         * @deprecated Use mapResize instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.resize = new EventEmitter();
        /**
         * @deprecated Use mapRemove instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.remove = new EventEmitter();
        /**
         * @deprecated Use mapMouseDown instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.mouseDown = new EventEmitter();
        /**
         * @deprecated Use mapMouseUp instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.mouseUp = new EventEmitter();
        /**
         * @deprecated Use mapMouseMove instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.mouseMove = new EventEmitter();
        /**
         * @deprecated Use mapClick instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.click = new EventEmitter();
        /**
         * @deprecated Use mapDblClick instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.dblClick = new EventEmitter();
        /**
         * @deprecated Use mapMouseOver instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.mouseOver = new EventEmitter();
        /**
         * @deprecated Use mapMouseOut instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.mouseOut = new EventEmitter();
        /**
         * @deprecated Use mapContextMenu instead
         */
        this.contextMenu = new EventEmitter();
        /**
         * @deprecated Use mapTouchStart instead
         */
        this.touchStart = new EventEmitter();
        /**
         * @deprecated Use mapTouchEnd instead
         */
        this.touchEnd = new EventEmitter();
        /**
         * @deprecated Use mapTouchMove instead
         */
        this.touchMove = new EventEmitter();
        /**
         * @deprecated Use mapTouchCancel instead
         */
        this.touchCancel = new EventEmitter();
        /**
         * @deprecated Use mapWheel instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.wheel = new EventEmitter();
        /**
         * @deprecated Use mapDragStart instead
         */
        this.dragStart = new EventEmitter();
        /**
         * @deprecated Use mapDrag instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.drag = new EventEmitter();
        /**
         * @deprecated Use mapDragEnd instead
         */
        this.dragEnd = new EventEmitter();
        /**
         * @deprecated Use mapLoad instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.load = new EventEmitter();
        /**
         * @deprecated Use mapError instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.error = new EventEmitter();
    }
    ngAfterViewInit() {
        this.warnDeprecatedOutputs();
        this.mapService.setup({
            accessToken: this.accessToken,
            customMapboxApiUrl: this.customMapboxApiUrl,
            mapOptions: {
                collectResourceTiming: this.collectResourceTiming,
                container: this.mapContainer.nativeElement,
                crossSourceCollisions: this.crossSourceCollisions,
                fadeDuration: this.fadeDuration,
                minZoom: this.minZoom,
                maxZoom: this.maxZoom,
                minPitch: this.minPitch,
                maxPitch: this.maxPitch,
                style: this.style,
                hash: this.hash,
                interactive: this.interactive,
                bearingSnap: this.bearingSnap,
                pitchWithRotate: this.pitchWithRotate,
                clickTolerance: this.clickTolerance,
                attributionControl: this.attributionControl,
                logoPosition: this.logoPosition,
                failIfMajorPerformanceCaveat: this.failIfMajorPerformanceCaveat,
                preserveDrawingBuffer: this.preserveDrawingBuffer,
                refreshExpiredTiles: this.refreshExpiredTiles,
                maxBounds: this.maxBounds,
                scrollZoom: this.scrollZoom,
                boxZoom: this.boxZoom,
                dragRotate: this.dragRotate,
                dragPan: this.dragPan,
                keyboard: this.keyboard,
                doubleClickZoom: this.doubleClickZoom,
                touchPitch: this.touchPitch,
                touchZoomRotate: this.touchZoomRotate,
                trackResize: this.trackResize,
                center: this.center,
                zoom: this.zoom,
                bearing: this.bearing,
                pitch: this.pitch,
                renderWorldCopies: this.renderWorldCopies,
                maxTileCacheSize: this.maxTileCacheSize,
                localIdeographFontFamily: this.localIdeographFontFamily,
                transformRequest: this.transformRequest,
                bounds: this.bounds ? this.bounds : this.fitBounds,
                fitBoundsOptions: this.fitBoundsOptions,
                antialias: this.antialias,
                locale: this.locale,
                cooperativeGestures: this.cooperativeGestures,
                projection: this.projection,
            },
            mapEvents: this,
        });
        if (this.cursorStyle) {
            this.mapService.changeCanvasCursor(this.cursorStyle);
        }
    }
    ngOnDestroy() {
        this.mapService.destroyMap();
    }
    async ngOnChanges(changes) {
        await lastValueFrom(this.mapService.mapCreated$);
        if (changes['cursorStyle'] && !changes['cursorStyle'].isFirstChange()) {
            this.mapService.changeCanvasCursor(changes['cursorStyle'].currentValue);
        }
        if (changes['projection'] && !changes['projection'].isFirstChange()) {
            this.mapService.updateProjection(changes['projection'].currentValue);
        }
        if (changes['minZoom'] && !changes['minZoom'].isFirstChange()) {
            this.mapService.updateMinZoom(changes['minZoom'].currentValue);
        }
        if (changes['maxZoom'] && !changes['maxZoom'].isFirstChange()) {
            this.mapService.updateMaxZoom(changes['maxZoom'].currentValue);
        }
        if (changes['minPitch'] && !changes['minPitch'].isFirstChange()) {
            this.mapService.updateMinPitch(changes['minPitch'].currentValue);
        }
        if (changes['maxPitch'] && !changes['maxPitch'].isFirstChange()) {
            this.mapService.updateMaxPitch(changes['maxPitch'].currentValue);
        }
        if (changes['renderWorldCopies'] &&
            !changes['renderWorldCopies'].isFirstChange()) {
            this.mapService.updateRenderWorldCopies(changes['renderWorldCopies'].currentValue);
        }
        if (changes['scrollZoom'] && !changes['scrollZoom'].isFirstChange()) {
            this.mapService.updateScrollZoom(changes['scrollZoom'].currentValue);
        }
        if (changes['dragRotate'] && !changes['dragRotate'].isFirstChange()) {
            this.mapService.updateDragRotate(changes['dragRotate'].currentValue);
        }
        if (changes['touchPitch'] && !changes['touchPitch'].isFirstChange()) {
            this.mapService.updateTouchPitch(changes['touchPitch'].currentValue);
        }
        if (changes['touchZoomRotate'] &&
            !changes['touchZoomRotate'].isFirstChange()) {
            this.mapService.updateTouchZoomRotate(changes['touchZoomRotate'].currentValue);
        }
        if (changes['doubleClickZoom'] &&
            !changes['doubleClickZoom'].isFirstChange()) {
            this.mapService.updateDoubleClickZoom(changes['doubleClickZoom'].currentValue);
        }
        if (changes['keyboard'] && !changes['keyboard'].isFirstChange()) {
            this.mapService.updateKeyboard(changes['keyboard'].currentValue);
        }
        if (changes['dragPan'] && !changes['dragPan'].isFirstChange()) {
            this.mapService.updateDragPan(changes['dragPan'].currentValue);
        }
        if (changes['boxZoom'] && !changes['boxZoom'].isFirstChange()) {
            this.mapService.updateBoxZoom(changes['boxZoom'].currentValue);
        }
        if (changes['style'] && !changes['style'].isFirstChange()) {
            this.mapService.updateStyle(changes['style'].currentValue);
        }
        if (changes['maxBounds'] && !changes['maxBounds'].isFirstChange()) {
            this.mapService.updateMaxBounds(changes['maxBounds'].currentValue);
        }
        if (changes['fitBounds'] &&
            changes['fitBounds'].currentValue &&
            !changes['fitBounds'].isFirstChange()) {
            this.mapService.fitBounds(changes['fitBounds'].currentValue, this.fitBoundsOptions);
        }
        if (changes['fitScreenCoordinates'] &&
            changes['fitScreenCoordinates'].currentValue) {
            if ((this.center || this.zoom || this.pitch || this.fitBounds) &&
                changes['fitScreenCoordinates'].isFirstChange()) {
                console.warn('[ngx-mapbox-gl] center / zoom / pitch / fitBounds inputs are being overridden by fitScreenCoordinates input');
            }
            this.mapService.fitScreenCoordinates(changes['fitScreenCoordinates'].currentValue, this.bearing ? this.bearing[0] : 0, this.movingOptions);
        }
        if (this.centerWithPanTo &&
            changes['center'] &&
            !changes['center'].isFirstChange() &&
            !changes['zoom'] &&
            !changes['bearing'] &&
            !changes['pitch']) {
            this.mapService.panTo(this.center, this.panToOptions);
        }
        else if ((changes['center'] && !changes['center'].isFirstChange()) ||
            (changes['zoom'] && !changes['zoom'].isFirstChange()) ||
            (changes['bearing'] &&
                !changes['bearing'].isFirstChange() &&
                !changes['fitScreenCoordinates']) ||
            (changes['pitch'] && !changes['pitch'].isFirstChange())) {
            this.mapService.move(this.movingMethod, this.movingOptions, changes['zoom'] && this.zoom ? this.zoom[0] : undefined, changes['center'] ? this.center : undefined, changes['bearing'] && this.bearing ? this.bearing[0] : undefined, changes['pitch'] && this.pitch ? this.pitch[0] : undefined);
        }
    }
    warnDeprecatedOutputs() {
        const dw = deprecationWarning.bind(undefined, MapComponent.name);
        if (this.resize.observed) {
            dw('resize', 'mapResize');
        }
        if (this.remove.observed) {
            dw('remove', 'mapRemove');
        }
        if (this.mouseDown.observed) {
            dw('mouseDown', 'mapMouseDown');
        }
        if (this.mouseUp.observed) {
            dw('mouseUp', 'mapMouseUp');
        }
        if (this.mouseMove.observed) {
            dw('mouseMove', 'mapMouseMove');
        }
        if (this.click.observed) {
            dw('click', 'mapClick');
        }
        if (this.dblClick.observed) {
            dw('dblClick', 'mapDblClick');
        }
        if (this.mouseOver.observed) {
            dw('mouseOver', 'mapMouseOver');
        }
        if (this.mouseOut.observed) {
            dw('mouseOut', 'mapMouseOut');
        }
        if (this.contextMenu.observed) {
            dw('contextMenu', 'mapContextMenu');
        }
        if (this.touchStart.observed) {
            dw('touchStart', 'mapTouchStart');
        }
        if (this.touchEnd.observed) {
            dw('touchEnd', 'mapTouchEnd');
        }
        if (this.touchMove.observed) {
            dw('touchMove', 'mapTouchMove');
        }
        if (this.touchCancel.observed) {
            dw('touchCancel', 'mapTouchCancel');
        }
        if (this.wheel.observed) {
            dw('wheel', 'mapWheel');
        }
        if (this.dragStart.observed) {
            dw('dragStart', 'mapDragStart');
        }
        if (this.drag.observed) {
            dw('drag', 'mapDrag');
        }
        if (this.dragEnd.observed) {
            dw('dragEnd', 'mapDragEnd');
        }
        if (this.load.observed) {
            dw('load', 'mapLoad');
        }
        if (this.error.observed) {
            dw('error', 'mapError');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MapComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: MapComponent, selector: "mgl-map", inputs: { accessToken: "accessToken", collectResourceTiming: "collectResourceTiming", crossSourceCollisions: "crossSourceCollisions", customMapboxApiUrl: "customMapboxApiUrl", fadeDuration: "fadeDuration", hash: "hash", refreshExpiredTiles: "refreshExpiredTiles", failIfMajorPerformanceCaveat: "failIfMajorPerformanceCaveat", bearingSnap: "bearingSnap", interactive: "interactive", pitchWithRotate: "pitchWithRotate", clickTolerance: "clickTolerance", attributionControl: "attributionControl", logoPosition: "logoPosition", maxTileCacheSize: "maxTileCacheSize", localIdeographFontFamily: "localIdeographFontFamily", preserveDrawingBuffer: "preserveDrawingBuffer", trackResize: "trackResize", transformRequest: "transformRequest", bounds: "bounds", antialias: "antialias", locale: "locale", cooperativeGestures: "cooperativeGestures", minZoom: "minZoom", maxZoom: "maxZoom", minPitch: "minPitch", maxPitch: "maxPitch", scrollZoom: "scrollZoom", dragRotate: "dragRotate", touchPitch: "touchPitch", touchZoomRotate: "touchZoomRotate", doubleClickZoom: "doubleClickZoom", keyboard: "keyboard", dragPan: "dragPan", boxZoom: "boxZoom", style: "style", center: "center", maxBounds: "maxBounds", zoom: "zoom", bearing: "bearing", pitch: "pitch", fitBoundsOptions: "fitBoundsOptions", renderWorldCopies: "renderWorldCopies", projection: "projection", movingMethod: "movingMethod", movingOptions: "movingOptions", fitBounds: "fitBounds", fitScreenCoordinates: "fitScreenCoordinates", centerWithPanTo: "centerWithPanTo", panToOptions: "panToOptions", cursorStyle: "cursorStyle" }, outputs: { mapResize: "mapResize", mapRemove: "mapRemove", mapMouseDown: "mapMouseDown", mapMouseUp: "mapMouseUp", mapMouseMove: "mapMouseMove", mapClick: "mapClick", mapDblClick: "mapDblClick", mapMouseOver: "mapMouseOver", mapMouseOut: "mapMouseOut", mapContextMenu: "mapContextMenu", mapTouchStart: "mapTouchStart", mapTouchEnd: "mapTouchEnd", mapTouchMove: "mapTouchMove", mapTouchCancel: "mapTouchCancel", mapWheel: "mapWheel", moveStart: "moveStart", move: "move", moveEnd: "moveEnd", mapDragStart: "mapDragStart", mapDrag: "mapDrag", mapDragEnd: "mapDragEnd", zoomStart: "zoomStart", zoomEvt: "zoomEvt", zoomEnd: "zoomEnd", rotateStart: "rotateStart", rotate: "rotate", rotateEnd: "rotateEnd", pitchStart: "pitchStart", pitchEvt: "pitchEvt", pitchEnd: "pitchEnd", boxZoomStart: "boxZoomStart", boxZoomEnd: "boxZoomEnd", boxZoomCancel: "boxZoomCancel", webGlContextLost: "webGlContextLost", webGlContextRestored: "webGlContextRestored", mapLoad: "mapLoad", mapCreate: "mapCreate", idle: "idle", render: "render", mapError: "mapError", data: "data", styleData: "styleData", sourceData: "sourceData", dataLoading: "dataLoading", styleDataLoading: "styleDataLoading", sourceDataLoading: "sourceDataLoading", styleImageMissing: "styleImageMissing", resize: "resize", remove: "remove", mouseDown: "mouseDown", mouseUp: "mouseUp", mouseMove: "mouseMove", click: "click", dblClick: "dblClick", mouseOver: "mouseOver", mouseOut: "mouseOut", contextMenu: "contextMenu", touchStart: "touchStart", touchEnd: "touchEnd", touchMove: "touchMove", touchCancel: "touchCancel", wheel: "wheel", dragStart: "dragStart", drag: "drag", dragEnd: "dragEnd", load: "load", error: "error" }, providers: [MapService], viewQueries: [{ propertyName: "mapContainer", first: true, predicate: ["container"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: `<div #container><ng-content select="content"></ng-content></div>`, isInline: true, styles: [":host{display:block}div{height:100%;width:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
export { MapComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MapComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mgl-map', template: `<div #container><ng-content select="content"></ng-content></div>`, providers: [MapService], changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:block}div{height:100%;width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MapService }]; }, propDecorators: { accessToken: [{
                type: Input
            }], collectResourceTiming: [{
                type: Input
            }], crossSourceCollisions: [{
                type: Input
            }], customMapboxApiUrl: [{
                type: Input
            }], fadeDuration: [{
                type: Input
            }], hash: [{
                type: Input
            }], refreshExpiredTiles: [{
                type: Input
            }], failIfMajorPerformanceCaveat: [{
                type: Input
            }], bearingSnap: [{
                type: Input
            }], interactive: [{
                type: Input
            }], pitchWithRotate: [{
                type: Input
            }], clickTolerance: [{
                type: Input
            }], attributionControl: [{
                type: Input
            }], logoPosition: [{
                type: Input
            }], maxTileCacheSize: [{
                type: Input
            }], localIdeographFontFamily: [{
                type: Input
            }], preserveDrawingBuffer: [{
                type: Input
            }], trackResize: [{
                type: Input
            }], transformRequest: [{
                type: Input
            }], bounds: [{
                type: Input
            }], antialias: [{
                type: Input
            }], locale: [{
                type: Input
            }], cooperativeGestures: [{
                type: Input
            }], minZoom: [{
                type: Input
            }], maxZoom: [{
                type: Input
            }], minPitch: [{
                type: Input
            }], maxPitch: [{
                type: Input
            }], scrollZoom: [{
                type: Input
            }], dragRotate: [{
                type: Input
            }], touchPitch: [{
                type: Input
            }], touchZoomRotate: [{
                type: Input
            }], doubleClickZoom: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], dragPan: [{
                type: Input
            }], boxZoom: [{
                type: Input
            }], style: [{
                type: Input
            }], center: [{
                type: Input
            }], maxBounds: [{
                type: Input
            }], zoom: [{
                type: Input
            }], bearing: [{
                type: Input
            }], pitch: [{
                type: Input
            }], fitBoundsOptions: [{
                type: Input
            }], renderWorldCopies: [{
                type: Input
            }], projection: [{
                type: Input
            }], movingMethod: [{
                type: Input
            }], movingOptions: [{
                type: Input
            }], fitBounds: [{
                type: Input
            }], fitScreenCoordinates: [{
                type: Input
            }], centerWithPanTo: [{
                type: Input
            }], panToOptions: [{
                type: Input
            }], cursorStyle: [{
                type: Input
            }], mapResize: [{
                type: Output
            }], mapRemove: [{
                type: Output
            }], mapMouseDown: [{
                type: Output
            }], mapMouseUp: [{
                type: Output
            }], mapMouseMove: [{
                type: Output
            }], mapClick: [{
                type: Output
            }], mapDblClick: [{
                type: Output
            }], mapMouseOver: [{
                type: Output
            }], mapMouseOut: [{
                type: Output
            }], mapContextMenu: [{
                type: Output
            }], mapTouchStart: [{
                type: Output
            }], mapTouchEnd: [{
                type: Output
            }], mapTouchMove: [{
                type: Output
            }], mapTouchCancel: [{
                type: Output
            }], mapWheel: [{
                type: Output
            }], moveStart: [{
                type: Output
            }], move: [{
                type: Output
            }], moveEnd: [{
                type: Output
            }], mapDragStart: [{
                type: Output
            }], mapDrag: [{
                type: Output
            }], mapDragEnd: [{
                type: Output
            }], zoomStart: [{
                type: Output
            }], zoomEvt: [{
                type: Output
            }], zoomEnd: [{
                type: Output
            }], rotateStart: [{
                type: Output
            }], rotate: [{
                type: Output
            }], rotateEnd: [{
                type: Output
            }], pitchStart: [{
                type: Output
            }], pitchEvt: [{
                type: Output
            }], pitchEnd: [{
                type: Output
            }], boxZoomStart: [{
                type: Output
            }], boxZoomEnd: [{
                type: Output
            }], boxZoomCancel: [{
                type: Output
            }], webGlContextLost: [{
                type: Output
            }], webGlContextRestored: [{
                type: Output
            }], mapLoad: [{
                type: Output
            }], mapCreate: [{
                type: Output
            }], idle: [{
                type: Output
            }], render: [{
                type: Output
            }], mapError: [{
                type: Output
            }], data: [{
                type: Output
            }], styleData: [{
                type: Output
            }], sourceData: [{
                type: Output
            }], dataLoading: [{
                type: Output
            }], styleDataLoading: [{
                type: Output
            }], sourceDataLoading: [{
                type: Output
            }], styleImageMissing: [{
                type: Output
            }], resize: [{
                type: Output
            }], remove: [{
                type: Output
            }], mouseDown: [{
                type: Output
            }], mouseUp: [{
                type: Output
            }], mouseMove: [{
                type: Output
            }], click: [{
                type: Output
            }], dblClick: [{
                type: Output
            }], mouseOver: [{
                type: Output
            }], mouseOut: [{
                type: Output
            }], contextMenu: [{
                type: Output
            }], touchStart: [{
                type: Output
            }], touchEnd: [{
                type: Output
            }], touchMove: [{
                type: Output
            }], touchCancel: [{
                type: Output
            }], wheel: [{
                type: Output
            }], dragStart: [{
                type: Output
            }], drag: [{
                type: Output
            }], dragEnd: [{
                type: Output
            }], load: [{
                type: Output
            }], error: [{
                type: Output
            }], mapContainer: [{
                type: ViewChild,
                args: ['container', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL21hcC9tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFtQnZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQWlCLE1BQU0sZUFBZSxDQUFDOzs7QUFHMUQsTUFpQmEsWUFBWTtJQTRQdkIsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztJQUNyQyxDQUFDO0lBSUQsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQXhNMUMsNEJBQTRCO1FBQ25CLGlCQUFZLEdBQWtDLE9BQU8sQ0FBQztRQVNyRCxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQTJCLENBQUM7UUFDeEQsY0FBUyxHQUFHLElBQUksWUFBWSxFQUEyQixDQUFDO1FBQ3hELGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQTZCLENBQUM7UUFDN0QsZUFBVSxHQUFHLElBQUksWUFBWSxFQUE2QixDQUFDO1FBQzNELGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQTZCLENBQUM7UUFDN0QsYUFBUSxHQUFHLElBQUksWUFBWSxFQUE2QixDQUFDO1FBQ3pELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQTZCLENBQUM7UUFDNUQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBNkIsQ0FBQztRQUM3RCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUE2QixDQUFDO1FB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LE1BQU07Z0JBS0csU0FBUztzQkFBbEIsTUFBTTtnQkFLRyxLQUFLO3NCQUFkLE1BQU07Z0JBS0csUUFBUTtzQkFBakIsTUFBTTtnQkFLRyxTQUFTO3NCQUFsQixNQUFNO2dCQUtHLFFBQVE7c0JBQWpCLE1BQU07Z0JBSUcsV0FBVztzQkFBcEIsTUFBTTtnQkFJRyxVQUFVO3NCQUFuQixNQUFNO2dCQUlHLFFBQVE7c0JBQWpCLE1BQU07Z0JBSUcsU0FBUztzQkFBbEIsTUFBTTtnQkFJRyxXQUFXO3NCQUFwQixNQUFNO2dCQUtHLEtBQUs7c0JBQWQsTUFBTTtnQkFJRyxTQUFTO3NCQUFsQixNQUFNO2dCQU9HLElBQUk7c0JBQWIsTUFBTTtnQkFNRyxPQUFPO3NCQUFoQixNQUFNO2dCQU9HLElBQUk7c0JBQWIsTUFBTTtnQkFLRyxLQUFLO3NCQUFkLE1BQU07Z0JBTW1DLFlBQVk7c0JBQXJELFNBQVM7dUJBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBbmltYXRpb25PcHRpb25zLFxuICBFcnJvckV2ZW50LFxuICBFdmVudERhdGEsXG4gIExuZ0xhdEJvdW5kc0xpa2UsXG4gIE1hcCxcbiAgTWFwQm94Wm9vbUV2ZW50LFxuICBNYXBDb250ZXh0RXZlbnQsXG4gIE1hcERhdGFFdmVudCxcbiAgTWFwTW91c2VFdmVudCxcbiAgTWFwU291cmNlRGF0YUV2ZW50LFxuICBNYXBTdHlsZURhdGFFdmVudCxcbiAgTWFwVG91Y2hFdmVudCxcbiAgTWFwV2hlZWxFdmVudCxcbiAgTWFwYm94RXZlbnQsXG4gIE1hcGJveE9wdGlvbnMsXG4gIFBvaW50TGlrZSxcbn0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGxhc3RWYWx1ZUZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlcHJlY2F0aW9uV2FybmluZyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IE1hcFNlcnZpY2UsIE1vdmluZ09wdGlvbnMgfSBmcm9tICcuL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcEV2ZW50IH0gZnJvbSAnLi9tYXAudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtbWFwJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICNjb250YWluZXI+PG5nLWNvbnRlbnQgc2VsZWN0PVwiY29udGVudFwiPjwvbmctY29udGVudD48L2Rpdj5gLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuICAgICAgZGl2IHtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cbiAgICBgLFxuICBdLFxuICBwcm92aWRlcnM6IFtNYXBTZXJ2aWNlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hcENvbXBvbmVudFxuICBpbXBsZW1lbnRzXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIE9taXQ8TWFwYm94T3B0aW9ucywgJ2JlYXJpbmcnIHwgJ2NvbnRhaW5lcicgfCAncGl0Y2gnIHwgJ3pvb20nPixcbiAgICBNYXBFdmVudFxue1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBhY2Nlc3NUb2tlbj86IE1hcGJveE9wdGlvbnNbJ2FjY2Vzc1Rva2VuJ107XG4gIEBJbnB1dCgpIGNvbGxlY3RSZXNvdXJjZVRpbWluZz86IE1hcGJveE9wdGlvbnNbJ2NvbGxlY3RSZXNvdXJjZVRpbWluZyddO1xuICBASW5wdXQoKSBjcm9zc1NvdXJjZUNvbGxpc2lvbnM/OiBNYXBib3hPcHRpb25zWydjcm9zc1NvdXJjZUNvbGxpc2lvbnMnXTtcbiAgQElucHV0KCkgY3VzdG9tTWFwYm94QXBpVXJsPzogc3RyaW5nO1xuICBASW5wdXQoKSBmYWRlRHVyYXRpb24/OiBNYXBib3hPcHRpb25zWydmYWRlRHVyYXRpb24nXTtcbiAgQElucHV0KCkgaGFzaD86IE1hcGJveE9wdGlvbnNbJ2hhc2gnXTtcbiAgQElucHV0KCkgcmVmcmVzaEV4cGlyZWRUaWxlcz86IE1hcGJveE9wdGlvbnNbJ3JlZnJlc2hFeHBpcmVkVGlsZXMnXTtcbiAgQElucHV0KClcbiAgZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdD86IE1hcGJveE9wdGlvbnNbJ2ZhaWxJZk1ham9yUGVyZm9ybWFuY2VDYXZlYXQnXTtcbiAgQElucHV0KCkgYmVhcmluZ1NuYXA/OiBNYXBib3hPcHRpb25zWydiZWFyaW5nU25hcCddO1xuICBASW5wdXQoKSBpbnRlcmFjdGl2ZT86IE1hcGJveE9wdGlvbnNbJ2ludGVyYWN0aXZlJ107XG4gIEBJbnB1dCgpIHBpdGNoV2l0aFJvdGF0ZT86IE1hcGJveE9wdGlvbnNbJ3BpdGNoV2l0aFJvdGF0ZSddO1xuICBASW5wdXQoKSBjbGlja1RvbGVyYW5jZT86IE1hcGJveE9wdGlvbnNbJ2NsaWNrVG9sZXJhbmNlJ107XG4gIEBJbnB1dCgpIGF0dHJpYnV0aW9uQ29udHJvbD86IE1hcGJveE9wdGlvbnNbJ2F0dHJpYnV0aW9uQ29udHJvbCddO1xuICBASW5wdXQoKSBsb2dvUG9zaXRpb24/OiBNYXBib3hPcHRpb25zWydsb2dvUG9zaXRpb24nXTtcbiAgQElucHV0KCkgbWF4VGlsZUNhY2hlU2l6ZT86IE1hcGJveE9wdGlvbnNbJ21heFRpbGVDYWNoZVNpemUnXTtcbiAgQElucHV0KCkgbG9jYWxJZGVvZ3JhcGhGb250RmFtaWx5PzogTWFwYm94T3B0aW9uc1snbG9jYWxJZGVvZ3JhcGhGb250RmFtaWx5J107XG4gIEBJbnB1dCgpIHByZXNlcnZlRHJhd2luZ0J1ZmZlcj86IE1hcGJveE9wdGlvbnNbJ3ByZXNlcnZlRHJhd2luZ0J1ZmZlciddO1xuICBASW5wdXQoKSB0cmFja1Jlc2l6ZT86IE1hcGJveE9wdGlvbnNbJ3RyYWNrUmVzaXplJ107XG4gIEBJbnB1dCgpIHRyYW5zZm9ybVJlcXVlc3Q/OiBNYXBib3hPcHRpb25zWyd0cmFuc2Zvcm1SZXF1ZXN0J107XG4gIEBJbnB1dCgpIGJvdW5kcz86IE1hcGJveE9wdGlvbnNbJ2JvdW5kcyddOyAvLyBVc2UgZml0Qm91bmRzIGZvciBkeW5hbWljIGlucHV0XG4gIEBJbnB1dCgpIGFudGlhbGlhcz86IE1hcGJveE9wdGlvbnNbJ2FudGlhbGlhcyddO1xuICBASW5wdXQoKSBsb2NhbGU/OiBNYXBib3hPcHRpb25zWydsb2NhbGUnXTtcbiAgQElucHV0KCkgY29vcGVyYXRpdmVHZXN0dXJlcz86IE1hcGJveE9wdGlvbnNbJ2Nvb3BlcmF0aXZlR2VzdHVyZXMnXTtcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBtaW5ab29tPzogTWFwYm94T3B0aW9uc1snbWluWm9vbSddO1xuICBASW5wdXQoKSBtYXhab29tPzogTWFwYm94T3B0aW9uc1snbWF4Wm9vbSddO1xuICBASW5wdXQoKSBtaW5QaXRjaD86IE1hcGJveE9wdGlvbnNbJ21pblBpdGNoJ107XG4gIEBJbnB1dCgpIG1heFBpdGNoPzogTWFwYm94T3B0aW9uc1snbWF4UGl0Y2gnXTtcbiAgQElucHV0KCkgc2Nyb2xsWm9vbT86IE1hcGJveE9wdGlvbnNbJ3Njcm9sbFpvb20nXTtcbiAgQElucHV0KCkgZHJhZ1JvdGF0ZT86IE1hcGJveE9wdGlvbnNbJ2RyYWdSb3RhdGUnXTtcbiAgQElucHV0KCkgdG91Y2hQaXRjaD86IE1hcGJveE9wdGlvbnNbJ3RvdWNoUGl0Y2gnXTtcbiAgQElucHV0KCkgdG91Y2hab29tUm90YXRlPzogTWFwYm94T3B0aW9uc1sndG91Y2hab29tUm90YXRlJ107XG4gIEBJbnB1dCgpIGRvdWJsZUNsaWNrWm9vbT86IE1hcGJveE9wdGlvbnNbJ2RvdWJsZUNsaWNrWm9vbSddO1xuICBASW5wdXQoKSBrZXlib2FyZD86IE1hcGJveE9wdGlvbnNbJ2tleWJvYXJkJ107XG4gIEBJbnB1dCgpIGRyYWdQYW4/OiBNYXBib3hPcHRpb25zWydkcmFnUGFuJ107XG4gIEBJbnB1dCgpIGJveFpvb20/OiBNYXBib3hPcHRpb25zWydib3hab29tJ107XG4gIEBJbnB1dCgpIHN0eWxlOiBNYXBib3hPcHRpb25zWydzdHlsZSddO1xuICBASW5wdXQoKSBjZW50ZXI/OiBNYXBib3hPcHRpb25zWydjZW50ZXInXTtcbiAgQElucHV0KCkgbWF4Qm91bmRzPzogTWFwYm94T3B0aW9uc1snbWF4Qm91bmRzJ107XG4gIEBJbnB1dCgpIHpvb20/OiBbbnVtYmVyXTtcbiAgQElucHV0KCkgYmVhcmluZz86IFtudW1iZXJdO1xuICBASW5wdXQoKSBwaXRjaD86IFtudW1iZXJdO1xuICAvLyBGaXJzdCB2YWx1ZSBnb2VzIHRvIG9wdGlvbnMuZml0Qm91bmRzT3B0aW9ucy4gU3Vic2VxdWVudHMgY2hhbmdlcyBhcmUgcGFzc2VkIHRvIGZpdEJvdW5kc1xuICBASW5wdXQoKSBmaXRCb3VuZHNPcHRpb25zPzogTWFwYm94T3B0aW9uc1snZml0Qm91bmRzT3B0aW9ucyddO1xuICBASW5wdXQoKSByZW5kZXJXb3JsZENvcGllcz86IE1hcGJveE9wdGlvbnNbJ3JlbmRlcldvcmxkQ29waWVzJ107XG4gIEBJbnB1dCgpIHByb2plY3Rpb24/OiBNYXBib3hPcHRpb25zWydwcm9qZWN0aW9uJ107XG5cbiAgLyogQWRkZWQgYnkgbmd4LW1hcGJveC1nbCAqL1xuICBASW5wdXQoKSBtb3ZpbmdNZXRob2Q6ICdqdW1wVG8nIHwgJ2Vhc2VUbycgfCAnZmx5VG8nID0gJ2ZseVRvJztcbiAgQElucHV0KCkgbW92aW5nT3B0aW9ucz86IE1vdmluZ09wdGlvbnM7XG4gIC8vID0+IEZpcnN0IHZhbHVlIGlzIGEgYWxpYXMgdG8gYm91bmRzIGlucHV0IChzaW5jZSBtYXBib3ggMC41My4wKS4gU3Vic2VxdWVudHMgY2hhbmdlcyBhcmUgcGFzc2VkIHRvIGZpdEJvdW5kc1xuICBASW5wdXQoKSBmaXRCb3VuZHM/OiBMbmdMYXRCb3VuZHNMaWtlO1xuICBASW5wdXQoKSBmaXRTY3JlZW5Db29yZGluYXRlcz86IFtQb2ludExpa2UsIFBvaW50TGlrZV07XG4gIEBJbnB1dCgpIGNlbnRlcldpdGhQYW5Ubz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHBhblRvT3B0aW9ucz86IEFuaW1hdGlvbk9wdGlvbnM7XG4gIEBJbnB1dCgpIGN1cnNvclN0eWxlPzogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBtYXBSZXNpemUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcGJveEV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgbWFwUmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBib3hFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIG1hcE1vdXNlRG93biA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIG1hcE1vdXNlVXAgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBtYXBNb3VzZU1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBtYXBDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIG1hcERibENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgbWFwTW91c2VPdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgbWFwTW91c2VPdXQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBtYXBDb250ZXh0TWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIG1hcFRvdWNoU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBtYXBUb3VjaEVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIG1hcFRvdWNoTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIG1hcFRvdWNoQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgbWFwV2hlZWwgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFdoZWVsRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBtb3ZlU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1hcGJveEV2ZW50PE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50IHwgV2hlZWxFdmVudCB8IHVuZGVmaW5lZD4gJiBFdmVudERhdGFcbiAgPigpO1xuICBAT3V0cHV0KCkgbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwYm94RXZlbnQ8TW91c2VFdmVudCB8IFRvdWNoRXZlbnQgfCBXaGVlbEV2ZW50IHwgdW5kZWZpbmVkPiAmIEV2ZW50RGF0YVxuICA+KCk7XG4gIEBPdXRwdXQoKSBtb3ZlRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBNYXBib3hFdmVudDxNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCB8IFdoZWVsRXZlbnQgfCB1bmRlZmluZWQ+ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIG1hcERyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwYm94RXZlbnQ8TW91c2VFdmVudCB8IFRvdWNoRXZlbnQgfCB1bmRlZmluZWQ+ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIG1hcERyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1hcGJveEV2ZW50PE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50IHwgdW5kZWZpbmVkPiAmIEV2ZW50RGF0YVxuICA+KCk7XG4gIEBPdXRwdXQoKSBtYXBEcmFnRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBNYXBib3hFdmVudDxNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCB8IHVuZGVmaW5lZD4gJiBFdmVudERhdGFcbiAgPigpO1xuICBAT3V0cHV0KCkgem9vbVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBNYXBib3hFdmVudDxNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCB8IFdoZWVsRXZlbnQgfCB1bmRlZmluZWQ+ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIHpvb21FdnQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1hcGJveEV2ZW50PE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50IHwgV2hlZWxFdmVudCB8IHVuZGVmaW5lZD4gJiBFdmVudERhdGFcbiAgPigpO1xuICBAT3V0cHV0KCkgem9vbUVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwYm94RXZlbnQ8TW91c2VFdmVudCB8IFRvdWNoRXZlbnQgfCBXaGVlbEV2ZW50IHwgdW5kZWZpbmVkPiAmIEV2ZW50RGF0YVxuICA+KCk7XG4gIEBPdXRwdXQoKSByb3RhdGVTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwYm94RXZlbnQ8TW91c2VFdmVudCB8IFRvdWNoRXZlbnQgfCB1bmRlZmluZWQ+ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIHJvdGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwYm94RXZlbnQ8TW91c2VFdmVudCB8IFRvdWNoRXZlbnQgfCB1bmRlZmluZWQ+ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIHJvdGF0ZUVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwYm94RXZlbnQ8TW91c2VFdmVudCB8IFRvdWNoRXZlbnQgfCB1bmRlZmluZWQ+ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIHBpdGNoU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1hcGJveEV2ZW50PE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50IHwgdW5kZWZpbmVkPiAmIEV2ZW50RGF0YVxuICA+KCk7XG4gIEBPdXRwdXQoKSBwaXRjaEV2dCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwYm94RXZlbnQ8TW91c2VFdmVudCB8IFRvdWNoRXZlbnQgfCB1bmRlZmluZWQ+ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIHBpdGNoRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBNYXBib3hFdmVudDxNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCB8IHVuZGVmaW5lZD4gJiBFdmVudERhdGFcbiAgPigpO1xuICBAT3V0cHV0KCkgYm94Wm9vbVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBCb3hab29tRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBib3hab29tRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBCb3hab29tRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBib3hab29tQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBCb3hab29tRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSB3ZWJHbENvbnRleHRMb3N0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBDb250ZXh0RXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSB3ZWJHbENvbnRleHRSZXN0b3JlZCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwQ29udGV4dEV2ZW50ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIG1hcExvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcGJveEV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgbWFwQ3JlYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXA+KCk7XG4gIEBPdXRwdXQoKSBpZGxlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBib3hFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIHJlbmRlciA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwYm94RXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBtYXBFcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8RXJyb3JFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIGRhdGEgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcERhdGFFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIHN0eWxlRGF0YSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwU3R5bGVEYXRhRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBzb3VyY2VEYXRhID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBTb3VyY2VEYXRhRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBkYXRhTG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRGF0YUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgc3R5bGVEYXRhTG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwU3R5bGVEYXRhRXZlbnQgJiBFdmVudERhdGFcbiAgPigpO1xuICBAT3V0cHV0KCkgc291cmNlRGF0YUxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1hcFNvdXJjZURhdGFFdmVudCAmIEV2ZW50RGF0YVxuICA+KCk7XG4gIEBPdXRwdXQoKSBzdHlsZUltYWdlTWlzc2luZyA9IG5ldyBFdmVudEVtaXR0ZXI8eyBpZDogc3RyaW5nIH0gJiBFdmVudERhdGE+KCk7XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBtYXBSZXNpemUgaW5zdGVhZFxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtbmF0aXZlXG4gIEBPdXRwdXQoKSByZXNpemUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcGJveEV2ZW50ICYgRXZlbnREYXRhPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcFJlbW92ZSBpbnN0ZWFkXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1uYXRpdmVcbiAgQE91dHB1dCgpIHJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwYm94RXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbWFwTW91c2VEb3duIGluc3RlYWRcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW5hdGl2ZVxuICBAT3V0cHV0KCkgbW91c2VEb3duID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcE1vdXNlVXAgaW5zdGVhZFxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtbmF0aXZlXG4gIEBPdXRwdXQoKSBtb3VzZVVwID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcE1vdXNlTW92ZSBpbnN0ZWFkXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1uYXRpdmVcbiAgQE91dHB1dCgpIG1vdXNlTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBtYXBDbGljayBpbnN0ZWFkXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1uYXRpdmVcbiAgQE91dHB1dCgpIGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcERibENsaWNrIGluc3RlYWRcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW5hdGl2ZVxuICBAT3V0cHV0KCkgZGJsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbWFwTW91c2VPdmVyIGluc3RlYWRcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW5hdGl2ZVxuICBAT3V0cHV0KCkgbW91c2VPdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcE1vdXNlT3V0IGluc3RlYWRcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW5hdGl2ZVxuICBAT3V0cHV0KCkgbW91c2VPdXQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbWFwQ29udGV4dE1lbnUgaW5zdGVhZFxuICAgKi9cbiAgQE91dHB1dCgpIGNvbnRleHRNZW51ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcFRvdWNoU3RhcnQgaW5zdGVhZFxuICAgKi9cbiAgQE91dHB1dCgpIHRvdWNoU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbWFwVG91Y2hFbmQgaW5zdGVhZFxuICAgKi9cbiAgQE91dHB1dCgpIHRvdWNoRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50ICYgRXZlbnREYXRhPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcFRvdWNoTW92ZSBpbnN0ZWFkXG4gICAqL1xuICBAT3V0cHV0KCkgdG91Y2hNb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50ICYgRXZlbnREYXRhPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcFRvdWNoQ2FuY2VsIGluc3RlYWRcbiAgICovXG4gIEBPdXRwdXQoKSB0b3VjaENhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBtYXBXaGVlbCBpbnN0ZWFkXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1uYXRpdmVcbiAgQE91dHB1dCgpIHdoZWVsID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBXaGVlbEV2ZW50ICYgRXZlbnREYXRhPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcERyYWdTdGFydCBpbnN0ZWFkXG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBNYXBib3hFdmVudDxNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCB8IHVuZGVmaW5lZD4gJiBFdmVudERhdGFcbiAgPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcERyYWcgaW5zdGVhZFxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtbmF0aXZlXG4gIEBPdXRwdXQoKSBkcmFnID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBNYXBib3hFdmVudDxNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCB8IHVuZGVmaW5lZD4gJiBFdmVudERhdGFcbiAgPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcERyYWdFbmQgaW5zdGVhZFxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1hcGJveEV2ZW50PE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50IHwgdW5kZWZpbmVkPiAmIEV2ZW50RGF0YVxuICA+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbWFwTG9hZCBpbnN0ZWFkXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1uYXRpdmVcbiAgQE91dHB1dCgpIGxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcD4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBtYXBFcnJvciBpbnN0ZWFkXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1uYXRpdmVcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxFcnJvckV2ZW50ICYgRXZlbnREYXRhPigpO1xuXG4gIGdldCBtYXBJbnN0YW5jZSgpOiBNYXAge1xuICAgIHJldHVybiB0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2U7XG4gIH1cblxuICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBtYXBDb250YWluZXI6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLndhcm5EZXByZWNhdGVkT3V0cHV0cygpO1xuICAgIHRoaXMubWFwU2VydmljZS5zZXR1cCh7XG4gICAgICBhY2Nlc3NUb2tlbjogdGhpcy5hY2Nlc3NUb2tlbixcbiAgICAgIGN1c3RvbU1hcGJveEFwaVVybDogdGhpcy5jdXN0b21NYXBib3hBcGlVcmwsXG4gICAgICBtYXBPcHRpb25zOiB7XG4gICAgICAgIGNvbGxlY3RSZXNvdXJjZVRpbWluZzogdGhpcy5jb2xsZWN0UmVzb3VyY2VUaW1pbmcsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5tYXBDb250YWluZXIubmF0aXZlRWxlbWVudCxcbiAgICAgICAgY3Jvc3NTb3VyY2VDb2xsaXNpb25zOiB0aGlzLmNyb3NzU291cmNlQ29sbGlzaW9ucyxcbiAgICAgICAgZmFkZUR1cmF0aW9uOiB0aGlzLmZhZGVEdXJhdGlvbixcbiAgICAgICAgbWluWm9vbTogdGhpcy5taW5ab29tLFxuICAgICAgICBtYXhab29tOiB0aGlzLm1heFpvb20sXG4gICAgICAgIG1pblBpdGNoOiB0aGlzLm1pblBpdGNoLFxuICAgICAgICBtYXhQaXRjaDogdGhpcy5tYXhQaXRjaCxcbiAgICAgICAgc3R5bGU6IHRoaXMuc3R5bGUsXG4gICAgICAgIGhhc2g6IHRoaXMuaGFzaCxcbiAgICAgICAgaW50ZXJhY3RpdmU6IHRoaXMuaW50ZXJhY3RpdmUsXG4gICAgICAgIGJlYXJpbmdTbmFwOiB0aGlzLmJlYXJpbmdTbmFwLFxuICAgICAgICBwaXRjaFdpdGhSb3RhdGU6IHRoaXMucGl0Y2hXaXRoUm90YXRlLFxuICAgICAgICBjbGlja1RvbGVyYW5jZTogdGhpcy5jbGlja1RvbGVyYW5jZSxcbiAgICAgICAgYXR0cmlidXRpb25Db250cm9sOiB0aGlzLmF0dHJpYnV0aW9uQ29udHJvbCxcbiAgICAgICAgbG9nb1Bvc2l0aW9uOiB0aGlzLmxvZ29Qb3NpdGlvbixcbiAgICAgICAgZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdDogdGhpcy5mYWlsSWZNYWpvclBlcmZvcm1hbmNlQ2F2ZWF0LFxuICAgICAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRoaXMucHJlc2VydmVEcmF3aW5nQnVmZmVyLFxuICAgICAgICByZWZyZXNoRXhwaXJlZFRpbGVzOiB0aGlzLnJlZnJlc2hFeHBpcmVkVGlsZXMsXG4gICAgICAgIG1heEJvdW5kczogdGhpcy5tYXhCb3VuZHMsXG4gICAgICAgIHNjcm9sbFpvb206IHRoaXMuc2Nyb2xsWm9vbSxcbiAgICAgICAgYm94Wm9vbTogdGhpcy5ib3hab29tLFxuICAgICAgICBkcmFnUm90YXRlOiB0aGlzLmRyYWdSb3RhdGUsXG4gICAgICAgIGRyYWdQYW46IHRoaXMuZHJhZ1BhbixcbiAgICAgICAga2V5Ym9hcmQ6IHRoaXMua2V5Ym9hcmQsXG4gICAgICAgIGRvdWJsZUNsaWNrWm9vbTogdGhpcy5kb3VibGVDbGlja1pvb20sXG4gICAgICAgIHRvdWNoUGl0Y2g6IHRoaXMudG91Y2hQaXRjaCxcbiAgICAgICAgdG91Y2hab29tUm90YXRlOiB0aGlzLnRvdWNoWm9vbVJvdGF0ZSxcbiAgICAgICAgdHJhY2tSZXNpemU6IHRoaXMudHJhY2tSZXNpemUsXG4gICAgICAgIGNlbnRlcjogdGhpcy5jZW50ZXIsXG4gICAgICAgIHpvb206IHRoaXMuem9vbSxcbiAgICAgICAgYmVhcmluZzogdGhpcy5iZWFyaW5nLFxuICAgICAgICBwaXRjaDogdGhpcy5waXRjaCxcbiAgICAgICAgcmVuZGVyV29ybGRDb3BpZXM6IHRoaXMucmVuZGVyV29ybGRDb3BpZXMsXG4gICAgICAgIG1heFRpbGVDYWNoZVNpemU6IHRoaXMubWF4VGlsZUNhY2hlU2l6ZSxcbiAgICAgICAgbG9jYWxJZGVvZ3JhcGhGb250RmFtaWx5OiB0aGlzLmxvY2FsSWRlb2dyYXBoRm9udEZhbWlseSxcbiAgICAgICAgdHJhbnNmb3JtUmVxdWVzdDogdGhpcy50cmFuc2Zvcm1SZXF1ZXN0LFxuICAgICAgICBib3VuZHM6IHRoaXMuYm91bmRzID8gdGhpcy5ib3VuZHMgOiB0aGlzLmZpdEJvdW5kcyxcbiAgICAgICAgZml0Qm91bmRzT3B0aW9uczogdGhpcy5maXRCb3VuZHNPcHRpb25zLFxuICAgICAgICBhbnRpYWxpYXM6IHRoaXMuYW50aWFsaWFzLFxuICAgICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgICBjb29wZXJhdGl2ZUdlc3R1cmVzOiB0aGlzLmNvb3BlcmF0aXZlR2VzdHVyZXMsXG4gICAgICAgIHByb2plY3Rpb246IHRoaXMucHJvamVjdGlvbixcbiAgICAgIH0sXG4gICAgICBtYXBFdmVudHM6IHRoaXMsXG4gICAgfSk7XG4gICAgaWYgKHRoaXMuY3Vyc29yU3R5bGUpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IodGhpcy5jdXJzb3JTdHlsZSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5tYXBTZXJ2aWNlLmRlc3Ryb3lNYXAoKTtcbiAgfVxuXG4gIGFzeW5jIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBhd2FpdCBsYXN0VmFsdWVGcm9tKHRoaXMubWFwU2VydmljZS5tYXBDcmVhdGVkJCk7XG4gICAgaWYgKGNoYW5nZXNbJ2N1cnNvclN0eWxlJ10gJiYgIWNoYW5nZXNbJ2N1cnNvclN0eWxlJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UuY2hhbmdlQ2FudmFzQ3Vyc29yKGNoYW5nZXNbJ2N1cnNvclN0eWxlJ10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3Byb2plY3Rpb24nXSAmJiAhY2hhbmdlc1sncHJvamVjdGlvbiddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZVByb2plY3Rpb24oY2hhbmdlc1sncHJvamVjdGlvbiddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtaW5ab29tJ10gJiYgIWNoYW5nZXNbJ21pblpvb20nXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVNaW5ab29tKGNoYW5nZXNbJ21pblpvb20nXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbWF4Wm9vbSddICYmICFjaGFuZ2VzWydtYXhab29tJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlTWF4Wm9vbShjaGFuZ2VzWydtYXhab29tJ10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ21pblBpdGNoJ10gJiYgIWNoYW5nZXNbJ21pblBpdGNoJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlTWluUGl0Y2goY2hhbmdlc1snbWluUGl0Y2gnXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbWF4UGl0Y2gnXSAmJiAhY2hhbmdlc1snbWF4UGl0Y2gnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVNYXhQaXRjaChjaGFuZ2VzWydtYXhQaXRjaCddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXNbJ3JlbmRlcldvcmxkQ29waWVzJ10gJiZcbiAgICAgICFjaGFuZ2VzWydyZW5kZXJXb3JsZENvcGllcyddLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZVJlbmRlcldvcmxkQ29waWVzKFxuICAgICAgICBjaGFuZ2VzWydyZW5kZXJXb3JsZENvcGllcyddLmN1cnJlbnRWYWx1ZVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3Njcm9sbFpvb20nXSAmJiAhY2hhbmdlc1snc2Nyb2xsWm9vbSddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZVNjcm9sbFpvb20oY2hhbmdlc1snc2Nyb2xsWm9vbSddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydkcmFnUm90YXRlJ10gJiYgIWNoYW5nZXNbJ2RyYWdSb3RhdGUnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVEcmFnUm90YXRlKGNoYW5nZXNbJ2RyYWdSb3RhdGUnXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1sndG91Y2hQaXRjaCddICYmICFjaGFuZ2VzWyd0b3VjaFBpdGNoJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlVG91Y2hQaXRjaChjaGFuZ2VzWyd0b3VjaFBpdGNoJ10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlc1sndG91Y2hab29tUm90YXRlJ10gJiZcbiAgICAgICFjaGFuZ2VzWyd0b3VjaFpvb21Sb3RhdGUnXS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVUb3VjaFpvb21Sb3RhdGUoXG4gICAgICAgIGNoYW5nZXNbJ3RvdWNoWm9vbVJvdGF0ZSddLmN1cnJlbnRWYWx1ZVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlc1snZG91YmxlQ2xpY2tab29tJ10gJiZcbiAgICAgICFjaGFuZ2VzWydkb3VibGVDbGlja1pvb20nXS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVEb3VibGVDbGlja1pvb20oXG4gICAgICAgIGNoYW5nZXNbJ2RvdWJsZUNsaWNrWm9vbSddLmN1cnJlbnRWYWx1ZVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2tleWJvYXJkJ10gJiYgIWNoYW5nZXNbJ2tleWJvYXJkJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlS2V5Ym9hcmQoY2hhbmdlc1sna2V5Ym9hcmQnXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snZHJhZ1BhbiddICYmICFjaGFuZ2VzWydkcmFnUGFuJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlRHJhZ1BhbihjaGFuZ2VzWydkcmFnUGFuJ10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2JveFpvb20nXSAmJiAhY2hhbmdlc1snYm94Wm9vbSddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZUJveFpvb20oY2hhbmdlc1snYm94Wm9vbSddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydzdHlsZSddICYmICFjaGFuZ2VzWydzdHlsZSddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZVN0eWxlKGNoYW5nZXNbJ3N0eWxlJ10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ21heEJvdW5kcyddICYmICFjaGFuZ2VzWydtYXhCb3VuZHMnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVNYXhCb3VuZHMoY2hhbmdlc1snbWF4Qm91bmRzJ10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlc1snZml0Qm91bmRzJ10gJiZcbiAgICAgIGNoYW5nZXNbJ2ZpdEJvdW5kcyddLmN1cnJlbnRWYWx1ZSAmJlxuICAgICAgIWNoYW5nZXNbJ2ZpdEJvdW5kcyddLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLmZpdEJvdW5kcyhcbiAgICAgICAgY2hhbmdlc1snZml0Qm91bmRzJ10uY3VycmVudFZhbHVlLFxuICAgICAgICB0aGlzLmZpdEJvdW5kc09wdGlvbnNcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXNbJ2ZpdFNjcmVlbkNvb3JkaW5hdGVzJ10gJiZcbiAgICAgIGNoYW5nZXNbJ2ZpdFNjcmVlbkNvb3JkaW5hdGVzJ10uY3VycmVudFZhbHVlXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgICh0aGlzLmNlbnRlciB8fCB0aGlzLnpvb20gfHwgdGhpcy5waXRjaCB8fCB0aGlzLmZpdEJvdW5kcykgJiZcbiAgICAgICAgY2hhbmdlc1snZml0U2NyZWVuQ29vcmRpbmF0ZXMnXS5pc0ZpcnN0Q2hhbmdlKClcbiAgICAgICkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgJ1tuZ3gtbWFwYm94LWdsXSBjZW50ZXIgLyB6b29tIC8gcGl0Y2ggLyBmaXRCb3VuZHMgaW5wdXRzIGFyZSBiZWluZyBvdmVycmlkZGVuIGJ5IGZpdFNjcmVlbkNvb3JkaW5hdGVzIGlucHV0J1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLmZpdFNjcmVlbkNvb3JkaW5hdGVzKFxuICAgICAgICBjaGFuZ2VzWydmaXRTY3JlZW5Db29yZGluYXRlcyddLmN1cnJlbnRWYWx1ZSxcbiAgICAgICAgdGhpcy5iZWFyaW5nID8gdGhpcy5iZWFyaW5nWzBdIDogMCxcbiAgICAgICAgdGhpcy5tb3ZpbmdPcHRpb25zXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB0aGlzLmNlbnRlcldpdGhQYW5UbyAmJlxuICAgICAgY2hhbmdlc1snY2VudGVyJ10gJiZcbiAgICAgICFjaGFuZ2VzWydjZW50ZXInXS5pc0ZpcnN0Q2hhbmdlKCkgJiZcbiAgICAgICFjaGFuZ2VzWyd6b29tJ10gJiZcbiAgICAgICFjaGFuZ2VzWydiZWFyaW5nJ10gJiZcbiAgICAgICFjaGFuZ2VzWydwaXRjaCddXG4gICAgKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UucGFuVG8odGhpcy5jZW50ZXIhLCB0aGlzLnBhblRvT3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIChjaGFuZ2VzWydjZW50ZXInXSAmJiAhY2hhbmdlc1snY2VudGVyJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ3pvb20nXSAmJiAhY2hhbmdlc1snem9vbSddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydiZWFyaW5nJ10gJiZcbiAgICAgICAgIWNoYW5nZXNbJ2JlYXJpbmcnXS5pc0ZpcnN0Q2hhbmdlKCkgJiZcbiAgICAgICAgIWNoYW5nZXNbJ2ZpdFNjcmVlbkNvb3JkaW5hdGVzJ10pIHx8XG4gICAgICAoY2hhbmdlc1sncGl0Y2gnXSAmJiAhY2hhbmdlc1sncGl0Y2gnXS5pc0ZpcnN0Q2hhbmdlKCkpXG4gICAgKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UubW92ZShcbiAgICAgICAgdGhpcy5tb3ZpbmdNZXRob2QsXG4gICAgICAgIHRoaXMubW92aW5nT3B0aW9ucyxcbiAgICAgICAgY2hhbmdlc1snem9vbSddICYmIHRoaXMuem9vbSA/IHRoaXMuem9vbVswXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgY2hhbmdlc1snY2VudGVyJ10gPyB0aGlzLmNlbnRlciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY2hhbmdlc1snYmVhcmluZyddICYmIHRoaXMuYmVhcmluZyA/IHRoaXMuYmVhcmluZ1swXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgY2hhbmdlc1sncGl0Y2gnXSAmJiB0aGlzLnBpdGNoID8gdGhpcy5waXRjaFswXSA6IHVuZGVmaW5lZFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHdhcm5EZXByZWNhdGVkT3V0cHV0cygpIHtcbiAgICBjb25zdCBkdyA9IGRlcHJlY2F0aW9uV2FybmluZy5iaW5kKHVuZGVmaW5lZCwgTWFwQ29tcG9uZW50Lm5hbWUpO1xuICAgIGlmICh0aGlzLnJlc2l6ZS5vYnNlcnZlZCkge1xuICAgICAgZHcoJ3Jlc2l6ZScsICdtYXBSZXNpemUnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVtb3ZlLm9ic2VydmVkKSB7XG4gICAgICBkdygncmVtb3ZlJywgJ21hcFJlbW92ZScpO1xuICAgIH1cbiAgICBpZiAodGhpcy5tb3VzZURvd24ub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdtb3VzZURvd24nLCAnbWFwTW91c2VEb3duJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1vdXNlVXAub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdtb3VzZVVwJywgJ21hcE1vdXNlVXAnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubW91c2VNb3ZlLm9ic2VydmVkKSB7XG4gICAgICBkdygnbW91c2VNb3ZlJywgJ21hcE1vdXNlTW92ZScpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jbGljay5vYnNlcnZlZCkge1xuICAgICAgZHcoJ2NsaWNrJywgJ21hcENsaWNrJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmRibENsaWNrLm9ic2VydmVkKSB7XG4gICAgICBkdygnZGJsQ2xpY2snLCAnbWFwRGJsQ2xpY2snKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubW91c2VPdmVyLm9ic2VydmVkKSB7XG4gICAgICBkdygnbW91c2VPdmVyJywgJ21hcE1vdXNlT3ZlcicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5tb3VzZU91dC5vYnNlcnZlZCkge1xuICAgICAgZHcoJ21vdXNlT3V0JywgJ21hcE1vdXNlT3V0Jyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbnRleHRNZW51Lm9ic2VydmVkKSB7XG4gICAgICBkdygnY29udGV4dE1lbnUnLCAnbWFwQ29udGV4dE1lbnUnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudG91Y2hTdGFydC5vYnNlcnZlZCkge1xuICAgICAgZHcoJ3RvdWNoU3RhcnQnLCAnbWFwVG91Y2hTdGFydCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy50b3VjaEVuZC5vYnNlcnZlZCkge1xuICAgICAgZHcoJ3RvdWNoRW5kJywgJ21hcFRvdWNoRW5kJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnRvdWNoTW92ZS5vYnNlcnZlZCkge1xuICAgICAgZHcoJ3RvdWNoTW92ZScsICdtYXBUb3VjaE1vdmUnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudG91Y2hDYW5jZWwub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCd0b3VjaENhbmNlbCcsICdtYXBUb3VjaENhbmNlbCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy53aGVlbC5vYnNlcnZlZCkge1xuICAgICAgZHcoJ3doZWVsJywgJ21hcFdoZWVsJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmRyYWdTdGFydC5vYnNlcnZlZCkge1xuICAgICAgZHcoJ2RyYWdTdGFydCcsICdtYXBEcmFnU3RhcnQnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZHJhZy5vYnNlcnZlZCkge1xuICAgICAgZHcoJ2RyYWcnLCAnbWFwRHJhZycpO1xuICAgIH1cbiAgICBpZiAodGhpcy5kcmFnRW5kLm9ic2VydmVkKSB7XG4gICAgICBkdygnZHJhZ0VuZCcsICdtYXBEcmFnRW5kJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmxvYWQub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdsb2FkJywgJ21hcExvYWQnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZXJyb3Iub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdlcnJvcicsICdtYXBFcnJvcicpO1xuICAgIH1cbiAgfVxufVxuIl19
