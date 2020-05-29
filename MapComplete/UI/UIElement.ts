import {UIEventSource} from "./UIEventSource";

export abstract class UIElement {

    private static nextId: number = 0;

    public readonly id: string;

    protected constructor(source: UIEventSource<any>) {
        this.id = "ui-element-" + UIElement.nextId;
        UIElement.nextId++;
        this.ListenTo(source);
    }


    protected ListenTo(source: UIEventSource<any>) {
        if(source === undefined){
            return;
        }
        const self = this;
        source.addCallback(() => {
            self.Update();
        })
    }

    Update(): void {
        let element = document.getElementById(this.id);
        if (element === null || element === undefined) {
            // The element is not painted
            return;
        }
        element.innerHTML = this.InnerRender();
    }

    Render(): string {
        return "<div class='uielement' id='" + this.id + "'>" + this.InnerRender() + "</div>"
    }
    
    AttachTo(divId : string){
        let element = document.getElementById(divId);
        element.innerHTML = this.Render();
    }

    protected abstract InnerRender(): string;

}