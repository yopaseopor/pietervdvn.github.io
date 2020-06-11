import {OverpassLayer} from "./Logic/OverpassLayer";
import {Quests} from "./Quests";
import {Basemap} from "./Logic/Basemap";
import {ElementStorage} from "./Logic/ElementStorage";
import {Changes} from "./Logic/Changes";
import {Question, QuestionDefinition} from "./Logic/Question";
import {TagMapping, TagMappingOptions} from "./UI/TagMapping";
import {UIEventSource} from "./UI/UIEventSource";
import {QuestionPicker} from "./UI/QuestionPicker";
import {VerticalCombine} from "./UI/VerticalCombine";
import {UIElement} from "./UI/UIElement";
import {LayerBox} from "./UI/LayerBox";


export class LayerDefinition {


    name: string;
    newElementTags: {k: string, v: string}[]
    icon: string;
    minzoom: number;
    overpassFilter: string[];

    elementsToShow: (TagMappingOptions | QuestionDefinition | UIElement)[];
    questions: QuestionDefinition[]; // Questions are shown below elementsToShow in a questionPicker
    
    style: (tags: any) => any;


    asLayer(basemap: Basemap, allElements: ElementStorage, changes: Changes): {
        layer: OverpassLayer,
        layerBox: LayerBox
    } {
        const self = this;

        function generateBox(tagsES: UIEventSource<any>) {

            var infoboxes: UIElement[] = [];
            for (const uiElement of self.elementsToShow) {
                if (uiElement instanceof QuestionDefinition) {
                    const questionDef = uiElement as QuestionDefinition;
                    const question = new Question(changes, questionDef);
                    infoboxes.push(question.CreateHtml(tagsES));
                } else if (uiElement instanceof TagMappingOptions) {
                    const tagMappingOpt = uiElement as TagMappingOptions;
                    infoboxes.push(new TagMapping(tagMappingOpt, tagsES))
                } else {
                    const ui = uiElement as UIElement;
                    infoboxes.push(ui);
                }

            }


            const qbox = new QuestionPicker(changes.asQuestions(self.questions), tagsES);
            infoboxes.push(qbox);

            return new VerticalCombine(infoboxes);

        }

        const layer = new OverpassLayer(basemap, allElements, changes,
            this.overpassFilter, generateBox,
            this.style, 
            this.minzoom);
        return {
            layer: layer,
            layerBox: new LayerBox(this.name, layer)
        };

    }

}