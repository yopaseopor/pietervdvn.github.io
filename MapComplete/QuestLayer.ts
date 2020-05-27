import {Basemap} from "./basemap";
import * as OsmToGeoJson from "osmtogeojson";
import * as $ from "jquery";
import L from "leaflet";
import {Question} from "./Question";

export class QuestLayer {
    private map: Basemap;
    private filters: string[];
    private minzoom: number;
    private questions: Question[];
    private previousBounds: { north: number, east: number, south: number, west: number };


    constructor(map: Basemap,
                filters: string[],
                questions: Question[],
                minzoom: number) {
        this.map = map;
        this.filters = filters;
        this.questions = questions;
        this.minzoom = minzoom;
        this.previousBounds = {north: 0, east: 0, south: 0, west: 0};
        let self = this;
        map.map.on("moveend", function () {
            self.RunQuery();
        });
    }


    private RenderLayer(data) {
        let self = this;
        L.geoJSON(data, {
            style: function (feature) {
                return feature.properties.style;
            },
            onEachFeature: function (feature, layer) {
                var html = feature.properties.name+"<br/><h3>Questions</h3><form>";
                self.questions.forEach(function(q){
                    if(q.Applicable(feature.properties)){
                        html += "<br />"+q.CreateHtml(feature.properties);
                    }
                });
                html+="</form>";
                layer.bindPopup(html);
            }
        }).addTo(this.map.map);
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
        } else if (this.IsInBounds()) {
            console.log("Not running query: current query completely within bound");
        } else {
            console.log("Running query!");
            const query = this.BuildQuery();
            const self = this;
            $.getJSON(query,
                function (json) {
                    let geojson = OsmToGeoJson.default(json);
                    self.RenderLayer(geojson);
                });
        }
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