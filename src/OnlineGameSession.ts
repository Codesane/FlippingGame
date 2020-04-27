import SimplePeer from "simple-peer";

export default class OnlineGameSession {

    constructor(
        readonly peer: SimplePeer.Instance,
        readonly isOwner: boolean
    ) {
    }



}

