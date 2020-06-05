import {LayerDefinition} from "../LayerDefinition";
import {Quests} from "../Quests";
import {FixedUiElement} from "../UI/FixedUiElement";
import {TagMapping, TagMappingOptions} from "../UI/TagMapping";


export class Toilets extends LayerDefinition{
    
    constructor() {
        super();
        
        this.name="Toiletten";
        this.overpassFilter = ["amenity=toilets"];
        this.minzoom = 13;
        this.questions = [Quests.hasFee, Quests.toiletsChangingTable, Quests.toiletsChangingTableLocation, Quests.toiletsPosition];
        this.elementsToShow = [


            new FixedUiElement("<h2>Toiletten</h2>"),

            new TagMappingOptions({
                key: "access",
                mapping: {
                    yes: "Toegankelijk",
                    no: "Niet toegankelijk",
                    private: "Niet toegankelijk",
                    customers: "Enkel voor klanten",
                }
            }),


            new TagMappingOptions({
                key: "fee",
                mapping: {
                    yes: "Betalend",
                    no: "Gratis",
                    ["0"]: "Gratis"
                },
                template: "Betalend, men vraagt {fee}"
            }),

            new TagMappingOptions({
                key: "toilets:position",
                mapping: {
                    seated: 'Gewone zittoiletten',
                    urinal: 'Een enkele urinoir',
                    urinals: 'Urinoirs',
                    ['urinals;seated']: "Urinoirs en gewone toiletten",
                    ['seated;urinals']: "Urinoirs en gewone toiletten",

                }
            }),

            new TagMappingOptions({
                key: "wheelchair",
                mapping: {
                    yes: "Rolstoeltoegankelijk",
                    no: "Niet Rolstoeltoegankelijk",
                    limited: "Beperkt rolstoeltoegankelijk",

                }
            }),

            new TagMappingOptions({
                key: "id",
                template: "<a href='https://osm.org/{id}'> Op OSM</a>"
            })
            
        ];
    }
    
    
}