/**
 * Keeps track of a dictionary 'elementID' -> element
 */
import {UIEventSource} from "../UI/UIEventSource";

export class ElementStorage{
    
    private _elements = [];
    
    constructor(){
        
    }
    
    addElementById(id: string, eventSource : UIEventSource<any>){
        this._elements[id] = eventSource;
    }
    
    addElement(element) : UIEventSource<any>{
        const eventSource = new UIEventSource<any>(element.properties);
        this._elements[element.properties.id] = eventSource;
        return eventSource;
    }

    addOrGetElement(element: any) {
        const elementId = element.properties.id;
        if (elementId in this._elements) {
            return this._elements[elementId];
        }else{
            return this.addElement(element);
        }
    }
    
    getElement(elementId) : UIEventSource<any>{
        if (elementId in this._elements) {
            return this._elements[elementId];
        }
        console.log("Can not find eventsource with id ", elementId);
    }


}