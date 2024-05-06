cc.Class({
    extends: cc.Component,

    properties: {
        daoju: [cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {
        this.shua()
        SHUJU.djan = this;
    },

    shua() {
        this.daoju[0].getChildByName("zi").getComponent(cc.Label).string = SHUJU.data.kapai[3] + SHUJU.jineng[0]
        if (SHUJU.data.kapai[3] + SHUJU.jineng[0] <= 0)
            this.daoju[0].getChildByName("zhe").active = true;

        this.daoju[1].getChildByName("zi").getComponent(cc.Label).string = SHUJU.data.daoju[1] + SHUJU.jineng[1]
        if (SHUJU.data.daoju[1] + SHUJU.jineng[1] <= 0)
            this.daoju[1].getChildByName("zhe").active = true;

        this.daoju[2].getChildByName("zi").getComponent(cc.Label).string = SHUJU.data.daoju[2] + SHUJU.jineng[2]
        if (SHUJU.data.daoju[2] + SHUJU.jineng[2] <= 0)
            this.daoju[2].getChildByName("zhe").active = true;

        this.daoju[3].getChildByName("zi").getComponent(cc.Label).string = SHUJU.data.kapai[2] + SHUJU.jineng[3]
        if (SHUJU.data.kapai[2] + SHUJU.jineng[3] <= 0)
            this.daoju[3].getChildByName("zhe").active = true;

        this.daoju[4].getChildByName("zi").getComponent(cc.Label).string = SHUJU.data.daoju[3] + SHUJU.jineng[4]
        if (SHUJU.data.daoju[3] + SHUJU.jineng[4] <= 0)
            this.daoju[4].getChildByName("zhe").active = true;
    },

    pansha() {

        for (var i = 0; i < SHUJU.youdang.length; i++) {
            if (SHUJU.youdang[i] != 2){
                return true;
            }
        }
        
        return false;
    },

    weicang() {//玩家未藏
        SHUJU.daojudian = [0, 0, 0, 0, 0];
        for (var i = 0; i < this.daoju.length; i++) {
            if (i < 3) {
                this.daoju[i].active = true;
            } else {
                this.daoju[i].active = false;
            }
            if(this.pansha()==false){
                this.daoju[2].active = false;
            }
        }

    },

    npccang() {//玩家藏好，npc未藏好
        for (var i = 0; i < this.daoju.length; i++) {
            this.daoju[i].active = false;
        }
        if(SHUJU.daojudian[0]==0){
            this.daoju[0].active = true;
        }
        if(SHUJU.daojudian[3]==0){
            this.daoju[3].active = true;
        }
    },

    tuchu() {//屠夫出现玩家躲藏
        for (var i = 0; i < this.daoju.length; i++) {
            this.daoju[i].active = false;
        }
        if(SHUJU.daojudian[3]==0){
            this.daoju[3].active = true;
        }
    },
    chuwei() {//屠夫出现玩家未躲藏
        for (var i = 0; i < this.daoju.length; i++) {
            this.daoju[i].active = false;
        }
        if(SHUJU.daojudian[2]==0){
            this.daoju[2].active = true;
        }
    },

    npczhua() {//npc被抓
        for (var i = 0; i < this.daoju.length; i++) {
            this.daoju[i].active = false;
        }
    },

    wanzhua() {//玩家被抓
        for (var i = 0; i < this.daoju.length; i++) {
            this.daoju[i].active = false;
        }
        this.daoju[4].active = true;
    },

    isquansi() {
        for (var i = 0; i < SHUJU.youdang.length; i++) {
            if (SHUJU.youdang[i] != 2)
                return false;
        }
        return true;
    },

    // update (dt) {},
});
