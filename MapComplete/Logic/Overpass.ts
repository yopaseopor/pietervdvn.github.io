import {TagsFilter} from "./TagsFilter";
import * as OsmToGeoJson from "osmtogeojson";
import * as $ from "jquery";
import {Basemap} from "./Basemap";
import {UIEventSource} from "../UI/UIEventSource";

/**
 * Interfaces overpass to get all the latest data
 */
export class Overpass {


    private _filter: TagsFilter;
    public static testUrl: string = null;

    constructor(filter: TagsFilter) {
        this._filter = filter;
    }

    private buildQuery(bbox: string): string {
        const filters = this._filter.asOverpass();
        let filter = "";
        for (const filterOr of filters) {
            filter += 'nwr' + filterOr + ';';
        }
        const query =
            '[out:json][timeout:25]' + bbox + ';(' + filter + ');out body;>;out skel qt;';
        console.log(query);
        const url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);
        return url;
    }


    queryGeoJson(bbox: string, continuation: ((any) => void), onFail: ((reason) => void)): void {
        let query = this.buildQuery(bbox);
        
        if(Overpass.testUrl !== null){
            console.log("Using testing URL")
            query = Overpass.testUrl;
        }

        $.getJSON(query,
            function (json, status) {
                console.log("status:", status)
                if (status !== "success") {
                    console.log("Query failed")
                    onFail(status);
                }
                // @ts-ignore
                const geojson = OsmToGeoJson.default(json);
                continuation(geojson);
            }).fail(onFail)

        ;
    }


}