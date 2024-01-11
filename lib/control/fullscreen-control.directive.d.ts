import { AfterContentInit } from '@angular/core';
import { FullscreenControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
export declare class FullscreenControlDirective implements AfterContentInit {
    private mapService;
    private controlComponent;
    container?: HTMLElement;
    constructor(mapService: MapService, controlComponent: ControlComponent<FullscreenControl>);
    onFullscreen(): void;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FullscreenControlDirective, [null, { host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FullscreenControlDirective, "[mglFullscreen]", never, { "container": { "alias": "container"; "required": false; }; }, {}, never, never, false, never>;
}
