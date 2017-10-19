var linebot = require('linebot');
var express = require('express');
const line = require('@line/bot-sdk');
var request = require('request');
var googleSpreadSheet = require('google-spreadsheet');
var bot = linebot({
   channelId: "1541476379",
   channelSecret: "7f38babaae43a9d9d366090bfeea2c33",
   channelAccessToken: "BoUM+4mnBIWwo5iX5FkO82jrdWEociH8ivXD//Boe6qYN+F23wY9nG5bj/FraswqBG+sz3fg8Su6Gq+Go8JUQzBtPqkgQjZ34Lb5ZvEd8LJaV+uHWmXivCAU20jG2WcSLc86XKNszQozMhPEb6S4/AdB04t89/1O/w1cDnyilFU="
});

var config={
  channelAccessToken: "BoUM+4mnBIWwo5iX5FkO82jrdWEociH8ivXD//Boe6qYN+F23wY9nG5bj/FraswqBG+sz3fg8Su6Gq+Go8JUQzBtPqkgQjZ34Lb5ZvEd8LJaV+uHWmXivCAU20jG2WcSLc86XKNszQozMhPEb6S4/AdB04t89/1O/w1cDnyilFU="
};
const client = new line.Client(config);
var count =0;
bot.on('message', function(event) {
    console.log(event); //把收到訊息的 event 印出來看看
        
    
    if(event.message.type=='text'){         
      var msg = event.message.text;//如果型態是文字
      if(event.source.type=="group"){//聊天室
        parseLogic2(msg,event);
      }else{
        recordUser(bot,event);
        record(bot.getUserProfile.userId,bot.getUserProfile.displayName,msg);
        parseLogicFull(msg,event);
      }
    }
});
/**
 * 記錄使用者id
 * @param {*} bot 
 * @param {*} event 
 */
function recordUser(bot,event){
  bot.getUserProfile(event.source.userId)//取得使用者資料
  .then((profile)=>{
    console.log(profile.displayName+":"+profile.userId);//顯示id
    var isInside=false;//是否在陣列內
    members.forEach((member)=>{//尋找名字有沒有在記錄表內
      if(profile.displayName.indexOf(member[1])!=-1){
        isInside=true;//有在陣列內
      }
    });
    if(!isInside){//如果沒有
      record(profile.userId,profile.displayName,"1_1");
      console.log("記錄"+profile.userId+"入spreadsheet");
    }
    
  })
  .catch((error)=>{
    console.log(err)
  });
}
  function parseLogicFull(msg,event){
    var re = parseMembersData(msg);//先分析會員資料
    console.log(re);
    if(re!=""){
      event.reply(re).then((data)=>{//如果有問到會員資料的就送出
        //success          
      }).catch((error)=>{
        console.log(error);
      });
    }else{
      re = msgEasyParse2(msg);//回應模式
      if(re!=""){
        event.reply(re).then((data)=>{
          //success                    
        }).catch((error)=>{
          console.log(error);
        });
      }else{//喇低賽模式
        count++;
        if(count>8){//沈默超過8句 就來刷存在
          count=0;
          var ans = jar[Math.floor((Math.random() * 10) + 1)];
          event.reply(ans).then(function(data){
            //success
            console.log(ans);
          }).catch(function(error){
            console.log(error);
          });
      }
    }
  }
  }
  function parseLogic2(msg,event){
   
      re = msgEasyParse2(msg);//回應模式
      if(re!=""){
        event.reply(re).then((data)=>{
          //success                    
        }).catch((error)=>{
          console.log(error);
        });
      }else{//喇低賽模式
        count++;
        if(count>8){//沈默超過8句 就來刷存在
          count=0;
          var ans = jar[Math.floor((Math.random() * 10) + 1)];
          event.reply(ans).then(function(data){
            //success
            console.log(ans);
          }).catch(function(error){
            console.log(error);
          });
      }
    }

  }
  var jar = ["","嗯嗯","哈哈","呵呵","去洗澡","愛睏中。。。。","哦好","我來刷存在感的別理我","讚喔","認真聽中...","good"];
  bot.on('follow', function (event) {
    cmds.forEach(cmd=>{
      if(cmd.cmd=="歡迎詞"){
        event.reply(cmd.response);
      }
    });
    
  });
  
  bot.on('unfollow', function (event) {
    event.reply('unfollow: ' + event.source.userId);
  });
  
  bot.on('join', function (event) {
    event.reply('join: ' + event.source.groupId);
  });
  
  bot.on('leave', function (event) {
    event.reply('leave: ' + event.source.groupId);
  });
  
  bot.on('postback', function (event) {
    event.reply('postback: ' + event.postback.data);
  });
  
  const app = express();
  const linebotParser = bot.parser();
  app.post('/', linebotParser);
  app.get('/gogogo',function(req,res){
    members.length=0;
    responseSentence.length=0;
     membersProfile.length=0;
     idsss.length=0; 
     init();
     console.log("重新讀取資料庫");
     res.send("");
  });

  app.get('/brocast',(req,res)=>{
    var ggg = req.query.cmd;
    idsss.forEach((id)=>{
      console.log(id);
      bot.push(id,ggg);
    });
    //bot.pushMessage('U493c9003d8a5f7bafd8b312e0a025197',ggg);
    res.send(ggg);
    
  });
  app.get('/say',function(req,res){
    var command = req.query.cmd;
    client.pushMessage('Uceb6e7232beb6636db2403bb14506998',command);
    client.pushMessage('Uceb6e7232beb6636db2403bb14506998',{
      "type": "sticker",
      "packageId": "1",
      "stickerId": "1"
    });
    
    /*client.getGroupMemberIds('C774b38be843626d6c29b46c78294a078')
    .then((ids)=>{
      ids.forEach((id)=>{
        console.log(id);
      });

    })
    .catch((err)=>{
      console.log(err);

    });*/

    bot.push('U493c9003d8a5f7bafd8b312e0a025197',command);
    res.send(command);

  });
  app.get('/ganbugroup',function(req,res){
    var command = req.query.cmd;
    
    bot.push('C774b38be843626d6c29b46c78294a078',command);
    
    res.send(command);

  });
  
  //因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
  var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
  setTimeout(function(){
    var userId = 'Uceb6e7232beb6636db2403bb14506998';
    var sendMsg = '重開機成功';
    bot.push(userId,sendMsg);
    console.log('send: '+sendMsg);

},5000);
//初始化資料
  var members = new Array();//會員資料
  var responseSentence = new Array();//回應句
  var membersProfile = new Array();//會員id
  var idsss = new Array();
init();
function init(){
  var brainData = new googleSpreadSheet('1JdEJ6n9zltWWJqjvMXC_JK2NcwicrNPrFENbssa1ZlM');
  //把對應人名載入
  brainData.getRows(6,function(err,row_data){
    if(err){
      console.log(err);
    }
    
    for(var i=0;i<row_data.length;i++){
      var items = [row_data[i].userid,row_data[i].name];
      idsss.push(row_data[i].userid);
      console.log(row_data[i].userid);
      members.push(items);
      if(row_data[i].userid==""){
        console.log("成員資料初始化成功"); 
        break;
      }
      
    } 
  });
  //載入初始化回應資料
  brainData.getRows(2,function(err,datas){
    if(err){
      console.log(err);
    }
    for(var i=0;i<datas.length;i++){
      var items = [datas[i].keyword,datas[i].sentence];
      responseSentence.push(items);
      if(datas.keyword==""){
        console.log("回應資料初始化成功"); 
        break;
      }
      
    }  
    var x = 0;  
  });
  //指令資料載入
  brainData.getRows(3,(err,datas)=>{
    if(err){
      console.log(err);
    }
    datas.forEach(data=>{
      var items =[data.cmd,data.response];
      cmds.push(items);
      
    });
  });
  
  //會員基本資料載入
  var personal_data = new googleSpreadSheet('1867MiPMvt7_IF9vX3y3MgPhadV0HBN0d86g__HFq3D4');//會員資料
  personal_data.getRows(1,(err,row_data)=>{
    if(err){
      console.log("personal_data.getRow():"+err);
    }
    row_data.forEach((datas)=>{
      var items = new Array();
      items.push(datas.職稱);//0
      items.push(datas.公司簡稱);//1
      items.push(datas.姓名);//2
      var name = datas.姓名;
      xin.push(name.substring(0,1));
      middlename.push(name.substring(1,4));
      ming.push(name.substring(1,2));
      items.push(datas.推薦人);//3
      items.push(datas.公司地址);//4
      items.push(datas.公司電話);//5
      items.push(datas.行動電話);//6
      items.push(datas.Email);//7
      items.push(datas.暱稱);//8
      items.push(datas.主要產品);//9
      membersProfile.push(items);
    });
  });
    
}
var cmds = new Array();
function searchPersonalData(msg){
  var personal_data = new googleSpreadSheet('1867MiPMvt7_IF9vX3y3MgPhadV0HBN0d86g__HFq3D4');//會員資料
  personal_data.getRows(1,function(err,row_data){
    for(var i in row_data){
      var name = row_data[i].姓名;
      if(name!=""&&name.indexOf(msg)!=-1){
        var dd = row_data[i].姓名+"的資料如下 mobile:"+row_data[i].行動電話+" 公司名稱："+row_data[i].公司簡稱+" 公司地址："+row_data[i].公司地址;
        console.log(dd);
        return dd;
      }
    }
    return "";
  });

}
//setTimeout(parseMembersData,10000);
var xin= new Array();
var ming = new Array();
var middlename = new Array();
//setTimeout(parseMembersData,5000);
function parseMembersData(msg){
  //var msg="江";
  var resp= "";
  var multi = new Array();
  var option = 0;
  var title="";
  var ifskip=false;
  membersProfile.forEach((member,yy)=>{
    member.forEach((detail,index)=>{
      if(typeof detail!="undefined"&&detail!=""&&msg.indexOf(detail)!=-1){
        switch(index){
          case 0://職稱
            resp=detail+"是"+member[2];
            ifskip=true;
            return resp;
            break;
          case 1://簡稱
            resp ="我知道"+member[1]+"是"+member[3]+"的公司哦～";
            ifskip=true;
            break;
          case 2://姓名
            resp = new Array();
            resp.push(member[2]+"的資料如下 mobile:"+member[6]+" 公司:"+member[1]+" 地址:"+member[4]);
            resp.push("主要產品:"+member[9]);
            ifskip=true;
            return resp;
          case 3://推薦人
            //resp="推薦人";
            break;
          case 4://公司地址
          case 5://公司電話
          case 6://行動電話
          case 7://email
          case 8://暱稱
            resp= new Array();
            var x = 0;
            resp.push(member[8]+"我好像認識耶！他是傳說中的"+member[2]+"對吧～");
            resp.push(member[2]+"資料如下 mobile:"+member[6]+" 公司:"+member[1]+" 地址:"+member[4]);
            ifskip=true;
            return resp;  
            break;        
          case 9://主要產品
          multi.push(member[2]+" ");
          break;

        }
      }

      if(typeof detail!="undefined"&&detail!=""&&detail.indexOf(msg)!=-1){//產品 地址適用
        switch(index){
          case 4://公司地址
            multi.push(member[2]+" ");
            option =4;            
            break;
          case 9://主要產品
            option =11;
            multi.push(member[2]+" ");
            break;

        }
      }
      
    });
   
    if(msg.indexOf(xin[yy])!=-1&&msg.indexOf(member[2])==-1){//姓
      title = xin[yy];
      multi.push(member[2]);
      option =3;
    }else if(msg.indexOf(middlename[yy])!=-1){
      title= middlename[yy];
      var word = "";
      if(msg.indexOf("電話")!=-1){
        multi.push(title+"的電話如下"+member[6]+"\n");
      }else if(msg.indexOf("地址")){
        multi.push(title+"的住址如下"+member[4]+"\n");
      }else if(msg.indexOf("外號")){
        multi.push(title+"的外號叫做"+member[8]+"\n");
      }
      //multi.push(member[2]);
      option =5;
    }else if(msg.indexOf(ming[yy])!=-1){
      multi.push(member[2]);
      option =6;
    }
  });
  if(multi.length>0){
    multi.forEach((name)=>{
      resp = resp+ name+"\n";
    });
    if(option==11){//產品
      return "據我所知\n"+resp+" 的公司有在做這個產品哦";
    }else if(option==4){
      return "在這個地區的會友如下："+resp;
    }else if(option==3){
      return "在我精準的判斷之下\n姓:"+title+"的會友如下"+resp;
    }else if(option==5){//單一名字
      return resp;
    }
  }else{
    return resp;
  }
}

/**
 * 
 * @param {msg} msg 傳入說話
 * @return 
 */
function msgEasyParse2(msg){
  //msg="太平羅志祥";
  var resp = new Array();
  //logic -> 會員資料 -> 回應
  //
  responseSentence.forEach((keyword)=>{//把要說的話放入陣列
    if(msg.indexOf(keyword[0])!=-1){
      resp.push(keyword[1]);
    }
  });
  if(resp.length!=0){
    var index = Math.floor((Math.random()*10))%(resp.length);
    console.log(index);
    return resp[index];
  }
  return "";
  //亂數決定說話

}


function record(id,name,say){
  //var id ="gg";
  //var name ="yy";
  //var say = "haha";
  var url = "https://docs.google.com/forms/d/e/1FAIpQLSdFzC-kQLmJNzx_CB-qW7tTHYkZ7dkSPcek6u-G09UHBHZqMQ/formResponse";
  request.post(
  url,
  { form: { "entry.1263519876": id,
        "entry.1091618803":name,
        "entry.1286611888":say
    }},
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
         
      }else{
        console.log("FW 送出失敗");        
      }
    }
  );
}

