const cloud = require('wx-server-sdk')
cloud.init()
//引入发送邮件的类库
var nodemailer = require('nodemailer')
// 创建一个SMTP客户端配置
var config = {
  host: 'smtp.qq.com', //网易163邮箱 smtp.163.com
  port: 465, //网易邮箱端口 25
  auth: {
    user: 'weyounglc@qq.com', //邮箱账号
    pass: 'tczgcvvyyumeeceh' //邮箱的授权码
  }
};
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
// 云函数入口函数
exports.main = async(event, context) => {
  let { userInfo, email} = event
  // 创建一个邮件对象
  var mail = {
    from: '来自Lies <weyounglc@qq.com>',
    subject: '来自Lies的邮件',
    to: String(email),
    text: '分类数据', 
    attachments: [
      {
        filename: 'classifiction.json',
        content: "{'TEST2':0, 'TEST3':0, 'TEST5':0, 'TEST6':0, 'TEST7':0, 'TEST8':0, 'TEST11':0, 'TEST12':0, 'TEST13':0, 'TEST14':0, 'TEST15':0, 'TEST16':0, 'TEST18':0, 'TEST19':0, 'TEST20':0, 'TEST23':0, 'TEST24':0, 'TEST25':0, 'TEST26':0, 'TEST27':0, 'TEST28':0, 'TEST29':0, 'TEST30':0, 'TEST31':0, 'TEST32':0, 'TEST33':0, 'TEST35':0, 'TEST36':0, 'TEST38':0, 'TEST39':0, 'TEST40':0, 'TEST41':0, 'TEST43':0, 'TEST44':0, 'TEST45':0, 'TEST46':0, 'TEST47':0, 'TEST48':0, 'TEST49':0, 'TEST50':0, 'TEST51':0, 'TEST52':0, 'TEST53':0, 'TEST55':0, 'TEST56':0, 'TEST57':0, 'TEST58':0, 'TEST60':0, 'TEST61':0, 'TEST63':0, 'TEST64':0, 'TEST66':0, 'TEST71':0, 'TEST72':0, 'TEST73':0, 'TEST74':0, 'TEST76':0, 'TEST77':0, 'TEST78':0, 'TEST80':0, 'TEST81':0, 'TEST82':0, 'TEST83':0, 'TEST85':0, 'TEST86':0, 'TEST87':0, 'TEST88':0, 'TEST89':0, 'TEST90':0, 'TEST91':0, 'TEST92':0, 'TEST93':0, 'TEST94':0, 'TEST95':0, 'TEST96':0, 'TEST97':0, 'TEST98':0, 'TEST99':0, 'TEST100':0, 'TEST101':0, 'TEST102':0, 'TEST103':0, 'TEST107':0, 'TEST109':0, 'TEST110':0, 'TEST111':0, 'TEST112':0, 'TEST113':0, 'TEST114':0, 'TEST118':0, 'TEST121':0, 'TEST122':0, 'TEST125':0, 'TEST126':0, 'TEST127':0, 'TEST129':0, 'TEST131':0, 'TEST132':0, 'TEST134':0, 'TEST135':0, 'TEST136':0, 'TEST137':0, 'TEST138':0, 'TEST139':0, 'TEST10':1, 'TEST21':1, 'TEST59':1, 'TEST62':1, 'TEST69':1, 'TEST106':1, 'TEST108':1, 'TEST115':1, 'TEST123':1, 'TEST124':1, 'TEST130':1, 'TEST133':1, 'TEST9':2, 'TEST22':2, 'TEST42':2, 'TEST54':2, 'TEST67':2, 'TEST68':2, 'TEST70':2, 'TEST75':2, 'TEST79':2, 'TEST84':2, 'TEST116':2, 'TEST117':2, 'TEST119':2, 'TEST141':2, 'TEST1':3, 'TEST4':3, 'TEST17':3, 'TEST34':3, 'TEST37':3, 'TEST65':3, 'TEST104':3, 'TEST105':3, 'TEST120':3, 'TEST128':3, 'TEST140':3, 'TEST142':3}",
      },
    ]
  };
  let res = await transporter.sendMail(mail);
  return res;
}