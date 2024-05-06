cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.node.getComponent(cc.Button).interactable = false;
        this.wo=false;
        cc.director.on("卧底开", () => {
            this.wo=true;
            this.node.getComponent(cc.Button).interactable = true;
        }, this);
        cc.director.on("卧底选", () => {
            this.wo=false;
            this.node.getComponent(cc.Button).interactable = false;
        }, this);
        cc.director.on("卧底关", () => {
            this.wo=false;
            this.node.getComponent(cc.Button).interactable = false;
            this.node.parent.getChildByName("dh3").active=false;
        }, this);
    },

    dian(even, id) {
        console.log("点击")
        if(this.wo==false)
            return;
        if(SHUJU.duoshu[id]==2)
            return;
        cc.director.emit("卧底选",parseInt(id))
        this.node.parent.getChildByName("dh3").active=true;
    },

    // update (dt) {},
});
