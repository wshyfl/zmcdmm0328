cc.Class({
    extends: cc.Component,

    properties: {
        wozi: cc.Node,
        ditu: [cc.Node],
        jieshao: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        switch (SHUJU.youren) {
            case 6:
                SHUJU.jineng[5]++;
                break;
            case 7:
                SHUJU.jineng[0]++;
                break;
            case 8:
                SHUJU.jineng[3]++;
                break;
            case 9:
                SHUJU.jineng[3]++;
                break;
            case 10:
                SHUJU.jineng[3]++;
                SHUJU.jineng[1]++;
                break;
        }
    },

    start() {
        AD.hideBanner();
        this.schedule(() => {
            AD.hideBanner();
        }, 1, 10, 1);
        cc.director.preloadScene("menu", function () {

        });
        this.ditu[0].active = false;
        this.ditu[1].active = false;
        this.ditu[2].active = false;
        switch (SHUJU.youtu) {
            case 0:
                this.ditu[0].active = true;
                break;
            case 1:
                this.ditu[1].active = true;
                break;
            case 2:
                this.ditu[2].active = true;
                break;
        }
        cc.director.on("卧底选", (id) => {
            this.wokai(id);
        }, this);
        cc.director.on("卧底关", () => {
            this.woguan();
        }, this);
        cc.director.on("卧底开", () => {
            this.wozi.active = true;
        }, this);
        if (SHUJU.data.yijin[SHUJU.moshi]) {
            this.chuang()
            SHUJU.data.yijin[SHUJU.moshi] = false;
            SHUJU.baocun();
        }
    },
    chuang() {
        this.cus = cc.instantiate(this.jieshao);
        this.cus.getComponent("jieshao").chu(SHUJU.moshi);
        this.cus.parent = this.node;
        this.cus.zIndex = 200;
        this.cus.setPosition(0, 0);
    },

    wokai(id) {
        this.wozi.active = false;
    },
    woguan() {
        this.wozi.active = false;
    },
    guanxian() {
        if (this.ji) {
            this.ji.active = false;
        }

        this.xianjian = false;
        this.jiand[0].active = false;
        this.jiand[1].active = false;
    },

    onDestroy() {
        SHUJU.replay()
    },

    update(dt) {
    },
});
