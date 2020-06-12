import {LayerDefinition} from "../LayerDefinition";
import {NatureReserves} from "./NatureReserves";
import {Toilets} from "./Toilets";
import {Bos} from "./Bos";
import {Park} from "./Park";
import {Playground} from "./Playground";
import {Bookcases} from "./Bookcases";
import {Artwork} from "./Artwork";


export class KnownSet {
    public name: string;
    public title: string;
    public layers: LayerDefinition[];
    public welcomeMessage: string;
    public gettingStartedPlzLogin: string;
    public welcomeBackMessage: string;

    public startzoom: number;
    public startLon: number;
    public startLat: number;

    static allSets : any = {};

    constructor(
        name: string,
        title: string,
        layers: LayerDefinition[],
        startzoom: number,
        startLat: number,
        startLon: number,
        welcomeMessage: string,
        gettingStartedPlzLogin: string,
        welcomeBackMessage: string
    ) {
        this.title = title;
        this.startLon = startLon;
        this.startLat = startLat;
        this.startzoom = startzoom;
        this.name = name;
        this.layers = layers;
        this.welcomeMessage = welcomeMessage;
        this.gettingStartedPlzLogin = gettingStartedPlzLogin;
        this.welcomeBackMessage = welcomeBackMessage;
        KnownSet.allSets[this.name] = this;
    }


    static groen = new KnownSet("groen",
        "Buurtnatuur",
        [new NatureReserves(), new Bos(), new Park(), new Playground()],
        14,
        51.2,
        3.2,
        "        <img src=\"assets/groen.svg\" alt=\"logo partij groen\" id=\"logo\"/>\n" +
        "\n" +
        "        <h3>Buurtnatuur meten</h3>\n" +
        "\n" +
        "\n" +
        "        Met deze tool willen we de natuur in Belgie beter inventariseren. <br/>\n" +
        "        In welke natuurgebieden kan men terecht?<br/>\n" +
        "        In welke bossen is het goed vertoeven?<br>\n" +
        "        <p>Natuur maakt immers gelukkig!</p>\n" +
        "\n" +
        "        <h4>OpenStreetMap</h4>\n" +
        "\n" +
        "        <p>We zoeken de bossen en natuurgebieden op in OpenStreetMap, want die is <a href='https://osm.org/copyright' target='_blank'>vrij te gebruiken</a> en te\n" +
        "            bewerken.</p>\n" +
        "\n" +
        "        <p>Je antwoorden worden opgeslaan op OpenStreetMap, zo zijn die onmiddelijk\n" +
        "            bruikbaar voor iedereen.</p>\n" +
        "        <p>Je antwoorden zijn ook de énige data die worden opgeslaan.<br/>\n" +
        "            We houden geen verdere gegevens bij, ook geen cookies (tenzij je inlogt).</p>\n",
        "  <p>Wil je meehelpen? <br/>\n" +
        "            Begin dan met <a href=\"https://www.openstreetmap.org/user/new\" target=\"_blank\">een account\n" +
        "            te maken</a> of\n" +
        "            <span onclick=\"authOsm()\" class=\"activate-osm-authentication\">in te loggen</span>.</p>",
        "Je bent aangemeld. Klik op een element om vragen te beantwoorden."
    );

    static openToiletMap = new KnownSet(
        "toilets",
        "Open Toilet Map",
        [new Toilets()],
        14,
        51.2,
        3.2,


        "        <h3>Open Toilet Map</h3>\n" +
        "\n" +
        "<p>Help us to create the most complete map about <i>all</i> the toilets in the world, based on openStreetMap." +
        "One can answer questions here, which help users all over the world to find an accessible toilet, close to them.</p>"
        ,
        "  <p>Start by <a href=\"https://www.openstreetmap.org/user/new\" target=\"_blank\">creating an account\n" +
        "            </a> or by " +
        "            <span onclick=\"authOsm()\" class=\"activate-osm-authentication\">logging in</span>.</p>",
        "Start by clicking a pin and answering the questions"
    );

    static bookcases = new KnownSet(
        "bookcases",
        "Open Bookcase Map",
        [new Bookcases()],
        14,
        51.2,
        3.2,


        "        <h3>Open BoekenkastjesKaart</h3>\n" +
        "\n" +
        "<p>" +
        "Help mee met het creëeren van een volledige kaart met alle boekenruilkastjes!" +
        "Een boekenruilkastje is een vaste plaats in publieke ruimte waar iedereen een boek in kan zetten of uit kan meenemen." +
        "Meestal een klein kastje of doosje dat op straat staat, maar ook een oude telefooncellen of een schap in een station valt hieronder."+
        "</p>"
        ,
        "  <p>Begin met <a href=\"https://www.openstreetmap.org/user/new\" target=\"_blank\">het aanmaken van een account\n" +
        "            </a> of door je " +
        "            <span onclick=\"authOsm()\" class=\"activate-osm-authentication\">aan te melden</span>.</p>",
        "Klik op een boekenruilkastje om vragen te beantwoorden"
    );

    static statues = new KnownSet(
        "statues",
        "Open Artwork Map",
        [new Artwork()],
        10,
        50.8435,
        4.3688,


        "        <h3>Open Statue Map</h3>\n" +
        "\n" +
        "<p>" +
        "Help with creating a map of all statues all over the world!" 
        
        ,
        "  <p>Start by <a href=\"https://www.openstreetmap.org/user/new\" target=\"_blank\">creating an account\n" +
        "            </a> or by " +
        "            <span onclick=\"authOsm()\" class=\"activate-osm-authentication\">logging in</span>.</p>",
        "Start by clicking a pin and answering the questions"
    );



}