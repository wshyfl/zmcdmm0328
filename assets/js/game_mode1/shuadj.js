cc.Class({
    extends: cc.Component,

    properties: {
        daoju:[cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        SHUJU.djan = this;
    },

    start() {
        this.shua()
    },

    shua() {
        this.daoju[0].getChildByName("zi").getComponent(cc.Label).string = SHUJU.data.kapai[3] + SHUJU.jineng[0]
        if (SHUJU.data.kapai[3] + SHUJU.jineng[0] <= 0)
            this.daoju[0].getChildByName("zhe").active = true;

        this.daoju[1].getChildByName("zi").getComponent(cc.Label).string = SHUJU.data.kapai[2] + SHUJU.jineng[3]
        if (SHUJU.data.kapai[2] + SHUJU.jineng[3] <= 0)
            this.daoju[1].getChildByName("zhe").active = true;

        this.daoju[2].getChildByName("zi").getComponent(cc.Label).string = SHUJU.data.daoju[3] + SHUJU.jineng[4]
        if (SHUJU.data.daoju[3] + SHUJU.jineng[4] <= 0)
            this.daoju[2].getChildByName("zhe").active = true;
    },

    weicang() {//玩家未藏
        this.yin()
    },

    tuchu() {//屠夫出现
        for (var i = 0; i < this.daoju.length; i++) {
            this.daoju[i].active = false;
        }
        this.daoju[1].active = true;
    },

    wanzhua(){//玩家被抓
        for(var i=0;i<this.daoju.length;i++){
            this.daoju[i].active=false;
        }
        this.daoju[2].active=true;
    },

    yin(){
        for(var i=0;i<this.daoju.length;i++){
            this.daoju[i].active=false;
        }
    },

    // update (dt) {},
});
