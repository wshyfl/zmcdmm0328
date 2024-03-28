cc.Class({
    extends: cc.Component,

    properties: {
        juese: sp.Skeleton,
        xiangji: cc.Node,
        soujindu: cc.Node,
        wuyao: [cc.Node],
        yao: cc.Prefab,
        touyao: [cc.Node],
        xianyao: [cc.Node],
        bgyao: [cc.SpriteFrame],
        xiaoyao: [cc.Node],
        gui: sp.Skeleton,
        yanwu:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        
        cc.macro.ENABLE_MULTI_TOUCH = false;
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        this.sudu = 5;
        this.xz = true;
        this.geng = false;
        this.zuoyou = -1;//左是0,1是右
        this.qian = false;
        this.zp = false
        this.feibiaox = [-404, -360, -315];

        let a = [0, 1, 2, 3, 4, 5, 6];
        let b = Math.floor(Math.random() * a.length)
        a.splice(a.indexOf(b), 1)
        let c = Math.floor(Math.random() * a.length);
        let ce = a[c];
        a.splice(a.indexOf(ce), 1)
        let d = Math.floor(Math.random() * a.length);
        SHUJU.sou[b] = 1;
        SHUJU.sou[ce] = 1;
        SHUJU.sou[a[d]] = 1;
        this.xiangji.x = (cc.find("hc").getComponent("hc").cow - 1280) / 2
        this.oq = false;
        cc.director.on("捡", (id, idd) => {
            this.jian(id, idd);
        }, this);
        cc.director.on("指人牌开", () => {
            this.zp = true;
            this.yanwu.active=true;
            this.yanwu.getChildByName("lizi").getComponent(cc.ParticleSystem).resetSystem();
            this.scheduleOnce(function() {
                this.yanwu.active=false;
            }, 1);
        }, this);
        cc.director.on("指人牌关", () => {
            this.zp = false;
        }, this);
        cc.director.on("欧气药水开", () => {
            this.oq = true;
        }, this);
        cc.director.on("欧气药水关", () => {
            this.oq = false;
        }, this);
        SHUJU.djan.weicang()
    },

    onEnable() {
        this.juese.setSkin("juese" + (SHUJU.youren + 1))
    },

    touchDown(even) {
        if (SHUJU.xzy)
            return
        this.xz = true;
        this.sgx = even.getLocationX();
    },

    touchMove(even) {
        if (SHUJU.wanzhuang == 1 && SHUJU.guichu == 0 && this.oq == false) {
            if (this.xiangji.x < (cc.find("hc").getComponent("hc").cow - 1280) / 4) {
                this.xiangji.x = (cc.find("hc").getComponent("hc").cow - 1280) / 4
            }
            if (this.xiangji.x> 2860 - (cc.find("hc").getComponent("hc").cow - 1280)) {
                this.xiangji.x = 2860 - (cc.find("hc").getComponent("hc").cow - 1280)
            }
            if((this.xiangji.x - even.getDeltaX())>=(cc.find("hc").getComponent("hc").cow - 1280) / 4&&(this.xiangji.x - even.getDeltaX())<=2860 - (cc.find("hc").getComponent("hc").cow - 1280))
                this.xiangji.x -= even.getDeltaX();
        }

        if (SHUJU.xzy)
            return

        if (SHUJU.guichu == 1 && this.zp == true)
            return;
        this.geng = true;
        this.qian = false;
        if (this.xz) {
            this.xz = false;
            this.juese.setAnimation(0, "walk", true);
        }
        this.tmx = even.getLocationX()

        if (this.tmx - this.sgx > 0) {
            // this.zuoyou = 1;
            this.juese.node.scaleX = 1;
            this.juese.node.parent.getChildByName("pai").scaleX = -1;
            this.sudu = Math.abs(this.tmx - this.sgx) / 20;
            if (this.sudu > 5) {
                this.sudu = 5;
            }
        } else {
            // this.zuoyou = 0;
            this.juese.node.scaleX = -1;
            this.juese.node.parent.getChildByName("pai").scaleX = 1;
            this.sudu = -Math.abs(this.tmx - this.sgx) / 20;
            if (this.sudu < -5) {
                this.sudu = -5;
            }
        }
    },

    touchEnd(even) {
        
        this.geng = false;
        if (SHUJU.xzy)
            return
        this.juese.setAnimation(0, "idle", true);
    },
    touchCancel(){
        this.touchEnd();
    },

    souxun() {
        this.szhang = SHUJU.sou[this.sid];
        SHUJU.sou[this.sid] = 3;
        this.qian = false;
        this.juese.setAnimation(0, "idle", true);
        SHUJU.xzy = true;
        this.soujindu.active = true;

        this.soujindu.getComponent(cc.ProgressBar).progress = 0;
        cc.tween(this.soujindu.getComponent(cc.ProgressBar))
            .to(3, { progress: 1 })
            .call(() => { this.panyao() })
            .start()
    },
    jian(id, idd) {
        SHUJU.diaoyao.destroy()
        for (var i = 0; i < idd; i++) {
            SHUJU.yao[8]++;
            this.suanyao()
            this.shan(this.xiaoyao[SHUJU.yao[8] - 1])

            this.cus = cc.instantiate(this.yao);
            this.cus.parent = this.node.parent.parent;
            this.cus.group = "ui"
            this.cus.setPosition(0, -300);

            cc.tween(this.cus)
                .delay(0.2)
                .to(0.5, { x: this.feibiaox[SHUJU.yao[8] - 1], y: 180 })
                .call(() => {
                    this.xianyao[SHUJU.yao[8] - 1].getComponent(cc.Sprite).spriteFrame = this.bgyao[1];
                    SHUJU.xzy = false;
                    this.cus.destroy();
                    if (SHUJU.yao[8] >= 3) {
                        cc.director.emit("结算", 0, 2, SHUJU.youren, 0)
                    }
                })
                .start()
        }

    },
    panyao() {
        this.soujindu.active = false
        let cid = this.sid
        if (this.szhang == 0) {
            SHUJU.sou[this.sid] = 2;
            SHUJU.xzy = false;
            this.wuyao[this.sid].active = true;
            this.scheduleOnce(function () {
                this.wuyao[cid].active = false;
            }, 1);
        } else if (this.szhang == 1) {
            SHUJU.sou[this.sid] = 2;
            SHUJU.yao[8]++;
            this.suanyao()
            this.shan(this.xiaoyao[SHUJU.yao[8] - 1])

            this.cus = cc.instantiate(this.yao);
            this.cus.parent = this.node.parent.parent;
            this.cus.group = "ui"
            this.cus.setPosition(0, 40);

            cc.tween(this.cus)
                .delay(0.2)
                .to(0.5, { x: this.feibiaox[SHUJU.yao[8] - 1], y: 180 })
                .call(() => {
                    this.xianyao[SHUJU.yao[8] - 1].getComponent(cc.Sprite).spriteFrame = this.bgyao[1];
                    SHUJU.xzy = false;
                    this.cus.destroy();
                    if (SHUJU.yao[8] >= 3) {
                        cc.director.emit("结算", 0, 2, SHUJU.youren, 0)
                    }
                })
                .start()
        }
    },

    suanyao() {
        for (var i = 0; i < 3; i++) {
            this.touyao[i].active = false;
            this.xiaoyao[i].active = false;
            this.xianyao[i].getComponent(cc.Sprite).spriteFrame = this.bgyao[0];
        }
        for (var i = 0; i < SHUJU.yao[8]; i++) {
            this.touyao[i].active = true;
            this.xiaoyao[i].active = true;
            this.xianyao[i].getComponent(cc.Sprite).spriteFrame = this.bgyao[1];
        }

    },

    shan(node) {
        cc.tween(this.node)
            .delay(0.2)
            .call(() => { node.active = false })
            .delay(0.2)
            .call(() => { node.active = true })
            .delay(0.2)
            .call(() => { node.active = false })
            .delay(0.2)
            .call(() => { node.active = true })
            .start()
    },

    dianyi(x, id) {
        if (SHUJU.xzy)
            return
        this.sid = id;
        this.x = x;
        this.juese.setAnimation(0, "walk", true);
        this.qian = true;
    },

    update(dt) {
        if ((SHUJU.wanzhuang == 0 && this.juese.node.parent.getChildByName("pai").active == false)  || this.oq == true||(this.juese.node.parent.getChildByName("pai").active == true&&SHUJU.guichu == 0)) {
            if (Math.abs(this.xiangji.x - this.juese.node.parent.x) > 30) {

                this.sudu2 = -(this.xiangji.x - this.juese.node.parent.x) / 25;
                if (this.xiangji.x > this.juese.node.parent.x) {
                    this.zuoyou = 0
                } else {
                    this.zuoyou = 1
                }
                if (this.zuoyou == 1) {
                    if (this.xiangji.x - this.juese.node.parent.x < 0) {
                        if ((this.xiangji.x + this.sudu2) < 2860 - (cc.find("hc").getComponent("hc").cow - 1280))
                            this.xiangji.x += this.sudu2;
                    }
                } else {
                    if (this.xiangji.x - this.juese.node.parent.x > 0) {
                        if ((this.xiangji.x + this.sudu2) > (cc.find("hc").getComponent("hc").cow - 1280)/4)
                            this.xiangji.x += this.sudu2;
                        else
                            this.xiangji.x=(cc.find("hc").getComponent("hc").cow - 1280)/4
                    }
                }
            }
        } else if (SHUJU.guichu == 1) {
            if (Math.abs(this.xiangji.x - this.gui.node.x) > 30) {

                this.sudu2 = -(this.xiangji.x - this.gui.node.x) / 25;
                if (this.xiangji.x > this.gui.node.x) {
                    this.zuoyou = 0
                } else {
                    this.zuoyou = 1
                }
                if (Math.abs(this.sudu2) > 20) {
                    if (this.zuoyou == 1)
                        this.sudu2 = 25;
                    else
                        this.sudu2 = -25;
                }
                if (this.zuoyou == 1) {
                    if (this.xiangji.x - this.gui.node.x < 0) {
                        if ((this.xiangji.x + this.sudu2) < 2860 - (cc.find("hc").getComponent("hc").cow - 1280))
                            this.xiangji.x += this.sudu2;

                    }
                } else {
                    if (this.xiangji.x - this.gui.node.x > 0) {
                        if ((this.xiangji.x + this.sudu2) > (cc.find("hc").getComponent("hc").cow - 1280)/4)
                            this.xiangji.x += this.sudu2;
                        else
                            this.xiangji.x=(cc.find("hc").getComponent("hc").cow - 1280)/4
                    }
                }
            }
        }
        if (SHUJU.xzy)
            return
        if (SHUJU.guichu == 1 && this.zp == true)
            return;
        if (this.geng) {
            if (this.juese.node.parent.x < -480)
                this.juese.node.parent.x = -480
            if (this.juese.node.parent.x > 3434)
                this.juese.node.parent.x = 3434
            this.juese.node.parent.x += this.sudu;
        }


        if (this.geng == false && this.qian) {
            if (this.juese.node.parent.x < this.x) {
                this.juese.node.scaleX = 1;
                this.juese.node.parent.getChildByName("pai").scaleX = -1;
                this.zuoyou = 1;
                this.juese.node.parent.x += 5;
                if (this.juese.node.parent.x >= this.x) {
                    this.juese.node.parent.x = this.x;
                    this.souxun()
                }
            } else {
                this.juese.node.scaleX = -1;
                this.juese.node.parent.getChildByName("pai").scaleX = 1;
                this.zuoyou = 0;
                this.juese.node.parent.x -= 5;
                if (this.juese.node.parent.x <= this.x) {
                    this.juese.node.parent.x = this.x;
                    this.souxun();
                }
            }
        }
    },
});
