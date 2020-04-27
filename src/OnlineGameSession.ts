import SimplePeer from "simple-peer"
import {RectangularRegion} from "./game/types";

interface IMessage {
    type: string
    body: any
}

export type OnPlayerChangeSelectedRegion = (region: RectangularRegion) => void
export type OnPlayerFlipPieces = (region: RectangularRegion) => void

export default class OnlineGameSession {

    private onPlayerChangeSelectedRegionCallback: OnPlayerChangeSelectedRegion | null = null
    private onPlayerFlipPiecesCallback: OnPlayerFlipPieces | null = null

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

    sendPiecesFlippedEvent(region: RectangularRegion) {
        this.sendMessage({
            type: "PiecesFlippedEvent",
            body: region
        })
    }

    onPlayerChangeSelectedRegion = (callback: OnPlayerChangeSelectedRegion) => {
        this.onPlayerChangeSelectedRegionCallback = callback
    }

    onPlayerFlipPieces = (callback: OnPlayerFlipPieces) => {
        this.onPlayerFlipPiecesCallback = callback
    }

    private onReceiveMessage = (data: any) => {
        const message: IMessage = JSON.parse(data)
        console.log(`Received message: `, message)

        switch(message.type) {
            case "RegionSelectedEvent":
                this.handleRegionSelectedEvent(message)
                break
            case "PiecesFlippedEvent":
                this.handlePiecesFlippedEvent(message)
                break
        }
    }

    private handleRegionSelectedEvent(message: IMessage) {
        this.onPlayerChangeSelectedRegionCallback && this.onPlayerChangeSelectedRegionCallback(message.body)
    }

    private handlePiecesFlippedEvent(message: IMessage) {
        this.onPlayerFlipPiecesCallback && this.onPlayerFlipPiecesCallback(message.body)
    }

    private sendMessage({ type, body }: IMessage) {
        this.peer.send(JSON.stringify({
            type,
            body
        }))
    }
}
