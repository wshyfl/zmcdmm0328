cc.Class({
    extends: cc.Component,

    properties: {
        zi: cc.Node,
        wan: cc.Node,
        xiangji: cc.Node,
        npc: cc.Prefab,
        zhuazi: [cc.Node],
        idy:-1,
        tx:cc.Node,
        tuohen:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.director.on("抓", () => {
            SHUJU.xzy = true;
            SHUJU.guichu = 1;
            this.zhua();
            switch(this.idy){
                case 0:
                    cc.find("hc").getComponent("hc").yinkai(8,false);
                    break;
                case 1:
                    cc.find("hc").getComponent("hc").yinkai(6,false);
                    break;
                case 2:
                    cc.find("hc").getComponent("hc").yinkai(7,false);
                    break;
            }
            SHUJU.djan.tuchu()
        }, this);
        cc.director.on("分身开", () => {
            this.fenkai();
        }, this);
        cc.director.on("分身关", () => {
            this.wan.opacity = 255;
            this.fen = false;
        }, this);
        cc.director.on("卧底选", (id) => {
            this.wokai(id);
        }, this);
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
        this.dijia = 2;//递加的概率
        this.fen = false;
        this.biao = ["૮₍ ≧ . ≦ ₎ა ˖ ݁", "(￣︿￣)", "(＞﹏＜)"];
        this.cishu = 8;
        this.suixuan()
    },

    suixuan() {
        var num = [];
        var huai = 0;
        for (var i = 0; i < SHUJU.duoshu.length; i++) {
            if (SHUJU.duoshu[i] != 2) {
                num.push(i);
            } else {
                huai++;
            }
        }

        this.dang = SHUJU.duogai[SHUJU.bianshen] + huai * this.dijia;
        var gailv = Math.floor(Math.random() * 100)
        console.log("抓玩家概率:" + this.dang, "随机到的概率:" + gailv)
        if (gailv <= this.dang) {
            this.po = 9;
        } else {
            this.sui = Math.floor(Math.random() * num.length)
            this.po = num[this.sui];
        }
        SHUJU.po = this.po;
    },

    zhua() {
        this.xzzou = false;
        this.siwang = false;
        this.xiao = [];
        this.xiaozhua = -1;
        this.node.scaleX = 1;
        this.node.getComponent(sp.Skeleton).setAnimation(0, "walk1", true);
        this.zhuafang = Math.floor(Math.random() * 10)
        if (this.zhuafang <= 3)
            this.zhuafang = 0;
        else
            this.zhuafang = 1;

        if (this.zhuafang == 1) {
            this.xiaozhua = Math.floor(Math.random() * 3)
        } else {
            if (this.po == 9) {
                this.zhui = this.wan.x;
            } else {
                this.zhui = this.duox[this.po];
            }
        }
        var num = [];
        for (var i = 0; i <= SHUJU.duoshu.length; i++) {
            if (SHUJU.duoshu[i] != 2) {
                num.push(i);
            }
        }

        this.xiao[0] = num[Math.floor(Math.random() * num.length)]
        this.xiao[1] = num[Math.floor(Math.random() * num.length)]
        this.xiao[2] = num[Math.floor(Math.random() * num.length)]
        this.xiaoluo(-1)
        this.xzzou = true;
        cc.find("hc").getComponent("hc").yinkai(15,true);
    },

    xiaoluo(id) {
        if (this.zhuafang == 0)
            return
        if (this.xiaozhua < 0)
            return
        if (this.xiao[this.xiaozhua] == 9) {
            this.gensui = this.wan.x
        } else {
            this.gensui = this.duox[this.xiao[this.xiaozhua]]
        }

        if (this.xiaozhua == 0) {
            if (this.po == 9) {
                this.gensui = this.wan.x
            } else {
                this.gensui = this.duox[this.po];
            }
        }

        this.xiaozhua--;
        if (this.xiao[this.xiaozhua] == id) {
            this.yinxiao()
            return;
        }
        this.xiaoyi = true;
    },

    yinxiao() {
        this.xiaoyi = false;
        if (this.xiaozhua == -1){
            cc.director.emit("卧底关")
            SHUJU.djan.yin();
        }
        switch(this.idy){
            case 0:
                cc.find("hc").getComponent("hc").yinguan(10);
                cc.find("hc").getComponent("hc").yinkai(10,false);
                break;
            case 1:
                cc.find("hc").getComponent("hc").yinguan(1);
                cc.find("hc").getComponent("hc").yinkai(1,false);
                break;
            case 2:
                cc.find("hc").getComponent("hc").yinguan(4);
                cc.find("hc").getComponent("hc").yinkai(4,false);
                break;
        }
        cc.find("hc").getComponent("hc").yinguan(15);
        this.node.getComponent(sp.Skeleton).setAnimation(0, "fun", false);
        this.node.getComponent(sp.Skeleton).setCompleteListener((a, evt) => {
            switch (a.animation.name) {
                case "fun":
                    
                    this.node.getComponent(sp.Skeleton).setAnimation(0, "walk1", true);
                    if (this.xiaozhua == -1) {
                        this.shasi();
                    } else {
                        this.xiaoluo(this.xiao[this.xiaozhua])
                        cc.find("hc").getComponent("hc").yinkai(15,true);
                    }
                    
                    break;
            }
        })
    },

    wokai(id) {
        this.po = id;
        SHUJU.po = this.po;
        this.zhui = this.duox[this.po]
        if (this.xiaozhua <= -1)
            this.gensui = this.duox[this.po];
    },

    fenkai() {
        this.shibai = false;
        SHUJU.wanzhuang = 0;
        SHUJU.xzy = false;
        this.fen = true;
        this.wan.getChildByName("juese").active = true;
        this.wan.getChildByName("juese").getComponent(sp.Skeleton).setAnimation(0, "idle", true);
        this.wan.opacity = 150;
    },

    wu(){},

    shasi() {
        this.node.zIndex = 10;
        this.xzzou = false;
        cc.director.emit("卧底关")
        SHUJU.djan.yin();
        if (this.po == 9) {
            this.shibai = true;
            SHUJU.wanzhuang = 2;
            SHUJU.xzy = true;

            // this.wan.getChildByName("juese").active = true;
            this.wan.getChildByName("pai").active = false;
            this.wan.x = this.node.x
            this.wan.scaleX = 1;
            this.wan.getChildByName("juese").scaleX = 1;
            this.wan.getChildByName("juese").getComponent(sp.Skeleton).setAnimation(0, "dead", true);
        }
        cc.find("hc").getComponent("hc").yinkai(5,true);
        cc.find("hc").getComponent("hc").yinguan(15);
        this.tx.x=this.node.x;
        this.tx.zIndex=this.node.zIndex;
        this.tx.getChildByName("tx"+this.idy).active=true;
        this.node.getComponent(sp.Skeleton).setAnimation(0, "attack", false);
        this.node.getComponent(sp.Skeleton).setCompleteListener((a, evt) => {
            switch (a.animation.name) {
                case "attack":
                    if(AD.chanelName=="QQ"&&AD.chanelName1=="QQ"){
                        AD.chaPing();
                    }
                    this.tx.getChildByName("tx"+this.idy).active=false;
                    cc.find("hc").getComponent("hc").yinguan(5);
                    if (this.po == 9) {
                        cc.find("hc").getComponent("hc").yinkai(9,true);
                        this.wan.getChildByName("juese").active = false;
                        this.wan.getChildByName("pai").active = false;
                        this.node.getComponent(sp.Skeleton).setAnimation(0, "walk2", true);
                        this.cus = cc.instantiate(this.npc);
                        this.cus.parent = this.node;
                        this.cus.scaleX = -1;
                        this.cus.setPosition(-90, 325);
                        this.cus.getComponent("npcren").chu(SHUJU.youren, false);
                        this.cus.getChildByName("juese").getComponent(sp.Skeleton).setAnimation(0, "dead", true);
                        this.cus.zIndex = 20;
                        SHUJU.djan.wanzhua();
                        if(SHUJU.nannv[SHUJU.youren]==1){
                            cc.find("hc").getComponent("hc").yinkai(14,false);
                        }else{
                            cc.find("hc").getComponent("hc").yinkai(3,false);
                        }
                        this.tuo();
                    } else {
                        this.node.getComponent(sp.Skeleton).setAnimation(0, "walk1", true);
                        SHUJU.duoshu[this.po] = 2;
                        SHUJU.duodi[this.po].getChildByName("hao").active = false;
                        SHUJU.duodi[this.po].getChildByName("huai").active = true;
                        this.node.getChildByName("zi").active = true;
                        this.node.getChildByName("zi").getChildByName("zi").getComponent(cc.Label).string = this.biao[Math.floor(Math.random() * this.biao.length)];
                        this.scheduleOnce(function () {
                            this.node.getChildByName("zi").active = false;
                        }, 3)
                    }
                    this.node.scaleX = -1;
                    this.cangzhu()
                    cc.director.emit("先知关")
                    this.siwang = true;
                    this.xzzou = true;
                    
                    cc.find("hc").getComponent("hc").yinkai(15,true);
                    break;
            }
        })
    },
    tuo(){
        this.xztuo=true;
        this.tuozu=[];
        this.fang=function() {
            this.hen = cc.instantiate(this.tuohen);
            this.hen.parent = this.node.parent;
            this.hen.setPosition(this.node.x+150, -325);
            this.tuozu.push(this.hen)
            if(this.xztuo==false){
                this.unschedule(this.fang);
                for(var i=0;i<this.tuozu.length;i++){
                    this.tuozu[i].destroy();
                }
            }
        }
        this.hen1 = cc.instantiate(this.tuohen);
        this.hen1.parent = this.node;
        this.hen1.setPosition(-150, 10);
        this.tuozu.push(this.hen1);
        this.schedule(this.fang, 0.2);
    },
    cangzhu() {
        for (var i = 0; i < this.zhuazi.length; i++) {
            if (this.zhuazi[i].active == true) {
                this.cishu--;
                this.huandong(this.zhuazi[i])
                return
            }
        }
    },

    huandong(node) {
        cc.tween(node)
            .to(2, { opacity: 0 })
            .call(() => { node.active = false; })
            .start()
    },

    xiayiju() {
        this.xztuo=false;
        if (this.cishu <= 0) {
            this.jiesuan();
            return;
        }
        console.log("下一局");
        cc.find("hc").getComponent("hc").yinguan(15);
        cc.find("hc").getComponent("hc").yinguan(9);
        SHUJU.guichu = 0;
        if (this.cus) {
            this.cus.destroy();
        }
        cc.director.emit("刷新");
        cc.director.emit("分身关")
        this.suixuan();
        SHUJU.djan.weicang();
        if(AD.chanelName=="QQ"&&AD.chanelName1=="QQ"&&AD_QQ.xianzhi){
            AD.showAD(this.wu,this);
        }
    },

    jiesuan() {
        console.log("结算")
        cc.find("hc").getComponent("hc").yinguan(15);
        cc.find("hc").getComponent("hc").yinguan(9);
        if (this.shibai) {
            cc.director.emit("结算", 0, 3, SHUJU.youren, SHUJU.youtu)
        } else if (this.cishu == 0) {
            cc.director.emit("结算", 0, 2, SHUJU.youren, SHUJU.youtu)
        } else {
            console.log("未知错误", this.shibai, this.cishu)
        }
    },

    update(dt) {
        if (this.xzzou == false)
            return;

        if (SHUJU.guichu == 1 && this.fen == false) {
            if (Math.abs(this.xiangji.x - this.node.x) > 30) {

                this.sudu2 = -(this.xiangji.x - this.node.x) / 25;
                if (this.xiangji.x > this.node.x) {
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
        }

        if (this.siwang == false) {
            if (this.zhuafang == 0) {
                if (this.node.x < this.zhui) {
                    this.node.x += 4;
                    this.node.scaleX = 1;
                    if (this.node.x >= this.zhui) {
                        this.shasi();
                    }
                }else{
                    this.node.x -= 4;
                    this.node.scaleX = -1;
                    if (this.node.x <= this.zhui) {
                        this.shasi();
                    }
                }
            } else {
                if (this.xiaoyi) {
                    if (this.node.x < this.gensui) {
                        this.node.x += 4;
                        this.node.scaleX = 1;
                        if (this.node.x >= this.gensui) {
                            this.yinxiao();
                        }
                    } else {
                        this.node.x -= 4;
                        this.node.scaleX = -1;
                        if (this.node.x <= this.gensui) {
                            this.yinxiao();
                        }
                    }
                }
            }
        } else {
            if (this.shibai == true) {
                if (this.node.x > -940) {
                    this.node.x -= 6.5;
                    this.wan.x = this.node.x;
                    if (this.node.x < -940) {
                        this.xzzou = false;
                        this.jiesuan()
                    }
                }

            } else {
                if (this.node.x > -940) {
                    this.node.x -= 6.5;
                    if (this.node.x < -940) {
                        this.xzzou = false;
                        this.xiayiju();
                    }
                }
            }
        }
    },
});
