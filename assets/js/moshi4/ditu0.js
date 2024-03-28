cc.Class({
    extends: cc.Component,

    properties: {
        npcren:cc.Prefab,
        wanren:cc.Node,
        jiand:[cc.Node],
        xiangji:cc.Node,
        oq:cc.Node,
        yanwu:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.on("下一关", () => {
            this.xiayiguan();
        }, this);
        cc.director.on("指人牌开", () => {
            this.zhirenkai();
        }, this);
        cc.director.on("指人牌关", () => {
            this.zhirenguan();
        }, this);
        cc.director.on("欧气药水开", () => {
            this.ouqikai();
        }, this);
        cc.director.on("欧气药水关", () => {
            this.ouqiguan();
        }, this);
        cc.director.on("先知开", () => {
            this.xianzhi();
        }, this);
        cc.director.on("先知关", () => {
            this.guanxian();
        }, this);
    },

    start () {
        this.zu=[];
        for(var i=0;i<8;i++){
            this.cus = cc.instantiate(this.npcren);
            this.zu.push(this.cus)
            this.cus.getComponent("npcren").chu(SHUJU.npcren[i],i);
            this.cus.parent = this.node;
            this.cus.setPosition(30+i*180, -15);
        }
        SHUJU.zu=this.zu;
        this.lin=[]
        for(var i=0;i<this.zu.length;i++){
            this.lin.push(this.zu[i])
            this.zu[i].getComponent("npcren").sx=false;
        }
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
        // this.suisou()
        this.suifan()
    },

    ouqikai(){
        this.oq.getChildByName("lizi").getComponent(cc.ParticleSystem).resetSystem();
        this.oq.active=true;
        SHUJU.wanzhuang=1;
    },

    ouqiguan(){
        this.oq.active=false;
        SHUJU.wanzhuang=0;
    },

    zhirenkai(){
        this.yanwu.active=true;
        this.yanwu.getChildByName("lizi").getComponent(cc.ParticleSystem).resetSystem();
        this.scheduleOnce(function() {
            this.yanwu.active=false;
        }, 1);
        this.wanren.getChildByName("juese").active=false;
        this.wanren.getChildByName("pai").active=true;
    },
    zhirenguan(){
        this.wanren.getChildByName("juese").active=true;
        this.wanren.getChildByName("pai").active=false;
    },
    xianzhi() {
        this.xianjian=true;
        this.ji=SHUJU.duodi[SHUJU.po].getChildByName("dh2")
        this.ji.active=true;
    },
    guanxian(){
        if(this.ji){
            this.ji.active=false;
        }
        
        this.xianjian=false;
        this.jiand[0].active=false;
        this.jiand[1].active=false;
    },

    xiayiguan(){
        
        for(var i=0;i<this.lin.length;i++){
            if(this.lin[i]._name==""){
                this.lin.splice(i,1)
            }
        }
        // this.suisou()
        this.suifan()
    },

    suisou(){
        if(this.lin.length<=3)
            return;
        this.sx=Math.floor(Math.random()*this.lin.length)
        for(var i=0;i<this.lin.length;i++){
            if(this.sx==i){
                if(this.lin[i])
                    this.lin[i].getComponent("npcren").sx=true;
            }
            else{
                if(this.lin[i])
                    this.lin[i].getComponent("npcren").sx=false;
            }
        }
    },

    suifan(){
        if(this.lin.length<=3)
            return;
        let a=[0,1,2,3,4,5,6,7,8]
        let b=Math.floor(Math.random()*2)

        a.length=this.lin.length
        if(this.lin.length==2){
            this.lin[1-this.sx].getComponent("npcren").fang=0;
        }else{
            a.splice(a.indexOf(this.sx),1)
            if(b==0){
                let c=Math.floor(Math.random()*a.length)
                this.lin[a[c]].getComponent("npcren").fang=0;
            }else{
                let c=Math.floor(Math.random()*a.length)
                this.lin[a[c]].getComponent("npcren").fang=0;
                a.splice(a.indexOf(a[c]),1)
                let d=Math.floor(Math.random()*a.length)
                this.lin[a[d]].getComponent("npcren").fang=0;
            }
        }
    },

    update (dt) {
        if(this.xianjian){
            if(this.xiangji.x-this.duox[SHUJU.po]>cc.find("hc").getComponent("hc").cow/2){
                this.jiand[0].active=true;
                this.jiand[1].active=false;
            }else if(this.xiangji.x-this.duox[SHUJU.po]<-cc.find("hc").getComponent("hc").cow/2){
                this.jiand[0].active=false;
                this.jiand[1].active=true;
            }else{
                this.jiand[0].active=false;
                this.jiand[1].active=false;
            }
        }
    },
});
