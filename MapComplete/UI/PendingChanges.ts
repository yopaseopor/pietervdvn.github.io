import {UIElement} from "./UIElement";
import {UIEventSource} from "./UIEventSource";
import {Changes} from "../Logic/Changes";

export class PendingChanges extends UIElement{
    
    private readonly changes;
    
    constructor(changes: Changes){
        super(changes.pendingChangesES);
        this.changes = changes;
    }
    
    protected InnerRender(): string {
        
       
        return "<div id='pending'>"+this.changes._pendingChanges.length+"</div>";
    }
    
}