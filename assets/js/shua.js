cc.Class({
    extends: cc.Component,

    properties: {
        id:-1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.ji={num:0}
        this.ida=false;
        this.xz=false;
    },

    start () {
        switch(this.id){
            case 0:
                cc.director.on("增加金币",()=>{this.zengjia();},this);
                break;
            case 1:
                cc.director.on("增加体力",()=>{this.zengjia();},this);
                break;
        }
    },

    onEnable(){
        
        this.shua()
    },

    onDisable(){
        // switch(this.id){
        //     case 0:
        //         cc.director.off("增加金币",(num)=>{this.zengjia(num);},this);
        //         break;
        //     case 1:
        //         cc.director.off("增加体力",(num)=>{this.zengjia(num);},this);
        //         break;
        // }
    },

    shua(){
        switch(this.id){
            case 0:
                this.node.getComponent(cc.Label).string=SHUJU.data["jinbi"];
                break;
            case 1:
                this.node.getComponent(cc.Label).string=SHUJU.data["tili"];
                break;
        }
    },

    zengjia(){
        if(this.xz)
            return;

        this.xz=true;
        this.ida=true;
        this.ji["num"]=SHUJU.shuqian;
        
        cc.tween(this.ji)
            .to(0.5,{"num":SHUJU.shuhou})
			.call(() => { this.scheduleOnce(function () { this.ida = false;this.shua(),this.xz=false;},0.2)})
            .start()
    },

    update (dt) {
        if(this.ida){
            this.node.getComponent(cc.Label).string=Math.floor(this.ji["num"])
        }
    },
});
