import {Changes} from "./Logic/Changes";
import {UIElement} from "./UI/UIElement";
import {UIEventSource} from "./UI/UIEventSource";

export class QuestionUI extends UIElement {
    private readonly _q: Question;
    private readonly _tags: UIEventSource<any>;
    /**
     * The ID of the calling question - used to trigger it's onsave
     */
    private readonly _qid;

    constructor(q: Question, qid: number, tags: UIEventSource<any>) {
        super(tags);
        this._q = q;
        this._tags = tags;
        this._qid = qid;
    }

    InnerRender(): string {
        
        if(!this._q.Applicable(this._tags.data)){
            return "";
        }
        
        let radios = "";
        let c = 0;

        const q = this._q.question;

        for (let answer of q.answers) {
            const human = answer.text;
            const ansId = "q" + this._qid + "-answer" + c;
            radios +=
                "<input type='radio' name='q" + this._qid + "' id='" + ansId + "' value='" + c + "' />" +
                "<label for='" + ansId + "'>" + human + "</label>" +
                "<br />";
            c++;
        }

        const embeddedScript = 'questionAnswered(' + this._qid + ', "' + this._tags.data.id + '" )';
        return q.question + "<br/>  " + radios + "<input type='button' onclick='" + embeddedScript + "' value='Opslaan' />";
    }
}


export class QuestionDefinition {


    constructor(question: string) {
        this.question = question;
    }

    /**
     * Question for humans
     */
    public question: string;

    /**
     * 'type' indicates how the answers are rendered and must be one of:
     * 'text' for a free to fill text field
     * 'radio' for radiobuttons
     * 'radio+text' for radiobuttons and a freefill text field
     * 'dropdown' for a dropdown menu
     * 'number' for a number field
     *
     * If 'text' or 'number' is specified, 'key' is used as tag for the answer.
     * If 'radio' or 'dropdown' is specified, the answers are used from 'tags'
     *
     */
    public type: string = 'radio';
    /**
     * Only used for 'text' or 'number' questions
     */
    public key: string = null;

    public answers: [{
        text: string,
        tags: [{ k: string, v: string }],
    }];

    /**
     * Indicates that the element must have _all_ the tags defined below
     * Dictionary 'key' => [values]; empty list is wildcard
     */
    public mustHaveAllTags = [];

    /**
     * Indicates that the element must _not_ have any of the tags defined below.
     * Dictionary 'key' => [values]
     */
    public mustNotHaveTags = [];

    /**
     * Severity: how important the question is
     * The higher, the sooner it'll be shown
     */
    public severity: number = 0;

    addRequiredTag(key: string, value: string) {
        if (this.mustHaveAllTags[key] === undefined) {
            this.mustHaveAllTags[key] = [value];
        } else {
            this.mustHaveAllTags[key].push(value);
        }
    }

    addUnrequiredTag(key: string, value: string) {
        if (this.mustNotHaveTags[key] === undefined) {
            this.mustNotHaveTags[key] = [value];
        } else {
            this.mustNotHaveTags[key].push(value);
        }
    }

    addAnwser(anwser: string, key: string, value: string) {
        if (this.answers === undefined) {
            this.answers = [{text: anwser, tags: [{k: key, v: value}]}];
        } else {
            this.answers.push({text: anwser, tags: [{k: key, v: value}]});
        }
        this.addUnrequiredTag(key, value);
    }

    public isApplicable(alreadyExistingTags): boolean {
        console.log('Testing applicability ', alreadyExistingTags);
        for (let k in this.mustHaveAllTags) {

            var actual = alreadyExistingTags[k];
            if (actual === undefined) {
                console.log("missing ",k);
                return false;
            }

            let possibleVals = this.mustHaveAllTags[k];
            if (possibleVals.length == 0) {
                // Wildcard
                console.log("wilded ",k);

                continue;
            }

            let index = possibleVals.indexOf(actual);
            if (index < 0) {
                console.log("not found ",k,actual);

                return false
            }
        }

        for (var k in this.mustNotHaveTags) {
            var actual = alreadyExistingTags[k];
            if (actual === undefined) {
                continue;
            }
            let impossibleVals = this.mustNotHaveTags[k];
            if (impossibleVals.length == 0) {
                // Wildcard
                console.log("unwilded ",k);

                return false;
            }

            let index = impossibleVals.indexOf(actual);
            if (index >= 0) {
                console.log("found ",k);

                return false
            }
        }

        return true;

    }
}


export class Question {


    // All the questions are stored in here, to be able to retrieve them globaly. This is a workaround, see below
    static questions = Question.InitCallbackFunction();

    static InitCallbackFunction(): Question[] {

        // This needs some explanation, as it is a workaround
        Question.questions = [];
        // The html in a popup is only created when the user actually clicks to open it
        // This means that we can not bind code to an HTML-element (as it doesn't exist yet)
        // We work around this, by letting the 'save' button just call the function 'questionAnswered' with the ID of the question
        // THis defines and registers this global function

        function questionAnswered(questionId, elementId) {
            Question.questions[questionId].OnSave(elementId);
        }

        // must cast as any to set property on window
        // @ts-ignore
        const _global = (window /* browser */ || global /* node */) as any;
        _global.questionAnswered = questionAnswered;
        return [];
    }


    public readonly question: QuestionDefinition;
    private _changeHandler: Changes;
    private readonly _qId;

    constructor(
        changeHandler: Changes,
        question: QuestionDefinition) {

        this.question = question;

        this._qId = Question.questions.length;
        this._changeHandler = changeHandler;
        Question.questions.push(this);
    }

    /**
     * SHould this question be asked?
     * Returns false if question is already there or if a premise is missing
     */
    public Applicable(tags): boolean {
        return this.question.isApplicable(tags);
    }

    /**
     *
     * @param elementId: the OSM-id of the element to perform the change on, format 'way/123', 'node/456' or 'relation/789'
     * @constructor
     */
    protected OnSave(elementId: string) {


        const selected = document.querySelector('input[name="q' + this._qId + '"]:checked');
        if (selected === null) {
            console.log("No answer selected");
            return
        }

        const value = (selected as any).value;
        console.log(value, this.question.answers);
        let tagsToApply = this.question.answers[value].tags;

        for (const toApply of tagsToApply) {
            this._changeHandler.addChange(elementId, toApply.k, toApply.v);
        }
    }

    /**
     * Creates the HTML question for this tag collection
     */
    public CreateHtml(tags: UIEventSource<any>): UIElement {
        return new QuestionUI(this, this._qId, tags);
    }


}