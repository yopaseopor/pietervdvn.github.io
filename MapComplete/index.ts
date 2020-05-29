import {Basemap} from "./Basemap"
import {OsmConnection, UserDetails} from "./Logic/OsmConnection";
import {QuestLayer} from "./QuestLayer";
import {Question, QuestionDefinition} from "./Question";
import {Changes} from "./Logic/Changes";
import {ElementStorage} from "./ElementStorage";
import {UIEventSource} from "./UI/UIEventSource";
import {UserBadge} from "./UI/UserBadge";


let userDetails = new UIEventSource<UserDetails>(new UserDetails());
let login = new OsmConnection(userDetails, true);

new UserBadge(userDetails).AttachTo('authbox');
document.getElementById('authbox').onclick = function () {
    login.AttemptLogin();
};




let bm = new Basemap("leafletDiv");

let allElements = new ElementStorage();
let changeHandler = new Changes(login, allElements);

let access = new QuestionDefinition("Is dit gebied toegankelijk voor het publiek?");
access.severity = 10;
access.addAnwser("Nee, dit is afgesloten", "access", "no");
access.addAnwser("Nee, dit is een privaat terrein", "access", "no");
access.addAnwser("Hoewel het een privebos is, kan men er toch in", "access", "permissive");
access.addAnwser("Enkel tijdens activiteiten of met een gids", "access", "guided");
access.addAnwser("Ja, het is gewoon toegankelijke", "access", "yes");



new QuestLayer(bm, allElements, changeHandler, ["leisure=nature_reserve"], [access], 13);



