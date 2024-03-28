window.SHUJU = {
    clearDataNow: false,//清除数据吗?
    keyFirst: "key_firstJuJiMoNiQi",
    keyData: "key_dataJuJiMoNiQi",

    sci:true,//是否是首次进入游戏
    dianyin:false,//是否可以点击隐藏角色1
    jiantou:[false,false,false,false],//商店界面是否显示箭头

    youren:-1,//玩家选的角色
    youtu:-1,//玩家选的地图
    moshi:-1,//玩家选的模式
    wantu:-1,//玩家选的屠夫
    bianshen:-1,//玩家的变身daoju
    npcren:[],//npc的角色id
    xzy:false,//玩家是否可以移动
    duoshu:[0,0,0,0,0,0,0,0,0],//躲藏地点0无人，1有人，2损坏
    sou:[0,0,0,0,0,0,0],//搜寻地点0无钥匙，1有钥匙，2已经搜过,3正在搜
    yao:[0,0,0,0,0,0,0,0,0],//npc和玩家获得钥匙数量，最后一个是玩家
    duodi:[],//道具节点
    youdang:[0,0,0,0,0,0,0,0],//npc状态，0游荡，1躲藏，2死亡
    jineng:[0,0,0,0,0,0],//角色技能加的道具，先知符，指路牌，欧气药水，卧底符，分身喷雾，抢位卡
    wanzhuang:0,//玩家0游荡，1躲藏,2死亡,4变身道具
    guichu:0,//鬼是否出现，0没出现，1出现
    xuannpc:null,//选中的npc，
    npczhuang:[1,1,1,1,1,1,1,1,1],//npc状态模式1，0游荡，1躲藏，2死亡
    duogai:[30,8,26,18,20,22,16,24,28,14,12,10],//不同物品的躲藏被抓概率
    daojudian:[0,0,0,0,0],//本轮是否用了道具
    biandao:[0,0,0,0,0,0,0,0,0,0,0,0],//npc变身道具，0还没用了，1已结用了
    daobian:[0,0,0,0],//变身模式道具状态0正常，1损坏
    nannv:[1,0,1,1,1,1,0,1,1,1,1,0],
    biannode:null,

    a:[0,1,2,3,4,5,6,7,8,9,10],

    data: {
        uie:"蓝桉",//测试数据
        jue:[false,false],//是否获取2个隐藏角色
        tili:10,
        jinbi:0,
        daoju:[0,0,0,0],//尖叫鸡，指人牌，欧气药水，分身喷雾
        kapai:[0,0,0,0],//隐身卡，抢位卡，卧底卡，先知卡
        ditu:[true,false,false],//医院，学校，鬼屋
        juese:[true,false,false,false,false,false,false,false,false,false],//角色
        bianshen:[true,false,false,false,false,false,false,false,false,false],//变身道具
        yijin:[true,true,true,true,true],
        tufu:[true,false,false],
    },

    chu(){
        console.log("游戏初始化")
        if (this.clearDataNow)
            this.clearAllData();

        if (cc.sys.localStorage.getItem(this.keyFirst) != 1) {
            this.sci=true;
            this.baocun();
            cc.log("首次进入游戏 " + cc.sys.localStorage.getItem(this.keyData))
            this.data = this.huoqu();
        }
        else {
            cc.log("非首次进入游戏 " + cc.sys.localStorage.getItem(this.keyData))
            this.data = this.huoqu();
            this.sci=false;
        }
    },

    replay(){
        this.youren=-1;
        this.youtu=-1;
        this.moshi=-1;
        this.bianshen=-1;
        this.npcren=[];
        this.xzy=false;
        this.duoshu=[0,0,0,0,0,0,0,0,0];
        this.yao=[0,0,0,0,0,0,0,0,0];
        this.sou=[0,0,0,0,0,0,0];
        this.yao=[0,0,0,0,0,0,0,0,0];
        this.youdang=[0,0,0,0,0,0,0,0];
        this.jineng=[0,0,0,0,0,0];
        this.wanzhuang=0;
        this.guichu=0;
        this.npczhuang=[1,1,1,1,1,1,1,1,1];
        this.daojudian=[0,0,0,0,0];
        this.biandao=[0,0,0,0,0,0,0,0,0,0,0,0];
        this.daobian=[0,0,0,0];
        this.biannode=null;
        this.wantu=-1;
    },

    kaishi(){//跳过时间开始游戏
        this.daojishi.jixu();
    },

    zengjia(id,num){
        switch(id){
            case 0:
                this.shuqian=this.data["jinbi"]
                this.data["jinbi"]+=num;
                this.shuhou=this.data["jinbi"]
                cc.director.emit("增加金币");
                break;
            case 1:
                this.shuqian=this.data["tili"]
                this.data["tili"]+=num;
                // if(this.data["tili"]>10)
                //     this.data["tili"]=10;
                this.shuhou=this.data["tili"]
                cc.director.emit("增加体力");
                break;
        }
        this.baocun()
    },

    clearAllData() {
        cc.sys.localStorage.removeItem(SHUJU.keyFirst);
        cc.sys.localStorage.removeItem(SHUJU.keyData);
    },

    getNewArr(Arr, num)	//传入2个参数，一个数组，要获取数组的长度 (目的 将一个数组打乱后重新返回)
    {
        var arr = new Array();  //这个数组的目的是把传入进来的数组复制一份
        for (var i in Arr) {
            arr.push(Arr[i]);
        }  //这个for 循环用来把传入的数组复制一份  

        var return_arr = new Array();  //存储随机数用的数组
        for (var i = 0; i < num; i++) 	//获取随机数
        {
            if (arr.length > 0) {
                var nums = Math.floor(Math.random() * arr.length);  //从arr里面随机一个地址并 赋给变量nums
                return_arr[i] = arr[nums];	//将arr地址里的值 给   return_arr[i];
                arr.splice(nums, 1);	//删除 地址上的数字，防止在随机出来重复的
            }
            else {
                break;
            }
        }
        return return_arr;		//返回获取的5个值
    },

    shou(){
        cc.sys.localStorage.setItem(this.keyFirst, 1);
    },

    baocun() {
        cc.sys.localStorage.setItem(this.keyData, JSON.stringify(this.data));
    },

    huoqu() {
        var _res = cc.sys.localStorage.getItem(this.keyData);
        if (_res != null)
            return JSON.parse(_res);
    },
}