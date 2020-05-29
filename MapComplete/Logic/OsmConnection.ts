// @ts-ignore
import osmAuth from "osm-auth";
import {UIEventSource} from "../UI/UIEventSource";

export class UserDetails {

    public loggedIn = false;
    public name = "Not logged in";
    public csCount = 0;
    public img: string;
    public unreadMessages = 0;

}

export class OsmConnection {


    private auth = new osmAuth({
        oauth_consumer_key: 'hivV7ec2o49Two8g9h8Is1VIiVOgxQ1iYexCbvem',
        oauth_secret: 'wDBRTCem0vxD7txrg1y6p5r8nvmz8tAhET7zDASI',
        auto: true // show a login form if the user is not authenticated and
                   // you try to do a call
    });
    private _userDetails: UIEventSource<UserDetails>;
    private _dryRun: boolean;

    constructor(userDetails: UIEventSource<UserDetails>, dryRun: boolean) {
        this._userDetails = userDetails;
        this._dryRun = dryRun;

        if (this.auth.authenticated()) {
            this.AttemptLogin(); // Also updates the user badge
        }else{
            console.log("Not authenticated");
        }

        
        if(dryRun){
            console.log("DRYRUN ENABLED");
        }

    }

    public LogOut() {
        this.auth.logout();
    }

    public AttemptLogin() {
        const self = this;
        this.auth.xhr({
            method: 'GET',
            path: '/api/0.6/user/details'
        }, function (err, details) {
            if(err != null){
                console.log(err);
                self.auth.logout();
                self._userDetails.data.loggedIn = false;
                self._userDetails.ping();
            }

            if(details == null){
                return;
            }
            // details is an XML DOM of user details
            let userInfo = details.getElementsByTagName("user")[0];

            let data = self._userDetails.data;
            data.loggedIn = true;
            data.name = userInfo.getAttribute('display_name');
            data.csCount = userInfo.getElementsByTagName("changesets")[0].getAttribute("count");
            data.img = userInfo.getElementsByTagName("img")[0].getAttribute("href");
            data.unreadMessages = userInfo.getElementsByTagName("received")[0].getAttribute("unread");
            self._userDetails.ping();
        });
    }


    public UploadChangeset(comment: string, generateChangeXML: ((csid: string) => string)) {

        if (this._dryRun) {
            console.log("NOT UPLOADING as dryrun is true");
            return;
        }

        const self = this;
        this.OpenChangeset(comment,
            function (csId) {
                var changesetXML = generateChangeXML(csId);
                self.AddChange(csId, changesetXML,
                    function (csId) {

                        self.CloseChangeset(csId);
                    }
                );

            }
        );
        
        this._userDetails.data.csCount++;
        this._userDetails.ping();
        
    }


    private OpenChangeset(comment: string, continuation: ((changesetId: string) => void)) {


        this.auth.xhr({
            method: 'PUT',
            path: '/api/0.6/changeset/create',
            options: { header: { 'Content-Type': 'text/xml' } },
            content: '<osm><changeset>' +
                '<tag k="created_by" v="MapComplete 0.0.0" />' +
                '<tag k="comment" v="' + comment + '"/>' +
                '</changeset></osm>'
        }, function (err, response) {
            if (response === undefined) {
                console.log("err", err);
                return;
            } else {
                continuation(response);
            }
        });
    }

    private AddChange(changesetId: string,
                      changesetXML: string,
                      continuation: ((changesetId: string) => void)){

        this.auth.xhr({
            method: 'POST',
            options: { header: { 'Content-Type': 'text/xml' } },
            path: '/api/0.6/changeset/'+changesetId+'/upload',
            content: changesetXML
        }, function (err, response) {
            if(response == null){
                console.log("err", err);
                return;
            }

            console.log("Closed changeset ", changesetId);
            continuation(changesetId);
        });
    }

    private CloseChangeset(changesetId: string) {
        console.log("closing");
        this.auth.xhr({
            method: 'PUT',
            path: '/api/0.6/changeset/'+changesetId+'/close',
        }, function (err, response) {
            if (response == null) {

                console.log("err", err);
            }
            console.log("Closed changeset ", changesetId);
        });
    }

}