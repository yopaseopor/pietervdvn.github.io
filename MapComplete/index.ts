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


function generateBoxNatureReserve(questions: Question[]) {


    return function (tagsES: UIEventSource<any>) {


        const qbox = new QuestionPicker(questions, tagsES);
        const infobox = new VerticalCombine(
            [
                new TagMapping({
                    key: "name",
                    template: "<h2>{name}</h2>",
                    missing: "<h2>Naamloos gebied</h2>"
                }, tagsES),

                new TagMapping({
                    key: "access",
                    mapping: {
                        yes: "Vrij toegankelijk (op de paden)",
                        no: "Niet toegankelijk",
                        private: "Niet toegankelijk, want privegebied",
                        permissive: "Toegankelijk, maar het is privegebied",
                        guided: "Enkel met gids of op activiteit"
                    }
                }, tagsES),

                new TagMapping({
                    key: "operator",
                    template: "Beheer door {operator}",
                    mapping: {
                        private: 'Beheer door een privepersoon of organisatie'
                    }

                }, tagsES),

                new TagMapping({
                    key: "id",
                    template: "<a href='https://osm.org/{id}'> Op OSM</a>"
                }, tagsES)

            ]
        );
        
        
        
        
        return new VerticalCombine([infobox, qbox]);
    }
}

function generateBoxToilets(questions: Question[]) {

    return function (tagsES: UIEventSource<any>) {

        const qbox = new QuestionPicker(questions, tagsES);
        const infobox = new VerticalCombine(
            [
                new FixedUiElement("<h2>Toiletten</h2>"),

                new TagMapping({
                    key: "access",
                    mapping: {
                        yes: "Toegankelijk",
                        no: "Niet toegankelijk",
                        private: "Niet toegankelijk",
                        customers: "Enkel voor klanten",
                    }
                }, tagsES),


                new TagMapping({
                    key: "fee",
                    mapping: {
                        yes: "Betalend",
                        no: "Gratis",
                        ["0"]: "Gratis"
                    },
                    template: "Betalend, men vraagt {fee}"
                }, tagsES),

                new TagMapping({
                    key: "toilets:position",
                    mapping: {
                        seated: 'Gewone zittoiletten',
                        urinal: 'Een enkele urinoir',
                        urinals: 'Urinoirs',
                        ['urinals;seated']: "Urinoirs en gewone toiletten",
                        ['seated;urinals']: "Urinoirs en gewone toiletten",

                    }
                }, tagsES),

                new TagMapping({
                    key: "wheelchair",
                    mapping: {
                        yes: "Rolstoeltoegankelijk",
                        no: "Niet Rolstoeltoegankelijk",
                        limited: "Beperkt rolstoeltoegankelijk",

                    }
                }, tagsES),

                new TagMapping({
                    key: "id",
                    template: "<a href='https://osm.org/{id}'> Op OSM</a>"
                }, tagsES)

            ]
        );
        return new VerticalCombine([infobox, qbox]);
    }
}









function style(properties) {

    let questionSeverity = 0;
    for (const q of questions) {
        if (q.Applicable(properties)) {
            questionSeverity = Math.max(questionSeverity, q.question.severity);
        }
    }

    let colormapping = {
        0: "#00bb00",
        1: "#00ff00",
        10: "#dddd00",
        20: "#ff0000"
    };

    let colour = colormapping[questionSeverity];
    while (colour == undefined) {
        questionSeverity--;
        colormapping[questionSeverity];
    }

    return {color: colour};
}








const centerMessage = new UIEventSource<string>("");
const allElements = new ElementStorage();
let osmConnection = new OsmConnection(false);

new UserBadge(osmConnection.userDetails).AttachTo('userbadge');



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
    zoom: 14,
    lat: 51.2,
    lon: 3.2
});




let bm = new Basemap("leafletDiv", locationControl);

let layer0 = new OverpassLayer(bm, allElements, changes, ["amenity=toilets"], generateBoxToilets(changes.asQuestions(Quests.toiletQuests)), undefined, 13);
let layer1 = new OverpassLayer(bm, allElements, changes, ["leisure=nature_reserve"], generateBoxNatureReserve(changes.asQuestions(Quests.groenQuests)), undefined, 13);

const l0box = new LayerBox("toiletten", layer0);
const l1box = new LayerBox("Natuurgebieden", layer1);

new VerticalCombine([l0box, l1box]);
new CenterMessageBox(centerMessage, osmConnection, bm.Location, [layer0, layer1]).AttachTo("centermessage");

locationControl.ping();

Helpers.registerActivateOsmAUthenticationClass(osmConnection);
