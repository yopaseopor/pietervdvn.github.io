import {LayerDefinition} from "../LayerDefinition";
import {NatureReserves} from "./NatureReserves";
import {Toilets} from "./Toilets";


export class KnownSet {
    public name: string;
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
        layers: LayerDefinition[],
        startzoom: number,
        startLat: number,
        startLon: number,
        welcomeMessage: string,
        gettingStartedPlzLogin: string,
        welcomeBackMessage: string
    ) {
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
        [new NatureReserves()],
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
        "        <p>We zoeken de bossen en natuurgebieden op in OpenStreetMap, want is vrij te gebruiken en te\n" +
        "            bewerken</p>\n" +
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

    static openToiletMap = new KnownSet("toilets",
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



}