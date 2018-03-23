const {ccclass, property, executionOrder} = cc._decorator;

@ccclass
// @executionOrder(1)
export default class SuperClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    async onLoad() {
        // init logic
        this.label.string = await this.testAsync();
    }

    updateLabel(eventName:string, args1:string, args2:number) {
        ////cc.log(`${eventName}， ${args1}， ${args2}`);
    }

    protected async testAsync(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                resolve("Hello, World!");
            }, 1000)
        })
    }
}
