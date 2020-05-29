export class UIEventSource<T>{
    
    public readonly data : T;
    private _callbacks = [];
    
    constructor(data :T){
        this.data = data;
    }
    
    
    public addCallback(callback : (() => void)){
        this._callbacks.push(callback);
    }
    
    public ping():void{
        for(let i in this._callbacks){
            this._callbacks[i]();
        }
    }
    
    
}