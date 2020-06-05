import {Basemap} from "./Basemap";
import * as OsmToGeoJson from "osmtogeojson";
import * as $ from "jquery";
import L from "leaflet";
import {ElementStorage} from "./ElementStorage";
import {Changes} from "./Changes";
import {UIElement} from "../UI/UIElement";
import {UIEventSource} from "../UI/UIEventSource";

export class OverpassLayer {
    private readonly map: Basemap;
    private readonly filters: string[];
    public readonly minzoom: number;
    private readonly popupContent: ((source: UIEventSource<any>) => UIElement);
    private previousBounds: { north: number, east: number, south: number, west: number };

    private readonly style: (properties) => any;

    private readonly _storage: ElementStorage;

    private _geolayer;

    public queryState: UIEventSource<boolean> = new UIEventSource<boolean>(false);


    constructor(map: Basemap, storage: ElementStorage,
                changes: Changes,
                filters: string[],
                popupContent: ((source: UIEventSource<any>) => UIElement),
                style: ((properties) => any),
                minzoom: number) {

        if (style === undefined) {
            style = function (properties) {
                return {};
            }
        }
        
        this.map = map;
        this.filters = filters;
        this.popupContent = popupContent;
        this.style = style;
        this.minzoom = minzoom;
        this._storage = storage;
        
        this.previousBounds = {north: 0, east: 0, south: 0, west: 0};
        let self = this;

        map.Location.addCallback(function () {
            self.RunQuery();
        });
    }

    public updateStyle() {
        if (this._geolayer === undefined) {
            return;
        }
        const self = this;
        this._geolayer.setStyle(function (feature) {
            return self.style(feature.properties);
        });
    }

    private RenderLayer(data) {
        let self = this;

        if (this._geolayer !== undefined && this._geolayer !== null) {
            this.map.map.removeLayer(this._geolayer);
        }
        
        // The data is split in two parts: the poinst and the rest
        // The points get a special treatment in order to render them properly
        // Note that some features might get a point representation as well
        
        
        this._geolayer = L.geoJSON(data, {
            style: function (feature) {
                return self.style(feature.properties);
            },
            
            pointToLayer: function(feature, latLng){

                console.log(feature);

                const eventSource = self._storage.addOrGetElement(feature);
                const style = self.style(feature.properties);
                if(style.icon === undefined){
                    return null;
                }
                const marker = L.marker(latLng, {
                    icon: style.icon
                })

                eventSource.addCallback(function () {
                    self.updateStyle();
                });
                const content = self.popupContent(eventSource)
                marker.bindPopup(
                    content.Render(),
                ).on("popupopen", function () {
                    content.Update();
                });

                return marker;
            },
            
            onEachFeature: function (feature, layer) {
                

                let eventSource = self._storage.addOrGetElement(feature);
                eventSource.addCallback(function () {
                    self.updateStyle();
                });
                const content = self.popupContent(eventSource)
                layer.bindPopup(
                    content.Render(),
                ).on("popupopen", function () {
                    content.Update();
                });
            }
        });

        this._geolayer.addTo(this.map.map);
        //*/
    }

    /**
     *
     * @param query: the raw overpass query. {{bbox}} will be replaced with the actual map bbox (or with a slightly bigger area to allow some panning)
     * @param callback: the function called with the geojson
     * @constructor
     */
    private RunQuery() {

        if (this.map.map.getZoom() < this.minzoom) {
            console.log("Not running query: zoom not sufficient");
            return;
        } else if (this.IsInBounds()) {
            // Still in bounds
            return;
        }

        console.log("Running query!");
        const query = this.BuildQuery();
        const self = this;
        this.queryState.setData(true);
        $.getJSON(query,
            function (json) {
                // @ts-ignore
                let geojson = OsmToGeoJson.default(json);
                self.RenderLayer(geojson);
                self.queryState.setData(false);
            });

    }

    private IsInBounds(): boolean {

        if (this.previousBounds === undefined) {
            return false;
        }

        const b = this.map.map.getBounds();
        if (b.getSouth() < this.previousBounds.south) {
            return false;
        }

        if (b.getNorth() > this.previousBounds.north) {
            return false;
        }

        if (b.getEast() > this.previousBounds.east) {
            return false;
        }
        if (b.getWest() < this.previousBounds.west) {
            return false;
        }

        return true;
    }

    private BuildQuery(): string {

        let filter = "";
        for (let i = 0; i < this.filters.length; i++) {
            filter = filter.concat("[" + this.filters[i] + "]");
        }

        const b = this.map.map.getBounds();
        const latDiff = Math.abs(b.getNorth() - b.getSouth());
        const lonDiff = Math.abs(b.getEast() - b.getWest());
        const extra = 0.5;
        const n = b.getNorth() + latDiff * extra;
        const e = b.getEast() + lonDiff * extra;
        const s = b.getSouth() - latDiff * extra;
        const w = b.getWest() - lonDiff * extra;

        this.previousBounds = {north: n, east: e, south: s, west: w};

        const bbox = "[bbox:" + s + "," + w + "," + n + "," + e + "]";
        const query =
            '[out:json][timeout:25]' + bbox + ';(nwr' + filter + ';);out body;>;out skel qt;';
        const url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);
        return url;
    }

}