cc.Class({
    extends: cc.Component,

    properties: {
        wan: cc.Node,
        npc: cc.Prefab,
        bg1: cc.Node,
        idy:-1,
        tx:cc.Node,
        tuohen:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.director.on("抓", () => {
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
        }, this);

        this.shibai = false;
        this.xzzou = false
        this.youdang = false
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
        this.suixuan()
        cc.director.on("欧气药水开", () => {
            this.ouqikai();
        }, this);
        cc.director.on("卧底选", (id) => {
            this.wokai(id);
        }, this);
        cc.director.on("分身开", () => {
            this.fenkai();
        }, this);
        cc.director.on("分身关", () => {
            this.fenguan();
        }, this);
    },

    pansha() {
        // this.zu=SHUJU.zu;
        if(this.wan.getChildByName("pai").active==false){
            if (SHUJU.wanzhuang == 0)
                return [this.wan, SHUJU.youren];
        }
        for (var i = 0; i < SHUJU.youdang.length; i++) {
            if (SHUJU.youdang[i] == 0){
                return [SHUJU.zu[i], SHUJU.zu[i].getComponent("npcren").idr];
            }
                
        }
        
        return false;
    },

    suixuan(){
        var num = [];
        for (var i = 0; i < SHUJU.duoshu.length; i++) {
            if (SHUJU.duoshu[i] != 2) {
                num.push(i);
            }
        }
        this.sui = Math.floor(Math.random() * num.length)
        this.po = num[this.sui];
        SHUJU.po=this.po;
    },

    ouqikai(){
        if(SHUJU.guichu==1){
            this.zhua()
        }
    },

    wokai(id){
        this.po=id;
        cc.director.emit("选抓", this.po);
        if (this.xiaozhua <= -1)
            this.gensui = this.duox[this.po];
    },

    zhua() {
        
        this.shibai = false;
        this.xiao = []
        this.xiaoyi = false;
        this.xzzou = false
        this.youdang = false
        this.siwang = false;
        this.node.scaleX = 1;
        this.node.getComponent(sp.Skeleton).setAnimation(0, "walk1", true);
        this.zhuafang = Math.floor(Math.random() * 10)
        if (this.zhuafang < 3)
            this.zhuafang = 0
        else
            this.zhuafang = 1
        if (this.zhuafang == 1) {
            this.xiaozhua = Math.floor(Math.random() * 3)
        }
        this.sha = this.pansha();
        if (this.sha) {
            this.youdang = true;
        }else{
            this.youdang = false;
        }
        // this.zhuafang = 1//测试

        var num = [];
        for (var i = 0; i < SHUJU.duoshu.length; i++) {
            if (SHUJU.duoshu[i] == 1) {
                num.push(i);
            }
        }
        this.xiao[0] = num[Math.floor(Math.random() * num.length)]
        this.xiao[1] = num[Math.floor(Math.random() * num.length)]
        this.xiao[2] = num[Math.floor(Math.random() * num.length)]

        // this.wannpc = this.suizhua()
        // this.wannpc = 0//测试

        // if (this.wannpc == 0) {
        //     this.po = this.wan.getComponent("wanren").duowei
        // } else {
        //     num.splice(num.indexOf(this.wan.getComponent("wanren").duowei), 1);
            // this.sui = Math.floor(Math.random() * num.length)
            // this.po = num[this.sui];
        // }
        if(this.wan.getChildByName("pai").active&&this.youdang==false){
            this.zhipai=this.panpai();
            console.log(this.zhipai,"牌")
            if(this.wan.getChildByName("pai").scaleX==1){
                this.zhipai--;
            }
            if(this.zhipai==-1||this.zhipai==this.duox.length){
                this.sha=[this.wan, SHUJU.youren]
                this.youdang = true;
            }else{
                if(SHUJU.duoshu[this.zhipai]!=1){
                    this.sha=[this.wan, SHUJU.youren]
                    this.youdang = true;
                }else{
                    this.zhuafang = 0;
                    this.po=this.zhipai;
                }
            }

        }
        if(SHUJU.wanzhuang==1){
            SHUJU.djan.tuchu()
        }else if(SHUJU.wanzhuang==0){
            SHUJU.djan.chuwei()
        }
        this.xiaoluo(-1)
        // this.po=1//测试
        cc.director.emit("选抓", this.po);
        // this.bg1.getComponent("bg1").zuoyou = 1;
        this.xzzou = true;
        cc.find("hc").getComponent("hc").yinguan(15);
        cc.find("hc").getComponent("hc").yinkai(15,true);
    },

    panpai(){
        for(var i=0;i<this.duox.length;i++){
            if(this.duox[i]>this.wan.x){
                return i;
            }
        }
        return this.duox.length;
    },

    suizhua() {
        this.shu = []
        for (var i = 0; i < SHUJU.youdang.length; i++) {
            if (SHUJU.youdang[i] != 2) {
                this.shu.push(i)
            }
        }
        switch (this.shu.length + 1) {
            case 9:
                this.gailv = 10
                break;
            case 8:
                this.gailv = 12
                break;
            case 7:
                this.gailv = 14
                break;
            case 6:
                this.gailv = 16
                break;
            case 5:
                this.gailv = 20
                break;
            case 4:
                this.gailv = 25
                break;
            case 3:
                this.gailv = 33
                break;
            case 2:
                this.gailv = 50
                break;
        }

        let a = Math.floor(Math.random() * 100)
        if (a <= this.gailv) {
            return 0;
        } else {
            return 1;
        }
    },

    xiaoluo(id) {
        if (this.zhuafang == 0)
            return;
        if (this.xiaozhua < 0)
            return
        this.gensui = this.duox[this.xiao[this.xiaozhua]]
        if (this.xiaozhua == 0)
            this.gensui = this.duox[this.po];
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
            SHUJU.djan.npczhua();
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
                    console.log(this.xiaozhua)
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

    fenguan(){
        this.wan.opacity=255;
    },

    wu(){},

    fenkai(){
        this.shibai=false;
        SHUJU.wanzhuang=0;
        SHUJU.xzy=false;
        this.wan.getChildByName("juese").active=true;
        this.wan.getChildByName("juese").getComponent(sp.Skeleton).setAnimation(0, "idle", true);
        this.wan.opacity=150;
    },
    shasi() {
        console.log("进入死2")
        cc.director.emit("卧底关")
        this.node.zIndex = 10;
        this.xzzou = false;
        SHUJU.djan.npczhua();
        if(SHUJU.duoshu[this.po]==1){
            console.log(SHUJU.xuannpc == this.wan)
            if (SHUJU.xuannpc == this.wan) {
                this.shibai = true;
                SHUJU.wanzhuang = 2;
                SHUJU.xzy = true;
            } else {
                SHUJU.xuannpc.getComponent("npcren").chushi = false;
            }
            // SHUJU.xuannpc.getChildByName("juese").active = true;
    
            SHUJU.xuannpc.x = this.node.x
            SHUJU.xuannpc.scaleX = 1;
            SHUJU.xuannpc.getChildByName("juese").scaleX = 1;
            SHUJU.xuannpc.getChildByName("juese").getComponent(sp.Skeleton).setAnimation(0, "dead", true);
        }
        
        // this.bg1.getComponent("bg1").zuoyou = 0;
        cc.director.emit("先知关")
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
                    if(SHUJU.duoshu[this.po]==1){
                        if (SHUJU.xuannpc == this.wan) {
                            SHUJU.xuannpc.opacity = 0;
                            SHUJU.wanzhuang = 2;
                            SHUJU.djan.wanzhua();
                            if(SHUJU.nannv[SHUJU.youren]==1){
                                cc.find("hc").getComponent("hc").yinkai(14,false);
                            }else{
                                cc.find("hc").getComponent("hc").yinkai(3,false);
                            }
                        } else {
                            var siid = SHUJU.xuannpc.getComponent("npcren").id
                            SHUJU.youdang[SHUJU.xuannpc.getComponent("npcren").id] = 2;
                            if(SHUJU.nannv[SHUJU.xuannpc.getComponent("npcren").idr]==1){
                                cc.find("hc").getComponent("hc").yinkai(14,false);
                            }else{
                                cc.find("hc").getComponent("hc").yinkai(3,false);
                            }
                            SHUJU.xuannpc.destroy();
                        }
                        this.tuo()
                    }
                    
                    SHUJU.duodi[this.po].getChildByName("cang").active = false;
                    SHUJU.duodi[this.po].getChildByName("hao").active = false;
                    SHUJU.duodi[this.po].getChildByName("dh").active = false;
                    SHUJU.duodi[this.po].getChildByName("huai").active = true;

                    if(SHUJU.duoshu[this.po]==1){
                        cc.find("hc").getComponent("hc").yinkai(9,true);
                        this.node.getComponent(sp.Skeleton).setAnimation(0, "walk2", true);
                        this.cus = cc.instantiate(this.npc);
                        this.cus.parent = this.node;
                        this.cus.scaleX = -1;
                        this.cus.setPosition(-90, 325);
                        if (SHUJU.xuannpc == this.wan) {
                            this.cus.getComponent("npcren").chu(SHUJU.youren, false);
                        } else {
                            this.cus.getComponent("npcren").chu(SHUJU.xuannpc.getComponent("npcren").idr, false);
                        }
                        this.cus.getChildByName("juese").getComponent(sp.Skeleton).setAnimation(0, "dead", true);
                        this.cus.zIndex = 20;
                    }else{
                        this.node.getComponent(sp.Skeleton).setAnimation(0, "walk1", true);
                    }
                    SHUJU.duoshu[this.po] = 2;
                    this.node.scaleX = -1;
                    cc.director.emit("刷头叉");


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

    si() {
        console.log("进入死")
        cc.director.emit("卧底关")
        this.node.zIndex = 10;
        this.xzzou = false;
        SHUJU.djan.npczhua();
        if (this.sha[0] == this.wan) {
            this.shibai = true;
            SHUJU.xzy = true;
            SHUJU.wanzhuang = 2;
            cc.director.emit("指人牌关")
        } else {
            this.sha[0].getComponent("npcren").chushi = false;
        }
        // this.sha[0].getChildByName("juese").active = true;

        this.sha[0].x = this.node.x
        this.sha[0].scaleX = 1;
        this.sha[0].getChildByName("juese").scaleX = 1;
        this.sha[0].getChildByName("juese").getComponent(sp.Skeleton).setAnimation(0, "dead", true);
        // this.bg1.getComponent("bg1").zuoyou = 0;
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
                    cc.find("hc").getComponent("hc").yinkai(9,true);
                    if (this.shibai) {
                        SHUJU.wanzhuang = 2;
                    } else {
                        SHUJU.youdang[this.sha[0].getComponent("npcren").id] = 2;
                    }

                    if (this.sha[0] == this.wan) {
                        this.sha[0].opacity = 0;
                        SHUJU.djan.wanzhua();
                        if(SHUJU.nannv[SHUJU.youren]==1){
                            cc.find("hc").getComponent("hc").yinkai(14,false);
                        }else{
                            cc.find("hc").getComponent("hc").yinkai(3,false);
                        }
                    } else {
                        var siid = this.sha[0].getComponent("npcren").id
                        SHUJU.youdang[this.sha[0].getComponent("npcren").id] = 2;
                        if(SHUJU.nannv[this.sha[0].getComponent("npcren").idr]==1){
                            cc.find("hc").getComponent("hc").yinkai(14,false);
                        }else{
                            cc.find("hc").getComponent("hc").yinkai(3,false);
                        }
                        this.sha[0].destroy();

                    }
                    cc.director.emit("刷头叉");

                    this.node.getComponent(sp.Skeleton).setAnimation(0, "walk2", true);
                    this.node.scaleX = -1;
                    this.cus = cc.instantiate(this.npc);
                    this.cus.parent = this.node;
                    this.cus.scaleX = -1
                    this.cus.setPosition(-90, 325);
                    this.cus.getComponent("npcren").chu(this.sha[1], false);
                    this.cus.getChildByName("juese").getComponent(sp.Skeleton).setAnimation(0, "dead", true);
                    this.cus.zIndex = 20;
                    this.siwang = true;
                    this.xzzou = true;
                    this.tuo()

                    cc.find("hc").getComponent("hc").yinkai(15,true);
                    break;
            }
        })
    },

    jiesuan() {
        console.log("结算")
        this.xztuo=false;
        cc.find("hc").getComponent("hc").yinguan(15);
        cc.find("hc").getComponent("hc").yinguan(9);
        cc.director.emit("结算",0,3,SHUJU.youren,0);
    },

    panduan(){
        for (var i = 0; i < SHUJU.youdang.length; i++) {
            if (SHUJU.youdang[i] != 2){
                return false;
            }
                
        }
        
        return true;
    },

    xiayiju(id) {
        console.log("下一关")
        SHUJU.guichu = 0;
        this.xztuo=false;
        this.cus.destroy();
        cc.find("hc").getComponent("hc").yinguan(15);
        cc.find("hc").getComponent("hc").yinguan(9);

        if(this.panduan()){
            console.log("结算")
            this.xztuo=false;
            cc.find("hc").getComponent("hc").yinguan(15);
            cc.find("hc").getComponent("hc").yinguan(9);
            cc.director.emit("结算",0,2,SHUJU.youren,0);
            return;
        }

        cc.director.emit("欧气药水关");
        cc.director.emit("先知关");
        cc.director.emit("卧底关");
        cc.director.emit("指人牌关");
        cc.director.emit("分身关");
        cc.director.emit("刷头叉");
        cc.director.emit("下一关");

        this.suixuan();
        SHUJU.djan.weicang()
        if(AD.chanelName=="QQ"&&AD.chanelName1=="QQ"&&AD_QQ.xianzhi){
            AD.showAD(this.wu,this);
        }
    },

    update(dt) {
        if (this.xzzou == false)
            return;
        if (this.siwang == false) {
            if (this.youdang) {
                if (this.node.x < this.sha[0].x) {
                    this.node.x += 4;
                    if (Math.abs(this.node.x - this.sha[0].x) < 80) {
                        this.si()
                    }
                }
            } else {
                if (this.zhuafang == 0) {
                    if (this.node.x < this.duox[this.po]) {
                        this.node.x += 4;
                        this.node.scaleX = 1;
                        if (this.node.x >= this.duox[this.po]) {
                            this.shasi();
                        }
                    }else{
                        this.node.x -= 4;
                        this.node.scaleX = -1;
                        if (this.node.x <= this.duox[this.po]) {
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
            }
        } else {
            if (this.shibai == true) {
                if (this.node.x > -940) {
                    this.node.x -= 6.5;
                    if (this.youdang) {
                        this.sha[0].x = this.node.x;
                    } else {
                        SHUJU.xuannpc.x = this.node.x;
                    }
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
                        // if (this.youdang) {
                        //     this.xiayiju(0);
                        // } else {
                        this.xiayiju();
                        // }

                    }
                }
            }
        }
    },
});
