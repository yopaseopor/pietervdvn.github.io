import {OsmConnection} from "./Logic/OsmConnection";
import {Changes} from "./Logic/Changes";
import {ElementStorage} from "./Logic/ElementStorage";
import {UIEventSource} from "./UI/UIEventSource";
import {UserBadge} from "./UI/UserBadge";
import {Basemap} from "./Logic/Basemap";
import {PendingChanges} from "./UI/PendingChanges";
import {FixedUiElement} from "./UI/FixedUiElement";
import {CenterMessageBox} from "./UI/CenterMessageBox";
import {Helpers} from "./Helpers";
import {KnownSet} from "./layers/KnownSet";
import {LoginDependendtMessage} from "./UI/LoginDependendtMessage";
import {AddButton} from "./UI/AddButton";
import {OverpassLayer} from "./Logic/OverpassLayer";

let questSetToRender = KnownSet.groen;
if (window.location.search) {
    const params = window.location.search.substr(1).split("&");
    const paramDict: any = {};
    for (const param of params) {
        var kv = param.split("=");
        paramDict[kv[0]] = kv[1];
    }

    if (paramDict.quests) {
        questSetToRender = KnownSet.allSets[paramDict.quests];
        console.log("Using quests: ", questSetToRender.name);
    }

}

document.title = questSetToRender.title;

const allElements = new ElementStorage();
let osmConnection = new OsmConnection(false);


new UserBadge(osmConnection.userDetails).AttachTo('userbadge');
new FixedUiElement(questSetToRender.welcomeMessage).AttachTo("welcomeMessage");
new LoginDependendtMessage(osmConnection.userDetails, questSetToRender.gettingStartedPlzLogin, questSetToRender.welcomeBackMessage)
    .AttachTo("gettingStartedBox");

const centerMessage = new UIEventSource<string>("");
const changes = new Changes(osmConnection, allElements, centerMessage);



// This little function triggers the actual upload:
// Either when more then three answers are selected, or when no new answer has been added for the last 20s
const sendCountdownMillis = new UIEventSource<number>(0);
// @ts-ignore
window.decreaseTime = function () {
    var time = sendCountdownMillis.data;
    if (time <= 0) {
        if (changes._pendingChanges.length > 0) {
            changes.uploadAll(undefined);
        }
    } else {
        sendCountdownMillis.setData(time - 1000);

    }
    window.setTimeout('decreaseTime()', 1000);
};


changes.pendingChangesES.addCallback(function () {

    var c = changes._pendingChanges.length;
    if (c > 10) {
        sendCountdownMillis.setData(0);
        changes.uploadAll(undefined);
        return;
    }

    if (c > 0) {
        sendCountdownMillis.setData(5000);
    }

});

new PendingChanges(changes, sendCountdownMillis).AttachTo("pendingchangesbox");
// @ts-ignore
window.decreaseTime(); // The timer keeps running...

Helpers.LastEffortSave(changes);

var locationControl = new UIEventSource({
    zoom: questSetToRender.startzoom,
    lat: questSetToRender.startLat,
    lon: questSetToRender.startLon
});


const bm = new Basemap("leafletDiv", locationControl);
const allLayers = []


let addButtons: {
        name: string,
        icon: string,
        tags: { k: string, v: string }[],
        layerToAddTo: OverpassLayer}[]
    = [];


for (const layer of questSetToRender.layers) {
    const renderedLayer = layer.asLayer(bm, allElements, changes);
    allLayers.push(renderedLayer.layer);

    addButtons.push({
        name: layer.name,
        icon: layer.icon,
        tags: layer.newElementTags,
        layerToAddTo: renderedLayer.layer
    })

}


const addButton = new AddButton(bm, changes, addButtons);


new CenterMessageBox(centerMessage, osmConnection, bm.Location, allLayers).AttachTo("centermessage");

locationControl.ping();
Helpers.registerActivateOsmAUthenticationClass(osmConnection);


addButton.AttachTo("bottomRight");
addButton.Update();


