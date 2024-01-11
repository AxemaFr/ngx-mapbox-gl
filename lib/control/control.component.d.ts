import { AfterContentInit, ElementRef, OnDestroy } from '@angular/core';
import { IControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export declare class CustomControl implements IControl {
    private container;
    constructor(container: HTMLElement);
    onAdd(): HTMLElement;
    onRemove(): HTMLElement;
    getDefaultPosition(): string;
}
export declare class ControlComponent<T extends IControl> implements OnDestroy, AfterContentInit {
    private mapService;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    content: ElementRef;
    control: T | CustomControl;
    private controlAdded;
    constructor(mapService: MapService);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ControlComponent<any>, "mgl-control", never, { "position": { "alias": "position"; "required": false; }; }, {}, never, ["*"], false, never>;
}
