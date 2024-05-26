import { OnDestroy, OnInit } from '@angular/core';
import { GeoJSONSourceComponent } from './geojson-source.component';
import * as i0 from "@angular/core";
export declare class FeatureComponent implements OnInit, OnDestroy, GeoJSON.Feature<GeoJSON.GeometryObject> {
    private GeoJSONSourceComponent;
    id?: number;
    geometry: GeoJSON.GeometryObject;
    properties: any;
    type: "Feature";
    private feature;
    constructor(GeoJSONSourceComponent: GeoJSONSourceComponent);
    ngOnInit(): void;
    ngOnDestroy(): void;
    updateCoordinates(coordinates: number[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FeatureComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FeatureComponent, "mgl-feature", never, { "id": { "alias": "id"; "required": false; }; "geometry": { "alias": "geometry"; "required": false; }; "properties": { "alias": "properties"; "required": false; }; }, {}, never, never, false, never>;
}
