import {UIElement} from "./UIElement";
import {OverpassLayer} from "../Logic/OverpassLayer";
import {UIEventSource} from "./UIEventSource";
import {Helpers} from "../Helpers";
import {OsmConnection} from "../Logic/OsmConnection";

export class CenterMessageBox extends UIElement {
    private location: UIEventSource<{ zoom: number }>;
    private readonly layers: OverpassLayer[];
    private zoomInMore = new UIEventSource<boolean>(true);
    private centermessage: UIEventSource<string>;
    private readonly  osmConnection: OsmConnection;

    constructor(centermessage: UIEventSource<string>,
                osmConnection: OsmConnection,
                location: UIEventSource<{ zoom: number }>, layers: OverpassLayer[]) {
        super(centermessage);
        this.centermessage = centermessage;
        this.location = location;
        this.layers = layers;
        this.osmConnection = osmConnection;

        let minZoomForAll = 0;
        for (const i in layers) {
            let l = layers[i];
            minZoomForAll = Math.max(minZoomForAll, l.minzoom);
            this.ListenTo(l.queryState);
        }
        const self = this;
        location.addCallback(function () {
            self.zoomInMore.setData(location.data.zoom < minZoomForAll);
        });
        this.ListenTo(this.zoomInMore);

    }

    protected InnerRender(): string {

        if (this.centermessage.data != "") {
            return this.centermessage.data;
        }

        if (this.zoomInMore.data) {
            return "Zoom in om de data te zien en te bewerken";
        } else {
            for (const i in this.layers) {
                let l = this.layers[i];
                if (l.queryState.data) {
                    return "Data wordt geladen...";
                }
            }
        }
        return "Klaar!";
    }


    private ShouldShowSomething() {
        for (const i in this.layers) {
            let l = this.layers[i];
            if (l.queryState.data) {
                return true;
            }
        }
        return this.zoomInMore.data;
    }

    InnerUpdate(htmlElement: HTMLElement) {
        const pstyle = htmlElement.parentElement.style;
        if (this.centermessage.data != "") {
            pstyle.opacity = "1";
            pstyle.pointerEvents = "all";
            Helpers.registerActivateOsmAUthenticationClass(this.osmConnection);
            return;
        }
        pstyle.pointerEvents = "none";


        if (this.ShouldShowSomething()) {
            pstyle.opacity = "0.5";
        } else {
            pstyle.opacity = "0";
        }
    }

}


