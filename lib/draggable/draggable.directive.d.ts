import { EventEmitter, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MapMouseEvent } from 'mapbox-gl';
import { LayerComponent } from '../layer/layer.component';
import { MapService } from '../map/map.service';
import { FeatureComponent } from '../source/geojson/feature.component';
import * as i0 from "@angular/core";
export declare class DraggableDirective implements OnInit, OnDestroy {
    private mapService;
    private ngZone;
    private featureComponent?;
    layer?: LayerComponent;
    featureDragStart: EventEmitter<MapMouseEvent>;
    featureDragEnd: EventEmitter<MapMouseEvent>;
    featureDrag: EventEmitter<MapMouseEvent>;
    /**
     * @deprecated Use featureDragStart instead
     */
    dragStart: EventEmitter<MapMouseEvent>;
    /**
     * @deprecated Use featureDragEnd instead
     */
    dragEnd: EventEmitter<MapMouseEvent>;
    /**
     * @deprecated Use featureDrag instead
     */
    drag: EventEmitter<MapMouseEvent>;
    private sub;
    constructor(mapService: MapService, ngZone: NgZone, featureComponent?: FeatureComponent | undefined);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private handleDraggable;
    private filterFeature;
    private warnDeprecatedOutputs;
    static ɵfac: i0.ɵɵFactoryDeclaration<DraggableDirective, [null, null, { optional: true; host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DraggableDirective, "[mglDraggable]", never, { "layer": { "alias": "mglDraggable"; "required": false; }; }, { "featureDragStart": "featureDragStart"; "featureDragEnd": "featureDragEnd"; "featureDrag": "featureDrag"; "dragStart": "dragStart"; "dragEnd": "dragEnd"; "drag": "drag"; }, never, never, false, never>;
}
