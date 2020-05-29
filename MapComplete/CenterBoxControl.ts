import {UIElement} from "./UI/UIElement";
import {UIEventSource} from "./UI/UIEventSource";

/**
 * Controls the centerbox: shows 'zoom in to see data' and 'loading'
 */
export class CenterBoxControl extends  UIElement{
    
    constructor(zoombox : UIEventSource<{zoom: number, lat:number, lon:number}>){
        super(zoombox);
    }
    
    
    protected InnerRender(): string {
        return "";
    }
    
}