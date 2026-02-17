import { Page } from 'playwright';
import { CheckActions } from '../actions/CheckActions'
import { ClickActions } from '../actions/ClickActions'
import { GetActions } from '../actions/GetActions'
import { SendActions } from '../actions/SendActions'

export class ActionsFactory {
    public check: CheckActions;
    public click: ClickActions;
    public get: GetActions;
    public send: SendActions;

    constructor() {
        this.check = new CheckActions();
        this.click = new ClickActions();
        this.get = new GetActions();
        this.send = new SendActions();
    }
}