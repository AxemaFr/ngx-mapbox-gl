import { AfterContentInit } from '@angular/core';
import { AttributionControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
export declare class AttributionControlDirective implements AfterContentInit {
    private mapService;
    private controlComponent;
    compact?: boolean;
    customAttribution?: string | string[];
    constructor(mapService: MapService, controlComponent: ControlComponent<AttributionControl>);
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AttributionControlDirective, [null, { host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AttributionControlDirective, "[mglAttribution]", never, { "compact": { "alias": "compact"; "required": false; }; "customAttribution": { "alias": "customAttribution"; "required": false; }; }, {}, never, never, false, never>;
}
