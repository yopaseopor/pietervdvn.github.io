
import {UIElement} from "./UIElement";
import {OverpassLayer} from "../Logic/OverpassLayer";
/**
 * Gives the status of a single layer:
 * is it loading?
 */
export class LayerBox extends  UIElement{
    private name: string;
    private layer: OverpassLayer;
    
    constructor(name: string, layer: OverpassLayer){
        super(layer.queryState);
        this.layer = layer;
        this.name = name;
    }
    
    protected InnerRender(): string {
        if(this.layer.queryState.data){
            return "<div class='layerbox'>"+this.name+" wordt geladen</div>";
        }
        return "<div class='layerbox'>"+this.name+"</div>";
    }

    InnerUpdate(htmlElement: HTMLElement) {
    }
    
}