cc.Class({
    extends: cc.Component,

    properties: {
        id:-1,
        duobg:cc.SpriteFrame,
        youbg:cc.SpriteFrame,
        qiang:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.getComponent(cc.Button).interactable=false;
        cc.director.getCollisionManager().enabled = true;
        this.oq=false;
        cc.director.on("抓", () => {
            this.zhua();
        }, this);
        cc.director.on("欧气药水开", () => {
            this.oq=true;
            this.zhua();
        }, this);
        cc.director.on("欧气药水关", () => {
            this.oq=false;
        }, this);
    },

    onCollisionEnter(other,self){
        if(other.tag!=10)
            return
        if(SHUJU.guichu==1)
            return
        if(this.oq)
            return
        switch(SHUJU.duoshu[this.id]){
            case 0:
                this.node.opacity=255;
                this.node.getComponent(cc.Button).interactable=true;
                this.huanwu()
                break;
            case 1:
                this.node.opacity=255;
                this.node.getComponent(cc.Button).interactable=true;
                this.qiang.active=true;
                this.huanyou()
                break;
            case 2:
                this.node.opacity=0;
                this.node.getComponent(cc.Button).interactable=false;
                this.qiang.active=false;
                break;
        }
    },

    huanyou(){
        this.node.getComponent(cc.Sprite).spriteFrame=this.youbg;
    },
    huanwu(){
        this.node.getComponent(cc.Sprite).spriteFrame=this.duobg;
    },
    zhua(){
        this.node.opacity=0;
        this.node.getComponent(cc.Button).interactable=false;
        this.qiang.active=false;
    },

    onCollisionExit(other,self){
        if(other.tag!=10)
            return
        this.node.opacity=0;
        this.node.getComponent(cc.Button).interactable=false;
        this.qiang.active=false;
    },

    // update (dt) {},
});
