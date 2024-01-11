import { AfterContentInit, EventEmitter } from '@angular/core';
import { FitBoundsOptions, GeolocateControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { Position } from '../map/map.types';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
export declare class GeolocateControlDirective implements AfterContentInit {
    private mapService;
    private controlComponent;
    positionOptions?: PositionOptions;
    fitBoundsOptions?: FitBoundsOptions;
    trackUserLocation?: boolean;
    showUserLocation?: boolean;
    showUserHeading?: boolean;
    geolocate: EventEmitter<Position>;
    constructor(mapService: MapService, controlComponent: ControlComponent<GeolocateControl>);
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GeolocateControlDirective, [null, { host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GeolocateControlDirective, "[mglGeolocate]", never, { "positionOptions": { "alias": "positionOptions"; "required": false; }; "fitBoundsOptions": { "alias": "fitBoundsOptions"; "required": false; }; "trackUserLocation": { "alias": "trackUserLocation"; "required": false; }; "showUserLocation": { "alias": "showUserLocation"; "required": false; }; "showUserHeading": { "alias": "showUserHeading"; "required": false; }; }, { "geolocate": "geolocate"; }, never, never, false, never>;
}
