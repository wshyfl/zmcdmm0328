cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    dian(even,id) {
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        this.id = parseInt(id);
        if(this.id==100){
            this.node.parent.getComponent("zhunbei").xuantu(this.node);
            return;
        }
        AD.showAD(this.hui, this)
    },

    hui() {
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        SHUJU.data.daoju[this.id]++;
        SHUJU.baocun()
        this.node.parent.getComponent("zhunbei").xuantu(this.node);
    },

    // update (dt) {},
});
