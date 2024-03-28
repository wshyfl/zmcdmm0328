cc.Class({
    extends: cc.Component,

    properties: {
        npcren:cc.Prefab,
        wanren:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.on("下一关", () => {
            this.xiayiguan();
        }, this);
    },

    start () {
        this.zu=[];
        for(var i=0;i<8;i++){
            this.cus = cc.instantiate(this.npcren);
            this.zu.push(this.cus)
            this.cus.getComponent("npcrenbian").chu(SHUJU.npcren[i],i);
            this.cus.parent = this.node;
            this.cus.setPosition(30+i*180, -15);
        }
        SHUJU.zu=this.zu;
        this.lin=[]
        for(var i=0;i<this.zu.length;i++){
            this.lin.push(this.zu[i])
        }
        this.suifan()
    },

    ouqikai(){
        this.wanren.opacity=150;
        SHUJU.wanzhuang=1;
    },

    ouqiguan(){
        this.wanren.opacity=255;
        SHUJU.wanzhuang=0;
    },

    xiayiguan(){
        
        for(var i=0;i<this.lin.length;i++){
            if(this.lin[i]._name==""){
                this.lin.splice(i,1)
            }
        }
        this.suifan()
    },

    suifan(){
        if(this.lin.length<=3)
            return;
        let a=[0,1,2,3,4,5,6,7,8]
        let b=Math.floor(Math.random()*2)

        a.length=this.lin.length
        if(this.lin.length==2){
            this.lin[1-this.sx].getComponent("npcrenbian").fang=0;
        }else{
            a.splice(a.indexOf(this.sx),1)
            if(b==0){
                let c=Math.floor(Math.random()*a.length)
                this.lin[a[c]].getComponent("npcrenbian").fang=0;
            }else{
                let c=Math.floor(Math.random()*a.length)
                this.lin[a[c]].getComponent("npcrenbian").fang=0;
                a.splice(a.indexOf(a[c]),1)
                let d=Math.floor(Math.random()*a.length)
                this.lin[a[d]].getComponent("npcrenbian").fang=0;
            }
        }
    },

    // update (dt) {},
});
