cc.Class({
    extends: cc.Component,

    properties: {
        zi: cc.Label,
        bg: [cc.Node],
        juese: sp.Skeleton,
        xiangji: cc.Node,
        bdju: [cc.SpriteFrame],
        cangan: cc.Node,
        yanwu:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.bg[SHUJU.youtu].on(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.bg[SHUJU.youtu].on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.bg[SHUJU.youtu].on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.bg[SHUJU.youtu].on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        cc.director.on("下一关", () => {
            this.kaishi();
        }, this);
        cc.director.on("刷新", () => {
            this.node.getChildByName("juese").active = true;
            this.node.getChildByName("pai").active = false;
        }, this);
        this.node.getChildByName("juese").getComponent(sp.Skeleton).setSkin("juese" + (SHUJU.youren + 1));
        this.kaishi()
    },

    kaishi() {
        SHUJU.xzy=false;
        this.zi.node.active = true;
        this.shi = 5;
        this.zi.string = this.shi + "s后变身";
        this.schedule(function () {
            this.shi--;
            this.zi.string = this.shi + "s后变身";
            if (this.shi == 0) {
                
                this.yanwu.active=true;
                this.yanwu.getChildByName("lizi").getComponent(cc.ParticleSystem).resetSystem();
                this.scheduleOnce(function() {
                    this.yanwu.active=false;
                }, 1);
                this.unscheduleAllCallbacks();
                this.zi.node.active = false;
                this.bianshen();
            }
        }, 1);
        SHUJU.djan.weicang();
    },

    bianshen() {
        this.juese.node.active = false;
        this.node.getChildByName("pai").active = true;
        cc.find("hc").getComponent("hc").yinguan(2);
        cc.find("hc").getComponent("hc").yinkai(2,false);
        this.node.getChildByName("pai").getComponent(cc.Sprite).spriteFrame = this.bdju[SHUJU.bianshen];
        if(this.cangan)
            this.cangan.active = true;
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
        if (SHUJU.xzy)
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
        if (SHUJU.xzy)
            return
        this.geng = false;
        this.juese.setAnimation(0, "idle", true);
    },
    touchCancel() {
        this.touchEnd();
    },

    update(dt) {
        if (SHUJU.xzy)
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
