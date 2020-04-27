import SimplePeer from "simple-peer"
import {RectangularRegion} from "./game/types";

interface IMessage {
    type: string
    body: any
}

export type OnPlayerChangeSelectedRegion = (region: RectangularRegion) => void

export default class OnlineGameSession {

    private onPlayerChangeSelectedRegionCallback: OnPlayerChangeSelectedRegion | null = null

    constructor(
        private readonly peer: SimplePeer.Instance,
        readonly isHost: boolean
    ) {
        peer.on("data", this.onReceiveMessage)
    }

    sendRegionSelectedEvent(region: RectangularRegion) {
        this.sendMessage({
            type: "RegionSelectedEvent",
            body: region
        })
    }

    onPlayerChangeSelectedRegion = (callback: OnPlayerChangeSelectedRegion) => {
        this.onPlayerChangeSelectedRegionCallback = callback
    }

    private onReceiveMessage = (data: any) => {
        const message: IMessage = JSON.parse(data)
        console.log(`Received message: `, message)

        switch(message.type) {
            case "RegionSelectedEvent":
                this.onPlayerChangeSelectedRegionCallback && this.onPlayerChangeSelectedRegionCallback(message.body)
                break
        }
    }

    private sendMessage({ type, body }: IMessage) {
        this.peer.send(JSON.stringify({
            type,
            body
        }))
    }
}
