import * as i0 from '@angular/core';
import { InjectionToken, NgZone, Injectable, Optional, Inject, Component, ChangeDetectionStrategy, Input, ViewChild, Directive, Host, HostListener, EventEmitter, Output, forwardRef, ViewEncapsulation, TemplateRef, ContentChild, NgModule } from '@angular/core';
import * as MapboxGl from 'mapbox-gl';
import { AttributionControl, FullscreenControl, GeolocateControl, NavigationControl, ScaleControl } from 'mapbox-gl';
import { AsyncSubject, Subscription, fromEvent, Subject, lastValueFrom, merge } from 'rxjs';
import { first, switchMap, mapTo, filter, startWith, debounceTime, tap, takeUntil, take } from 'rxjs/operators';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');
class MapService {
    constructor(zone, MAPBOX_API_KEY) {
        this.zone = zone;
        this.MAPBOX_API_KEY = MAPBOX_API_KEY;
        this.mapCreated = new AsyncSubject();
        this.mapLoaded = new AsyncSubject();
        this.markersToRemove = [];
        this.popupsToRemove = [];
        this.imageIdsToRemove = [];
        this.subscription = new Subscription();
        this.mapCreated$ = this.mapCreated.asObservable();
        this.mapLoaded$ = this.mapLoaded.asObservable();
    }
    setup(options) {
        // Need onStable to wait for a potential @angular/route transition to end
        this.zone.onStable.pipe(first()).subscribe(() => {
            // Workaround rollup issue
            // this.assign(
            //   MapboxGl,
            //   'accessToken',
            //   options.accessToken || this.MAPBOX_API_KEY
            // );
            if (options.customMapboxApiUrl) {
                MapboxGl.baseApiUrl = options.customMapboxApiUrl;
            }
            this.createMap({
                ...options.mapOptions,
                accessToken: options.accessToken || this.MAPBOX_API_KEY || '',
            });
            this.hookEvents(options.mapEvents);
            this.mapEvents = options.mapEvents;
            this.mapCreated.next(undefined);
            this.mapCreated.complete();
            // Intentionnaly emit mapCreate after internal mapCreated event
            if (options.mapEvents.mapCreate.observed) {
                this.zone.run(() => {
                    options.mapEvents.mapCreate.emit(this.mapInstance);
                });
            }
        });
    }
    destroyMap() {
        if (this.mapInstance) {
            this.subscription.unsubscribe();
            this.mapInstance.remove();
        }
    }
    updateProjection(projection) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setProjection(projection);
        });
    }
    updateMinZoom(minZoom) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMinZoom(minZoom);
        });
    }
    updateMaxZoom(maxZoom) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMaxZoom(maxZoom);
        });
    }
    updateMinPitch(minPitch) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMinPitch(minPitch);
        });
    }
    updateMaxPitch(maxPitch) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMaxPitch(maxPitch);
        });
    }
    updateRenderWorldCopies(status) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setRenderWorldCopies(status);
        });
    }
    updateScrollZoom(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.scrollZoom.enable()
                : this.mapInstance.scrollZoom.disable();
        });
    }
    updateDragRotate(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.dragRotate.enable()
                : this.mapInstance.dragRotate.disable();
        });
    }
    updateTouchPitch(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.touchPitch.enable()
                : this.mapInstance.touchPitch.disable();
        });
    }
    updateTouchZoomRotate(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.touchZoomRotate.enable()
                : this.mapInstance.touchZoomRotate.disable();
        });
    }
    updateDoubleClickZoom(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.doubleClickZoom.enable()
                : this.mapInstance.doubleClickZoom.disable();
        });
    }
    updateKeyboard(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.keyboard.enable()
                : this.mapInstance.keyboard.disable();
        });
    }
    updateDragPan(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.dragPan.enable()
                : this.mapInstance.dragPan.disable();
        });
    }
    updateBoxZoom(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.boxZoom.enable()
                : this.mapInstance.boxZoom.disable();
        });
    }
    updateStyle(style) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setStyle(style);
        });
    }
    updateMaxBounds(maxBounds) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMaxBounds(maxBounds);
        });
    }
    changeCanvasCursor(cursor) {
        const canvas = this.mapInstance.getCanvasContainer();
        canvas.style.cursor = cursor;
    }
    queryRenderedFeatures(pointOrBox, parameters) {
        return this.mapInstance.queryRenderedFeatures(pointOrBox, parameters);
    }
    panTo(center, options) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.panTo(center, options);
        });
    }
    move(movingMethod, movingOptions, zoom, center, bearing, pitch) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance[movingMethod]({
                ...movingOptions,
                zoom: zoom != null ? zoom : this.mapInstance.getZoom(),
                center: center != null ? center : this.mapInstance.getCenter(),
                bearing: bearing != null ? bearing : this.mapInstance.getBearing(),
                pitch: pitch != null ? pitch : this.mapInstance.getPitch(),
            });
        });
    }
    addLayer(layer, bindEvents, before) {
        this.zone.runOutsideAngular(() => {
            Object.keys(layer.layerOptions).forEach((key) => {
                const tkey = key;
                if (layer.layerOptions[tkey] === undefined) {
                    delete layer.layerOptions[tkey];
                }
            });
            this.mapInstance.addLayer(layer.layerOptions, before);
            if (bindEvents) {
                if (layer.layerEvents.layerClick.observed ||
                    layer.layerEvents.click.observed) {
                    this.mapInstance.on('click', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerClick.emit(evt);
                            layer.layerEvents.click.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerDblClick.observed ||
                    layer.layerEvents.dblClick.observed) {
                    this.mapInstance.on('dblclick', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerDblClick.emit(evt);
                            layer.layerEvents.dblClick.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseDown.observed ||
                    layer.layerEvents.mouseDown.observed) {
                    this.mapInstance.on('mousedown', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseDown.emit(evt);
                            layer.layerEvents.mouseDown.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseUp.observed ||
                    layer.layerEvents.mouseUp.observed) {
                    this.mapInstance.on('mouseup', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseUp.emit(evt);
                            layer.layerEvents.mouseUp.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseEnter.observed ||
                    layer.layerEvents.mouseEnter.observed) {
                    this.mapInstance.on('mouseenter', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseEnter.emit(evt);
                            layer.layerEvents.mouseEnter.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseLeave.observed ||
                    layer.layerEvents.mouseLeave.observed) {
                    this.mapInstance.on('mouseleave', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseLeave.emit(evt);
                            layer.layerEvents.mouseLeave.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseMove.observed ||
                    layer.layerEvents.mouseMove.observed) {
                    this.mapInstance.on('mousemove', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseMove.emit(evt);
                            layer.layerEvents.mouseMove.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseOver.observed ||
                    layer.layerEvents.mouseOver.observed) {
                    this.mapInstance.on('mouseover', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseOver.emit(evt);
                            layer.layerEvents.mouseOver.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseOut.observed ||
                    layer.layerEvents.mouseOut.observed) {
                    this.mapInstance.on('mouseout', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseOut.emit(evt);
                            layer.layerEvents.mouseOut.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerContextMenu.observed ||
                    layer.layerEvents.contextMenu.observed) {
                    this.mapInstance.on('contextmenu', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerContextMenu.emit(evt);
                            layer.layerEvents.contextMenu.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerTouchStart.observed ||
                    layer.layerEvents.touchStart.observed) {
                    this.mapInstance.on('touchstart', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerTouchStart.emit(evt);
                            layer.layerEvents.touchStart.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerTouchEnd.observed ||
                    layer.layerEvents.touchEnd.observed) {
                    this.mapInstance.on('touchend', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerTouchEnd.emit(evt);
                            layer.layerEvents.touchEnd.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerTouchCancel.observed ||
                    layer.layerEvents.touchCancel.observed) {
                    this.mapInstance.on('touchcancel', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerTouchCancel.emit(evt);
                            layer.layerEvents.touchCancel.emit(evt);
                        });
                    });
                }
            }
        });
    }
    removeLayer(layerId) {
        this.zone.runOutsideAngular(() => {
            if (this.mapInstance.getLayer(layerId) != null) {
                this.mapInstance.removeLayer(layerId);
            }
        });
    }
    addMarker(marker) {
        const options = {
            offset: marker.markersOptions.offset,
            anchor: marker.markersOptions.anchor,
            draggable: !!marker.markersOptions.draggable,
            rotationAlignment: marker.markersOptions.rotationAlignment,
            pitchAlignment: marker.markersOptions.pitchAlignment,
            clickTolerance: marker.markersOptions.clickTolerance,
        };
        if (marker.markersOptions.element.childNodes.length > 0) {
            options.element = marker.markersOptions.element;
        }
        const markerInstance = new MapboxGl.Marker(options);
        if (marker.markersEvents.markerDragStart.observed ||
            marker.markersEvents.dragStart.observed) {
            markerInstance.on('dragstart', (event) => {
                if (event) {
                    const { target } = event;
                    this.zone.run(() => {
                        marker.markersEvents.markerDragStart.emit(target);
                        marker.markersEvents.dragStart.emit(target);
                    });
                }
            });
        }
        /*
    
         */
        if (marker.markersEvents.markerDrag.observed ||
            marker.markersEvents.drag.observed) {
            markerInstance.on('drag', (event) => {
                if (event) {
                    const { target } = event;
                    this.zone.run(() => {
                        marker.markersEvents.markerDrag.emit(target);
                        marker.markersEvents.drag.emit(target);
                    });
                }
            });
        }
        if (marker.markersEvents.markerDragEnd.observed ||
            marker.markersEvents.dragEnd.observed) {
            markerInstance.on('dragend', (event) => {
                if (event) {
                    const { target } = event;
                    this.zone.run(() => {
                        marker.markersEvents.markerDragEnd.emit(target);
                        marker.markersEvents.dragEnd.emit(target);
                    });
                }
            });
        }
        const lngLat = marker.markersOptions.feature
            ? marker.markersOptions.feature.geometry.coordinates
            : marker.markersOptions.lngLat;
        markerInstance.setLngLat(lngLat);
        return this.zone.runOutsideAngular(() => {
            markerInstance.addTo(this.mapInstance);
            return markerInstance;
        });
    }
    removeMarker(marker) {
        this.markersToRemove.push(marker);
    }
    createPopup(popup, element) {
        return this.zone.runOutsideAngular(() => {
            Object.keys(popup.popupOptions).forEach((key) => popup.popupOptions[key] === undefined &&
                delete popup.popupOptions[key]);
            const popupInstance = new MapboxGl.Popup(popup.popupOptions);
            popupInstance.setDOMContent(element);
            if (popup.popupEvents.popupClose.observed ||
                popup.popupEvents.close.observed) {
                popupInstance.on('close', () => {
                    this.zone.run(() => {
                        popup.popupEvents.popupClose.emit();
                        popup.popupEvents.close.emit();
                    });
                });
            }
            if (popup.popupEvents.popupOpen.observed ||
                popup.popupEvents.open.observed) {
                popupInstance.on('open', () => {
                    this.zone.run(() => {
                        popup.popupEvents.popupOpen.emit();
                        popup.popupEvents.open.emit();
                    });
                });
            }
            return popupInstance;
        });
    }
    addPopupToMap(popup, lngLat, skipOpenEvent = false) {
        return this.zone.runOutsideAngular(() => {
            if (skipOpenEvent && popup._listeners) {
                delete popup._listeners['open'];
            }
            popup.setLngLat(lngLat);
            popup.addTo(this.mapInstance);
        });
    }
    addPopupToMarker(marker, popup) {
        return this.zone.runOutsideAngular(() => {
            marker.setPopup(popup);
        });
    }
    removePopupFromMap(popup, skipCloseEvent = false) {
        if (skipCloseEvent && popup._listeners) {
            delete popup._listeners['close'];
        }
        this.popupsToRemove.push(popup);
    }
    removePopupFromMarker(marker) {
        return this.zone.runOutsideAngular(() => {
            marker.setPopup(undefined);
        });
    }
    addControl(control, position) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.addControl(control, position);
        });
    }
    removeControl(control) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.removeControl(control);
        });
    }
    async loadAndAddImage(imageId, url, options) {
        return this.zone.runOutsideAngular(() => new Promise((resolve, reject) => {
            this.mapInstance.loadImage(url, (error, image) => {
                if (error) {
                    reject(error);
                    return;
                }
                this.addImage(imageId, image, options);
                resolve();
            });
        }));
    }
    addImage(imageId, data, options) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.addImage(imageId, data, options);
        });
    }
    removeImage(imageId) {
        this.imageIdsToRemove.push(imageId);
    }
    addSource(sourceId, source) {
        return this.zone.runOutsideAngular(() => {
            Object.keys(source).forEach((key) => source[key] === undefined && delete source[key]);
            this.mapInstance.addSource(sourceId, source);
        });
    }
    getSource(sourceId) {
        return this.mapInstance.getSource(sourceId);
    }
    removeSource(sourceId) {
        this.zone.runOutsideAngular(() => {
            this.findLayersBySourceId(sourceId).forEach((layer) => this.mapInstance.removeLayer(layer.id));
            this.mapInstance.removeSource(sourceId);
        });
    }
    setAllLayerPaintProperty(layerId, paint) {
        return this.zone.runOutsideAngular(() => {
            Object.keys(paint).forEach((key) => {
                // TODO Check for perf, setPaintProperty only on changed paint props maybe
                this.mapInstance.setPaintProperty(layerId, key, paint[key]);
            });
        });
    }
    setAllLayerLayoutProperty(layerId, layout) {
        return this.zone.runOutsideAngular(() => {
            Object.keys(layout).forEach((key) => {
                // TODO Check for perf, setPaintProperty only on changed paint props maybe
                this.mapInstance.setLayoutProperty(layerId, key, layout[key]);
            });
        });
    }
    setLayerFilter(layerId, filter) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setFilter(layerId, filter);
        });
    }
    setLayerBefore(layerId, beforeId) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.moveLayer(layerId, beforeId);
        });
    }
    setLayerZoomRange(layerId, minZoom, maxZoom) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setLayerZoomRange(layerId, minZoom ? minZoom : 0, maxZoom ? maxZoom : 20);
        });
    }
    fitBounds(bounds, options) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.fitBounds(bounds, options);
        });
    }
    fitScreenCoordinates(points, bearing, options) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.fitScreenCoordinates(points[0], points[1], bearing, options);
        });
    }
    applyChanges() {
        this.zone.runOutsideAngular(() => {
            this.removeMarkers();
            this.removePopups();
            this.removeImages();
        });
    }
    createMap(optionsWithAccessToken) {
        NgZone.assertNotInAngularZone();
        Object.keys(optionsWithAccessToken).forEach((key) => {
            const tkey = key;
            if (optionsWithAccessToken[tkey] === undefined) {
                delete optionsWithAccessToken[tkey];
            }
        });
        this.mapInstance = new MapboxGl.Map(optionsWithAccessToken);
        const isIEorEdge = window && /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
        if (isIEorEdge) {
            this.mapInstance.setStyle(optionsWithAccessToken.style);
        }
        this.subscription.add(this.zone.onMicrotaskEmpty.subscribe(() => this.applyChanges()));
    }
    removeMarkers() {
        for (const marker of this.markersToRemove) {
            marker.remove();
        }
        this.markersToRemove = [];
    }
    removePopups() {
        for (const popup of this.popupsToRemove) {
            popup.remove();
        }
        this.popupsToRemove = [];
    }
    removeImages() {
        for (const imageId of this.imageIdsToRemove) {
            this.mapInstance.removeImage(imageId);
        }
        this.imageIdsToRemove = [];
    }
    findLayersBySourceId(sourceId) {
        const layers = this.mapInstance.getStyle().layers;
        if (layers == null) {
            return [];
        }
        return layers.filter((l) => 'source' in l ? l.source === sourceId : false);
    }
    hookEvents(events) {
        this.mapInstance.on('load', (evt) => {
            this.mapLoaded.next(undefined);
            this.mapLoaded.complete();
            this.zone.run(() => {
                events.mapLoad.emit(evt);
                events.load.emit(evt.target);
            });
        });
        if (events.mapResize.observed || events.resize.observed) {
            this.mapInstance.on('resize', (evt) => this.zone.run(() => {
                events.mapResize.emit(evt);
                events.resize.emit(evt);
            }));
        }
        if (events.mapRemove.observed || events.remove.observed) {
            this.mapInstance.on('remove', (evt) => this.zone.run(() => {
                events.mapRemove.emit(evt);
                events.remove.emit(evt);
            }));
        }
        if (events.mapMouseDown.observed || events.mouseDown.observed) {
            this.mapInstance.on('mousedown', (evt) => this.zone.run(() => {
                events.mapMouseDown.emit(evt);
                events.mouseDown.emit(evt);
            }));
        }
        if (events.mapMouseUp.observed || events.mouseUp.observed) {
            this.mapInstance.on('mouseup', (evt) => this.zone.run(() => {
                events.mapMouseUp.emit(evt);
                events.mouseUp.emit(evt);
            }));
        }
        if (events.mapMouseMove.observed || events.mouseMove.observed) {
            this.mapInstance.on('mousemove', (evt) => this.zone.run(() => {
                events.mapMouseMove.emit(evt);
                events.mouseMove.emit(evt);
            }));
        }
        if (events.mapClick.observed || events.click.observed) {
            this.mapInstance.on('click', (evt) => this.zone.run(() => {
                events.mapClick.emit(evt);
                events.click.emit(evt);
            }));
        }
        if (events.mapDblClick.observed || events.dblClick.observed) {
            this.mapInstance.on('dblclick', (evt) => this.zone.run(() => {
                events.mapDblClick.emit(evt);
                events.dblClick.emit(evt);
            }));
        }
        if (events.mapMouseOver.observed || events.mouseOver.observed) {
            this.mapInstance.on('mouseover', (evt) => this.zone.run(() => {
                events.mapMouseOver.emit(evt);
                events.mouseOver.emit(evt);
            }));
        }
        if (events.mapMouseOut.observed || events.mouseOut.observed) {
            this.mapInstance.on('mouseout', (evt) => this.zone.run(() => {
                events.mapMouseOut.emit(evt);
                events.mouseOut.emit(evt);
            }));
        }
        if (events.mapContextMenu.observed || events.contextMenu.observed) {
            this.mapInstance.on('contextmenu', (evt) => this.zone.run(() => {
                events.mapContextMenu.emit(evt);
                events.contextMenu.emit(evt);
            }));
        }
        if (events.mapTouchStart.observed || events.touchStart.observed) {
            this.mapInstance.on('touchstart', (evt) => this.zone.run(() => {
                events.mapTouchStart.emit(evt);
                events.touchStart.emit(evt);
            }));
        }
        if (events.mapTouchEnd.observed || events.touchEnd.observed) {
            this.mapInstance.on('touchend', (evt) => this.zone.run(() => {
                events.mapTouchEnd.emit(evt);
                events.touchEnd.emit(evt);
            }));
        }
        if (events.mapTouchMove.observed || events.touchMove.observed) {
            this.mapInstance.on('touchmove', (evt) => this.zone.run(() => {
                events.mapTouchMove.emit(evt);
                events.touchMove.emit(evt);
            }));
        }
        if (events.mapTouchCancel.observed || events.touchCancel.observed) {
            this.mapInstance.on('touchcancel', (evt) => this.zone.run(() => {
                events.mapTouchCancel.emit(evt);
                events.touchCancel.emit(evt);
            }));
        }
        if (events.mapWheel.observed || events.wheel.observed) {
            this.mapInstance.on('wheel', (evt) => this.zone.run(() => {
                events.mapWheel.emit(evt);
                events.wheel.emit(evt);
            }));
        }
        if (events.moveStart.observed) {
            this.mapInstance.on('movestart', (evt) => this.zone.run(() => events.moveStart.emit(evt)));
        }
        if (events.move.observed) {
            this.mapInstance.on('move', (evt) => this.zone.run(() => events.move.emit(evt)));
        }
        if (events.moveEnd.observed) {
            this.mapInstance.on('moveend', (evt) => this.zone.run(() => events.moveEnd.emit(evt)));
        }
        if (events.mapDragStart.observed || events.dragStart.observed) {
            this.mapInstance.on('dragstart', (evt) => this.zone.run(() => {
                events.mapDragStart.emit(evt);
                events.dragStart.emit(evt);
            }));
        }
        if (events.mapDrag.observed || events.drag.observed) {
            this.mapInstance.on('drag', (evt) => this.zone.run(() => {
                events.mapDrag.emit(evt);
                events.drag.emit(evt);
            }));
        }
        if (events.mapDragEnd.observed || events.dragEnd.observed) {
            this.mapInstance.on('dragend', (evt) => this.zone.run(() => {
                events.mapDragEnd.emit(evt);
                events.dragEnd.emit(evt);
            }));
        }
        if (events.zoomStart.observed) {
            this.mapInstance.on('zoomstart', (evt) => this.zone.run(() => events.zoomStart.emit(evt)));
        }
        if (events.zoomEvt.observed) {
            this.mapInstance.on('zoom', (evt) => this.zone.run(() => events.zoomEvt.emit(evt)));
        }
        if (events.zoomEnd.observed) {
            this.mapInstance.on('zoomend', (evt) => this.zone.run(() => events.zoomEnd.emit(evt)));
        }
        if (events.rotateStart.observed) {
            this.mapInstance.on('rotatestart', (evt) => this.zone.run(() => events.rotateStart.emit(evt)));
        }
        if (events.rotate.observed) {
            this.mapInstance.on('rotate', (evt) => this.zone.run(() => events.rotate.emit(evt)));
        }
        if (events.rotateEnd.observed) {
            this.mapInstance.on('rotateend', (evt) => this.zone.run(() => events.rotateEnd.emit(evt)));
        }
        if (events.pitchStart.observed) {
            this.mapInstance.on('pitchstart', (evt) => this.zone.run(() => events.pitchStart.emit(evt)));
        }
        if (events.pitchEvt.observed) {
            this.mapInstance.on('pitch', (evt) => this.zone.run(() => events.pitchEvt.emit(evt)));
        }
        if (events.pitchEnd.observed) {
            this.mapInstance.on('pitchend', (evt) => this.zone.run(() => events.pitchEnd.emit(evt)));
        }
        if (events.boxZoomStart.observed) {
            this.mapInstance.on('boxzoomstart', (evt) => this.zone.run(() => events.boxZoomStart.emit(evt)));
        }
        if (events.boxZoomEnd.observed) {
            this.mapInstance.on('boxzoomend', (evt) => this.zone.run(() => events.boxZoomEnd.emit(evt)));
        }
        if (events.boxZoomCancel.observed) {
            this.mapInstance.on('boxzoomcancel', (evt) => this.zone.run(() => events.boxZoomCancel.emit(evt)));
        }
        if (events.webGlContextLost.observed) {
            this.mapInstance.on('webglcontextlost', (evt) => this.zone.run(() => events.webGlContextLost.emit(evt)));
        }
        if (events.webGlContextRestored.observed) {
            this.mapInstance.on('webglcontextrestored', (evt) => this.zone.run(() => events.webGlContextRestored.emit(evt)));
        }
        if (events.render.observed) {
            this.mapInstance.on('render', (evt) => this.zone.run(() => events.render.emit(evt)));
        }
        if (events.mapError.observed || events.error.observed) {
            this.mapInstance.on('error', (evt) => this.zone.run(() => {
                events.mapError.emit(evt);
                events.error.emit(evt);
            }));
        }
        if (events.data.observed) {
            this.mapInstance.on('data', (evt) => this.zone.run(() => events.data.emit(evt)));
        }
        if (events.styleData.observed) {
            this.mapInstance.on('styledata', (evt) => this.zone.run(() => events.styleData.emit(evt)));
        }
        if (events.sourceData.observed) {
            this.mapInstance.on('sourcedata', (evt) => this.zone.run(() => events.sourceData.emit(evt)));
        }
        if (events.dataLoading.observed) {
            this.mapInstance.on('dataloading', (evt) => this.zone.run(() => events.dataLoading.emit(evt)));
        }
        if (events.styleDataLoading.observed) {
            this.mapInstance.on('styledataloading', (evt) => this.zone.run(() => events.styleDataLoading.emit(evt)));
        }
        if (events.sourceDataLoading.observed) {
            this.mapInstance.on('sourcedataloading', (evt) => this.zone.run(() => events.sourceDataLoading.emit(evt)));
        }
        if (events.styleImageMissing.observed) {
            this.mapInstance.on('styleimagemissing', (evt) => this.zone.run(() => events.styleImageMissing.emit(evt)));
        }
        if (events.idle.observed) {
            this.mapInstance.on('idle', (evt) => this.zone.run(() => events.idle.emit(evt)));
        }
    }
    // TODO move this elsewhere
    assign(obj, prop, value) {
        if (typeof prop === 'string') {
            // eslint-disable-next-line no-param-reassign
            prop = prop.split('.');
        }
        if (prop.length > 1) {
            const e = prop.shift();
            this.assign((obj[e] =
                Object.prototype.toString.call(obj[e]) === '[object Object]'
                    ? obj[e]
                    : {}), prop, value);
        }
        else {
            obj[prop[0]] = value;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MapService, deps: [{ token: i0.NgZone }, { token: MAPBOX_API_KEY, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MapService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MapService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAPBOX_API_KEY]
                }] }]; } });

class CustomControl {
    constructor(container) {
        this.container = container;
    }
    onAdd() {
        return this.container;
    }
    onRemove() {
        return this.container.parentNode.removeChild(this.container);
    }
    getDefaultPosition() {
        return 'top-right';
    }
}
class ControlComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.controlAdded = false;
    }
    ngAfterContentInit() {
        if (this.content.nativeElement.childNodes.length) {
            this.control = new CustomControl(this.content.nativeElement);
            this.mapService.mapCreated$.subscribe(() => {
                this.mapService.addControl(this.control, this.position);
                this.controlAdded = true;
            });
        }
    }
    ngOnDestroy() {
        if (this.controlAdded) {
            this.mapService.removeControl(this.control);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ControlComponent, deps: [{ token: MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: ControlComponent, selector: "mgl-control", inputs: { position: "position" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true, static: true }], ngImport: i0, template: '<div class="mapboxgl-ctrl" #content><ng-content></ng-content></div>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-control',
                    template: '<div class="mapboxgl-ctrl" #content><ng-content></ng-content></div>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: MapService }]; }, propDecorators: { position: [{
                type: Input
            }], content: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }] } });

class AttributionControlDirective {
    constructor(mapService, controlComponent) {
        this.mapService = mapService;
        this.controlComponent = controlComponent;
    }
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {};
            if (this.compact !== undefined) {
                options.compact = this.compact;
            }
            if (this.customAttribution !== undefined) {
                options.customAttribution = this.customAttribution;
            }
            this.controlComponent.control = new AttributionControl(options);
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: AttributionControlDirective, deps: [{ token: MapService }, { token: ControlComponent, host: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.4", type: AttributionControlDirective, selector: "[mglAttribution]", inputs: { compact: "compact", customAttribution: "customAttribution" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: AttributionControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglAttribution]',
                }]
        }], ctorParameters: function () { return [{ type: MapService }, { type: ControlComponent, decorators: [{
                    type: Host
                }] }]; }, propDecorators: { compact: [{
                type: Input
            }], customAttribution: [{
                type: Input
            }] } });

class FullscreenControlDirective {
    constructor(mapService, controlComponent) {
        this.mapService = mapService;
        this.controlComponent = controlComponent;
    }
    onFullscreen() {
        this.mapService.mapInstance.resize();
    }
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            this.controlComponent.control = new FullscreenControl({
                container: this.container,
            });
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FullscreenControlDirective, deps: [{ token: MapService }, { token: ControlComponent, host: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.4", type: FullscreenControlDirective, selector: "[mglFullscreen]", inputs: { container: "container" }, host: { listeners: { "window:webkitfullscreenchange": "onFullscreen($event.target)" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FullscreenControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglFullscreen]',
                }]
        }], ctorParameters: function () { return [{ type: MapService }, { type: ControlComponent, decorators: [{
                    type: Host
                }] }]; }, propDecorators: { container: [{
                type: Input
            }], onFullscreen: [{
                type: HostListener,
                args: ['window:webkitfullscreenchange', ['$event.target']]
            }] } });

class GeolocateControlDirective {
    constructor(mapService, controlComponent) {
        this.mapService = mapService;
        this.controlComponent = controlComponent;
        this.geolocate = new EventEmitter();
    }
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {
                positionOptions: this.positionOptions,
                fitBoundsOptions: this.fitBoundsOptions,
                trackUserLocation: this.trackUserLocation,
                showUserLocation: this.showUserLocation,
                showUserHeading: this.showUserHeading,
            };
            Object.keys(options).forEach((key) => {
                const tkey = key;
                if (options[tkey] === undefined) {
                    delete options[tkey];
                }
            });
            this.controlComponent.control = new GeolocateControl(options);
            this.controlComponent.control.on('geolocate', (data) => {
                this.geolocate.emit(data);
            });
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GeolocateControlDirective, deps: [{ token: MapService }, { token: ControlComponent, host: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.4", type: GeolocateControlDirective, selector: "[mglGeolocate]", inputs: { positionOptions: "positionOptions", fitBoundsOptions: "fitBoundsOptions", trackUserLocation: "trackUserLocation", showUserLocation: "showUserLocation", showUserHeading: "showUserHeading" }, outputs: { geolocate: "geolocate" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GeolocateControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglGeolocate]',
                }]
        }], ctorParameters: function () { return [{ type: MapService }, { type: ControlComponent, decorators: [{
                    type: Host
                }] }]; }, propDecorators: { positionOptions: [{
                type: Input
            }], fitBoundsOptions: [{
                type: Input
            }], trackUserLocation: [{
                type: Input
            }], showUserLocation: [{
                type: Input
            }], showUserHeading: [{
                type: Input
            }], geolocate: [{
                type: Output
            }] } });

class NavigationControlDirective {
    constructor(mapService, controlComponent) {
        this.mapService = mapService;
        this.controlComponent = controlComponent;
    }
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {};
            if (this.showCompass !== undefined) {
                options.showCompass = this.showCompass;
            }
            if (this.showZoom !== undefined) {
                options.showZoom = this.showZoom;
            }
            this.controlComponent.control = new NavigationControl(options);
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: NavigationControlDirective, deps: [{ token: MapService }, { token: ControlComponent, host: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.4", type: NavigationControlDirective, selector: "[mglNavigation]", inputs: { showCompass: "showCompass", showZoom: "showZoom" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: NavigationControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglNavigation]',
                }]
        }], ctorParameters: function () { return [{ type: MapService }, { type: ControlComponent, decorators: [{
                    type: Host
                }] }]; }, propDecorators: { showCompass: [{
                type: Input
            }], showZoom: [{
                type: Input
            }] } });

class ScaleControlDirective {
    constructor(mapService, controlComponent) {
        this.mapService = mapService;
        this.controlComponent = controlComponent;
    }
    ngOnChanges(changes) {
        if (changes['unit'] && !changes['unit'].isFirstChange()) {
            this.controlComponent.control.setUnit(changes['unit'].currentValue);
        }
    }
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {};
            if (this.maxWidth !== undefined) {
                options.maxWidth = this.maxWidth;
            }
            if (this.unit !== undefined) {
                options.unit = this.unit;
            }
            this.controlComponent.control = new ScaleControl(options);
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ScaleControlDirective, deps: [{ token: MapService }, { token: ControlComponent, host: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.4", type: ScaleControlDirective, selector: "[mglScale]", inputs: { maxWidth: "maxWidth", unit: "unit" }, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ScaleControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglScale]',
                }]
        }], ctorParameters: function () { return [{ type: MapService }, { type: ControlComponent, decorators: [{
                    type: Host
                }] }]; }, propDecorators: { maxWidth: [{
                type: Input
            }], unit: [{
                type: Input
            }] } });

const deprecationWarning = (context, oldApi, newApi) => {
    console.warn(`[ngx-mapbox-gl]: ${context}: ${oldApi} is deprecated, please use ${newApi} instead.`);
};

class LayerComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.layerClick = new EventEmitter();
        this.layerDblClick = new EventEmitter();
        this.layerMouseDown = new EventEmitter();
        this.layerMouseUp = new EventEmitter();
        this.layerMouseEnter = new EventEmitter();
        this.layerMouseLeave = new EventEmitter();
        this.layerMouseMove = new EventEmitter();
        this.layerMouseOver = new EventEmitter();
        this.layerMouseOut = new EventEmitter();
        this.layerContextMenu = new EventEmitter();
        this.layerTouchStart = new EventEmitter();
        this.layerTouchEnd = new EventEmitter();
        this.layerTouchCancel = new EventEmitter();
        /**
         * @deprecated Use layerClick instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.click = new EventEmitter();
        /**
         * @deprecated Use layerDblClick instead
         */
        this.dblClick = new EventEmitter();
        /**
         * @deprecated Use layerMouseDown instead
         */
        this.mouseDown = new EventEmitter();
        /**
         * @deprecated Use layerMouseUp instead
         */
        this.mouseUp = new EventEmitter();
        /**
         * @deprecated Use layerMouseEnter instead
         */
        this.mouseEnter = new EventEmitter();
        /**
         * @deprecated Use layerMouseLeave instead
         */
        this.mouseLeave = new EventEmitter();
        /**
         * @deprecated Use layerMouseMove instead
         */
        this.mouseMove = new EventEmitter();
        /**
         * @deprecated Use layerMouseOver instead
         */
        this.mouseOver = new EventEmitter();
        /**
         * @deprecated Use layerMouseOut instead
         */
        this.mouseOut = new EventEmitter();
        /**
         * @deprecated Use layerContextMenu instead
         */
        this.contextMenu = new EventEmitter();
        /**
         * @deprecated Use layerTouchStart instead
         */
        this.touchStart = new EventEmitter();
        /**
         * @deprecated Use layerTouchEnd instead
         */
        this.touchEnd = new EventEmitter();
        /**
         * @deprecated Use layerTouchCancel instead
         */
        this.touchCancel = new EventEmitter();
        this.layerAdded = false;
    }
    ngOnInit() {
        this.warnDeprecatedOutputs();
        this.sub = this.mapService.mapLoaded$
            .pipe(switchMap(() => fromEvent(this.mapService.mapInstance, 'styledata').pipe(mapTo(false), filter(() => !this.mapService.mapInstance.getLayer(this.id)), startWith(true))))
            .subscribe((bindEvents) => this.init(bindEvents));
    }
    ngOnChanges(changes) {
        if (!this.layerAdded) {
            return;
        }
        if (changes['paint'] && !changes['paint'].isFirstChange()) {
            this.mapService.setAllLayerPaintProperty(this.id, changes['paint'].currentValue);
        }
        if (changes['layout'] && !changes['layout'].isFirstChange()) {
            this.mapService.setAllLayerLayoutProperty(this.id, changes['layout'].currentValue);
        }
        if (changes['filter'] && !changes['filter'].isFirstChange()) {
            this.mapService.setLayerFilter(this.id, changes['filter'].currentValue);
        }
        if (changes['before'] && !changes['before'].isFirstChange()) {
            this.mapService.setLayerBefore(this.id, changes['before'].currentValue);
        }
        if ((changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
            (changes['maxzoom'] && !changes['maxzoom'].isFirstChange())) {
            this.mapService.setLayerZoomRange(this.id, this.minzoom, this.maxzoom);
        }
    }
    ngOnDestroy() {
        if (this.layerAdded) {
            this.mapService.removeLayer(this.id);
        }
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
    init(bindEvents) {
        const layer = {
            layerOptions: {
                id: this.id,
                type: this.type,
                source: this.source,
                metadata: this.metadata,
                'source-layer': this.sourceLayer,
                minzoom: this.minzoom,
                maxzoom: this.maxzoom,
                filter: this.filter,
                layout: this.layout,
                paint: this.paint,
            },
            layerEvents: {
                layerClick: this.layerClick,
                layerDblClick: this.layerDblClick,
                layerMouseDown: this.layerMouseDown,
                layerMouseUp: this.layerMouseUp,
                layerMouseEnter: this.layerMouseEnter,
                layerMouseLeave: this.layerMouseLeave,
                layerMouseMove: this.layerMouseMove,
                layerMouseOver: this.layerMouseOver,
                layerMouseOut: this.layerMouseOut,
                layerContextMenu: this.layerContextMenu,
                layerTouchStart: this.layerTouchStart,
                layerTouchEnd: this.layerTouchEnd,
                layerTouchCancel: this.layerTouchCancel,
                click: this.click,
                dblClick: this.dblClick,
                mouseDown: this.mouseDown,
                mouseUp: this.mouseUp,
                mouseEnter: this.mouseEnter,
                mouseLeave: this.mouseLeave,
                mouseMove: this.mouseMove,
                mouseOver: this.mouseOver,
                mouseOut: this.mouseOut,
                contextMenu: this.contextMenu,
                touchStart: this.touchStart,
                touchEnd: this.touchEnd,
                touchCancel: this.touchCancel,
            },
        };
        this.mapService.addLayer(layer, bindEvents, this.before);
        this.layerAdded = true;
    }
    warnDeprecatedOutputs() {
        const dw = deprecationWarning.bind(undefined, LayerComponent.name);
        if (this.click.observed) {
            dw('click', 'layerClick');
        }
        if (this.dblClick.observed) {
            dw('dblClick', 'layerDblClick');
        }
        if (this.mouseDown.observed) {
            dw('mouseDown', 'layerMouseDown');
        }
        if (this.mouseUp.observed) {
            dw('mouseUp', 'layerMouseUp');
        }
        if (this.mouseEnter.observed) {
            dw('mouseEnter', 'layerMouseEnter');
        }
        if (this.mouseLeave.observed) {
            dw('mouseLeave', 'layerMouseLeave');
        }
        if (this.mouseMove.observed) {
            dw('mouseMove', 'layerMouseMove');
        }
        if (this.mouseOver.observed) {
            dw('mouseOver', 'layerMouseOver');
        }
        if (this.mouseOut.observed) {
            dw('mouseOut', 'layerMouseOut');
        }
        if (this.contextMenu.observed) {
            dw('contextMenu', 'layerContextMenu');
        }
        if (this.touchStart.observed) {
            dw('touchStart', 'layerTouchStart');
        }
        if (this.touchEnd.observed) {
            dw('touchEnd', 'layerTouchEnd');
        }
        if (this.touchCancel.observed) {
            dw('touchCancel', 'layerTouchCancel');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: LayerComponent, deps: [{ token: MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: LayerComponent, selector: "mgl-layer", inputs: { id: "id", source: "source", type: "type", metadata: "metadata", sourceLayer: "sourceLayer", filter: "filter", layout: "layout", paint: "paint", before: "before", minzoom: "minzoom", maxzoom: "maxzoom" }, outputs: { layerClick: "layerClick", layerDblClick: "layerDblClick", layerMouseDown: "layerMouseDown", layerMouseUp: "layerMouseUp", layerMouseEnter: "layerMouseEnter", layerMouseLeave: "layerMouseLeave", layerMouseMove: "layerMouseMove", layerMouseOver: "layerMouseOver", layerMouseOut: "layerMouseOut", layerContextMenu: "layerContextMenu", layerTouchStart: "layerTouchStart", layerTouchEnd: "layerTouchEnd", layerTouchCancel: "layerTouchCancel", click: "click", dblClick: "dblClick", mouseDown: "mouseDown", mouseUp: "mouseUp", mouseEnter: "mouseEnter", mouseLeave: "mouseLeave", mouseMove: "mouseMove", mouseOver: "mouseOver", mouseOut: "mouseOut", contextMenu: "contextMenu", touchStart: "touchStart", touchEnd: "touchEnd", touchCancel: "touchCancel" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: LayerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-layer',
                    template: '',
                }]
        }], ctorParameters: function () { return [{ type: MapService }]; }, propDecorators: { id: [{
                type: Input
            }], source: [{
                type: Input
            }], type: [{
                type: Input
            }], metadata: [{
                type: Input
            }], sourceLayer: [{
                type: Input
            }], filter: [{
                type: Input
            }], layout: [{
                type: Input
            }], paint: [{
                type: Input
            }], before: [{
                type: Input
            }], minzoom: [{
                type: Input
            }], maxzoom: [{
                type: Input
            }], layerClick: [{
                type: Output
            }], layerDblClick: [{
                type: Output
            }], layerMouseDown: [{
                type: Output
            }], layerMouseUp: [{
                type: Output
            }], layerMouseEnter: [{
                type: Output
            }], layerMouseLeave: [{
                type: Output
            }], layerMouseMove: [{
                type: Output
            }], layerMouseOver: [{
                type: Output
            }], layerMouseOut: [{
                type: Output
            }], layerContextMenu: [{
                type: Output
            }], layerTouchStart: [{
                type: Output
            }], layerTouchEnd: [{
                type: Output
            }], layerTouchCancel: [{
                type: Output
            }], click: [{
                type: Output
            }], dblClick: [{
                type: Output
            }], mouseDown: [{
                type: Output
            }], mouseUp: [{
                type: Output
            }], mouseEnter: [{
                type: Output
            }], mouseLeave: [{
                type: Output
            }], mouseMove: [{
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
            }], touchCancel: [{
                type: Output
            }] } });

class GeoJSONSourceComponent {
    constructor(mapService, zone) {
        this.mapService = mapService;
        this.zone = zone;
        this.updateFeatureData = new Subject();
        this.sub = new Subscription();
        this.sourceAdded = false;
        this.featureIdCounter = 0;
    }
    ngOnInit() {
        if (!this.data) {
            this.data = {
                type: 'FeatureCollection',
                features: [],
            };
        }
        const sub1 = this.mapService.mapLoaded$.subscribe(() => {
            this.init();
            const sub = fromEvent(this.mapService.mapInstance, 'styledata')
                .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id)))
                .subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
        this.sub.add(sub1);
    }
    ngOnChanges(changes) {
        if (!this.sourceAdded) {
            return;
        }
        if ((changes['maxzoom'] && !changes['maxzoom'].isFirstChange()) ||
            (changes['attribution'] && !changes['attribution'].isFirstChange()) ||
            (changes['buffer'] && !changes['buffer'].isFirstChange()) ||
            (changes['tolerance'] && !changes['tolerance'].isFirstChange()) ||
            (changes['cluster'] && !changes['cluster'].isFirstChange()) ||
            (changes['clusterRadius'] && !changes['clusterRadius'].isFirstChange()) ||
            (changes['clusterMaxZoom'] &&
                !changes['clusterMaxZoom'].isFirstChange()) ||
            (changes['clusterMinPoints'] &&
                !changes['clusterMinPoints'].isFirstChange()) ||
            (changes['clusterProperties'] &&
                !changes['clusterProperties'].isFirstChange()) ||
            (changes['lineMetrics'] && !changes['lineMetrics'].isFirstChange()) ||
            (changes['generateId'] && !changes['generateId'].isFirstChange()) ||
            (changes['promoteId'] && !changes['promoteId'].isFirstChange()) ||
            (changes['filter'] && !changes['filter'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
        if (changes['data'] && !changes['data'].isFirstChange()) {
            const source = this.mapService.getSource(this.id);
            if (source === undefined) {
                return;
            }
            source.setData(this.data);
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.mapService.removeSource(this.id);
            this.sourceAdded = false;
        }
    }
    /**
     * For clustered sources, fetches the zoom at which the given cluster expands.
     *
     * @param clusterId The value of the cluster's cluster_id property.
     */
    async getClusterExpansionZoom(clusterId) {
        const source = this.mapService.getSource(this.id);
        return this.zone.run(async () => new Promise((resolve, reject) => {
            source.getClusterExpansionZoom(clusterId, (error, zoom) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(zoom);
                }
            });
        }));
    }
    /**
     * For clustered sources, fetches the children of the given cluster on the next zoom level (as an array of GeoJSON features).
     *
     * @param clusterId The value of the cluster's cluster_id property.
     */
    async getClusterChildren(clusterId) {
        const source = this.mapService.getSource(this.id);
        return this.zone.run(async () => new Promise((resolve, reject) => {
            source.getClusterChildren(clusterId, (error, features) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(features);
                }
            });
        }));
    }
    /**
     * For clustered sources, fetches the original points that belong to the cluster (as an array of GeoJSON features).
     *
     * @param clusterId The value of the cluster's cluster_id property.
     * @param limit The maximum number of features to return.
     * @param offset The number of features to skip (e.g. for pagination).
     */
    async getClusterLeaves(clusterId, limit, offset) {
        const source = this.mapService.getSource(this.id);
        return this.zone.run(async () => new Promise((resolve, reject) => {
            source.getClusterLeaves(clusterId, limit, offset, (error, features) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(features);
                }
            });
        }));
    }
    _addFeature(feature) {
        const collection = this
            .data;
        collection.features.push(feature);
        this.updateFeatureData.next(null);
    }
    _removeFeature(feature) {
        const collection = this
            .data;
        const index = collection.features.indexOf(feature);
        if (index > -1) {
            collection.features.splice(index, 1);
        }
        this.updateFeatureData.next(null);
    }
    _getNewFeatureId() {
        return ++this.featureIdCounter;
    }
    init() {
        const source = {
            type: 'geojson',
            data: this.data,
            maxzoom: this.maxzoom,
            attribution: this.attribution,
            buffer: this.buffer,
            tolerance: this.tolerance,
            cluster: this.cluster,
            clusterRadius: this.clusterRadius,
            clusterMaxZoom: this.clusterMaxZoom,
            clusterMinPoints: this.clusterMinPoints,
            clusterProperties: this.clusterProperties,
            lineMetrics: this.lineMetrics,
            generateId: this.generateId,
            promoteId: this.promoteId,
            filter: this.filter,
        };
        this.mapService.addSource(this.id, source);
        const sub = this.updateFeatureData.pipe(debounceTime(0)).subscribe(() => {
            const source = this.mapService.getSource(this.id);
            if (source === undefined) {
                return;
            }
            source.setData(this.data);
        });
        this.sub.add(sub);
        this.sourceAdded = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GeoJSONSourceComponent, deps: [{ token: MapService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: GeoJSONSourceComponent, selector: "mgl-geojson-source", inputs: { id: "id", data: "data", maxzoom: "maxzoom", attribution: "attribution", buffer: "buffer", tolerance: "tolerance", cluster: "cluster", clusterRadius: "clusterRadius", clusterMaxZoom: "clusterMaxZoom", clusterMinPoints: "clusterMinPoints", clusterProperties: "clusterProperties", lineMetrics: "lineMetrics", generateId: "generateId", promoteId: "promoteId", filter: "filter" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GeoJSONSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-geojson-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: MapService }, { type: i0.NgZone }]; }, propDecorators: { id: [{
                type: Input
            }], data: [{
                type: Input
            }], maxzoom: [{
                type: Input
            }], attribution: [{
                type: Input
            }], buffer: [{
                type: Input
            }], tolerance: [{
                type: Input
            }], cluster: [{
                type: Input
            }], clusterRadius: [{
                type: Input
            }], clusterMaxZoom: [{
                type: Input
            }], clusterMinPoints: [{
                type: Input
            }], clusterProperties: [{
                type: Input
            }], lineMetrics: [{
                type: Input
            }], generateId: [{
                type: Input
            }], promoteId: [{
                type: Input
            }], filter: [{
                type: Input
            }] } });

class FeatureComponent {
    constructor(GeoJSONSourceComponent) {
        this.GeoJSONSourceComponent = GeoJSONSourceComponent;
        this.type = 'Feature';
    }
    ngOnInit() {
        if (!this.id) {
            this.id = this.GeoJSONSourceComponent._getNewFeatureId();
        }
        this.feature = {
            type: this.type,
            geometry: this.geometry,
            properties: this.properties ? this.properties : {},
        };
        this.feature.id = this.id;
        this.GeoJSONSourceComponent._addFeature(this.feature);
    }
    ngOnDestroy() {
        this.GeoJSONSourceComponent._removeFeature(this.feature);
    }
    updateCoordinates(coordinates) {
        this.feature.geometry.coordinates = coordinates;
        this.GeoJSONSourceComponent.updateFeatureData.next(null);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FeatureComponent, deps: [{ token: forwardRef(() => GeoJSONSourceComponent) }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FeatureComponent, selector: "mgl-feature", inputs: { id: "id", geometry: "geometry", properties: "properties" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FeatureComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-feature',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: GeoJSONSourceComponent, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => GeoJSONSourceComponent)]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], geometry: [{
                type: Input
            }], properties: [{
                type: Input
            }] } });

class DraggableDirective {
    constructor(mapService, ngZone, featureComponent) {
        this.mapService = mapService;
        this.ngZone = ngZone;
        this.featureComponent = featureComponent;
        this.featureDragStart = new EventEmitter();
        this.featureDragEnd = new EventEmitter();
        this.featureDrag = new EventEmitter();
        /**
         * @deprecated Use featureDragStart instead
         */
        this.dragStart = new EventEmitter();
        /**
         * @deprecated Use featureDragEnd instead
         */
        this.dragEnd = new EventEmitter();
        /**
         * @deprecated Use featureDrag instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.drag = new EventEmitter();
        this.sub = new Subscription();
    }
    ngOnInit() {
        this.warnDeprecatedOutputs();
        let enter$;
        let leave$;
        let updateCoords;
        if (this.featureComponent && this.layer) {
            enter$ = this.layer.layerMouseEnter;
            leave$ = this.layer.layerMouseLeave;
            updateCoords = this.featureComponent.updateCoordinates.bind(this.featureComponent);
            if (this.featureComponent.geometry.type !== 'Point') {
                throw new Error('mglDraggable only support point feature');
            }
        }
        else {
            throw new Error('mglDraggable can only be used on Feature (with a layer as input) or Marker');
        }
        this.handleDraggable(enter$, leave$, updateCoords);
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    handleDraggable(enter$, leave$, updateCoords) {
        let moving = false;
        let inside = false;
        this.mapService.mapCreated$.subscribe(() => {
            const mouseUp$ = fromEvent(this.mapService.mapInstance, 'mouseup');
            const dragStart$ = enter$.pipe(filter(() => !moving), filter((evt) => this.filterFeature(evt)), tap(() => {
                inside = true;
                this.mapService.changeCanvasCursor('move');
                this.mapService.updateDragPan(false);
            }), switchMap(() => fromEvent(this.mapService.mapInstance, 'mousedown').pipe(takeUntil(leave$))));
            const dragging$ = dragStart$.pipe(switchMap(() => fromEvent(this.mapService.mapInstance, 'mousemove').pipe(takeUntil(mouseUp$))));
            const dragEnd$ = dragStart$.pipe(switchMap(() => mouseUp$.pipe(take(1))));
            this.sub.add(dragStart$.subscribe((evt) => {
                moving = true;
                if (this.featureDragStart.observed || this.dragStart.observed) {
                    this.ngZone.run(() => {
                        this.featureDragStart.emit(evt);
                        this.dragStart.emit(evt);
                    });
                }
            }));
            this.sub.add(dragging$.subscribe((evt) => {
                updateCoords([evt.lngLat.lng, evt.lngLat.lat]);
                if (this.featureDrag.observed || this.drag.observed) {
                    this.ngZone.run(() => {
                        this.featureDrag.emit(evt);
                        this.drag.emit(evt);
                    });
                }
            }));
            this.sub.add(dragEnd$.subscribe((evt) => {
                moving = false;
                if (this.featureDragEnd.observed || this.dragEnd.observed) {
                    this.ngZone.run(() => {
                        this.featureDragEnd.emit(evt);
                        this.dragEnd.emit(evt);
                    });
                }
                if (!inside) {
                    // It's possible to dragEnd outside the target (small input lag)
                    this.mapService.changeCanvasCursor('');
                    this.mapService.updateDragPan(true);
                }
            }));
            this.sub.add(leave$
                .pipe(tap(() => (inside = false)), filter(() => !moving))
                .subscribe(() => {
                this.mapService.changeCanvasCursor('');
                this.mapService.updateDragPan(true);
            }));
        });
    }
    filterFeature(evt) {
        if (this.featureComponent && this.layer) {
            const feature = this.mapService.queryRenderedFeatures(evt.point, {
                layers: [this.layer.id],
                filter: [
                    'all',
                    ['==', '$type', 'Point'],
                    ['==', '$id', this.featureComponent.id],
                ],
            })[0];
            if (!feature) {
                return false;
            }
        }
        return true;
    }
    warnDeprecatedOutputs() {
        const dw = deprecationWarning.bind(undefined, DraggableDirective.name);
        if (this.dragStart.observed) {
            dw('dragStart', 'featureDragStart');
        }
        if (this.dragEnd.observed) {
            dw('dragEnd', 'featureDragEnd');
        }
        if (this.drag.observed) {
            dw('drag', 'featureDrag');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: DraggableDirective, deps: [{ token: MapService }, { token: i0.NgZone }, { token: FeatureComponent, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.4", type: DraggableDirective, selector: "[mglDraggable]", inputs: { layer: ["mglDraggable", "layer"] }, outputs: { featureDragStart: "featureDragStart", featureDragEnd: "featureDragEnd", featureDrag: "featureDrag", dragStart: "dragStart", dragEnd: "dragEnd", drag: "drag" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: DraggableDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglDraggable]',
                }]
        }], ctorParameters: function () { return [{ type: MapService }, { type: i0.NgZone }, { type: FeatureComponent, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }] }]; }, propDecorators: { layer: [{
                type: Input,
                args: ['mglDraggable']
            }], featureDragStart: [{
                type: Output
            }], featureDragEnd: [{
                type: Output
            }], featureDrag: [{
                type: Output
            }], dragStart: [{
                type: Output
            }], dragEnd: [{
                type: Output
            }], drag: [{
                type: Output
            }] } });

class ImageComponent {
    constructor(mapService, zone) {
        this.mapService = mapService;
        this.zone = zone;
        this.imageError = new EventEmitter();
        this.imageLoaded = new EventEmitter();
        /**
         * @deprecated Use imageError instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.error = new EventEmitter();
        /**
         * @deprecated Use imageLoaded instead
         */
        this.loaded = new EventEmitter();
        this.isAdded = false;
        this.isAdding = false;
    }
    ngOnInit() {
        this.warnDeprecatedOutputs();
        this.sub = this.mapService.mapLoaded$
            .pipe(switchMap(() => fromEvent(this.mapService.mapInstance, 'styledata').pipe(startWith(undefined), filter(() => !this.isAdding && !this.mapService.mapInstance.hasImage(this.id)))))
            .subscribe(() => this.init());
    }
    ngOnChanges(changes) {
        if ((changes['data'] && !changes['data'].isFirstChange()) ||
            (changes['options'] && !changes['options'].isFirstChange()) ||
            (changes['url'] && !changes['url'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    }
    ngOnDestroy() {
        if (this.isAdded) {
            this.mapService.removeImage(this.id);
        }
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
    async init() {
        this.isAdding = true;
        if (this.data) {
            this.mapService.addImage(this.id, this.data, this.options);
            this.isAdded = true;
            this.isAdding = false;
        }
        else if (this.url) {
            try {
                await this.mapService.loadAndAddImage(this.id, this.url, this.options);
                this.isAdded = true;
                this.isAdding = false;
                this.zone.run(() => {
                    this.imageLoaded.emit();
                    this.loaded.emit();
                });
            }
            catch (error) {
                this.zone.run(() => {
                    this.imageError.emit(error);
                    this.error.emit(error);
                });
            }
        }
    }
    warnDeprecatedOutputs() {
        const dw = deprecationWarning.bind(undefined, ImageComponent.name);
        if (this.error.observed) {
            dw('error', 'imageError');
        }
        if (this.loaded.observed) {
            dw('loaded', 'imageLoaded');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ImageComponent, deps: [{ token: MapService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: ImageComponent, selector: "mgl-image", inputs: { id: "id", data: "data", options: "options", url: "url" }, outputs: { imageError: "imageError", imageLoaded: "imageLoaded", error: "error", loaded: "loaded" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ImageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-image',
                    template: '',
                }]
        }], ctorParameters: function () { return [{ type: MapService }, { type: i0.NgZone }]; }, propDecorators: { id: [{
                type: Input
            }], data: [{
                type: Input
            }], options: [{
                type: Input
            }], url: [{
                type: Input
            }], imageError: [{
                type: Output
            }], imageLoaded: [{
                type: Output
            }], error: [{
                type: Output
            }], loaded: [{
                type: Output
            }] } });

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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MapComponent, deps: [{ token: MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: MapComponent, selector: "mgl-map", inputs: { accessToken: "accessToken", collectResourceTiming: "collectResourceTiming", crossSourceCollisions: "crossSourceCollisions", customMapboxApiUrl: "customMapboxApiUrl", fadeDuration: "fadeDuration", hash: "hash", refreshExpiredTiles: "refreshExpiredTiles", failIfMajorPerformanceCaveat: "failIfMajorPerformanceCaveat", bearingSnap: "bearingSnap", interactive: "interactive", pitchWithRotate: "pitchWithRotate", clickTolerance: "clickTolerance", attributionControl: "attributionControl", logoPosition: "logoPosition", maxTileCacheSize: "maxTileCacheSize", localIdeographFontFamily: "localIdeographFontFamily", preserveDrawingBuffer: "preserveDrawingBuffer", trackResize: "trackResize", transformRequest: "transformRequest", bounds: "bounds", antialias: "antialias", locale: "locale", cooperativeGestures: "cooperativeGestures", minZoom: "minZoom", maxZoom: "maxZoom", minPitch: "minPitch", maxPitch: "maxPitch", scrollZoom: "scrollZoom", dragRotate: "dragRotate", touchPitch: "touchPitch", touchZoomRotate: "touchZoomRotate", doubleClickZoom: "doubleClickZoom", keyboard: "keyboard", dragPan: "dragPan", boxZoom: "boxZoom", style: "style", center: "center", maxBounds: "maxBounds", zoom: "zoom", bearing: "bearing", pitch: "pitch", fitBoundsOptions: "fitBoundsOptions", renderWorldCopies: "renderWorldCopies", projection: "projection", movingMethod: "movingMethod", movingOptions: "movingOptions", fitBounds: "fitBounds", fitScreenCoordinates: "fitScreenCoordinates", centerWithPanTo: "centerWithPanTo", panToOptions: "panToOptions", cursorStyle: "cursorStyle" }, outputs: { mapResize: "mapResize", mapRemove: "mapRemove", mapMouseDown: "mapMouseDown", mapMouseUp: "mapMouseUp", mapMouseMove: "mapMouseMove", mapClick: "mapClick", mapDblClick: "mapDblClick", mapMouseOver: "mapMouseOver", mapMouseOut: "mapMouseOut", mapContextMenu: "mapContextMenu", mapTouchStart: "mapTouchStart", mapTouchEnd: "mapTouchEnd", mapTouchMove: "mapTouchMove", mapTouchCancel: "mapTouchCancel", mapWheel: "mapWheel", moveStart: "moveStart", move: "move", moveEnd: "moveEnd", mapDragStart: "mapDragStart", mapDrag: "mapDrag", mapDragEnd: "mapDragEnd", zoomStart: "zoomStart", zoomEvt: "zoomEvt", zoomEnd: "zoomEnd", rotateStart: "rotateStart", rotate: "rotate", rotateEnd: "rotateEnd", pitchStart: "pitchStart", pitchEvt: "pitchEvt", pitchEnd: "pitchEnd", boxZoomStart: "boxZoomStart", boxZoomEnd: "boxZoomEnd", boxZoomCancel: "boxZoomCancel", webGlContextLost: "webGlContextLost", webGlContextRestored: "webGlContextRestored", mapLoad: "mapLoad", mapCreate: "mapCreate", idle: "idle", render: "render", mapError: "mapError", data: "data", styleData: "styleData", sourceData: "sourceData", dataLoading: "dataLoading", styleDataLoading: "styleDataLoading", sourceDataLoading: "sourceDataLoading", styleImageMissing: "styleImageMissing", resize: "resize", remove: "remove", mouseDown: "mouseDown", mouseUp: "mouseUp", mouseMove: "mouseMove", click: "click", dblClick: "dblClick", mouseOver: "mouseOver", mouseOut: "mouseOut", contextMenu: "contextMenu", touchStart: "touchStart", touchEnd: "touchEnd", touchMove: "touchMove", touchCancel: "touchCancel", wheel: "wheel", dragStart: "dragStart", drag: "drag", dragEnd: "dragEnd", load: "load", error: "error" }, providers: [MapService], viewQueries: [{ propertyName: "mapContainer", first: true, predicate: ["container"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '<div #container></div>', isInline: true, styles: [":host{display:block}div{height:100%;width:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MapComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mgl-map', template: '<div #container></div>', providers: [MapService], changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:block}div{height:100%;width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: MapService }]; }, propDecorators: { accessToken: [{
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

class MarkerComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.markerDragStart = new EventEmitter();
        this.markerDragEnd = new EventEmitter();
        this.markerDrag = new EventEmitter();
        /**
         * @deprecated Use markerDragStart instead
         */
        this.dragStart = new EventEmitter();
        /**
         * @deprecated Use markerDragEnd instead
         */
        this.dragEnd = new EventEmitter();
        /**
         * @deprecated Use markerDrag instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.drag = new EventEmitter();
    }
    ngOnInit() {
        this.warnDeprecatedOutputs();
        if (this.feature && this.lngLat) {
            throw new Error('feature and lngLat input are mutually exclusive');
        }
    }
    ngOnChanges(changes) {
        if (changes['lngLat'] && !changes['lngLat'].isFirstChange()) {
            this.markerInstance.setLngLat(this.lngLat);
        }
        if (changes['feature'] && !changes['feature'].isFirstChange()) {
            this.markerInstance.setLngLat(this.feature.geometry.coordinates);
        }
        if (changes['draggable'] && !changes['draggable'].isFirstChange()) {
            this.markerInstance.setDraggable(!!this.draggable);
        }
        if (changes['popupShown'] && !changes['popupShown'].isFirstChange()) {
            changes['popupShown'].currentValue
                ? this.markerInstance.getPopup().addTo(this.mapService.mapInstance)
                : this.markerInstance.getPopup().remove();
        }
        if (changes['pitchAlignment'] &&
            !changes['pitchAlignment'].isFirstChange()) {
            this.markerInstance.setPitchAlignment(changes['pitchAlignment'].currentValue);
        }
        if (changes['rotationAlignment'] &&
            !changes['rotationAlignment'].isFirstChange()) {
            this.markerInstance.setRotationAlignment(changes['rotationAlignment'].currentValue);
        }
    }
    ngAfterViewInit() {
        this.mapService.mapCreated$.subscribe(() => {
            this.markerInstance = this.mapService.addMarker({
                markersOptions: {
                    offset: this.offset,
                    anchor: this.anchor,
                    pitchAlignment: this.pitchAlignment,
                    rotationAlignment: this.rotationAlignment,
                    draggable: !!this.draggable,
                    element: this.content.nativeElement,
                    feature: this.feature,
                    lngLat: this.lngLat,
                    clickTolerance: this.clickTolerance,
                },
                markersEvents: {
                    markerDragStart: this.markerDragStart,
                    markerDrag: this.markerDrag,
                    markerDragEnd: this.markerDragEnd,
                    dragStart: this.markerDragStart,
                    drag: this.markerDrag,
                    dragEnd: this.markerDragEnd,
                },
            });
        });
    }
    ngOnDestroy() {
        this.mapService.removeMarker(this.markerInstance);
        this.markerInstance = undefined;
    }
    togglePopup() {
        this.markerInstance.togglePopup();
    }
    updateCoordinates(coordinates) {
        this.markerInstance.setLngLat(coordinates);
    }
    warnDeprecatedOutputs() {
        const dw = deprecationWarning.bind(undefined, MarkerComponent.name);
        if (this.markerDragStart.observed) {
            dw('dragStart', 'markerDragStart');
        }
        if (this.markerDragEnd.observed) {
            dw('dragEnd', 'markerDragEnd');
        }
        if (this.markerDrag.observed) {
            dw('drag', 'markerDrag');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MarkerComponent, deps: [{ token: MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: MarkerComponent, selector: "mgl-marker", inputs: { offset: "offset", anchor: "anchor", clickTolerance: "clickTolerance", feature: "feature", lngLat: "lngLat", draggable: "draggable", popupShown: "popupShown", className: "className", pitchAlignment: "pitchAlignment", rotationAlignment: "rotationAlignment" }, outputs: { markerDragStart: "markerDragStart", markerDragEnd: "markerDragEnd", markerDrag: "markerDrag", dragStart: "dragStart", dragEnd: "dragEnd", drag: "drag" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '<div [class]="className" #content><ng-content></ng-content></div>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MarkerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-marker',
                    template: '<div [class]="className" #content><ng-content></ng-content></div>',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: MapService }]; }, propDecorators: { offset: [{
                type: Input
            }], anchor: [{
                type: Input
            }], clickTolerance: [{
                type: Input
            }], feature: [{
                type: Input
            }], lngLat: [{
                type: Input
            }], draggable: [{
                type: Input
            }], popupShown: [{
                type: Input
            }], className: [{
                type: Input
            }], pitchAlignment: [{
                type: Input
            }], rotationAlignment: [{
                type: Input
            }], markerDragStart: [{
                type: Output
            }], markerDragEnd: [{
                type: Output
            }], markerDrag: [{
                type: Output
            }], dragStart: [{
                type: Output
            }], dragEnd: [{
                type: Output
            }], drag: [{
                type: Output
            }], content: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }] } });

class PointDirective {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: PointDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.4", type: PointDirective, selector: "ng-template[mglPoint]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: PointDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[mglPoint]' }]
        }] });
class ClusterPointDirective {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ClusterPointDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.4", type: ClusterPointDirective, selector: "ng-template[mglClusterPoint]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ClusterPointDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[mglClusterPoint]' }]
        }] });
let uniqId = 0;
class MarkersForClustersComponent {
    constructor(mapService, ChangeDetectorRef, zone) {
        this.mapService = mapService;
        this.ChangeDetectorRef = ChangeDetectorRef;
        this.zone = zone;
        this.layerId = `mgl-markers-for-clusters-${uniqId++}`;
        this.sub = new Subscription();
    }
    ngAfterContentInit() {
        const clusterDataUpdate = () => fromEvent(this.mapService.mapInstance, 'data').pipe(filter((e) => e.sourceId === this.source &&
            e.sourceDataType !== 'metadata' &&
            this.mapService.mapInstance.isSourceLoaded(this.source)));
        const sub = this.mapService.mapCreated$
            .pipe(switchMap(clusterDataUpdate), switchMap(() => merge(fromEvent(this.mapService.mapInstance, 'move'), fromEvent(this.mapService.mapInstance, 'moveend')).pipe(startWith(undefined))))
            .subscribe(() => {
            this.zone.run(() => {
                this.updateCluster();
            });
        });
        this.sub.add(sub);
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    trackByClusterPoint(_index, clusterPoint) {
        return clusterPoint.id;
    }
    updateCluster() {
        // Invalid queryRenderedFeatures typing
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params = { layers: [this.layerId] };
        if (!this.pointTpl) {
            params.filter = ['==', 'cluster', true];
        }
        this.clusterPoints =
            this.mapService.mapInstance.queryRenderedFeatures(params);
        this.ChangeDetectorRef.markForCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MarkersForClustersComponent, deps: [{ token: MapService }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: MarkersForClustersComponent, selector: "mgl-markers-for-clusters", inputs: { source: "source" }, queries: [{ propertyName: "pointTpl", first: true, predicate: PointDirective, descendants: true, read: TemplateRef }, { propertyName: "clusterPointTpl", first: true, predicate: ClusterPointDirective, descendants: true, read: TemplateRef }], ngImport: i0, template: `
    <mgl-layer
      [id]="layerId"
      [source]="source"
      type="circle"
      [paint]="{ 'circle-radius': 0 }"
    ></mgl-layer>
    <ng-container
      *ngFor="let feature of clusterPoints; trackBy: trackByClusterPoint"
    >
      <ng-container *ngIf="feature.properties!['cluster']">
        <mgl-marker [feature]="$any(feature)">
          <ng-container
            *ngTemplateOutlet="clusterPointTpl; context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      </ng-container>
      <ng-container *ngIf="!feature.properties!['cluster']">
        <mgl-marker [feature]="$any(feature)">
          <ng-container
            *ngTemplateOutlet="pointTpl!; context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      </ng-container>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: LayerComponent, selector: "mgl-layer", inputs: ["id", "source", "type", "metadata", "sourceLayer", "filter", "layout", "paint", "before", "minzoom", "maxzoom"], outputs: ["layerClick", "layerDblClick", "layerMouseDown", "layerMouseUp", "layerMouseEnter", "layerMouseLeave", "layerMouseMove", "layerMouseOver", "layerMouseOut", "layerContextMenu", "layerTouchStart", "layerTouchEnd", "layerTouchCancel", "click", "dblClick", "mouseDown", "mouseUp", "mouseEnter", "mouseLeave", "mouseMove", "mouseOver", "mouseOut", "contextMenu", "touchStart", "touchEnd", "touchCancel"] }, { kind: "component", type: MarkerComponent, selector: "mgl-marker", inputs: ["offset", "anchor", "clickTolerance", "feature", "lngLat", "draggable", "popupShown", "className", "pitchAlignment", "rotationAlignment"], outputs: ["markerDragStart", "markerDragEnd", "markerDrag", "dragStart", "dragEnd", "drag"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MarkersForClustersComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-markers-for-clusters',
                    template: `
    <mgl-layer
      [id]="layerId"
      [source]="source"
      type="circle"
      [paint]="{ 'circle-radius': 0 }"
    ></mgl-layer>
    <ng-container
      *ngFor="let feature of clusterPoints; trackBy: trackByClusterPoint"
    >
      <ng-container *ngIf="feature.properties!['cluster']">
        <mgl-marker [feature]="$any(feature)">
          <ng-container
            *ngTemplateOutlet="clusterPointTpl; context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      </ng-container>
      <ng-container *ngIf="!feature.properties!['cluster']">
        <mgl-marker [feature]="$any(feature)">
          <ng-container
            *ngTemplateOutlet="pointTpl!; context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      </ng-container>
    </ng-container>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                }]
        }], ctorParameters: function () { return [{ type: MapService }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; }, propDecorators: { source: [{
                type: Input
            }], pointTpl: [{
                type: ContentChild,
                args: [PointDirective, { read: TemplateRef, static: false }]
            }], clusterPointTpl: [{
                type: ContentChild,
                args: [ClusterPointDirective, { read: TemplateRef, static: false }]
            }] } });

class PopupComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.popupClose = new EventEmitter();
        this.popupOpen = new EventEmitter();
        /**
         * @deprecated Use popupClose instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.close = new EventEmitter();
        /**
         * @deprecated Use popupOpen instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.open = new EventEmitter();
    }
    ngOnInit() {
        this.warnDeprecatedOutputs();
        if ((this.lngLat && this.marker) ||
            (this.feature && this.lngLat) ||
            (this.feature && this.marker)) {
            throw new Error('marker, lngLat, feature input are mutually exclusive');
        }
    }
    ngOnChanges(changes) {
        if ((changes['lngLat'] && !changes['lngLat'].isFirstChange()) ||
            (changes['feature'] && !changes['feature'].isFirstChange())) {
            const newlngLat = changes['lngLat']
                ? this.lngLat
                : this.feature.geometry.coordinates;
            this.mapService.removePopupFromMap(this.popupInstance, true);
            const popupInstanceTmp = this.createPopup();
            this.mapService.addPopupToMap(popupInstanceTmp, newlngLat, this.popupInstance.isOpen());
            this.popupInstance = popupInstanceTmp;
        }
        if (changes['marker'] && !changes['marker'].isFirstChange()) {
            const previousMarker = changes['marker'].previousValue;
            if (previousMarker.markerInstance) {
                this.mapService.removePopupFromMarker(previousMarker.markerInstance);
            }
            if (this.marker && this.marker.markerInstance && this.popupInstance) {
                this.mapService.addPopupToMarker(this.marker.markerInstance, this.popupInstance);
            }
        }
        if (changes['offset'] &&
            !changes['offset'].isFirstChange() &&
            this.popupInstance) {
            this.popupInstance.setOffset(this.offset);
        }
    }
    ngAfterViewInit() {
        this.popupInstance = this.createPopup();
        this.addPopup(this.popupInstance);
    }
    ngOnDestroy() {
        if (this.popupInstance) {
            if (this.lngLat || this.feature) {
                this.mapService.removePopupFromMap(this.popupInstance);
            }
            else if (this.marker && this.marker.markerInstance) {
                this.mapService.removePopupFromMarker(this.marker.markerInstance);
            }
        }
        this.popupInstance = undefined;
    }
    createPopup() {
        return this.mapService.createPopup({
            popupOptions: {
                closeButton: this.closeButton,
                closeOnClick: this.closeOnClick,
                closeOnMove: this.closeOnMove,
                focusAfterOpen: this.focusAfterOpen,
                anchor: this.anchor,
                offset: this.offset,
                className: this.className,
                maxWidth: this.maxWidth,
            },
            popupEvents: {
                open: this.open,
                close: this.close,
                popupOpen: this.popupOpen,
                popupClose: this.popupClose,
            },
        }, this.content.nativeElement);
    }
    addPopup(popup) {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.lngLat || this.feature) {
                this.mapService.addPopupToMap(popup, this.lngLat
                    ? this.lngLat
                    : this.feature.geometry.coordinates);
            }
            else if (this.marker && this.marker.markerInstance) {
                this.mapService.addPopupToMarker(this.marker.markerInstance, popup);
            }
            else {
                throw new Error('mgl-popup need either lngLat/marker/feature to be set');
            }
        });
    }
    warnDeprecatedOutputs() {
        const dw = deprecationWarning.bind(undefined, PopupComponent.name);
        if (this.close.observed) {
            dw('close', 'popupClose');
        }
        if (this.open.observed) {
            dw('open', 'popupOpen');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: PopupComponent, deps: [{ token: MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: PopupComponent, selector: "mgl-popup", inputs: { closeButton: "closeButton", closeOnClick: "closeOnClick", closeOnMove: "closeOnMove", focusAfterOpen: "focusAfterOpen", anchor: "anchor", className: "className", maxWidth: "maxWidth", feature: "feature", lngLat: "lngLat", marker: "marker", offset: "offset" }, outputs: { popupClose: "popupClose", popupOpen: "popupOpen", close: "close", open: "open" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '<div #content><ng-content></ng-content></div>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: PopupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-popup',
                    template: '<div #content><ng-content></ng-content></div>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: MapService }]; }, propDecorators: { closeButton: [{
                type: Input
            }], closeOnClick: [{
                type: Input
            }], closeOnMove: [{
                type: Input
            }], focusAfterOpen: [{
                type: Input
            }], anchor: [{
                type: Input
            }], className: [{
                type: Input
            }], maxWidth: [{
                type: Input
            }], feature: [{
                type: Input
            }], lngLat: [{
                type: Input
            }], marker: [{
                type: Input
            }], offset: [{
                type: Input
            }], popupClose: [{
                type: Output
            }], popupOpen: [{
                type: Output
            }], close: [{
                type: Output
            }], open: [{
                type: Output
            }], content: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }] } });

class CanvasSourceComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    ngOnInit() {
        const sub1 = this.mapService.mapLoaded$.subscribe(() => {
            this.init();
            const sub = fromEvent(this.mapService.mapInstance, 'styledata')
                .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id)))
                .subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
        this.sub.add(sub1);
    }
    ngOnChanges(changes) {
        if (!this.sourceAdded) {
            return;
        }
        if ((changes['canvas'] && !changes['canvas'].isFirstChange()) ||
            (changes['animate'] && !changes['animate'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
        else if (changes['coordinates'] &&
            !changes['coordinates'].isFirstChange()) {
            const source = this.mapService.getSource(this.id);
            if (source === undefined) {
                return;
            }
            source.setCoordinates(this.coordinates);
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.mapService.removeSource(this.id);
            this.sourceAdded = false;
        }
    }
    init() {
        const source = {
            type: 'canvas',
            coordinates: this.coordinates,
            canvas: this.canvas,
            animate: this.animate,
        };
        this.mapService.addSource(this.id, source);
        this.sourceAdded = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: CanvasSourceComponent, deps: [{ token: MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: CanvasSourceComponent, selector: "mgl-canvas-source", inputs: { id: "id", coordinates: "coordinates", canvas: "canvas", animate: "animate" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: CanvasSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-canvas-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: MapService }]; }, propDecorators: { id: [{
                type: Input
            }], coordinates: [{
                type: Input
            }], canvas: [{
                type: Input
            }], animate: [{
                type: Input
            }] } });

class ImageSourceComponent {
    constructor(mapService) {
        this.mapService = mapService;
    }
    ngOnInit() {
        this.sub = this.mapService.mapLoaded$.subscribe(() => this.init());
    }
    ngOnChanges(changes) {
        if (this.sourceId === undefined) {
            return;
        }
        const source = this.mapService.getSource(this.sourceId);
        if (source === undefined) {
            return;
        }
        source.updateImage({
            url: changes['url'] === undefined ? undefined : this.url,
            coordinates: changes['coordinates'] === undefined ? undefined : this.coordinates,
        });
    }
    ngOnDestroy() {
        if (this.sub !== undefined) {
            this.sub.unsubscribe();
        }
        if (this.sourceId !== undefined) {
            this.mapService.removeSource(this.sourceId);
            this.sourceId = undefined;
        }
    }
    init() {
        const imageSource = {
            type: 'image',
            url: this.url,
            coordinates: this.coordinates,
        };
        this.mapService.addSource(this.id, imageSource);
        this.sourceId = this.id;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ImageSourceComponent, deps: [{ token: MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: ImageSourceComponent, selector: "mgl-image-source", inputs: { id: "id", url: "url", coordinates: "coordinates" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ImageSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-image-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: MapService }]; }, propDecorators: { id: [{
                type: Input
            }], url: [{
                type: Input
            }], coordinates: [{
                type: Input
            }] } });

class RasterDemSourceComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.type = 'raster-dem';
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    ngOnInit() {
        const sub1 = this.mapService.mapLoaded$.subscribe(() => {
            this.init();
            const sub = fromEvent(this.mapService.mapInstance, 'styledata')
                .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id)))
                .subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
        this.sub.add(sub1);
    }
    ngOnChanges(changes) {
        if (!this.sourceAdded) {
            return;
        }
        if ((changes['url'] && !changes['url'].isFirstChange()) ||
            (changes['tiles'] && !changes['tiles'].isFirstChange()) ||
            (changes['bounds'] && !changes['bounds'].isFirstChange()) ||
            (changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
            (changes['maxzoom'] && !changes['maxzoom'].isFirstChange()) ||
            (changes['tileSize'] && !changes['tileSize'].isFirstChange()) ||
            (changes['attribution'] && !changes['attribution'].isFirstChange()) ||
            (changes['encoding'] && !changes['encoding'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.mapService.removeSource(this.id);
            this.sourceAdded = false;
        }
    }
    init() {
        const source = {
            type: this.type,
            url: this.url,
            tiles: this.tiles,
            bounds: this.bounds,
            minzoom: this.minzoom,
            maxzoom: this.maxzoom,
            tileSize: this.tileSize,
            attribution: this.attribution,
            encoding: this.encoding,
        };
        this.mapService.addSource(this.id, source);
        this.sourceAdded = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: RasterDemSourceComponent, deps: [{ token: MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: RasterDemSourceComponent, selector: "mgl-raster-dem-source", inputs: { id: "id", url: "url", tiles: "tiles", bounds: "bounds", minzoom: "minzoom", maxzoom: "maxzoom", tileSize: "tileSize", attribution: "attribution", encoding: "encoding" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: RasterDemSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-raster-dem-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: MapService }]; }, propDecorators: { id: [{
                type: Input
            }], url: [{
                type: Input
            }], tiles: [{
                type: Input
            }], bounds: [{
                type: Input
            }], minzoom: [{
                type: Input
            }], maxzoom: [{
                type: Input
            }], tileSize: [{
                type: Input
            }], attribution: [{
                type: Input
            }], encoding: [{
                type: Input
            }] } });

class RasterSourceComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.type = 'raster';
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    ngOnInit() {
        const sub1 = this.mapService.mapLoaded$.subscribe(() => {
            this.init();
            const sub = fromEvent(this.mapService.mapInstance, 'styledata')
                .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id)))
                .subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
        this.sub.add(sub1);
    }
    ngOnChanges(changes) {
        if (!this.sourceAdded) {
            return;
        }
        if ((changes['url'] && !changes['url'].isFirstChange()) ||
            (changes['tiles'] && !changes['tiles'].isFirstChange()) ||
            (changes['bounds'] && !changes['bounds'].isFirstChange()) ||
            (changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
            (changes['maxzoom'] && !changes['maxzoom'].isFirstChange()) ||
            (changes['tileSize'] && !changes['tileSize'].isFirstChange()) ||
            (changes['scheme'] && !changes['scheme'].isFirstChange()) ||
            (changes['attribution'] && !changes['attribution'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.mapService.removeSource(this.id);
            this.sourceAdded = false;
        }
    }
    init() {
        const source = {
            type: this.type,
            url: this.url,
            tiles: this.tiles,
            bounds: this.bounds,
            minzoom: this.minzoom,
            maxzoom: this.maxzoom,
            tileSize: this.tileSize,
            scheme: this.scheme,
            attribution: this.attribution,
        };
        this.mapService.addSource(this.id, source);
        this.sourceAdded = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: RasterSourceComponent, deps: [{ token: MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: RasterSourceComponent, selector: "mgl-raster-source", inputs: { id: "id", url: "url", tiles: "tiles", bounds: "bounds", minzoom: "minzoom", maxzoom: "maxzoom", tileSize: "tileSize", scheme: "scheme", attribution: "attribution" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: RasterSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-raster-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: MapService }]; }, propDecorators: { id: [{
                type: Input
            }], url: [{
                type: Input
            }], tiles: [{
                type: Input
            }], bounds: [{
                type: Input
            }], minzoom: [{
                type: Input
            }], maxzoom: [{
                type: Input
            }], tileSize: [{
                type: Input
            }], scheme: [{
                type: Input
            }], attribution: [{
                type: Input
            }] } });

class VectorSourceComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.type = 'vector';
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    ngOnInit() {
        const sub1 = this.mapService.mapLoaded$.subscribe(() => {
            this.init();
            const sub = fromEvent(this.mapService.mapInstance, 'styledata')
                .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id)))
                .subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
        this.sub.add(sub1);
    }
    ngOnChanges(changes) {
        if (!this.sourceAdded) {
            return;
        }
        if ((changes['bounds'] && !changes['bounds'].isFirstChange()) ||
            (changes['scheme'] && !changes['scheme'].isFirstChange()) ||
            (changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
            (changes['maxzoom'] && !changes['maxzoom'].isFirstChange()) ||
            (changes['attribution'] && !changes['attribution'].isFirstChange()) ||
            (changes['promoteId'] && !changes['promoteId'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
        else if ((changes['url'] && !changes['url'].isFirstChange()) ||
            (changes['tiles'] && !changes['tiles'].isFirstChange())) {
            const source = this.mapService.getSource(this.id);
            if (source === undefined) {
                return;
            }
            if (changes['url'] && this.url) {
                source.setUrl(this.url);
            }
            if (changes['tiles'] && this.tiles) {
                source.setTiles(this.tiles);
            }
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.mapService.removeSource(this.id);
            this.sourceAdded = false;
        }
    }
    init() {
        const source = {
            type: this.type,
            url: this.url,
            tiles: this.tiles,
            bounds: this.bounds,
            scheme: this.scheme,
            minzoom: this.minzoom,
            maxzoom: this.maxzoom,
            attribution: this.attribution,
            promoteId: this.promoteId,
        };
        this.mapService.addSource(this.id, source);
        this.sourceAdded = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: VectorSourceComponent, deps: [{ token: MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: VectorSourceComponent, selector: "mgl-vector-source", inputs: { id: "id", url: "url", tiles: "tiles", bounds: "bounds", scheme: "scheme", minzoom: "minzoom", maxzoom: "maxzoom", attribution: "attribution", promoteId: "promoteId" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: VectorSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-vector-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: MapService }]; }, propDecorators: { id: [{
                type: Input
            }], url: [{
                type: Input
            }], tiles: [{
                type: Input
            }], bounds: [{
                type: Input
            }], scheme: [{
                type: Input
            }], minzoom: [{
                type: Input
            }], maxzoom: [{
                type: Input
            }], attribution: [{
                type: Input
            }], promoteId: [{
                type: Input
            }] } });

class VideoSourceComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    ngOnInit() {
        const sub1 = this.mapService.mapLoaded$.subscribe(() => {
            this.init();
            const sub = fromEvent(this.mapService.mapInstance, 'styledata')
                .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id)))
                .subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
        this.sub.add(sub1);
    }
    ngOnChanges(changes) {
        if (!this.sourceAdded) {
            return;
        }
        if (changes['urls'] && !changes['urls'].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
        else if (changes['coordinates'] &&
            !changes['coordinates'].isFirstChange()) {
            const source = this.mapService.getSource(this.id);
            if (source === undefined) {
                return;
            }
            source.setCoordinates(this.coordinates);
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.mapService.removeSource(this.id);
            this.sourceAdded = false;
        }
    }
    init() {
        const source = {
            type: 'video',
            urls: this.urls,
            coordinates: this.coordinates,
        };
        this.mapService.addSource(this.id, source);
        this.sourceAdded = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: VideoSourceComponent, deps: [{ token: MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: VideoSourceComponent, selector: "mgl-video-source", inputs: { id: "id", urls: "urls", coordinates: "coordinates" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: VideoSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-video-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: MapService }]; }, propDecorators: { id: [{
                type: Input
            }], urls: [{
                type: Input
            }], coordinates: [{
                type: Input
            }] } });

class NgxMapboxGLModule {
    static withConfig(config) {
        return {
            ngModule: NgxMapboxGLModule,
            providers: [
                {
                    provide: MAPBOX_API_KEY,
                    useValue: config.accessToken,
                },
            ],
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: NgxMapboxGLModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.4", ngImport: i0, type: NgxMapboxGLModule, declarations: [MapComponent,
            LayerComponent,
            DraggableDirective,
            ImageComponent,
            VectorSourceComponent,
            GeoJSONSourceComponent,
            RasterDemSourceComponent,
            RasterSourceComponent,
            ImageSourceComponent,
            VideoSourceComponent,
            CanvasSourceComponent,
            FeatureComponent,
            MarkerComponent,
            PopupComponent,
            ControlComponent,
            FullscreenControlDirective,
            NavigationControlDirective,
            GeolocateControlDirective,
            AttributionControlDirective,
            ScaleControlDirective,
            PointDirective,
            ClusterPointDirective,
            MarkersForClustersComponent], imports: [CommonModule], exports: [MapComponent,
            LayerComponent,
            DraggableDirective,
            ImageComponent,
            VectorSourceComponent,
            GeoJSONSourceComponent,
            RasterDemSourceComponent,
            RasterSourceComponent,
            ImageSourceComponent,
            VideoSourceComponent,
            CanvasSourceComponent,
            FeatureComponent,
            MarkerComponent,
            PopupComponent,
            ControlComponent,
            FullscreenControlDirective,
            NavigationControlDirective,
            GeolocateControlDirective,
            AttributionControlDirective,
            ScaleControlDirective,
            PointDirective,
            ClusterPointDirective,
            MarkersForClustersComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: NgxMapboxGLModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: NgxMapboxGLModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        MapComponent,
                        LayerComponent,
                        DraggableDirective,
                        ImageComponent,
                        VectorSourceComponent,
                        GeoJSONSourceComponent,
                        RasterDemSourceComponent,
                        RasterSourceComponent,
                        ImageSourceComponent,
                        VideoSourceComponent,
                        CanvasSourceComponent,
                        FeatureComponent,
                        MarkerComponent,
                        PopupComponent,
                        ControlComponent,
                        FullscreenControlDirective,
                        NavigationControlDirective,
                        GeolocateControlDirective,
                        AttributionControlDirective,
                        ScaleControlDirective,
                        PointDirective,
                        ClusterPointDirective,
                        MarkersForClustersComponent,
                    ],
                    exports: [
                        MapComponent,
                        LayerComponent,
                        DraggableDirective,
                        ImageComponent,
                        VectorSourceComponent,
                        GeoJSONSourceComponent,
                        RasterDemSourceComponent,
                        RasterSourceComponent,
                        ImageSourceComponent,
                        VideoSourceComponent,
                        CanvasSourceComponent,
                        FeatureComponent,
                        MarkerComponent,
                        PopupComponent,
                        ControlComponent,
                        FullscreenControlDirective,
                        NavigationControlDirective,
                        GeolocateControlDirective,
                        AttributionControlDirective,
                        ScaleControlDirective,
                        PointDirective,
                        ClusterPointDirective,
                        MarkersForClustersComponent,
                    ],
                }]
        }] });

/*
 * Public API Surface of ngx-mapbox-gl
 */
// Expose NgxMapboxGlModule and GeocoderControlDirective provided injection tokens

/**
 * Generated bundle index. Do not edit.
 */

export { AttributionControlDirective, CanvasSourceComponent, ClusterPointDirective, ControlComponent, CustomControl, DraggableDirective, FeatureComponent, FullscreenControlDirective, GeoJSONSourceComponent, GeolocateControlDirective, ImageComponent, ImageSourceComponent, LayerComponent, MAPBOX_API_KEY, MapComponent, MapService, MarkerComponent, MarkersForClustersComponent, NavigationControlDirective, NgxMapboxGLModule, PointDirective, PopupComponent, RasterDemSourceComponent, RasterSourceComponent, ScaleControlDirective, VectorSourceComponent, VideoSourceComponent, deprecationWarning };
//# sourceMappingURL=ngx-mapbox-gl.mjs.map
