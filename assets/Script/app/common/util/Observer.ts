export class Observer {
    private callback: Function = null;
    private context: any = null;
    private name: number | string = null;

    constructor(callback: Function, context: any, name: number | string) {
        this.callback = callback;
        this.context = context;
        this.name = name;
    }

    notify(...args: any[]): void {
        if (this.callback != null) {
            this.callback.call(this.context, ...args);
        }
    }

    compar(context: any): boolean {
        return context == this.context;
    }
}