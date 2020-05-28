import osmAuth from "osm-auth";


export class LoginElement {


    private auth = new osmAuth({
        oauth_consumer_key: 'hivV7ec2o49Two8g9h8Is1VIiVOgxQ1iYexCbvem',
        oauth_secret: 'wDBRTCem0vxD7txrg1y6p5r8nvmz8tAhET7zDASI',
        auto: true // show a login form if the user is not authenticated and
                   // you try to do a call
    });

    constructor() {

        if (this.auth.authenticated()) {
            this.UpdateUserBadge()
        }else{
            console.log("Not authenticated");
        }

        const self = this;
        document.getElementById('authenticate').onclick = function () {
            // Signed method call - since `auto` is true above, this will
            // automatically start an authentication process if the user isn't
            // authenticated yet.
            self.UpdateUserBadge()
        };

    }

    private UpdateUserBadge() {
        const self = this;
        this.auth.xhr({
            method: 'GET',
            path: '/api/0.6/user/details'
        }, function (err, details) {
            if(err != null){
                console.log(err);
                self.auth.logout();
            }
            
            if(details == null){
                return;
            }
            // details is an XML DOM of user details
            let userInfo = details.getElementsByTagName("user")[0];
            let userName = userInfo.getAttribute('display_name');
            let img = userInfo.getElementsByTagName("img")[0].getAttribute("href");
            console.log(img);
            console.log("Welcome ", userName);
            document.getElementById("authenticate").innerHTML = userName;
        });
    }


    public OpenChangeset(comment: string, continuation: ((changesetId: string) => void)) {
       console.log("Opened");
        if (!this.auth.authenticated()) {
            console.log(("HUH???"));
        } else {
            console.log("AUth OK!")
        }

        this.auth.xhr({
            method: 'PUT',
            path: '/api/0.6/changeset/create',
            options: { header: { 'Content-Type': 'text/xml' } },
            content: '<osm><changeset>' +
                '<tag k="created_by" v="MapComplete 0.0.0" />' +
                '<tag k="comment" v="' + comment + '"/>' +
                '</changeset></osm>'
        }, function (err, response) {
            console.log("err", err);
            if (response === undefined) {
                return;
            } else {
                console.log("response", response);
                console.log("Opened changeset ", response);
                continuation(response);
            }
        });
    }
    
    public AddChange(changesetId: string, 
                     changesetXML: string,
                     continuation: ((changesetId: string) => void)){
        console.log("uploading");
        const changes = "<osmChange version='0.6' generator='Mapcomplete 0.0.0'>" +
            "<modify>" +
            // Version must be the same as the server version; all keys must be repeated (missing = removed); all tags/members must be repeated: lat/lon must be repeated
            "<node id='7564216431' version='2' changeset='"+changesetId+"' lat='51.2157018' lon='3.2197236'>" +
            "<tag k='fixme' v='remove me after testing'/>" +
            "</node>" +
            "</modify>" +
            "</osmChange>";
        
        this.auth.xhr({
            method: 'POST',
            options: { header: { 'Content-Type': 'text/xml' } },
            path: '/api/0.6/changeset/'+changesetId+'/upload',
            content: changesetXML
        }, function (err, response) {
            console.log("err", err);
            if(response == null){
                return;
            }
            
            console.log("response", response);
            console.log("Closed changeset ", changesetId);
            continuation(changesetId);
        });
    }

    public CloseChangeset(changesetId: string) {
        console.log("closing");
        this.auth.xhr({
            method: 'PUT',
            path: '/api/0.6/changeset/'+changesetId+'/close',
        }, function (err, response) {
            console.log("err", err);
            console.log("response", response);
            console.log("Closed changeset ", changesetId);
        });
    }
    
}