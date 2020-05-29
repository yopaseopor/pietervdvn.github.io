import {UIElement} from "./UIElement";
import {UIEventSource} from "./UIEventSource";

export class Infobox extends UIElement{
    
    private readonly tags;
    
    constructor(tags : UIEventSource<any>){
        super(tags);
        this.tags = tags.data;
    }
    
    protected InnerRender(): string {
        
        let html = "";
        const tags = this.tags;
        if(tags.name){
            html += "<h2>"+tags.name+"</h2>"
        }
        const access = {
          "yes":"Vrij toegankelijk",
          "no": "Niet toegankelijk",
          "private":"Niet toegankelijk, want privegebied",
          "permissive":"Toegankelijk, maar het is privegebied",
          "guided":"Enkel met gids of op activiteit"  
        };
        if(tags.access){
            html += access[tags.access];
        }
        
        return html;
    }
    
}