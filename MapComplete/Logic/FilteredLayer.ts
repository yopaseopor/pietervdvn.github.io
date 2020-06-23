import {Basemap} from "./Basemap";
import {TagsFilter, TagUtils} from "./TagsFilter";
import {UIEventSource} from "../UI/UIEventSource";
import {UIElement} from "../UI/UIElement";
import {ElementStorage} from "./ElementStorage";
import {Changes} from "./Changes";
import L from "leaflet"
import {GeoOperations} from "./GeoOperations";

/***
 * A filtered layer is a layer which offers a 'set-data' function
 * It is initialized with a tagfilter.
 *
 * When geojson-data is given to 'setData', all the geojson matching the filter, is rendered on this layer.
 * If it is not rendered, it is returned in a 'leftOver'-geojson; which can be consumed by the next layer.
 *
 * This also makes sure that no objects are rendered twice if they are applicable on two layers
 */
export class FilteredLayer {

    public readonly name: string;
    public readonly filters: TagsFilter;

    private readonly _map: Basemap;
    private readonly _removeContainedElements;
    private readonly _removeTouchingElements;

    private readonly _popupContent: ((source: UIEventSource<any>) => UIElement);

    private readonly _style: (properties) => any;

    private readonly _storage: ElementStorage;

    /** The featurecollection from overpass
     */
    private _dataFromOverpass;
    /** List of new elements, geojson features
     */
    private _newElements = [];
    /**
     * The leaflet layer object which should be removed on rerendering
     */
    private _geolayer;

    constructor(
        name: string,
        map: Basemap, storage: ElementStorage,
        changes: Changes,
        filters: TagsFilter,
        removeContainedElements: boolean,
        removeTouchingElements: boolean,
        popupContent: ((source: UIEventSource<any>) => UIElement),
        style: ((properties) => any)) {

        if (style === undefined) {
            style = function () {
                return {};
            }
        }
        this.name = name;
        this._map = map;
        this.filters = filters;
        this._popupContent = popupContent;
        this._style = style;
        this._storage = storage;
        this._removeContainedElements = removeContainedElements;
        this._removeTouchingElements = removeTouchingElements;
    }


    /**
     * The main function to load data into this layer.
     * The data that is NOT used by this layer, is returned as a geojson object; the other data is rendered
     */
    public SetApplicableData(geojson: any): any {
        const leftoverFeatures = [];
        const selfFeatures = [];
        for (const feature of geojson.features) {
            // feature.properties contains all the properties
            var tags = TagUtils.proprtiesToKV(feature.properties);
            if (this.filters.matches(tags)) {
                selfFeatures.push(feature);
            } else {
                leftoverFeatures.push(feature);
            }
        }


        this.RenderLayer({
            type: "FeatureCollection",
            features: selfFeatures
        })

        const notShadowed = [];
        for (const feature of leftoverFeatures) {
            if (this._removeContainedElements || this._removeTouchingElements) {
                if (GeoOperations.featureIsContainedInAny(feature, selfFeatures, this._removeTouchingElements)) {
                    // This feature is filtered away
                    continue;
                }
            }

            notShadowed.push(feature);
        }

        return {
            type: "FeatureCollection",
            features: notShadowed
        };
    }


    public updateStyle() {
        if (this._geolayer === undefined) {
            return;
        }
        const self = this;
        this._geolayer.setStyle(function (feature) {
            return self._style(feature.properties);
        });
    }

    public AddNewElement(element) {
        this._newElements.push(element);
        console.log("Element added");
        this.RenderLayer(this._dataFromOverpass); // Update the layer

    }

    private RenderLayer(data) {
        let self = this;

        if (this._geolayer !== undefined && this._geolayer !== null) {
            this._map.map.removeLayer(this._geolayer);
        }
        this._dataFromOverpass = data;
        const fusedFeatures = [];
        const idsFromOverpass = [];
        for (const feature of data.features) {
            idsFromOverpass.push(feature.properties.id);
            fusedFeatures.push(feature);
        }

        for (const feature of this._newElements) {
            if (idsFromOverpass.indexOf(feature.properties.id) < 0) {
                // This element is not yet uploaded or not yet visible in overpass
                // We include it in the layer
                fusedFeatures.push(feature);
            }
        }

        // We use a new, fused dataset
        data = {
            type: "FeatureCollection",
            features: fusedFeatures
        }


        // The data is split in two parts: the poinst and the rest
        // The points get a special treatment in order to render them properly
        // Note that some features might get a point representation as well


        this._geolayer = L.geoJSON(data, {
            style: function (feature) {
                return self._style(feature.properties);
            },

            pointToLayer: function (feature, latLng) {

                const eventSource = self._storage.addOrGetElement(feature);
                const style = self._style(feature.properties);
                let marker;
                if (style.icon === undefined) {
                    marker = L.marker(latLng);
                } else {

                    marker = L.marker(latLng, {
                        icon: style.icon
                    });
                }

                eventSource.addCallback(function () {
                    self.updateStyle();
                });
                const content = self._popupContent(eventSource)
                marker.bindPopup(
                    "<div class='popupcontent'>" +
                    content.Render() +
                    "</div>"
                ).on("popupopen", function () {
                    content.Activate();
                    content.Update();
                });

                return marker;
            },

            onEachFeature: function (feature, layer) {


                let eventSource = self._storage.addOrGetElement(feature);
                eventSource.addCallback(function () {
                    self.updateStyle();
                });
                const content = self._popupContent(eventSource)
                layer.bindPopup(
                    "<div class='popupcontent'>" +
                    content.Render() +
                    "</div>"    
                ).on("popupopen", function () {
                    content.Activate();
                    content.Update();
                });
            }
        });

        this._geolayer.addTo(this._map.map);
    }


}