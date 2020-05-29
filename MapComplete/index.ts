import {OsmConnection, UserDetails} from "./Logic/OsmConnection";
import {Question} from "./Question";
import {Changes} from "./Logic/Changes";
import {ElementStorage} from "./ElementStorage";
import {UIEventSource} from "./UI/UIEventSource";
import {VerticalCombine} from "./UI/VerticalCombine";
import {TagMapping} from "./UI/TagMapping";
import {QuestionPicker} from "./UI/QuestionPicker";
import {Quests} from "./Quests";
import {UserBadge} from "./UI/UserBadge";
import {Basemap} from "./Basemap";
import {OverpassLayer} from "./OverpassLayer";
import {PendingChanges} from "./UI/PendingChanges";


function generateBox(tagsES: UIEventSource<any>) {


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


const allElements = new ElementStorage();
let userDetails = new UIEventSource<UserDetails>(new UserDetails());
let login = new OsmConnection(userDetails, false);
const changes = new Changes(login, allElements);


const allQuestionDefs = Quests.allQuests();
const questions: Question[] = [];
for (const def of allQuestionDefs) {
    questions.push(new Question(changes, def));
}


function style(properties) {
    
    let questionSeverity = 0;
    for(const q of questions){
        if(q.Applicable(properties)){
            questionSeverity = Math.max(questionSeverity, q.question.severity);
        }
    }
    
    let colormapping = {
        0: "#00bb00",
        1: "#00ff00",
        10:"#dddd00",
        20:"#ff0000"
    };
    
    return {color: colormapping[questionSeverity]};
}


new UserBadge(userDetails).AttachTo('authbox');
document.getElementById('authbox').onclick = function () {
    login.AttemptLogin();
}

new PendingChanges(changes).AttachTo("pendingchangesbox");




let bm = new Basemap("leafletDiv");

new OverpassLayer(bm, allElements, changes, ["leisure=nature_reserve"], generateBox, style,13);