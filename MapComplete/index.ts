import {OsmConnection} from "./Logic/OsmConnection";
import {Question} from "./Logic/Question";
import {Changes} from "./Logic/Changes";
import {ElementStorage} from "./Logic/ElementStorage";
import {UIEventSource} from "./UI/UIEventSource";
import {VerticalCombine} from "./UI/VerticalCombine";
import {TagMapping} from "./UI/TagMapping";
import {QuestionPicker} from "./UI/QuestionPicker";
import {Quests} from "./Quests";
import {UserBadge} from "./UI/UserBadge";
import {Basemap} from "./Logic/Basemap";
import {OverpassLayer} from "./Logic/OverpassLayer";
import {PendingChanges} from "./UI/PendingChanges";
import {FixedUiElement} from "./UI/FixedUiElement";
import {LayerBox} from "./UI/LayerBox";
import {CenterMessageBox} from "./UI/CenterMessageBox";
import {Helpers} from "./Helpers";
import {Toilets} from "./layers/Toilets";
import {NatureReserves} from "./layers/NatureReserves";
import {KnownSet} from "./layers/KnownSet";
import {LoginDependendtMessage} from "./UI/LoginDependendtMessage";


/*
function style(properties) {


}


*/


let questSetToRender = KnownSet.groen;
if (window.location.hash) {
    const params = window.location.hash.substr(1).split("&");
    const paramDict : any = {};
    for (const param of params) {
        var kv = param.split("=");
        paramDict[kv[0]] = kv[1];
    }
    
    console.log(paramDict);
    console.log(KnownSet.allSets);
    if(paramDict.quests){
        questSetToRender = KnownSet.allSets[paramDict.quests];
        console.log("Using quests: ",questSetToRender.name);
    }
    
}


const centerMessage = new UIEventSource<string>("");
const allElements = new ElementStorage();
let osmConnection = new OsmConnection(true);

new UserBadge(osmConnection.userDetails).AttachTo('userbadge');
new FixedUiElement(questSetToRender.welcomeMessage).AttachTo("welcomeMessage");
new LoginDependendtMessage(osmConnection.userDetails, questSetToRender.gettingStartedPlzLogin, questSetToRender.welcomeBackMessage)
    .AttachTo("gettingStartedBox");


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
        sendCountdownMillis.setData(20000);
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

for (const layer of questSetToRender.layers) {
    const renderedLayer = layer.asLayer(bm, allElements, changes);
    allLayers.push(renderedLayer.layer);
}


new CenterMessageBox(centerMessage, osmConnection, bm.Location, allLayers).AttachTo("centermessage");

locationControl.ping();

Helpers.registerActivateOsmAUthenticationClass(osmConnection);
