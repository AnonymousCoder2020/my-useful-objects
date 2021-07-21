export default class Init {
    init(initProps) {
        initProps && Object.assign(this, initProps);
        return this;
    }
}
