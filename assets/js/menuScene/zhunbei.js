cc.Class({
    extends: cc.Component,

    properties: {
        yemian: [cc.Node],
        dituxuan: [cc.Node],
        pipei: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    onEnable() {
        for (var i = 0; i < this.dituxuan.length; i++) {
            this.dituxuan[i].active = false;
        }
        this.ide = -1;
        this.idc = -1;
    },

    onDisable(){
        this.unscheduleAllCallbacks();
        if(this.xia)
            this.xia.stop();
        if(this.shang)
            this.shang.stop();
    },

    dian(even, id) {
        if(SHUJU.data.tili<1){
            this.node.parent.getChildByName("menu").getComponent("menu").dian(0,"体力")
            return;
        }
        AD.chaPing();
        AD.showBanner();
        this.id = parseInt(id);
        this.node.active = true;
        switch (id) {
            case "0":
                this.dh1(this.yemian[0])
                cc.director.preloadScene("moshi0", function () {
            
                });
                SHUJU.moshi = 0;
                break;
            case "1":
                this.dh1(this.yemian[5])
                cc.director.preloadScene("moshi1", function () {
            
                });
                SHUJU.moshi = 1;
                break;
            case "2":
                this.dh1(this.yemian[0])
                cc.director.preloadScene("moshi2", function () {
            
                });
                SHUJU.moshi = 2;
                break;
            case "3":
                this.dh1(this.yemian[0])
                cc.director.preloadScene("moshi3", function () {
            
                });
                SHUJU.moshi = 3;
                break;
            case "4":
                this.dh1(this.yemian[0])
                cc.director.preloadScene("moshi4", function () {
            
                });
                SHUJU.moshi = 4;
                break;
        }
    },

    fanhui() {
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        for (var i = 0; i < this.yemian.length; i++) {
            this.yemian[i].active = false
        }
        this.node.active = false;
        AD.chaPing()
    },

    dh1(node, fang) {
        node.active = true;
        node.y = 675;
        this.xia=cc.tween(node)
            .to(0.35, { y: 0 })
            .to(0.1, { y: 50 })
            .delay(0.2)
            .call(fang);
        this.xia.start()
    },
    dh2(node,fang) {
        node.y = 0;
        this.shang=cc.tween(node)
            .to(0.15, { y: -50 })
            .to(0.15, { y: 675 })
            .delay(0.5)
            .call(fang)
            .call(() => { node.active = false;});
        this.shang.start()
    },

    xuanrenji(id) {
        if (id == this.idc)
            return;
        this.idc = id;
        if (id == 10) {
            if (SHUJU.data.jue[1] == false) {
                this.unscheduleAllCallbacks();
                return;
            }
        }
        if (id == 11) {
            if (SHUJU.data.jue[0] == false) {
                this.unscheduleAllCallbacks();
                return;
            }
        }
        this.unscheduleAllCallbacks();
        this.scheduleOnce(function () {
            if(SHUJU.moshi==0){
                this.dh2(this.yemian[0], () => { this.dh1(this.yemian[1]) })
            }else if(SHUJU.moshi==2){
                this.dh2(this.yemian[0], () => { this.dh1(this.yemian[3]) })
            }else if(SHUJU.moshi==4){
                this.dh2(this.yemian[0], () => { this.dh1(this.yemian[6]) })
            }else if(SHUJU.moshi==3){
                this.dh2(this.yemian[0], () => { this.dh1(this.yemian[2]) })
            }
            
        }, 1);
    },

    xuandaoji(){
        this.unscheduleAllCallbacks();
        this.scheduleOnce(function () {
            this.dh2(this.yemian[2], () => { this.dh1(this.yemian[4]) })
        }, 1);
    },

    suiwan(){
        this.dh2(this.yemian[3],()=>{this.dh1(this.yemian[4])})
    },

    dixia(){
        this.dh2(this.yemian[5],()=>{this.dh1(this.yemian[7])})
    },

    xuanwan(){
        this.dh2(this.yemian[7],()=>{this.dh1(this.yemian[4])})
    },

    xiatu(){
        this.dh2(this.yemian[6],()=>{this.dh1(this.yemian[4])})
    },

    jinpipei(id) {
        switch (id) {
            case 0:
                SHUJU.youtu = 0;
                break;
            case 1:
                break;
        }
        this.dh2(this.yemian[4], () => { this.pipei.getComponent("pipei").chu(this.id), this.node.active = false; })
    },

    xuantu(node) {
        this.dh2(node, () => {
            // this.dh1(this.yemian[4])
            this.jinpipei(0)
        })
    },
    // update (dt) {

    // },
});
