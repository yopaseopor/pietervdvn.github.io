import L from "leaflet"
import {UIEventSource} from "../UI/UIEventSource";

// Contains all setup and baselayers for Leaflet stuff
export class Basemap {

    // @ts-ignore
    public map: Map;

    public Location: UIEventSource<{ zoom: number, lat: number, lon: number }>;

    private aivLucht2013Layer = L.tileLayer.wms('https://geoservices.informatievlaanderen.be/raadpleegdiensten/OGW/wms?s',
        {
            layers: "OGWRGB13_15VL",
            attribution: "Luchtfoto's van © AIV Vlaanderen (2013-2015) | Data van OpenStreetMap"
        });

    private aivLuchtLatestLayer = L.tileLayer("https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&" +
        "LAYER=omwrgbmrvl&STYLE=&FORMAT=image/png&tileMatrixSet=GoogleMapsVL&tileMatrix={z}&tileRow={y}&tileCol={x}",
        {
            // omwrgbmrvl
            attribution: 'Map Data <a href="osm.org">OpenStreetMap</a> | Luchtfoto\'s van © AIV Vlaanderen (Laatste)  © AGIV',
            maxZoom: 20,
            minZoom: 1,
            wmts: true
        });


    private osmLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: 'Map Data and background © <a href="osm.org">OpenStreetMap</a>',
            maxZoom: 19,
            minZoom: 1
        });
    private osmBeLayer = L.tileLayer("https://tile.osm.be/osmbe/{z}/{x}/{y}.png",
        {
            attribution: 'Map Data and background © <a href="osm.org">OpenStreetMap</a> | <a href="https://geo6.be/">Tiles courtesy of Geo6</a>',
            maxZoom: 18,
            minZoom: 1
        });

    private grbLayer = L.tileLayer("https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=grb_bsk&STYLE=&FORMAT=image/png&tileMatrixSet=GoogleMapsVL&tileMatrix={z}&tileCol={x}&tileRow={y}",
        {
            attribution: 'Map Data   <a href="osm.org">OpenStreetMap</a> | Background <i>Grootschalig ReferentieBestand</i>(GRB) © AGIV',
            maxZoom: 20,
            minZoom: 1,
            wmts: true
        });


    private baseLayers = {
        "OpenStreetMap Be": this.osmBeLayer,
        "OpenStreetMap": this.osmLayer,
        "Luchtfoto AIV Vlaanderen (2013-2015)": this.aivLucht2013Layer,
        "Luchtfoto AIV Vlaanderen (laatste)": this.aivLuchtLatestLayer,
        "GRB Vlaanderen": this.grbLayer
    };


    constructor(leafletElementId: string, location: UIEventSource<{ zoom: number, lat: number, lon: number }>) {
        this. map = L.map(leafletElementId, {
            center: [location.data.lat, location.data.lon],
            zoom: location.data.zoom,
            layers: [this.osmLayer]
        });
        this.Location = location;
        L.control.layers(this.baseLayers).addTo(this.map);
        this.map.zoomControl.setPosition("bottomleft");
        const self = this;
        this.map.on("moveend", function () {
            location.data.zoom = self.map.getZoom();
            location.data.lat = self.map.getCenter().lat;
            location.data.lon = self.map.getCenter().lon;
            location.ping();
        })
    }


}
