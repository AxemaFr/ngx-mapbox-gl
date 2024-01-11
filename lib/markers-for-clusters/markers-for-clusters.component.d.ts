import { AfterContentInit, ChangeDetectorRef, NgZone, OnDestroy, TemplateRef } from '@angular/core';
import { MapboxGeoJSONFeature } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export declare class PointDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<PointDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PointDirective, "ng-template[mglPoint]", never, {}, {}, never, never, false, never>;
}
export declare class ClusterPointDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<ClusterPointDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ClusterPointDirective, "ng-template[mglClusterPoint]", never, {}, {}, never, never, false, never>;
}
export declare class MarkersForClustersComponent implements OnDestroy, AfterContentInit {
    private mapService;
    private ChangeDetectorRef;
    private zone;
    source: string;
    pointTpl?: TemplateRef<unknown>;
    clusterPointTpl: TemplateRef<unknown>;
    clusterPoints: MapboxGeoJSONFeature[];
    layerId: string;
    private sub;
    constructor(mapService: MapService, ChangeDetectorRef: ChangeDetectorRef, zone: NgZone);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    trackByClusterPoint(_index: number, clusterPoint: MapboxGeoJSONFeature): string | number | undefined;
    private updateCluster;
    static ɵfac: i0.ɵɵFactoryDeclaration<MarkersForClustersComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MarkersForClustersComponent, "mgl-markers-for-clusters", never, { "source": { "alias": "source"; "required": false; }; }, {}, ["pointTpl", "clusterPointTpl"], never, false, never>;
}
