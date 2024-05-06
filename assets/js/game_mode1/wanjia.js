cc.Class({
    extends: cc.Component,

    properties: {
        bg: [cc.Node],
        juese: sp.Skeleton,
        xiangji: cc.Node,
        bdju: [cc.SpriteFrame],
        cangan: cc.Node,
        yanwu:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        SHUJU.play=this;
    },

    start() {
        this.bg[SHUJU.youtu].on(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.bg[SHUJU.youtu].on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.bg[SHUJU.youtu].on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.bg[SHUJU.youtu].on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        cc.director.on("下一关", () => {
            this.kaishi();
        }, this);
        this.node.zIndex=1;
        this.juese.setSkin("juese" + (SHUJU.youren + 1));
        this.kaishi()
    },

    kaishi() {
        this.node.getChildByName("juese").active = true;
        this.node.getChildByName("pai").active = false;
        SHUJU.xzy=false;
        SHUJU.wanzhuang=0;
        SHUJU.djan.weicang();
        SHUJU.biannode.node.active=true;
        SHUJU.biannode.chushi();
    },

    bianshen() {
        this.juese.node.active = false;
        SHUJU.wanzhuang=4;
        this.node.getChildByName("pai").active = true;
        cc.find("hc").getComponent("hc").yinguan(2);
        cc.find("hc").getComponent("hc").yinkai(2,false);
        this.yanwu.active=true;
        this.yanwu.getChildByName("lizi").getComponent(cc.ParticleSystem).resetSystem();
        this.scheduleOnce(function() {
            this.yanwu.active=false;
        }, 1);
        this.node.getChildByName("pai").getComponent(cc.Sprite).spriteFrame = this.bdju[SHUJU.bianshen];
        if(this.cangan)
            this.cangan.active = true;
    },

    canghao(even,id){
        if(id==0){
            SHUJU.wanzhuang=1;
            SHUJU.xzy=true;
            if(this.panduan()){
                SHUJU.daojishi.jixu();
            }
            even.target.active=false;
            SHUJU.biannode.node.active=false
        }

    },

    panduan(){
        for(var i=0;i<SHUJU.youdang.length;i++){
            if(SHUJU.youdang[i]==0)
                return false;
        }
        return true;
    },

    bianhui() {
        this.juese.node.active = true;
        this.node.getChildByName("pai").active = false;
    },

    touchDown(even) {
        this.xz = true;
        this.sgx = even.getLocationX();
    },

    touchMove(even) {
        if (SHUJU.xzy&&this.juese.node.active==false||SHUJU.wanzhuang==2)
            return

        if (this.xz) {
            this.xz = false;
            this.juese.setAnimation(0, "walk", true);
        }
        this.geng = true;
        this.tmx = even.getLocationX()

        if (this.tmx - this.sgx > 0) {
            // this.zuoyou = 1;
            this.juese.node.scaleX = 1;
            this.sudu = Math.abs(this.tmx - this.sgx) / 20;
            if (this.sudu > 5) {
                this.sudu = 5;
            }
        } else {
            // this.zuoyou = 0;
            this.juese.node.scaleX = -1;
            this.sudu = -Math.abs(this.tmx - this.sgx) / 20;
            if (this.sudu < -5) {
                this.sudu = -5;
            }
        }
    },

    touchEnd(even) {
        if (SHUJU.xzy&&this.juese.node.active==false||SHUJU.wanzhuang==2)
            return
        this.geng = false;
        this.juese.setAnimation(0, "idle", true);
    },
    touchCancel() {
        this.touchEnd();
    },

    update(dt) {
        if (SHUJU.xzy&&SHUJU.wanzhuang!=0)
            return

        if (this.geng) {
            if (this.node.x < -500)
                this.node.x = -500
            if (this.node.x > 3434)
                this.node.x = 3434
            this.node.x += this.sudu;
        }
        // if (SHUJU.guichu == 1)
        //     return;
        if (Math.abs(this.xiangji.x - this.node.x) > 30) {
            this.sudu2 = -(this.xiangji.x - this.node.x) / 25;
            if (this.xiangji.x > this.node.x) {
                this.zuoyou = 0
            } else {
                this.zuoyou = 1
            }
            if (this.zuoyou == 1) {
                if (this.xiangji.x - this.node.x < 0) {
                    if ((this.xiangji.x + this.sudu2) < 2860 - (cc.find("hc").getComponent("hc").cow - 1280))
                        this.xiangji.x += this.sudu2;
                }
            } else {
                if (this.xiangji.x - this.node.x > 0) {
                    if ((this.xiangji.x + this.sudu2) > (cc.find("hc").getComponent("hc").cow - 1280) / 4)
                        this.xiangji.x += this.sudu2;
                    else
                        this.xiangji.x=(cc.find("hc").getComponent("hc").cow - 1280)/4
                }
            }
        }
    },
});
