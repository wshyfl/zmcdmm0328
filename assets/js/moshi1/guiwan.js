cc.Class({
    extends: cc.Component,

    properties: {
        xiangji: cc.Node,
        bg: [cc.Node],
        deng: cc.Node,
        juese: sp.Skeleton,
        anjian: [cc.Node],
        npc: cc.Prefab,
        idy:-1,
        tx:cc.Node,
        tuohen:cc.Prefab,
        pifu:[cc.Asset],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.macro.ENABLE_MULTI_TOUCH = false;
        
    },

    start() {
        console.log(SHUJU.youtu)
        this.bg[SHUJU.youtu].on(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.bg[SHUJU.youtu].on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.bg[SHUJU.youtu].on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.bg[SHUJU.youtu].on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        console.log(SHUJU.wantu)
        
        this.juese.node.zIndex = 10;
        this.node.zIndex=2
        this.shuliang = 5;
        cc.director.preloadScene("menu", function () {

        });
        this.xiaoguo=0;
        this.yin()
        SHUJU.xzy = true;
        this.modong = true;
        this.xz = false;
        this.tuo = false;
        this.gong = false;
        if(this.idy!=SHUJU.wantu)
            this.juese.skeletonData=this.pifu[SHUJU.wantu];
        this.juese.setAnimation(0, "walk1", true);
    },

    onCollisionEnter(other, self) {
        if (other.tag == 20) {
            return
        }
        this.pengid = other.tag;
        if (this.xz)
            return;
        if (this.gong)
            return;
        if (SHUJU.duoshu[other.tag] != 2)
            this.anjian[1].active = true;
    },

    onCollisionExit(other, self) {
        this.anjian[1].active = false;
    },

    yin() {
        this.anjian[1].active = false;
        this.anjian[0].active = false;
    },

    wu(){

    },

    gongji(even,id) {
        if(SHUJU.xzy==true){
            return
        }
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        if(id!=SHUJU.youtu)
            return;
        SHUJU.xzy = true;
        this.gong = true;
        this.num = [];
        for (var i = 0; i < SHUJU.npczhuang.length; i++) {
            if (SHUJU.npczhuang[i] != 2) {
                this.num.push(i)
            }
        }
        this.sui = this.num[Math.floor(Math.random() * this.num.length)]
        this.yin()
        this.shuliang--;
        this.anjian[1].getChildByName("zi").getComponent(cc.Label).string = "x" + this.shuliang;
        console.log(this.sui, this.num, SHUJU.npczhuang)

        this.tx.x=0;
        this.tx.y=150;

        this.tx.zIndex=2;



        cc.find("hc").getComponent("hc").yinkai(5,true);
        cc.find("hc").getComponent("hc").yinguan(15,true);
        this.juese.setAnimation(0, "attack", false);

        
        this.tx.getChildByName("tx"+SHUJU.wantu).active=true;

        this.juese.setCompleteListener((a, evt) => {
            switch (a.animation.name) {
                case "attack":
                    if(AD.chanelName=="QQ"&&AD.chanelName1=="QQ"){
                        AD.chaPing();
                    }
                    this.tx.getChildByName("tx"+SHUJU.wantu).active=false;
                    cc.find("hc").getComponent("hc").yinguan(5);
                    cc.find("hc").getComponent("hc").yinkai(9,true);
                    SHUJU.duoshu[this.pengid] = 2;
                    this.node.parent.getComponent("ditu").shua();
                    this.cus = cc.instantiate(this.npc);
                    this.cus.parent = this.node;
                    if (this.sui == 0) {
                        this.cus.getComponent("npcren").chu(SHUJU.youren, false);
                    } else {
                        this.cus.getComponent("npcren").chu(SHUJU.npcren[this.sui - 1], false);
                    }
                    this.cus.getChildByName("juese").getComponent(sp.Skeleton).setAnimation(0, "dead", true);
                    this.cus.x = 90;
                    this.cus.y = 325;
                    // this.cus.scaleX = -1;
                    this.cus.zIndex = 20;
                    this.juese.setAnimation(0, "walk2", true);
                    this.juese.node.scaleX = -1;
                    if (this.sui == 0) {
                        SHUJU.wanzhuang = 2;
                        SHUJU.npczhuang[0] = 2;
                        if(SHUJU.nannv[SHUJU.youren]==1){
                            cc.find("hc").getComponent("hc").yinkai(14,false);
                        }else{
                            cc.find("hc").getComponent("hc").yinkai(3,false);
                        }
                    } else {
                        SHUJU.npczhuang[this.sui] = 2;
                        if(SHUJU.nannv[this.sui - 1]==1){
                            cc.find("hc").getComponent("hc").yinkai(14,false);
                        }else{
                            cc.find("hc").getComponent("hc").yinkai(3,false);
                        }
                    }



                    cc.director.emit("刷头叉")
                    this.tuo = true;
                    this.tuoh()
                    cc.find("hc").getComponent("hc").yinkai(15,true);
                    break;
            }
        })
    },

    tuoh(){
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
        this.hen1.setPosition(150, 10);
        this.tuozu.push(this.hen1);
        this.schedule(this.fang, 0.2);
    },

    pansuan() {
        this.xztuo=false;
        this.cus.destroy()
        cc.find("hc").getComponent("hc").yinguan(9);
        cc.find("hc").getComponent("hc").yinguan(15);
        if (SHUJU.wanzhuang != 2) {
            this.replay()
            if(AD.chanelName=="QQ"&&AD.chanelName1=="QQ"&&AD_QQ.xianzhi){
                AD.showAD(this.wu,this);
            }
            this.deng.active = true;
        } else {
            cc.director.emit("结算", 1, 2, SHUJU.youren, SHUJU.youtu)
            return;
        }

        if (this.shuliang <= 0) {
            cc.director.emit("结算", 1, 3, SHUJU.youren, SHUJU.youtu)
        }
    },

    yinxiao(){
        if(this.xiaoguo==1){
            return;
        }
        this.xiaoguo=1;
        cc.find("hc").getComponent("hc").yinkai(15,true);
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
    },

    replay() {
        this.anjian[0].active = false;
        SHUJU.xzy = true;
        this.modong = true;
        this.xz = false;
        this.tuo = false;
        this.gong = false;
        this.juese.node.scaleX = 1;
        this.juese.setAnimation(0, "walk1", true);
        this.xiaoguo=0;
    },

    xiao(even,id) {
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        if(id!=SHUJU.youtu)
            return;
        SHUJU.xzy = true;
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
        this.juese.setAnimation(0, "fun", false);
        this.juese.setCompleteListener((a, evt) => {
            switch (a.animation.name) {
                case "fun":
                    this.juese.setAnimation(0, "idle", true);
                    SHUJU.xzy = false;
                    break;
            }
        })
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
            this.juese.setAnimation(0, "walk1", true);
            cc.find("hc").getComponent("hc").yinkai(15,true);
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
        cc.find("hc").getComponent("hc").yinguan(15);
    },
    touchCancel() {
        this.touchEnd();
    },

    update(dt) {
        if (Math.abs(this.xiangji.x - this.node.x) > 30) {
            this.sudu2 = -(this.xiangji.x - this.node.x) / 25;
            if (this.xiangji.x > this.node.x) {
                this.zuoyou = 0
            } else {
                this.zuoyou = 1
            }
            if (this.zuoyou == 1) {
                if (this.xiangji.x - this.node.x < 0) {
                    if ( (this.xiangji.x + this.sudu2) < 2860 - (cc.find("hc").getComponent("hc").cow - 1280))
                        this.xiangji.x += this.sudu2;
                }
            } else {
                if (this.xiangji.x - this.node.x > 0) {
                    if ((this.xiangji.x + this.sudu2) > (cc.find("hc").getComponent("hc").cow - 1280) / 4 )
                        this.xiangji.x += this.sudu2;
                    else
                        this.xiangji.x=(cc.find("hc").getComponent("hc").cow - 1280)/4
                }
            }
        }

        if (this.modong && this.deng.active == false) {
            this.node.x += 5;
            this.yinxiao()
            if (this.node.x >= -500) {
                this.modong = false;
                SHUJU.xzy = false;
                this.anjian[0].active = true;
                this.juese.setAnimation(0, "idle", true);
                cc.find("hc").getComponent("hc").yinguan(15);
            }
        }

        if (this.tuo) {
            if (this.node.x > -940) {
                this.node.x -= 6.5;
                if (this.node.x <= -940) {
                    this.tuo = false;
                    this.pansuan();
                }
            }
        }

        if (SHUJU.xzy)
            return

        if (this.geng) {
            if (this.node.x < -500)
                this.node.x = -500
            if (this.node.x > 3434)
                this.node.x = 3434
            this.node.x += this.sudu;
        }
    },
});
