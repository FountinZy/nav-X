const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");//在siteList里找到li.last
const x = localStorage.getItem('x')//localStorage:在本地读取'x'的值
const xObject = JSON.parse(x)//把字符串'x'转化为对象
const hashMap = xObject || [
    {logo:'A',url:'https://www.acfun.cn/'},
    {logo:'B',url:'https://www.bilibili.com/'},
    {logo:'C',url:'https://www.cctv.com/'},
    {logo:'D',url:'http://www.dangdang.com/'},

];//初始hashmap

const simplifyUrl= (url)=>{
     return url.replace('https://','')
            .replace('http://','')
            .replace('www.','')
            .replace(/\/.*/,'')//删除 / 开头的内容
}//简化url地址

const render = ()=>{
    $siteList.find('li:not(.last)').remove()//把li列表里的不包含last的全部移除
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
            <div class="site"> 
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
    </li>`).insertBefore($lastLi);//遍历hashMap，传node参数创建<li>放在lastli之前
    $li.on('click',()=>{
        window.open(node.url)
    })//用JS点击事件来控制打开链接代替a标签
    $li.on('click','.close',(e)=>{
        e.stopPropagation()//阻止冒泡
        console.log(hashMap)
        hashMap.splice(index,1)
        render()
     })
    });
}
render()//渲染hashMap

$('.addButton')
    .on('click',()=>{
        let url=window.prompt('请问你要添加的网址是啥？')
        if(url.indexOf('http')!==0){
            url = 'https://' + url;
        }//自动将网站添加"https://"
            console.log(url);
            hashMap.push({logo:simplifyUrl(url)[0].toUpperCase(),
                            url:url});//将添加的网站push到hashMap
            render()//渲染hashMap
    });

    window.onbeforeunload =()=>{//js用户关闭页面前把当前的hashMap存到'x'内
        const string = JSON.stringify(hashMap)//把hashMap对象转化成字符串(localStorage只能存字符串)
        localStorage.setItem('x',string)//localStorage在本地存储里设置'x',值为string
    }

    $(document).on('keypress',(e)=>{
        const {key}= e //等价于const key= e.key
        console.log(key)
        for(let i =0;i< hashMap.length; i++){
            if(hashMap[i].logo.toLowerCase()=== key){
                window.open(hashMap[i].url)
            }
        }
    })