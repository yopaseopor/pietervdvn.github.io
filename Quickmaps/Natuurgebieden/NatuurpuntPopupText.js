

function toHa(surface){
	return Math.floor(surface/100)/100;
}

function popupText(tags, area){
 	text = "";
	if(tags.name){
		text += "<h3>"+tags.name+"</h3>";
	}

	text += "<table><tr><td>";
	text += toHa(tags.area)+" hectare"
	if(tags.area != area && !isNaN(area)){
		text += " - " + toHa(area)+" hectare geselecteerd";
	}
	if(tags.operator){
		text += " - beheer door "+tags.operator;
	}
	text += "</p>";

	if(tags.curator){
		text += "<p>Conservator is <strong>"+tags.curator+"</strong>, telefoonnummer is "
		if(tags.phone){
			text += tags.phone
		}else{
			text += "niet gegeven"		
		}
		text += ", email is "
		if(tags.email){
			text += "<a href='mailto:"+tags.email+"'>"+tags.email+"</a>"
		}else{
			text += "niet gegeven"		
		}
	}


	if(tags.access){
		if(tags.access == "no"){
			text += "<p>Niet vrij toegankelijk</p>";
		}else if(tags.access == "yes"){
			text += "<p>Toegankelijk op de paden</p>";
		}else if(tags.access == "guided"){
			text += "<p>Enkel toegankelijk met een gids of tijdens activiteiten</p>"
		}else{
			text += "<p>Toegankelijkheid: "+tags.access+"</p>";				
		}
	}
	if(tags.dogs){
		if(tags.dogs == "no"){
			text += "<p>Honden niet toegelaten</p>";		
		}else if(tags.dogs == "leashed"){
			text += "<p>Honden enkel aan de leiband</p>";		
		}else if(tags.dogs == "yes"){
			text += "<p>Honden zijn toegelaten</p>";
		}else if(tags.dogs == "unleashed"){
			text += "<p>Honden zijn toegelaten, zelfs los zonder leiband</p>";
		}else{
			text += "<p>Honden: "+tags.dogs+"</p>";		
		}

	}



	if(tags.description){
		text += "<p>Beschrijving: <strong>"+tags.description+"</strong><p>";
	}

	if(tags.image){
        text+="</td><td><img width=300px src='"+tags.image+"' alt='Bezig met laden...'/>";
	}

	if(tags.wikipedia){
		text += "</td></tr><tr><td colspan='2'><h2>Op wikipedia</h2>";

		text += '<div id="" style="overflow:scroll; height:300px;">' + tags.wikipedia_contents + '</div>';
	}


	if(tags.website){
		text += "</td></tr><tr><td colspan='2'><a href=\""+tags.website+"\" target='_blank'>Bekijk op de site</a><br />";
	}
	
	text += "</td></tr></table>"
	return text;
}


var natuurpuntIcon = L.icon({
    iconUrl: 'resources/Natuurpunt.jpg',

    iconSize:     [50, 50], // size of the icon
    iconAnchor:   [25, 35], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

var anbIcon = L.icon({
    iconUrl: 'resources/ANB.jpg',

    iconSize:     [50, 50], // size of the icon
    iconAnchor:   [25, 35], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});


var info = L.icon({
    iconUrl: 'resources/info.png',

    iconSize:     [26, 26], // size of the icon
    iconAnchor:   [13, 13], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -15] // point from which the popup should open relative to the iconAnchor
});

var birdhide = L.icon({
    iconUrl: 'resources/birdhide.png',

    iconSize:     [26, 26], // size of the icon
    iconAnchor:   [13, 13], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -15] // point from which the popup should open relative to the iconAnchor
});

var birdhideShelter = L.icon({
    iconUrl: 'resources/birdshelter.png',

    iconSize:     [26, 26], // size of the icon
    iconAnchor:   [13, 13], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -15] // point from which the popup should open relative to the iconAnchor
});

function imageFunction(tags){
	if(tags.operator.startsWith("Natuurpunt") || tags.operator.startsWith("natuurpunt")){
		return natuurpuntIcon;
	}
	if(tags.operator.startsWith("Agentschap Natuur") || tags.operator.startsWith("Agentschap voor Natuur")){
		return anbIcon;	
	}
	console.log("No image for ", tags.operator);
}


function infoBoardText(tags){
	let text=  "<h1>Informatiebord</h1>";
	text += "<img src='"+tags.image+"' alt='"+tags.image+"' height=\"400\"/>";
	return text;
}

function birdHideImage(tags){
    if(tags.building){
        return birdhideShelter;
    }
    return birdhide;
}

function birdHideText(tags){
    var text = "<h1>";
    if(tags.building){
        text += "Vogelkijkhut"
    }else{
        text += "Vogelkijkwand"
    }
    
    if(tags.name){
        text += " <i>"+tags.name+"</i>";
    }
    text+="</h1>"
    
    if(tags.opening_hours){
        text += "Openingsuren: "+tags.opening_hours    
    }
    if(tags.access){
        text += "Toegang: "+tags.access;
    }
    
    return text;
}

function imageBoardFunction(tags){
	return info;
}

