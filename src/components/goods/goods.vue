<template>
	<div class="goods">
	  <div class="menu-wrapper"  ref="menu-wrapper">
	  	<ul>
	  		<li v-for="(items, index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click.stop.preven="selectMenu(index,$event)">
	  		  <span class="text border-1px" >
	  		  <span v-show="items.type>0" class="icon" :class="classMap[items.type]"></span>
	  		  {{items.name}}</span>	
	  		</li>
	  	</ul>
	  </div>
	  <div class="foods-wrapper" ref="foods-wrapper">
	  	<ul>
	  		<li v-for="item in goods" class="foods-all food-list-hook">
               <h1 class="title">{{item.name}}</h1>
               <ul>
               	<li @click="selectedFoods(foods,$event)" v-for="foods in item.foods" class="foods-item">
               		<div class="icon">
               			<img width="57" height="57" :src="foods.icon">
               		</div>
               		<div class="content">
               			<h2 class="name">{{foods.name}}</h2>
               			<p class="desc">{{foods.description}}</p>
               			<div class="extra">
               				<span class="count">月售{{foods.sellCount}}份</span>
               				<span>好评率{{foods.rating}}%</span>
               			</div>
               			<div class="price">
               				<span class="new-price">￥{{foods.price}}</span>
               				<span v-show="foods.oldPrice" class="old-price">￥{{foods.oldPrice}}</span>
               			</div>
               			<div class="cartcontrol-wrapper">
               				<cartcontrol :foods="foods" @cartAdd="_drop"></cartcontrol>
               			</div>
               		</div>
               	</li>
               </ul>
	  		</li>
	  	</ul>	  	
	  </div>
	  <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
	  <fooddetail ref="fooddetail"  @cartAdd="_drop" :fooddetail="selectFood"></fooddetail>
	</div>

</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart';
import cartcontrol from '../cartcontrol/cartcontrol';
import fooddetail from '../fooddetail/fooddetail';
const ERR_OK = 0;
export default{
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectFood: {}
    };
  },
  computed: {
    currentIndex () {
      for (var i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
          return i;
        }
      }
      return 0;
    },
    selectFoods () {
      let foodsE = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foodsE.push(food);
          }
        });
      });
      return foodsE;
    }
  },

  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('/api/goods').then((response) => {
      response = response.body;
      if (response.err === ERR_OK) {
        this.goods = response.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
          console.log(this.menuScroll);
        });
      }
    });
  },
  components: {
    shopcart,
    cartcontrol,
    fooddetail
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs['menu-wrapper'], {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs['foods-wrapper'], {
        click: true,
        probeType: 3

      });

      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    selectedFoods (foods, event) {
      if (!event._constructed) {
        return;
      }
      this.selectFood = foods;
      this.$refs.fooddetail.getFlag();
    },
    selectMenu (index, event) {
      if (!event._constructed) {
        return;
      }
      let foodsList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
      let item = foodsList[index];
      this.foodsScroll.scrollToElement(item, 300);
    },
    _calculateHeight () {
      let foodsList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (var i = 0; i < foodsList.length; i++) {
        let item = foodsList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    _drop (target) {
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    }
  }

};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import"../../common/stylus/mixin.styl";
  .goods
    display:flex
    position:absolute
    top:170px
    bottom:46px
    width:100%
    overflow:hidden
    .menu-wrapper
      flex: 0 0 80px 
      width:80px
      background-color:#f3f5f7
      .menu-item
        display:table
        width:56px
        height:54px
        padding:0 12px
        line-height:14px
        &.current
          position:relative
          z-index:10
          margin-top:-1px
          background:#fff
          font-weight:700
        .text
          font-size:12px
          display:table-cell
          width:56px
          boder-1px(rgba(7,17,27,0.2))
          line-height:14px
          vertical-align:middle
        .icon
          display:inline-block
          vertical-align:top
          width:12px
          height:12px
          margin-right:2px
          background-size:12px 12px
          background-repeat:no-repeat
        .decrease
          bg-image("decrease_3")
        .discount
          bg-image("discount_3")
        .guarantee
          bg-image("guarantee_3")
        .invoice
          bg-image("invoice_3")
        .special
          bg-image("special_3")        
    .foods-wrapper
      flex:1
      .foods-all
        .title
          padding-left:14px
          height:26px
          line-height:26px
          border-left:2px solid #d9dde1
          font-size:12px
          color:rgb(147,153,159)
          background-color:#f3f5f7  
        .foods-item
          display:flex
          border-1px(rgba(7,17,27,0.1))
          padding-bottom:18px
          margin:18px
          &:last-child
            border-none()
            margin-bottom:0
          .icon
            flex:0 0 57px
            margin-right:10px
          .content
            margin-top:2px
            .name
              font-size:14px
              color:rgb(7,17,27)
              line-height:14px
              margin-bottom:8px
            .desc
            .extra
              font-size:10px
              color:rgb(147,153,159)
              line-height:10px
            .desc
              margin-bottom:8px
            .extra
              line-height:10px
              &.count
                margin-right:12px
            .price              
              font-weight:700
              line-height:24px
              .now-price
                color:rgb(240,20,20)
                font-size:14px
                margin-top:8px
              .old-price
                font-size:10px
                color:rgb(147,153,159)
                text-decoration: line-through
            .cartcontrol-wrapper
              position:absolute
              right:14px
              bottom:14px


</style>
