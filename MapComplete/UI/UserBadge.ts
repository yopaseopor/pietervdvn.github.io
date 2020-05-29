import {UIElement} from "./UIElement";
import {UserDetails} from "../Logic/OsmConnection";
import {UIEventSource} from "./UIEventSource";

/**
 * Handles and updates the user badge
 */
export class UserBadge extends UIElement {
    private _userDetails: UIEventSource<UserDetails>;


    constructor(userDetails: UIEventSource<UserDetails>) {
        super(userDetails);
        this._userDetails = userDetails;
    }

    protected InnerRender(): string {
        const user = this._userDetails.data;
        if (!user.loggedIn) {
            return "Click here to log in";
        }
        
        return "<img class='profile-pic' src='" + user.img + "'/> " +
            "<div id='usertext'>"+
            "<div id='username'>" +
            "<a href='https://www.openstreetmap.org/user/"+user.name+"' target='_blank'>" + user.name + "</a></div> <br />" +
            "<div id='csCount'> " +
            "   <a href='https://www.openstreetmap.org/user/"+user.name+"/history' target='_blank'><img class='star' src='./assets/star.svg'/>" + user.csCount + "</div></a>" +
            "</div>";
    }


}