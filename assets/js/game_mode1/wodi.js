cc.Class({
    extends: cc.Component,

    properties: {
        pai:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
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

    daxiao(){
        this.node.width=this.pai.width;
        this.node.height=this.pai.height;
    },

    dian(){
        if(this.wo==false)
            return;
        cc.director.emit("卧底选",this.node.parent.x)
        this.node.parent.getChildByName("dh3").active=true;
    },

    // update (dt) {},
});
