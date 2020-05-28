import {Basemap} from "./basemap"
import {LoginElement} from "./LoginElement";
import {QuestLayer} from "./QuestLayer";
import {Question} from "./Question";
import {Changes} from "./Changes";

let login = new LoginElement();


let bm = new Basemap("leafletDiv");

let changeHandler = new Changes(login);




var access = new Question(
    changeHandler,
    "Is dit gebied toegankelijk voor het publiek?",
    3,
    "access",
    [{a: "Nee, dit is afgesloten", v: "no"},
            {a: "Nee, dit een privebos waar men niet in mag", v: "private"},
            {a: "Hoewel het een privebos is, kan men er toch in", v: "permissive"},
            {a: "Enkel tijdens activiteiten of met een gids", v: "guided"},
            {a: "Ja, het is gewoon toegankelijk", v: "yes"}],
    []
);

let op = new QuestLayer(bm, ["leisure=nature_reserve"], [access], 13);



