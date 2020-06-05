import {LayerDefinition} from "../LayerDefinition";
import {Quests} from "../Quests";
import {TagMappingOptions} from "../UI/TagMapping";
import L from "leaflet"

export class NatureReserves extends LayerDefinition {
    
    constructor() {
        super();
        this.name = "Natuurgebieden";
        this.overpassFilter = ["leisure=nature_reserve"];
        this.minzoom = 13;
        this.questions = [Quests.nameNatureReserve, Quests.accessNatureReserve, Quests.operator];
        this.style = this.generateStyleFunction();
        this.elementsToShow = [
            new TagMappingOptions({
                key: "name",
                template: "<h2>{name}</h2>",
                missing: "<h2>Naamloos gebied</h2>"
            }),

            new TagMappingOptions({
                key: "access",
                mapping: {
                    yes: "Vrij toegankelijk (op de paden)",
                    no: "Niet toegankelijk",
                    private: "Niet toegankelijk, want privegebied",
                    permissive: "Toegankelijk, maar het is privegebied",
                    guided: "Enkel met gids of op activiteit"
                }
            }),

            new TagMappingOptions({
                key: "operator",
                template: "Beheer door {operator}",
                mapping: {
                    private: 'Beheer door een privepersoon of organisatie'
                }

            }),

            new TagMappingOptions({
                key: "id",
                template: "<a href='https://osm.org/{id}'> Op OSM</a>"
            })

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