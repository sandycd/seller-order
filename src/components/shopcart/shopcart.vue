<template>
	<div class="shopcart">
		<div class="content" @click="toogleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight': totalCount > 0}">
						<span class="icon-shopping_cart"></span>
					</div>
					<div class="num" v-show = "totalCount > 0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费 ￥{{deliveryPrice}} 元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">{{payDesc}}</div>
			</div>

		</div>
    <div class="ball-container">
    <transition name="drop" v-for="ball in balls" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div v-show="ball.show" class="ball">
        <div class="inner inner-hook"></div>
      </div>
    </transition>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <div class="title">购物车</div>
          <div class="empty">清空</div>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="foods in selectFoods">
              <span class="name">{{foods.name}}</span>
              <div class="price">
                <span>￥{{foods.price*foods.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :foods="foods"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
</div>
</template>
<script>
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol';
  export default{
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBall: [],
        fold: true
      };
    },
    methods: {
      drop (event) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.event = event;
            this.dropBall.push(ball);
            return;
          }
        }
      },
      beforeEnter (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.event.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
        done();
      },
      afterEnter (el) {
        let ball = this.dropBall.shift();
        if (ball) {
          ball.show = false;
        }
      },
      toogleList () {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      }
    },
    components: {
      cartcontrol
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((foods) => {
          total += foods.price * foods.count;
        });
        return total;
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((foods) => {
          count += foods.count;
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差${diff}起送`;
        } else {
          return `去结算`;
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
   @import"../../common/stylus/mixin.styl";
  .shopcart
    position:fixed
    left: 0
    bottom: 0
    z-index:200
    width:100%
    height:48px
    background:#000
    .content 
      display:flex
      background:#141d27
      color:rgba(255,255,255,0.4)
      .content-left
        flex:1
        .logo-wrapper
          display:inline-block
          vertical-align:top
          position:relative
          top:-10px
          margin:0 12px
          padding:6px
          width:56px
          height:56px
          box-sizing:border-box
          border-radius:50%
          background:#141d27
          .num
            position:absolute
            top: 0
            right:0
            width:24px
            height:16px
            line-height:16px
            text-align:center
            border-radius:16px
            font-size:9px
            font-weight:700
            color:#fff
            background:rgb(240,20,20)
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
          .logo
            width:100%
            height:100%
            border-radius:50%
            background:#2b343c
            text-align:center
            .icon-shopping_cart
              font-size:24px
              line-height:44px
              color:#80858a
            &.highlight
              background:rgb(0,160,220) 
              .icon-shopping_cart
                color:#fff

        .price
          display:inline-block
          vertical-align:top
          line-height:24px
          margin-top:12px
          padding-right:12px
          box-sizing:border-box
          border-right:1px solid rgba(255,255,255,0.1)
          font-size:16px
          font-weight:700
          &.highlight
            color:#fff
        .desc
          display:inline-block
          vertical-align:top
          line-height:24px
          margin:12px 0 0 12px
          font-size:10px
      .content-right
        flex: 0 0 105px
        width:105px
        .pay
          height:48px
          line-height:48px
          text-align:center
          font-size:12px
          font-weight:700
          &.enough
            background:#00b43c
            color:#fff
          &.not-enough
            background:#2b333b
    .ball-container
      .ball
        position:fixed
        left: 32px
        bottom:22px
        z-index:200
        transition:all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)                  
        .inner
          width:16px
          height:16px
          background:rgb(0,160,220)
          border-radius:50%
          transition:all 0.4s
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width:100%
      transition:all 0.5s
      transform:translate3d(0,-100%,0)
      &.fold-enter
      &.fold-leave
        transform:translate3d(0,0,0)
      .list-header
        height:40px
        line-height:40px
        padding:0 18px 
        background:#f3f5f7
        border-bottom:1px solid rgba(7,17,27,0.1)
        .title
          float:left
          font-size:14px
          color:rgb(7,17,27)
        .empty
          float:right 
          font-size:12px
          color:rgb(0, 160, 220) 
      .list-content
        padding:0 18px
        max-height:217px
        background:#fff
        overflow:hidden
        .food
          position:relative
          padding:12px 0
          box-sizing:border-box
          border-1px(rgba(7,17,27,0.1))
        .name
          line-height:24px
          font-size:14px
          color:rgb(7,17,27)
        .price
          position:absolute
          right:90px
          bottom:12px
          line-height:24px
          font-size:14px
          font-weight:700
          color:rgb(240,20,20)
        .cartcontrol-wrapper
          position:absolute
          right:0
          bottom:6px 

</style>
