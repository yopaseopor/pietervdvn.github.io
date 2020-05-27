/**
 * Handles all changes made to OSM.
 * Needs an authenticator via LoginElement
 */
import {LoginElement} from "./LoginElement";

export class Changes{
    private login: LoginElement;
    
    
    
    constructor(login : LoginElement){
        this.login = login;
    }
    
    AddChange(elementId : string, key: string, value:string){
        console.log("Registering change",key,value);
    }
    
}