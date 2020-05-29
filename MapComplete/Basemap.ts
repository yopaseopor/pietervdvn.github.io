import L from "leaflet"

// Contains all setup and baselayers for Leaflet stuff
export class Basemap {

    public map: Map;


    private aivLucht2013Layer = L.tileLayer.wms('https://geoservices.informatievlaanderen.be/raadpleegdiensten/OGW/wms?s',
        {
            layers: "OGWRGB13_15VL",
            attribution: "Luchtfoto's van © AIV Vlaanderen (2013-2015) | Data van OpenStreetMap"
        });

    private osmLayer = L.tileLayer("https://{a,b,c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: 'Map Data and background © <a href="osm.org">OpenStreetMap</a>',
            maxZoom: 21,
            minZoom: 1
        });
    private osmBeLayer = L.tileLayer("https://tile.osm.be/osmbe/{z}/{x}/{y}.png",
        {
            attribution: 'Map Data and background © <a href="osm.org">OpenStreetMap</a> | <a href="https://geo6.be/">Tiles courtesy of Geo6</a>',
            maxZoom: 21,
            minZoom: 1
        });

   private grbLayer = L.tileLayer("https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=grb_bsk&STYLE=&FORMAT=image/png&tileMatrixSet=GoogleMapsVL&tileMatrix={z}&tileCol={x}&tileRow={y}",
        {
            attribution: 'Map Data   <a href="osm.org">OpenStreetMap</a> | Background <i>Grootschalig ReferentieBestand</i>(GRB) © AGIV',
            maxZoom: 21,
            minZoom: 1,
            wmts: true
        });



   private baseLayers = {
        "OpenStreetMap Be": this.osmBeLayer,
        "OpenStreetMap": this.osmLayer,
        "Luchtfoto AIV Vlaanderen": this.aivLucht2013Layer,
        "GRB Vlaanderen": this.grbLayer
    };

   
   
   
   
    constructor(leafletElementId: string) {
        this.map = L.map(leafletElementId, {
            center: [50.8435, 4.3688],
            zoom: 10,
            layers: [this.osmBeLayer]
        });
        L.control.layers(this.baseLayers).addTo(this.map);
        this.map.zoomControl.setPosition("bottomleft");
    }

    
}
