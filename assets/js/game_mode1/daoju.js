cc.Class({
    extends: cc.Component,

    properties: {
        id: -1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.director.on("重新躲", (id) => {
            this.qiang(id);
        }, this);
        cc.director.on("下一关", () => {
            this.xiayiguan();
        }, this);
        SHUJU.duodi[this.id] = this.node;
    },

    xiayiguan(){
        if (SHUJU.duoshu[this.id] != 2){
            SHUJU.duoshu[this.id]=0;
            this.node.getChildByName("cang").active=false;
            if(this.node.getChildByName("dh"))
                this.node.getChildByName("dh").active=false;
        }
    },

    dian(even, id) {
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        this.ide = parseInt(id)
        if (SHUJU.duoshu[this.ide] != 0)
            return;
        if(this.node.getChildByName("duo").opacity==0){
            return;
        }
        SHUJU.duoshu[this.ide] = 1;
        this.duoren();
        this.node.getChildByName("cang").active = true;
        this.node.getChildByName("dh").active = true;
    },

    qiang(id) {
        if (id == this.id) {
            this.duoren();
            this.node.getChildByName("cang").active = true;
            this.node.getChildByName("dh").active = true;
            SHUJU.duoshu[this.id] = 1;
        }
    },

    duoren() {
        cc.director.emit("躲藏",this.ide);
        cc.director.emit("刷新躲");
    },

    // update (dt) {},
});
