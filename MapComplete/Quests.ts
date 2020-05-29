import {QuestionDefinition} from "./Question";


export class Quests {


   static allQuests(): QuestionDefinition[] {

        let access = new QuestionDefinition("Is dit gebied toegankelijk voor het publiek?");
        access.severity = 10;
        access.addAnwser("Nee, dit is afgesloten", "access", "no");
        access.addAnwser("Nee, dit is een privaat terrein", "access", "no");
        access.addAnwser("Hoewel het een privebos is, kan men er toch in", "access", "permissive");
        access.addAnwser("Enkel tijdens activiteiten of met een gids", "access", "guided");
        access.addAnwser("Ja, het is gewoon toegankelijk (als men op de paden blijft)", "access", "yes");
        access.addUnrequiredTag("seamark:type","restricted_area");

        let name = new QuestionDefinition("Wat is de naam van dit gebied?");
        name.severity = 20;
        name.type = 'text';
        name.key = 'name';
        name.addUnrequiredTag('name', '*');

        let operator = new QuestionDefinition("Wie is de beheerder van dit gebied?");
        operator.severity = 1;
        operator.addUnrequiredTag("access", "private");
        operator.addUnrequiredTag("access", "no");
        operator.addAnwser("Natuurpunt", "operator", "Natuurpunt");
        operator.addAnwser("Het Agenschap Natuur en Bos", "operator", "Agentschap Natuur en Bos");
        operator.addAnwser("Een prive-eigenaar beheert dit", "operator", "private");
        operator.addUnrequiredTag('operator', '*');
        operator.type = 'radio+text';
        operator.key = "operator";
        
        
        return [name, access, operator];

    }

}