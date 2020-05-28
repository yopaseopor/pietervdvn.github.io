/**
 * Handles all changes made to OSM.
 * Needs an authenticator via LoginElement
 */
import {LoginElement} from "./LoginElement";
import {OsmObject} from "./OsmObjects";

export class Changes{
    private readonly login: LoginElement;

    private changedElements: OsmObject[] = [];
    
    constructor(login : LoginElement){
        this.login = login;
    }

    addChange(elementId: string, key: string, value: string,
              continuation: (() => void)) {
        console.log("Registering change",key,value);

        let element = this.changedElements[elementId];
        if (element === undefined) {
            element = OsmObject.DownloadObject(elementId,
                function () {
                    element.addTag(key, value);
                    continuation();
                }
            );
            this.changedElements[elementId] = element;
        } else {
            this.changedElements[elementId].addTag(key, value);
            continuation();
        }
        
    }

    uploadAll() {

        let hasChanges = false;
        for (const id in this.changedElements) {
            const element = this.changedElements[id];
            if (!element.changed) {
                continue;
            }
            hasChanges = true;
        }

        if (!hasChanges) {
            return;
        }

        const login = this.login;
        const self = this;
        login.OpenChangeset("Toevoegen of dit natuurreservaat toegangkelijk is",
            function (csId) {


                let changes = "";
                for (const id in self.changedElements) {
                    const element = self.changedElements[id];
                    if (!element.changed) {
                        continue;
                    }

                    changes += element.ChangesetXML(csId) + "\n";

                }

                changes = "<osmChange version='0.6' generator='Mapcomplete 0.0.0'>" +
                    "<modify>" +
                    changes +
                    "</modify>" +
                    "</osmChange>";

                login.AddChange(csId, changes,
                    function (csId) {
                        login.CloseChangeset(csId);
                    }
                );
            }
        );
    }
}