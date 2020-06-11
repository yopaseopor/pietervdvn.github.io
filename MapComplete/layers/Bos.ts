import {LayerDefinition} from "../LayerDefinition";
import {Quests} from "../Quests";
import {TagMappingOptions} from "../UI/TagMapping";
import L from "leaflet"
import {CommonTagMappings} from "./CommonTagMappings";

export class Bos extends LayerDefinition {

    constructor() {
        super();
        this.name = "bos";
        this.icon = "./assets/tree_white_background.svg";
        
        this.overpassFilter = ["landuse=forest"];
        this.newElementTags = [{k: "landuse", v: "forest"}, {
            k: "fixme",
            v: "Toegevoegd met MapComplete, geometry nog uit te tekenen"
        }]
        this.minzoom = 14;
        this.questions = [Quests.nameOf(this.name), Quests.accessNatureReserve, Quests.operator];
        this.style = this.generateStyleFunction();
        this.elementsToShow = [
            new TagMappingOptions({
                key: "name",
                template: "<h2>{name}</h2>",
                missing: "<h2>Naamloos bos</h2>"
            }),

            CommonTagMappings.access,
            CommonTagMappings.operator,
            CommonTagMappings.osmLink

        ];

    }


    private readonly treeIcon = new L.icon({
        iconUrl: "assets/tree_white_background.svg",
        iconSize: [40, 40]
    })

    private generateStyleFunction() {
        const self = this;
        return function (properties: any) {
            let questionSeverity = 0;
            for (const qd of self.questions) {
                if (qd.isApplicable(properties)) {
                    questionSeverity = Math.max(questionSeverity, qd.severity);
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

            return {
                color: colour,
                icon: self.treeIcon
            };
        };
    }

}