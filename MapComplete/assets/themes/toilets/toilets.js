parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"VzSv":[function(require,module,exports) {
module.exports={layers:[{id:"Toilet",title:{key:"*",render:"Toilet"},icon:{key:"*",render:"./assets/themes/toilets/toilets.svg",mappings:[{then:"./assets/themes/toilets/wheelchair.svg",if:"wheelchair=yes"}]},color:{key:"*",render:"#0000ff"},description:"A toilet",minzoom:"14",wayHandling:2,presets:[{title:"Toilet",tags:"amenity=toilets",description:"Only add public toilets"}],tagRenderings:[{key:"access",mappings:[{then:"Public access",if:"access=yes"},{then:"Only access to customers",if:"access=customers"},{if:"access=no",then:"Not accessible"},{then:"Accessible, but one has to ask a key to enter",if:"access=key"}],question:"Are these toilets publicly accessible?",type:"text",addExtraTags:"fixme=the tag access was filled out by the user and might need refinement",render:"Access is {access}"},{mappings:[{then:"These are paid toilets",if:"fee=yes"},{if:"fee=no",then:"Free to use"}],type:"text",question:"Are these toilets free to use?"},{key:"charge",mappings:[],question:"How much does one have to pay for these toilets?",type:"string",render:"The fee is {charge}",condition:"fee=yes"},{mappings:[{then:"There is a dedicated toilet for wheelchair users",if:"wheelchair=yes"},{if:"wheelchair=no",then:"No wheelchair access"}],type:"text",question:"Is there a dedicated toilet for wheelchair users"},{mappings:[{if:"toilets:position=seated",then:"There are only seated toilets"},{if:"toilets:position=urinals",then:"There are only urinals here"},{if:"toilets:position=squat",then:"There are only squat toilets here"},{if:"toilets:position=seated;urinals",then:"Both seated toilets and urinals are available here"}],question:"Which kind of toilets are this?",type:"text"},{mappings:[{then:"A changing table is available",if:"changing_table=yes"},{if:"changing_table=no",then:"No changing table is available"}],question:"Is a changing table (to change diapers) available?",type:"text"},{key:"changing_table:location",mappings:[{then:"The changing table is in the toilet for women. ",if:"changing_table:location=female_toilet"},{then:"The changing table is in the toilet for men. ",if:"changing_table:location=male_toilet"},{if:"changing_table:location=wheelchair_toilet",then:"The changing table is in the toilet for wheelchair users. "},{if:"changing_table:location=dedicated_room",then:"The changing table is in a dedicated room. "}],type:"text",question:"Where is the changing table located?",condition:"changing_table=yes",render:"The changing table is located at {changing_table:location}"}],overpassTags:"amenity=toilets"}],startLat:"51.2095",startZoom:"12",maintainer:"Pieter Vander Vennet",title:"Open Toilet Map",startLon:"3.2222",icon:"./assets/themes/toilets/toilets.svg",description:"A map of public toilets",language:"en",name:"toilets"};
},{}]},{},["VzSv"], null)
//# sourceMappingURL=assets/themes/toilets/toilets.js.map