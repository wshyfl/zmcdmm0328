cc.Class({
    extends: cc.Component,

    properties: {
        xiangji: cc.Node,
        npc: cc.Prefab,
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
            SHUJU.play.node.opacity = 255;
            this.fen = false;
        }, this);
        cc.director.on("卧底选", (id) => {
            this.wokai(id);
        }, this);
        switch (SHUJU.youtu) {
            case 0:
                this.duox = [10, 610, 1580, 2750]
                break;
            case 1:
                this.duox = [-35, 825, 2155, 2660]
                break;
            case 2:
                this.duox = [360, 1230, 1690, 3285]
                break;
        }
        this.dijia = 2;//递加的概率
        this.node.zIndex = 2;
        this.fen = false;
    },

    suixuan() {
        // this.jilu=[];
        this.jishu = 0
        this.num = [];
        this.npcmen = [];
        for (var e = 0; e < this.duox.length; e++) {
            if (SHUJU.daobian[e] == 0) {
                this.num.push(this.duox[e])
                // this.jilu.push(this.duox[e]);
                this.jishu++;
            }
        }
        var huai = 0;
        for (var i = 0; i < SHUJU.youdang.length; i++) {
            if (SHUJU.youdang[i] != 2) {
                this.num.push(SHUJU.zu[i].x);
                this.npcmen.push(SHUJU.zu[i])
            } else {
                huai++;
            }
        }

        this.dang = SHUJU.duogai[SHUJU.bianshen] + huai * this.dijia;
        var gailv = Math.floor(Math.random() * 100)
        console.log("抓玩家概率:" + this.dang, "随机到的概率:" + gailv)
        if (gailv <= this.dang) {
            this.po = 20;
        } else {
            this.po = -20;
        }
        this.sui = Math.floor(Math.random() * this.num.length)
    },

    zhua() {

        this.suixuan()
        this.xzzou = false;
        this.siwang = false;
        this.sicang=false;
        this.xiao = [];
        this.xiaozhua = -1;
        this.node.scaleX = 1;
        this.node.getComponent(sp.Skeleton).setAnimation(0, "walk1", true);
        this.zhuafang = Math.floor(Math.random() * 10)
        if (this.zhuafang <= 3)
            this.zhuafang = 0;
        else
            this.zhuafang = 1;

        if(SHUJU.play.getComponent("wanjia").juese.node.active){
            this.sicang=true;
            this.zhuafang=0;
            this.po = 20;
        }

        if (this.zhuafang == 1) {
            this.xiaozhua = Math.floor(Math.random() * 3)
        } else {
            if (this.po == 20) {
                this.zhui = SHUJU.play.node.x;
            } else {
                this.zhui = this.num[this.sui];
            }
        }

        this.num2 = [];
        for (var i = 0; i <= this.num.length; i++) {
            this.num2[i] = this.num[i];
        }
        this.num2[this.num.length] = SHUJU.play.node.x
        this.xiao[0] = this.num2[Math.floor(Math.random() * this.num2.length)]
        this.xiao[1] = this.num2[Math.floor(Math.random() * this.num2.length)]
        this.xiao[2] = this.num2[Math.floor(Math.random() * this.num2.length)]
        this.xiaoluo(-1)
        this.xzzou = true;
        console.log(this.num2)
        cc.find("hc").getComponent("hc").yinkai(15,true);
    },

    xiaoluo(id) {
        if (this.zhuafang == 0)
            return
        if (this.xiaozhua < 0)
            return
        // if (this.xiao[this.xiaozhua] == SHUJU.play.node.x) {
        this.gensui = this.xiao[this.xiaozhua]
        // } else {
        //     this.gensui = this.duox[this.xiao[this.xiaozhua]]
        // }

        if (this.xiaozhua == 0) {
            if (this.po == 20) {
                this.gensui = SHUJU.play.node.x
            } else {
                this.gensui = this.num[this.sui];
            }
        }
        console.log(this.gensui)
        this.xiaozhua--;
        this.xiaoyi = true;
    },

    yinxiao() {
        this.xiaoyi = false;
        if (this.xiaozhua == -1) {
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
                        this.xiaoluo()
                        cc.find("hc").getComponent("hc").yinkai(15,true);
                    }
                    
                    break;
            }
        })
    },

    wokai(id) {
        if(this.sicang){
            return
        }
        for (var i = 0; i < this.num.length; i++) {
            if (this.num[i] == id) {
                this.sui = i
            }
        }
        this.zhui = id;
        if (this.po == 20) {
            this.po = -20;
        }
        if (this.xiaozhua <= -1)
            this.gensui = id;

    },

    fenkai() {
        this.shibai = false;
        SHUJU.wanzhuang = 0;
        SHUJU.xzy = false;
        this.fen = true;
        SHUJU.play.node.getChildByName("juese").active = true;
        SHUJU.play.node.getChildByName("juese").getComponent(sp.Skeleton).setAnimation(0, "idle", true);
        SHUJU.play.node.opacity = 150;
    },

    shasi() {
        this.node.zIndex = 10;
        this.xzzou = false;
        cc.director.emit("卧底关")
        SHUJU.djan.yin();
        if (this.po == 20) {//打到玩家
            this.shibai = true;
            SHUJU.wanzhuang = 2;
            SHUJU.xzy = true;

            // SHUJU.play.node.getChildByName("juese").active = true;
            // SHUJU.play.node.getChildByName("pai").active = false;
            SHUJU.play.node.x = this.node.x
            SHUJU.play.node.scaleX = 1;
            SHUJU.play.node.getChildByName("juese").scaleX = 1;
            SHUJU.play.node.getChildByName("juese").getComponent(sp.Skeleton).setAnimation(0, "dead", true);
        } else {
            if (this.sui < this.jishu) {//打空

            } else {//打到npc
                SHUJU.xzy = true;
                this.npcmen[this.sui - this.jishu].getComponent("npcrenbian").siwang();
                // this.npcmen[this.sui - this.jishu].getChildByName("juese").active = true;
                // this.npcmen[this.sui - this.jishu].getChildByName("pai").active = false;
                this.npcmen[this.sui - this.jishu].x = this.node.x
                this.npcmen[this.sui - this.jishu].scaleX = 1;
                this.npcmen[this.sui - this.jishu].getChildByName("juese").scaleX = 1;
                this.npcmen[this.sui - this.jishu].getChildByName("juese").getComponent(sp.Skeleton).setAnimation(0, "dead", true);
                this.npcmen[this.sui - this.jishu].zIndex = 2;
            }
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
                    if (this.po == 20) {
                        cc.find("hc").getComponent("hc").yinkai(9,true);
                        SHUJU.play.node.getChildByName("pai").active = false;
                        SHUJU.play.node.getChildByName("juese").active = false;
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
                        this.tuo()
                    } else {
                        if (this.sui < this.jishu) {//打空
                            for (var i = 0; i < this.duox.length; i++) {
                                if (this.duox[i] == this.num[this.sui]) {
                                    SHUJU.duodi[i].getChildByName("hao").active = false;
                                    SHUJU.duodi[i].getChildByName("huai").active = true;
                                    SHUJU.daobian[i] = 1;
                                }
                            }
                            this.node.getComponent(sp.Skeleton).setAnimation(0, "walk1", true);
                        } else {
                            cc.find("hc").getComponent("hc").yinkai(9,true);
                            this.npcmen[this.sui - this.jishu].getChildByName("pai").active = false;
                            this.npcmen[this.sui - this.jishu].getChildByName("juese").active = false;
                            this.node.getComponent(sp.Skeleton).setAnimation(0, "walk2", true);
                            this.cus = cc.instantiate(this.npc);
                            this.cus.parent = this.node;
                            this.cus.scaleX = -1;
                            this.cus.setPosition(-90, 325);
                            this.cus.getComponent("npcren").chu(this.npcmen[this.sui - this.jishu].getComponent("npcrenbian").idr, false);
                            this.cus.getChildByName("juese").getComponent(sp.Skeleton).setAnimation(0, "dead", true);
                            this.cus.zIndex = 20;
                            this.npcmen[this.sui - this.jishu].destroy()
                            if(SHUJU.nannv[this.npcmen[this.sui - this.jishu].getComponent("npcrenbian").idr]==1){
                                cc.find("hc").getComponent("hc").yinkai(14,false);
                            }else{
                                cc.find("hc").getComponent("hc").yinkai(3,false);
                            }
                            this.tuo()
                        }

                    }
                    
                    cc.director.emit("刷头叉")
                    this.node.scaleX = -1;
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

    pannpc() {
        for (var i = 0; i < SHUJU.youdang.length; i++) {
            if (SHUJU.youdang[i] != 2) {
                return false;
            }
        }
        return true;
    },

    xiayiju() {
        console.log("下一局");
        this.xztuo=false;
        cc.find("hc").getComponent("hc").yinguan(15);
        cc.find("hc").getComponent("hc").yinguan(9);
        if (this.pannpc()) {
            this.shibai = false;
            this.jiesuan()
        }
        cc.director.emit("刷头叉")
        SHUJU.guichu = 0;
        if (this.cus) {
            this.cus.destroy();
        }

        cc.director.emit("下一关")
        cc.director.emit("分身关")
        SHUJU.djan.weicang();
        if(AD.chanelName=="QQ"&&AD.chanelName1=="QQ"&&AD_QQ.xianzhi){
            AD.showAD(this.wu,this);
        }
    },

    jiesuan() {
        console.log("结算")
        if (this.shibai) {
            cc.director.emit("结算", 0, 3, SHUJU.youren, SHUJU.youtu)
        } else {
            cc.director.emit("结算", 0, 2, SHUJU.youren, SHUJU.youtu)
        }
    },

    update(dt) {
        if (this.xzzou == false)
            return;

        if (SHUJU.guichu == 1 && this.fen == false && SHUJU.wanzhuang != 0) {
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
                            this.xiangji.x = (cc.find("hc").getComponent("hc").cow - 1280) / 4
                    }
                }
            }
        }

        if (this.siwang == false) {
            if (this.zhuafang == 0) {
                if(this.po==20){
                    this.zhui=SHUJU.play.node.x
                }
                if (this.node.x < this.zhui) {
                    this.node.x += 4;
                    this.node.scaleX = 1;

                    if (this.node.x >= this.zhui) {
                        this.shasi();
                    }
                } else {
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
                    SHUJU.play.node.x = this.node.x;
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
