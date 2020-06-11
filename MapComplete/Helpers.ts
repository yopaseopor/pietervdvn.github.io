import {OsmConnection} from "./Logic/OsmConnection";
import {Changes} from "./Logic/Changes";

export class Helpers {


    /**
     * All elements with class 'activate-osm-authentication' are loaded and get an 'onclick' to authenticate
     * @param osmConnection
     */
    static registerActivateOsmAUthenticationClass(osmConnection : OsmConnection) {

        const authElements = document.getElementsByClassName("activate-osm-authentication");
        for (let i = 0; i < authElements.length; i++) {
            let element = authElements.item(i);
            // @ts-ignore
            element.onclick = function () {
                osmConnection.AttemptLogin();
            }
        }
    }
    
    
    
    /*
    * Registers an action that:
    * -> Upload everything to OSM
    * -> Asks the user not to close. The 'not to close' dialog should profide enough time to upload
    * -> WHen uploading is done, the window is closed anyway
     */
    static LastEffortSave(changes : Changes){

        window.addEventListener("beforeunload", function (e) {
            // Quickly save everyting!
            if (changes._pendingChanges.length == 0) {
                return "";
            }

            changes.uploadAll(function () {
                window.close()
            });
            var confirmationMessage = "Nog even geduld - je laatset wijzigingen worden opgeslaan!";

            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            return confirmationMessage;                            //Webkit, Safari, Chrome
        });

    }

}