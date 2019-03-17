#! /bin/bash

function update { # search area, relId, tags
    mkdir "$1"
    cd "$1"
    pwd
    QUERY="[out:json][timeout:25];area($2)->.searchArea;(node$3(area.searchArea);way$3(area.searchArea);relation$3(area.searchArea););out body;>;out skel qt;"
    wget -O "$3.json" "https://overpass-api.de/api/interpreter?data=$QUERY"
    cd ..

}


function updateXML { # search area, relId, tags
    mkdir "$5"
    cd "$5"
    pwd
    QUERY="[out:json][timeout:25];area($2)->.searchArea;(node$3(area.searchArea);way$3(area.searchArea);relation$3(area.searchArea);node$4(area.searchArea);way$4(area.searchArea);relation$4(area.searchArea););out body;>;out skel qt;"
    wget -O "$1.osm" "https://overpass-api.de/api/interpreter?data=$QUERY"
    cd ..

}


echo "Updating map..."
date

cd cache


# SKI RESORTS
#         NAME        RELATION  (should start with '36', have 10 digits and end with the relation number )
updateXML "France - Bourg-Saint-Maurice" "3603914986" '["aerialway"]' '["piste:type"]' "Ski"


cd ~/osmand/OsmAndMapCreator-1.1.3/
java -Djava.util.logging.config.file=logging.properties -Xms64M -Xmx6300M -cp "./OsmAndMapCreator.jar:lib/OsmAnd-core.jar:./lib/*.jar" net.osmand.util.IndexBatchCreator batch.xml
cd -


#update Name    Relation-ID, prefixed with 3600 (should be equal length)
update "West-Vlaanderen" "3600416271" '["name"="De Leiemeersen"]["leisure"="nature_reserve"]'

update "De Leiemeersen" "3609118029" '["natural"]'
update "Brugge" "3600562654" '["amenity"="public_bookcase"]'
update "Belgie" "3600052411" '["amenity"="public_bookcase"]'

update "Brugge" "3600562654" '["leisure"="nature_reserve"]["operator"="Natuurpunt Brugge"]'
update "Brugge" "3600562654" '["tourism"="information"]["operator"="Natuurpunt Brugge"]'
update "Brugge" "3600562654" '["leisure"="bird_hide"]["operator"="Natuurpunt Brugge"]'

update "Gent"   "3602524008" '["natural"="tree"]["species"]'
update "Gent"   "3602524008" '["natural"="tree"]["species:nl"]'
update "Gent"   "3602524008" '["landuse"="orchard"]'

update "Belgie" "3600052411" '["religion"="muslim"]'







git add .
git commit -m "Update of the cache"
git push
