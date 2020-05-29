/**
 * Handles all changes made to OSM.
 * Needs an authenticator via OsmConnection
 */
import {OsmConnection} from "./OsmConnection";
import {OsmObject} from "./OsmObject";
import {ElementStorage} from "../ElementStorage";

export class Changes {
    private readonly login: OsmConnection;

    private changedElements: OsmObject[] = [];
    private _allElements: ElementStorage;
    private _pendingChanges: { elementId: string, key: string, value: string }[];

    constructor(login: OsmConnection, allElements: ElementStorage) {
        this.login = login;
        this._allElements = allElements;
        this._pendingChanges = [];
    }

    applyChanges(continuation: (() => void)) {
        for (const pending of this._pendingChanges) {
            const key = pending.key;
            const value = pending.value;
            const elementId = pending.elementId;
            
            let element = this.changedElements[elementId];
            if (element === undefined) {
                element = OsmObject.DownloadObject(elementId,
                    function () {
                        element.addTag(key, value);
                    }
                );
                this.changedElements[elementId] = element;
            } else {
                this.changedElements[elementId].addTag(key, value);
            }
        }
        continuation();
    }

    addChange(elementId: string, key: string, value: string) {

        const eventSource = this._allElements.getElement(elementId);
        eventSource.data[key] = value;
        eventSource.ping();
        this._pendingChanges.push({elementId: elementId, key: key, value: value});

    }

    private buildChangeXML(csId): string {


        let changes = "";
        for (const id in this.changedElements) {
            const element = this.changedElements[id];
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

        return changes;
    }

    public uploadAll() {

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
        login.UploadChangeset("Toevoegen of dit natuurreservaat toegangkelijk is",
            (csId) => self.buildChangeXML(csId));
    }
}