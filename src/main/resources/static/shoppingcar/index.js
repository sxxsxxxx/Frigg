var app = new Vue({
  el: '#app',
  data: {
    list:[
      {
        id: 1,
        name: 'mac',
        price: 9888,
        count: 3
      },
      {  id: 2,
        name: 'iphone',
        price: 6888,
        count: 2
      },
      {  id: 3,
          name: 'pad',
          price: 6188,
          count: 2
        }
    ]
  },
  computed: {
    totalPrice: function(){
      var total = 0;
      for (var i=0;i<this.list.length;i++) {
        let item = this.list[i];
        total = total + item.count * item.price;
      }
      return total;
    }
  },
  methods: {
    handleRemove:function(index){
      //暂不移除
      // this.list[index].splice(index,1);
    },
    handleReduce:function(index){
      if(this.list[index].count === 1)
      return;
      this.list[index].count--;
    },
    handleAdd:function(index){
      this.list[index].count ++;
    }
  }
});
