cc.Class({
    extends: cc.Component,

    properties: {
        yingbg: [cc.SpriteFrame],
        juese: sp.Skeleton,
        touyao: [cc.Node],
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
        this.sxunx = [525, 700, 800, 1920, 2600, 2995, 3405];
        this.xzq = false;
        this.xzduo = false;
        this.xzshua = false;
        this.xzsou = false;
        
        cc.director.on("刷新躲", () => {
            this.duo();
        }, this);
        cc.director.on("重新躲", (id) => {
            this.qiang(id);
        }, this);
        cc.director.on("选抓", (id) => {
            this.xuanzhua(id);
        }, this);
        cc.director.on("下一关", () => {
            this.xiayiguan();
        }, this);
        cc.director.on("捡", (id,idd) => {
            this.jian(id,idd);
        }, this);
        if (this.sx) {
            this.souxun()
        }
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

        
        if(SHUJU.yaosuo)
            this.yaosuo=SHUJU.yaosuo[id].children;
        
        this.node.getChildByName("jueseying").getComponent(cc.Sprite).spriteFrame = this.yingbg[idr];
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
                this.suiji();
            })
            .start()
        this.chushi = true;
    },

    xiayiguan(){
        SHUJU.youdang[this.id]=0;
        this.xzyou=false;
        this.juese.node.active = true;
        this.chushi = true;
        this.xzq = false;
        this.xzduo = false;
        this.xzshua = false;
        this.xzsou = false;
        this.duowei=null;
        this.scheduleOnce(function () {
            if (this.sx) {
                this.souxun()
            }else{
                this.suiji()
            }
        }, 0.02);
    },

    xuanzhua(id){
        if(this.duowei==id)
            SHUJU.xuannpc=this.node;
    },

    qiang(id){
        if(this.duowei==id){
            console.log(this.id,SHUJU.youdang)
            SHUJU.youdang[this.id]=0;
            this.xzshua=false;
            this.xzyou=false;
            // SHUJU.duodi[this.duowei].getChildByName("cang").active = false;
            // SHUJU.duodi[this.duowei].getChildByName("duo").getComponent("duo").huanwu();
            // SHUJU.duoshu[this.duowei] = 0;
            this.duowei=null;
            this.juese.node.active = true;
            this.suiji()
        }
    },

    duo() {
        if (this.xzshua)
            return;
        if (this.xzyou || SHUJU.duoshu[this.duowei] == 0)
            return
        let num = [];
        for (var i = 0; i < SHUJU.duoshu.length; i++) {
            if (SHUJU.duoshu[i] == 0) {
                num.push(i);
            }
        }
        console.log(num[0]==null,num)
        if(num[0]==null){
            this.duowei=null;
            this.xzduo = false;
            this.suiji()
            return;
        }
        let sui = Math.floor(Math.random() * num.length)
        this.duowei = num[sui]
        this.qux = this.duox[this.duowei];
        this.xzduo = true;

    },

    duodh() {
        SHUJU.duoshu[this.duowei] = 1;
        this.xzshua = true;
        cc.director.emit("刷新躲");
        SHUJU.youdang[this.id]=1;
        this.xzduo = false;
        if(this.panduan()){
            SHUJU.kaishi()
        }else{
            if(SHUJU.wanzhuang==1){
                SHUJU.djan.npccang()
            }
        }
        SHUJU.duodi[this.duowei].getChildByName("cang").active = true;
        SHUJU.duodi[this.duowei].getChildByName("duo").getComponent("duo").huanyou();
        if(SHUJU.duodi[this.duowei].getChildByName("duo").opacity==255){
            SHUJU.duodi[this.duowei].getChildByName("duo").getComponent("duo").qiang.active=true;
        }
        this.juese.node.active = false;
        this.node.getChildByName("jueseying").opacity = 255;

        cc.tween(this.node.getChildByName("jueseying"))
            .to(0.3, { opacity: 0 })
            .call(() => { })
            .start()
    },

    panduan(){
        if(SHUJU.wanzhuang==0)
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

    souxun() {
        let num = [];
        for (var i = 0; i < SHUJU.sou.length; i++) {
            if (SHUJU.sou[i] == 0 || SHUJU.sou[i] == 1) {
                num.push(i);
            }
        }
        if(num==[]){
            this.suiji()
            return;
        }
        let sui = Math.floor(Math.random() * num.length)
        this.souwei = num[sui]
        // this.souwei=0//测试
        this.soux = this.sxunx[this.souwei];
        this.xzsou = true;
    },

    soudh() {
        this.xzsou = false;
        if (SHUJU.sou[this.souwei] == 2 || SHUJU.sou[this.souwei] == 3) {
            this.souxun()
            return;
        }
        this.szhang = SHUJU.sou[this.souwei];
        SHUJU.sou[this.souwei] = 3;
        this.juese.setAnimation(0, "idle", true);

        this.node.getChildByName("souxun").active = true;
        this.node.getChildByName("souxun").getComponent(cc.ProgressBar).progress = 0;
        cc.tween(this.node.getChildByName("souxun").getComponent(cc.ProgressBar))
            .to(3, { progress: 1 })
            .call(() => { this.panyao() })
            .start()
    },

    jian(id,idd){
        console.log(id,this.id)
        if(id==this.id||this.id===false)
            return;
        SHUJU.diaoyao.destroy()
        for(var i=0;i<idd;i++){
            SHUJU.yao[this.id]++;
            this.suanyao()
            this.shan(this.yaosuo[SHUJU.yao[this.id]-1])
        }
    },

    panyao() {
        this.node.getChildByName("souxun").active = false;

        if (this.szhang == 0) {
            SHUJU.sou[this.souwei] = 2;

        } else if (this.szhang == 1) {
            SHUJU.sou[this.souwei] = 2;
            SHUJU.yao[this.id]++;
            this.suanyao()
            this.shan(this.yaosuo[SHUJU.yao[this.id]-1])
        }
        this.xzyou = false;
        this.duo();
        this.juese.setAnimation(0, "walk", true);
        this.sx = false;
    },

    suanyao(){
        for (var i = 0; i < 3; i++) {
            this.touyao[i].active = false;
        }
        for (var i = 0; i < SHUJU.yao[this.id]; i++) {
            this.touyao[i].active = true;
        }

        for (var i = 0; i < 3; i++) {
            this.yaosuo[i].active = false;
        }
        for (var i = 0; i < SHUJU.yao[this.id]; i++) {
            this.yaosuo[i].active = true;
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
        if (this.sx) {
            if (this.xzsou) {
                if (this.node.x < this.soux) {
                    this.juese.node.scaleX = 1;
                    this.node.x += 5;
                    if (this.node.x >= this.soux) {
                        this.node.x = this.soux;
                        this.soudh()
                    }
                } else {
                    this.juese.node.scaleX = -1;
                    this.node.x -= 5;
                    if (this.node.x <= this.soux) {
                        this.node.x = this.soux;
                        this.soudh();
                    }
                }
            }
        } else if (this.hua) {
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
                        this.duodh()
                    }
                } else {
                    this.juese.node.scaleX = -1;
                    this.node.x -= 5;
                    if (this.node.x <= this.qux) {
                        this.node.x = this.qux;
                        this.duodh();
                    }
                }
                if(SHUJU.guichu==1){
                    this.xzduo=false;
                    this.xzyou=true;
                }
            }
        }
    },
});
