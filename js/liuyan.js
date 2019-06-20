window.addEventListener("load",function(){

    //头像选择
    let avatar = document.querySelectorAll(".avatar > img")
    let prev = 0;
    for (let i = 0; i < avatar.length; i++){
        avatar[i].onclick = function(){
            avatar[prev].classList.remove("avatarHot");
            avatar[i].classList.add("avatarHot");
            prev = i;
        }
    }

    //文本域长度
    let count = document.getElementById("count");
    let text = document.querySelector(".content > textarea");
    let usernames = document.querySelector("input[name=blogname]");
    console.log(count, text, usernames);

    text.onkeyup = function(){
        let value = this.value;
        count.innerText = value.length;
    };

    //留言评论区
    let message = document.querySelector(".message");
    let submit = document.querySelector(".content > input");
    submit.onclick = function(e){
        e.preventDefault();//阻止默认行为
        mess();
        formReset();
        return false;
    };
    let mess = function(){
        let imgs = avatar[prev].src;
        let user = usernames.value;
        let content = text.value;
        let date = new Date().toISOString().substr(0,10);
        let html = `
            <div class="fb">
                <ul>
                    <span class="tximg"><img src="${imgs}"></span>
                    <p class="fbtime"><span>${date}</span>${user}</p>
                    <p class="fbinfo">${content}</p>
                </ul>
            </div>
        `;
        message.innerHTML = html + message.innerHTML;
    };
    function formReset()
    {
        document.getElementById("myForm").reset()
    }
});