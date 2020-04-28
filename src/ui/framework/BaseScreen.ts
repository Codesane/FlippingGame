type EventListener<K extends keyof HTMLElementEventMap> = (this: HTMLElement, ev: HTMLElementEventMap[K]) => any

interface MapOfEventListeners {
    [elementId: string]: [any, EventListener<any>][]
}

export default abstract class BaseScreen {

    private eventListeners: MapOfEventListeners = {}

    protected constructor(private readonly templateContainerId: string) {

    }

    render(container: HTMLElement) {
        container.innerHTML = this.getById(this.templateContainerId)!.innerHTML
    }

    onEvent<K extends keyof HTMLElementEventMap>(
        elementId: string,
        type: K,
        listener: EventListener<K>
    ) {
        this.getById(elementId).addEventListener(type, listener)

        if (!this.eventListeners[elementId]) {
            this.eventListeners[elementId] = []
        }

        this.eventListeners[elementId].push([type, listener])
    }

    getById<T extends HTMLElement>(elementId: string): T {
        return document.getElementById(elementId) as T
    }

    destroy() {
        for (let elementId in this.eventListeners) {
            const eventListeners = this.eventListeners[elementId]

            eventListeners.forEach(it => {
                const [type, listener] = it
                this.getById(elementId).removeEventListener(type, listener)
            })
        }
    }
}
