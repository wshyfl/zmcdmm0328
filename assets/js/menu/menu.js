cc.Class({
    extends: cc.Component,

    properties: {
        tanchuangyu: cc.Prefab,
        tishi: cc.Node,
        sdian:cc.Node,
        top:cc.Node,
        dh:cc.Node,

        dh1:[sp.Skeleton],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.a=SHUJU.a;
        console.log(SHUJU.a)
        console.log(this.a.slice(1,5))
        console.log(SHUJU.a)
        if (SHUJU.sci) {
            this.tishi.active = true;
            this.tishi.getChildByName("bg").scale = 0.6
            cc.tween(this.tishi.getChildByName("bg"))
                .to(0.15, { scale: 1.1 })
                .to(0.15, { scale: 1 })
                .call(() => { })
                .start()
        }
        this.dhf();
        cc.find("hc").getComponent("hc").yinguan(11);
        cc.find("hc").getComponent("hc").yinkai(12,true);
        this.dh1[0].setAnimation(0, "walk1", true);
        this.dh1[1].setAnimation(0, "idle", true);
        if(AD.chanelName1=="vivo"){
            console.log("调用盒子广告0")
            AD_vivo.showBox()
        }
    },

    dhf(){
        cc.tween(this.dh)
            .call(()=>{this.dh.scaleX=1})
            .to(3, { x: -200})
            .call(()=>{this.dh.scaleX=-1})
            .to(3, { x: -410 })
            .call(() => {this.dhf()})
            .start()
    },

    zhidao() {
        SHUJU.shou()
        cc.tween(this.tishi.getChildByName("bg"))
            .to(0.15, { scale: 1.1 })
            .to(0.15, { scale: 0.6 })
            .call(() => {this.tishi.active=false;SHUJU.sci=false;})
            .start()
    },

    shangdian(){
        AD.chaPing();
        AD.hideBanner();
        this.top.active=false;
        this.sdian.active=true;
    },

    dian(even, name) {
        var id = -1;
        switch (name) {
            case "金币":
                id = 0;
                break;
            case "体力":
                id = 1;
                break;
            case "角色1":
                if (SHUJU.data["jue"][1]||SHUJU.dianyin==false)
                    return;
                id = 2;
                break;
            case "角色2":
                if (SHUJU.data["jue"][0])
                    return;
                id = 3;
                break;
        }
        this.cus = cc.instantiate(this.tanchuangyu);
        this.cus.getComponent("tanchuang").chu(id);
        this.cus.parent = this.node.parent;
        this.cus.setPosition(0, 0);
    },

    // update (dt) {

    // },
});
