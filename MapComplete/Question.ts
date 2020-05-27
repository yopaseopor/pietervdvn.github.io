import {Changes} from "./Changes";

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
        const _global = (window /* browser */ || global /* node */) as any;
        _global.questionAnswered = questionAnswered;
        return [];
    }


    private _question: string;
    private _changeHandler: Changes;
    private _tagKey: string;
    private _answers: { a: string; v: string }[];
    private _requiredTags: { k: string; v: string [] }[];
    private _qId;

    /**
     * Represents a single question that can be asked about an object.
     * It will generate HTML for in the textbox
     * @param question: The question text
     * @param severity: the importance of the question
     *     - 0: an extra, nice to know (e.g. road surface)
     *     - 1: a useful, but not very important thing (e.g. phone number of a shop)
     *     - 2: an important thing to know (e.g. the name of the shop)
     *     - 3: a deal breaker (e.g.: what does this shop sell?)
     *     - 4: potentially dangerous information if missing
     * @param tagKey
     * @param answers
     * @param requiredTags
     */
    constructor(
        changeHandler: Changes,
        question: string,
        severity: number,
        tagKey: string,
        answers: { a: string, v: string }[],
        requiredTags: { k: string, v: string[] }[]) {
        this._question = question;
        this._tagKey = tagKey;
        this._answers = answers;
        this._requiredTags = requiredTags;
        this._qId = Question.questions.length;
        this._changeHandler = changeHandler;
        Question.questions.push(this);

        if (!Question.IsInitialized) {
            console.log("ERROR NOT INITIALIZED")
        }
    }

    /**
     * SHould this question be asked?
     * Returns false if question is already there or if a premise is missing
     * @param f
     * @constructor
     */
    public Applicable(tags): boolean {
        if (this._tagKey in tags) {
            return false;
        }

        for (const neededTag of this._requiredTags) {
            let k = neededTag.k;
            if (!(k in tags)) {
                return false;
            }
            let actual = tags[k];
            if (neededTag.v.indexOf(actual) < 0) {
                console.log("Not asking question " + this._question + " as " + k + " is missing");
                return false;
            }
        }

        return true;
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
        ;

        const value = selected.value;
        console.log("Got question answered: " + this._qId, this._tagKey, value, elementId);
        this._changeHandler.AddChange(elementId, this._tagKey, value)

    }

    /**
     * Creates the HTML question for this tag collection
     * @param f
     * @constructor
     */
    public CreateHtml(tags) {
        var radios = "";
        var c = 0;
        for (var answer of this._answers) {
            var human = answer.a;
            var ansId = "q" + this._qId + "-answer" + c;
            c++;
            radios +=
                "<input type='radio' name='q" + this._qId + "' id='" + ansId + "' value='" + answer.v + "' />" +
                "<label for='" + ansId + "'>" + human + "</label>" +
                "<br />";
        }

        var embeddedScript = 'questionAnswered(' + this._qId + ', "' + tags.id + '" )';
        return this._question + "<br/>  " + radios + "<input type='button' onclick='" + embeddedScript + "' value='Opslaan' />";
    }


}