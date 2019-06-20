//链接隐藏（jQuery）
$(function(){
    let slides = $("li:has(.slideDown)");
    let slidesDowns = $(".slideDown");

    //方式一
    // slides.on("mouseenter",function(){
    //     let index = $(this).index("li:has(.slideDown)");
    //     $(slidesDowns[index]).slideDown();
    // });
    // slides.on("mouseleave",function(){
    //     let index = $(this).index("li:has(.slideDown)");
    //     $(slidesDowns[index]).slideUp();
    // });

    // slides.on("mouseenter mouseleave", function () {
    //     let index = $(this).index("li:has(.slideDown)");
    //     $(slidesDowns[index]).toggle("display:block");
    // });

    //方式二
    slides.on("mouseenter",function () {
        $(this).children(".slideDown").slideDown()
    });
    slides.on("mouseleave",function () {
        $(this).children(".slideDown").slideUp()
    });

    // slides.hover(function () {
    //     $(this).children(".slideDown").slideToggle()
    // })

});


window.onload=function(){
//轮播图左右按钮点击
    let current=0,next=0;
    let leftbtn=document.querySelector(".leftbtn");
    let rightbtn=document.querySelector(".rightbtn");
    let bannerimg=document.querySelectorAll(".bannerimg>li");
    let w=bannerimg[0].offsetWidth;
    let flag=true;//快速点击判断

    rightbtn.onclick=function () {
        if(!flag){
            return;
        }
        flag=false;
        next++;
        if(next==bannerimg.length){
            next=0;
        }
        bannerimg[next].style.left=w+"px";
        animate(bannerimg[current],{left:-w});
        animate(bannerimg[next],{left:0},function () {
            flag=true;
        });
        bannerpoint[current].classList.remove("hot");
        bannerpoint[next].classList.add("hot");
        current=next;
    }
    leftbtn.onclick=function () {
        if(!flag){
            return;
        }
        flag=false;
        next--;
        if(next<0){
            next=bannerimg.length-1;
        }
        bannerimg[next].style.left=-w+"px";
        animate(bannerimg[current],{left:w});
        animate(bannerimg[next],{left:0},function () {
            flag=true;
        });
        bannerpoint[current].classList.remove("hot");
        bannerpoint[next].classList.add("hot");
        current=next;
    }

//轮播图自动播放，移入停止
    let bannerleft=document.querySelector(".bannerleft");
    let t=setInterval(rightbtn.onclick,2000);
    bannerleft.onmouseenter=function(){
        clearInterval(t);
    };
    bannerleft.onmouseleave=function(){
        t=setInterval(rightbtn.onclick,2000);
    };

//轮播图下方按钮
    let bannerpoint=document.querySelectorAll(".btnlist>li");
    console.log(bannerpoint);
    console.log(bannerpoint[0]);
    for (let i=0;i<bannerpoint.length;i++){
        bannerpoint[i].onclick=function () {
            if(current===i){
                return;
            }
            next=i;

            if(next>current){
                bannerimg[next].style.left=w+"px";
                animate(bannerimg[current],{left:-w});
                animate(bannerimg[next],{left:0});
            }else{
                bannerimg[next].style.left=-w+"px";
                animate(bannerimg[current],{left:w});
                animate(bannerimg[next],{left:0});
            }

            bannerpoint[current].classList.remove("hot");
            bannerpoint[next].classList.add("hot");
            current=next;
        }
    }

/*个人博客日记导航栏*/
    let diarylist=document.querySelectorAll(".diarylist>li");
    console.log(diarylist);
    for (let i=0;i<diarylist.length;i++){
        diarylist[i].onclick=function () {
            for (let j=0;j<diarylist.length;j++){
                diarylist[j].style.borderBottom='none'
            }
            this.style.borderBottom='2px solid black';
        }
    }

/*隐藏博文*/
    let diarytext=document.querySelectorAll('.diarytext>li');
    console.log(diarytext);
    diarytext.forEach(function (elem,index) {
        elem.onmouseenter=function () {
            for (let i=0;i<diarytext.length;i++){
                diarytext[i].classList.remove('hot')
            }
            this.classList.add('hot')
        }
    })

//按需加载资源文件
    let viewH=window.innerHeight;
    let imgs=document.querySelectorAll(".lazyload");
    let positionArr=[];
    imgs.forEach(function (ele) {
        let parent=ele.offsetParent;
        positionArr.push(parent.offsetTop+ele.offsetTop)
    })
    window.onscroll=function () {
        let scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
        // console.log(scrolltop);
        for (let i=0;i<positionArr.length;i++){
            if(scrolltop+viewH>=positionArr[i]+50){
                //标准属性
                if(!imgs[i].src){
                    imgs[i].src=imgs[i].getAttribute('qw');
                }
            }
        }
    }

}

