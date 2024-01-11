import { EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MapService } from '../map/map.service';
import { MapImageData, MapImageOptions } from '../map/map.types';
import * as i0 from "@angular/core";
export declare class ImageComponent implements OnInit, OnDestroy, OnChanges {
    private mapService;
    private zone;
    id: string;
    data?: MapImageData;
    options?: MapImageOptions;
    url?: string;
    imageError: EventEmitter<{
        status: number;
    }>;
    imageLoaded: EventEmitter<void>;
    /**
     * @deprecated Use imageError instead
     */
    error: EventEmitter<{
        status: number;
    }>;
    /**
     * @deprecated Use imageLoaded instead
     */
    loaded: EventEmitter<void>;
    private isAdded;
    private isAdding;
    private sub;
    constructor(mapService: MapService, zone: NgZone);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
    private warnDeprecatedOutputs;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImageComponent, "mgl-image", never, { "id": { "alias": "id"; "required": false; }; "data": { "alias": "data"; "required": false; }; "options": { "alias": "options"; "required": false; }; "url": { "alias": "url"; "required": false; }; }, { "imageError": "imageError"; "imageLoaded": "imageLoaded"; "error": "error"; "loaded": "loaded"; }, never, never, false, never>;
}
