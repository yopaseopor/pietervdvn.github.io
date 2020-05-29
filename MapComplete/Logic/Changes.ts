/**
 * Handles all changes made to OSM.
 * Needs an authenticator via OsmConnection
 */
import {OsmConnection} from "./OsmConnection";
import {OsmObject} from "./OsmObject";
import {ElementStorage} from "../ElementStorage";
import {UIEventSource} from "../UI/UIEventSource";

export class Changes {
    private readonly login: OsmConnection;

    public _allElements: ElementStorage;
    public _pendingChanges: { elementId: string, key: string, value: string }[] = [];
    public pendingChangesES = new UIEventSource(this._pendingChanges);

    constructor(login: OsmConnection, allElements: ElementStorage) {
        this.login = login;
        this._allElements = allElements;
    }

    /**
     * Adds a change to the pending changes
     * @param elementId
     * @param key
     * @param value
     */
    addChange(elementId: string, key: string, value: string) {

        if (key === undefined || key === null || key === "") {
            console.log("Invalid key");
            return;
        }
        if (value === undefined || value === null || value === "") {
            console.log("Invalid value");
            return;
        }

        const eventSource = this._allElements.getElement(elementId);

        eventSource.data[key] = value;
        eventSource.ping();
        this._pendingChanges.push({elementId: elementId, key: key, value: value});
        this.pendingChangesES.ping();


    }

    public uploadAll() {

        const pending: { elementId: string; key: string; value: string }[] = this._pendingChanges;
        this._pendingChanges = [];
        this.pendingChangesES.setData(this._pendingChanges);


        const knownElements = {};
        const neededIds = [];

        for (const change of pending) {
            const id = change.elementId;
            neededIds.push(id);
        }


        function DownloadAndContinue(continuation: (() => void)) {

            if (neededIds.length == 0) {
                continuation();
                return;
            }
            const neededId = neededIds.pop();

            if (neededId in knownElements) {
                DownloadAndContinue(continuation);
            }

            console.log("Downloading ", neededId);
            OsmObject.DownloadObject(neededId,
                function (element) {
                    knownElements[neededId] = element;
                    DownloadAndContinue(continuation);
                }
            );
        }

        const self = this;
        DownloadAndContinue(function () {
            console.log("Continuing", knownElements);
            // Here, inside the continuation, we know that all 'neededIds' are loaded
            // We apply the changes on them
            for (const change of pending) {
                knownElements[change.elementId].addTag(change.key, change.value);
            }

            // Small sanity check for duplicate information
            let somethingChanged = false;
            for (const elementId in knownElements) {
                const element = knownElements[elementId];
                if (!element.changed) {
                    continue;
                }
                somethingChanged = true;
            }
            if (!somethingChanged) {
                console.log("No changes");
                return;
            }


            console.log("Beginning upload...");
            // At last, we build the changeset and upload
            self.login.UploadChangeset("Updaten van metadata met Mapcomplete",
                function (csId) {

                    let changes = "";
                    for (const elementId in knownElements) {
                        const element = knownElements[elementId];
                        if (!element.changed) {
                            continue;
                        }
                        somethingChanged = true;
                        changes += element.ChangesetXML(csId) + "\n";

                    }

                    changes = "<osmChange version='0.6' generator='Mapcomplete 0.0.0'>" +
                        "<modify>" +
                        changes +
                        "</modify>" +
                        "</osmChange>";

                    return changes;
                });
        });
    }
}