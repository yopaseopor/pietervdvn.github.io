/**
 * Keeps track of a dictionary 'elementID' -> element
 */
import {UIEventSource} from "./UI/UIEventSource";

export class ElementStorage{
    
    private _elements = [];
    
    constructor(){
        
    }
    
    addElementById(id: string, eventSource : UIEventSource<any>){
        this._elements[id] = eventSource;
    }
    
    addElement(element):void{
        this._elements[element.properties.id] = new UIEventSource<any>(element.properties);
    }
    
    getElement(elementId) : UIEventSource<any>{
        return this._elements[elementId];
    }
    
}