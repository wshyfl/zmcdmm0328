cc.Class({
    extends: cc.Component,

    properties: {
        bianbg: [cc.SpriteFrame],
        juese: sp.Skeleton,
        yanwu:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // this.chushi=false;
    },

    start() {
        switch (SHUJU.youtu) {
            case 0:
                this.duox = [-95, 350, 625, 1015, 1500, 2165, 2445, 2770, 3210];
                break;
            case 1:
                this.duox = [-180, 225, 540, 860, 1365, 1840, 2150, 2655, 3085];
                break;
            case 2:
                this.duox = [-150, 360, 800, 1205, 1680, 2035, 2450, 2910, 3280];
                break;
        }
        this.xzq = false;
        this.xzduo = false;
        this.xzshua = false;
        this.xzsou = false;
        
        cc.director.on("下一关", () => {
            this.xiayiguan();
        }, this);
    },

    chu(idr, id) {//sx=true是搜寻
        this.idr = idr;
        this.id = id;
        if(id===false){
            this.chushi=false;
            this.scheduleOnce(function () {
                this.juese.setSkin("juese" + (idr + 1));
            }, 0.02);
            this.juese.setAnimation(0, "dead", true);
            return;
        }

        this.scheduleOnce(function () {
            this.juese.setSkin("juese" + (idr + 1));
            this.juese.setAnimation(0, "walk", true);
        }, 0.02);

        // this.fang=Math.floor(Math.random()*6)
        // if(this.fang<=1){
        //     this.fang=0;
        // }else{
        //     this.fang=1;
        // }
        this.fang = 1
        this.hua = true;
        
        cc.tween(this.node)
            .delay(2)
            .call(() => {
                this.hua = false;
                this.bianshen()
                this.suiji();
            })
            .start()
        this.chushi = true;
    },

    xiayiguan(){
        SHUJU.youdang[this.id]=0;
        this.node.getChildByName("pai").active=false;
        this.juese.node.active=true;
        this.xzyou=false;
        this.chushi = true;
        this.xzq = false;
        this.xzduo = false;
        this.xzshua = false;
        this.xzsou = false;
        this.scheduleOnce(function () {
            this.bianshen()
            this.suiji();
        }, 0.02);
    },
    bianshen(){
        let time=Math.floor(Math.random()*2)
        this.scheduleOnce(function () {
            var num=[];
            for(var i=0;i<SHUJU.biandao.length;i++){
                if(SHUJU.biandao[i]==0){
                    num.push(i);
                }
            }
            this.idb=Math.floor(Math.random()*num.length)
            this.yanwu.active=true;
            this.yanwu.getChildByName("lizi").getComponent(cc.ParticleSystem).resetSystem();
            this.scheduleOnce(function() {
                this.yanwu.active=false;
            }, 1);
            this.node.getChildByName("pai").getComponent(cc.Sprite).spriteFrame=this.bianbg[num[this.idb]];
            this.node.getChildByName("pai").active=true;
            this.node.getChildByName("wodian").getComponent("wodi").daxiao()
            this.juese.node.active=false;
        }, time);
    },

    duo() {
        this.xzduo=true;
        this.qux=Math.random()*3850-450;
    },

    siwang(){
        SHUJU.youdang[this.id]=2;
    },

    panduan(){
        if(SHUJU.wanzhuang!=1)
            return false;
        for(var i=0;i<SHUJU.youdang.length;i++){
            if(SHUJU.youdang[i]==0)
                return false;
        }
        return true;
    },

    suiji() {
        this.youzou = Math.random() * 2 + 2;
        this.xzyou = true;
        cc.tween(this.node)
            .delay(this.youzou)
            .call(() => {
                this.xzyou = false;
                this.duo();
            })
            .start()
    },

    qie() {
        if(this.xzq)
            return;
        this.xzq=true;
        let a=Math.random()*2+4
        this.scheduleOnce(function() {
            if(this.fang==0)
                this.fang=1;
            else
                this.fang=0;
            this.xzq=false;
        }, a);
    },

    update(dt) {
        if (this.chushi == false)
            return;
        if (this.hua) {
            this.juese.node.scaleX = 1
            this.node.x += 5;
        } else {
            if (this.xzyou) {
                if (this.fang == 0) {
                    this.juese.node.scaleX = -1;
                    this.node.x -= 5;
                    if (this.node.x < -400) {
                        this.fang = 1;
                    }
                } else {
                    this.juese.node.scaleX = 1;
                    this.node.x += 5;
                    if (this.node.x > 3280) {
                        this.fang = 0;
                    }
                }
                if(SHUJU.guichu==1){
                    this.qie();
                }
            }else if (this.xzduo) {
                if (this.node.x < this.qux) {
                    this.juese.node.scaleX = 1;
                    this.node.x += 5;
                    if (this.node.x >= this.qux) {
                        this.node.x = this.qux;
                        this.xzduo=false;
                        SHUJU.youdang[this.id]=1;
                        if(this.panduan()){
                            SHUJU.daojishi.jixu()
                        }
                    }
                } else {
                    this.juese.node.scaleX = -1;
                    this.node.x -= 5;
                    if (this.node.x <= this.qux) {
                        this.node.x = this.qux;
                        this.xzduo=false;
                        SHUJU.youdang[this.id]=1;
                        if(this.panduan()){
                            SHUJU.daojishi.jixu()
                        }
                    }
                }
            }
        }
    },
});
