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
            "<div id='username'>" + user.name + "</div> <br />" +
            "<div id='csCount'> <img class='star' src='./assets/star.svg'/>" + user.csCount + "</div>" +
            "</div>";
    }


}