cc.Class({
    extends: cc.Component,

    properties: {
        kuang: cc.Node,
        zi: [cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.weix = [-253, -70, 115, 296, -253, -70, 115, 296, -253, -70, 115, 296];
        this.weiy = [128, 128, 128, 128, -2, -2, -2, -2, -125, -125, -125, -125];
    },

    start() {

    },

    onEnable() {
        this.kuang.x = -370;
        this.kuang.x = -605;
        this.shua()
    },

    shua() {
        for (var i = 0; i < this.zi.length; i++) {
            if (SHUJU.data.bianshen[i]) {
                this.zi[i].getChildByName("shipin").active = false;
            } else {
                this.zi[i].getChildByName("shipin").active = true;
            }
        }
    },

    dian(even, id) {
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        this.id = id;
        if (SHUJU.data.bianshen[id]) {
            this.hui();
        } else {
            AD.showAD(this.hui, this)
        }

    },

    hui() {
        SHUJU.bianshen = parseInt(this.id);
        SHUJU.data.bianshen[this.id]=true;
        this.kuang.x = this.weix[this.id];
        this.kuang.y = this.weiy[this.id];
        this.node.parent.getComponent("zhunbei").xuandaoji()
        this.shua()
    },

    // update (dt) {},
});
