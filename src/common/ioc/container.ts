import { Container } from 'inversify';

export class IocContainer {
    private static _IocContainer: Container = new Container();

    public static getContainer() {
        return this._IocContainer;
    }
}
