cc.Class({
    extends: cc.Component,

    properties: {
        zuo:[cc.Node],
        you:[cc.Node],
        jin:cc.Label,
        rentou:[cc.SpriteFrame],
        guitou:[cc.SpriteFrame],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.director.on("结算", (jueid,sbid,ren,tu) => {
            this.chu(jueid,sbid,ren,tu);
        }, this);
        this.xz=false
    },

    chu(jueid,sbid,ren,tu){
        if(this.xz)
            return;
        if(sbid==2){
            cc.find("hc").getComponent("hc").yinkai(19,false)
        }else{
            cc.find("hc").getComponent("hc").yinkai(18,false)
        }
        AD.chaPing(true);
        AD.showBanner();
        if(AD.chanelName1=="vivo")
            AD_vivo.hideBox()
        this.xz=true;
        this.node.scale=1;
        this.node.zIndex=100;
        for(var i=0;i<this.zuo.length;i++){
            this.zuo[i].active=false;
            this.you[i].active=false;
        }
        this.zuo[jueid].active=true;
        this.zuo[sbid].active=true;
        this.you[jueid].active=true;
        this.you[sbid].active=true;
        this.zuo[0].getChildByName("tou").getComponent(cc.Sprite).spriteFrame=this.rentou[ren];
        this.you[1].getChildByName("tou").getComponent(cc.Sprite).spriteFrame=this.rentou[ren];
        if(SHUJU.moshi!=1){
            this.zuo[1].getChildByName("tou").getComponent(cc.Sprite).spriteFrame=this.guitou[tu];
            this.you[0].getChildByName("tou").getComponent(cc.Sprite).spriteFrame=this.guitou[tu];
        }else{
            this.zuo[1].getChildByName("tou").getComponent(cc.Sprite).spriteFrame=this.guitou[SHUJU.wantu];
            this.you[0].getChildByName("tou").getComponent(cc.Sprite).spriteFrame=this.guitou[SHUJU.wantu];
        }

        if(sbid==2)
            this.jiang=90;
        else
            this.jiang=10;

        this.jin.string="x"+this.jiang
        SHUJU.data.jinbi+=this.jiang;
        SHUJU.baocun();
    },
    
    dian(even,id){
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        if(id==0){
            cc.director.loadScene("menu");
        }else{
            AD.showAD(this.hui,this)
        }
    },

    hui(){
        SHUJU.data.jinbi+=this.jiang;
        SHUJU.data.jinbi+=this.jiang;
        SHUJU.baocun();
        cc.director.loadScene("menu");
        AD.chaPing();
        AD.gameOver();
        AD.showBanner();
    },

    // update (dt) {},
});
