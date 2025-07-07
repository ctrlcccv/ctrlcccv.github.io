const user = {
    name: "이영희",
    age:30,
    introduce: function(){
        console.log(`안녕하세요, 저는 ${this.name}이고, ${this.age}살입니다.`);
    }
}

const introduce = user.introduce.bind(user);
introduce();