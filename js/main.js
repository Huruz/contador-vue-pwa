const app = Vue.createApp({
    data(){
        return {
            title:"Contador App - Vue",
            count:0,
        }
    },
    methods:{
        modCount(instruction = "add", limit = 1){
            if(instruction === "add")
                this.count += limit;
            else
                this.count -= limit;
        },
    }
});