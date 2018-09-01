//1.输入内容之后，回车，自动渲染出一条新的li;
let vm = new Vue({
    el: '#app',
    data: {
        todos: [
            { inpShow: true, txtShow: true, isSelected: false, title: '睡觉', modifyShow: false, btnShow: true },
            { inpShow: true, txtShow: true, isSelected: false, title: '吃饭', modifyShow: false, btnShow: true }
        ],
        title: "",
        types: [{ type: "全部", hash: "#all", isSelected: false }, { type: "已完成", hash: "#finish", isSelected: false }, { type: "未完成", hash: "#unfinish", isSelected: false }],
        hash: ""
    },
    //window可以监听当前哈希值的变化:hashchange;
    created() {
        //生命周期中的钩子函数 
        //this.hash = "all";
        this.hash = "all";
        this.types[0].isSelected = true;
        window.addEventListener('hashchange', () => {
            //一旦页面中的哈希值发生变化，对data中的hash值
            //window.location.hash:获取当前页面的hash值;
            this.hash = window.location.hash.slice(1);
        })
    },
    methods: {
        add() {
            //每回车一次，向todo中新增一个对象，当新增完成之后，清空当前input中的value
            this.todos.push({
                inpShow: true, txtShow: true, isSelected: false, title: this.title, modifyShow: false, btnShow: true
            });
            this.title = "";
        },
        remove(index) {
            this.todos = this.todos.filter(item => item !== this.todos[index]);
        },
        changeType(Index) {
            this.types.forEach(item => {
                if (item == this.types[Index]) {
                    item.isSelected = true;
                } else {
                    item.isSelected = false;
                }
            });
        },
        showMod(e, index1) {
            this.todos.forEach(item => {
                if (item == this.todos[index1]) {
                    item.inpShow = false;
                    item.btnShow = false;
                    item.txtShow = false;
                    item.modifyShow = true;
                }
            })

        },
        modify(index2) {
            this.todos.forEach(item => {
                if (item == this.todos[index2]) {
                    if (item.title == "") {
                        this.todos = this.todos.filter(item => item !== this.todos[index2]);
                    } else {
                        item.isSelected = false;
                        item.inpShow = true;
                        item.btnShow = true;
                        item.txtShow = true;
                        item.modifyShow = false;
                    }
                }
            })
        }
    },
    computed: {
        filterTodo() {
            //filterTodo会依赖当前hash值
            if (this.hash === "all") {
                return this.todos;
            } else if (this.hash === "finish") {
                return this.todos.filter(item => item.isSelected);
            } else if (this.hash === "unfinish") {
                return this.todos.filter(item => !item.isSelected);
            }
        },
        TODO() {
            let count = 0;
            this.todos.forEach(item => {
                if (!item.isSelected) {
                    count++;
                }
            })
            return count;
        }
    }
})