cc.Class({
    extends: cc.Component,

    properties: {
        xiangji:cc.Node,
        jiand:[cc.Node],
        wozi:cc.Node,
        dh:cc.Node,
        ditu:[cc.Node],
        jieshao:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
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

    start () {
        
        AD.hideBanner();
        cc.director.preloadScene("menu", function () {

        });
        cc.director.on("先知开", () => {
            this.xianzhi();
        }, this);
        cc.director.on("先知关", () => {
            this.guanxian();
        }, this);
        cc.director.on("卧底选", (id) => {
            this.wokai(id);
        }, this);
        cc.director.on("卧底关", () => {
            this.woguan();
        }, this);
        cc.director.on("卧底开", () => {
            this.wozi.active=true;
        }, this);
        this.xianjian=false;

        this.ditu[0].active=false;
        this.ditu[1].active=false;
        this.ditu[2].active=false;
        switch (SHUJU.youtu) {
            case 0:
                this.duox = [-95, 350, 625, 1015, 1500, 2165, 2445, 2770, 3210];
                this.ditu[0].active=true;
                break;
            case 1:
                this.duox = [-180, 225, 540, 860, 1365, 1840, 2150, 2655, 3085];
                this.ditu[1].active=true;
                break;
            case 2:
                this.duox = [-150, 360, 800, 1205, 1680, 2035, 2450, 2910, 3280];
                this.ditu[2].active=true;
                break;
        }
        if(SHUJU.data.yijin[SHUJU.moshi]){
            this.chuang()
            SHUJU.data.yijin[SHUJU.moshi]=false;
            SHUJU.baocun();
        }
    },
    chuang(){
        this.cus = cc.instantiate(this.jieshao);
        this.cus.getComponent("jieshao").chu(SHUJU.moshi);
        this.cus.parent = this.node;
        this.cus.zIndex=200;
        this.cus.setPosition(0, 0);
    },

    wokai(id){
        this.jie=SHUJU.duodi[id].getChildByName("dh3")
        this.wozi.active=false;
        this.jie.active=true;
    },
    woguan(){
        if(this.jie){
            this.jie.active=false;
        }
        this.wozi.active=false;
    },

    xianzhi() {
        this.xianjian=true;
        if(SHUJU.po==9){
            this.ji=this.dh;
        }else{
            this.ji=SHUJU.duodi[SHUJU.po].getChildByName("dh2")
        }
        this.ji.active=true;
    },
    guanxian(){
        if(this.ji){
            this.ji.active=false;
        }
        
        this.xianjian=false;
        this.jiand[0].active=false;
        this.jiand[1].active=false;
    },

    onDestroy() {
        SHUJU.replay()
    },

    update (dt) {
        if(this.xianjian){
            if(this.xiangji.x-this.duox[SHUJU.po]>cc.find("hc").getComponent("hc").cow/2){
                this.jiand[0].active=true;
                this.jiand[1].active=false;
            }else if(this.xiangji.x-this.duox[SHUJU.po]<-cc.find("hc").getComponent("hc").cow/2){
                this.jiand[0].active=false;
                this.jiand[1].active=true;
            }else{
                this.jiand[0].active=false;
                this.jiand[1].active=false;
            }
        }
    },

    // update (dt) {},
});
