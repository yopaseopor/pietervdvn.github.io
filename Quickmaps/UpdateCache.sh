#! /bin/bash

function update { # search area, relId, tags
    mkdir $1
    cd $1
    QUERY="[out:json][timeout:25];area($2)->.searchArea;(node$3(area.searchArea);way$3(area.searchArea);relation$3(area.searchArea););out body;>;out skel qt;"
    wget -O "$3.json" "https://overpass-api.de/api/interpreter?data=$QUERY"
    cd ..

}

cd cache
update "Brugge" "3600562654" "['amenity'='public_bookcase']"
update "Brugge" "3600562654" "['leisure'='nature_reserve']['operator'='Natuurpunt Brugge']"

git add .
git commit -m "Update of the cache"
git push
