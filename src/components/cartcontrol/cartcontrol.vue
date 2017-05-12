<template>
	<div class="cartcontrol">
	    <transition name="move">
		<div class="cart-decrease " v-show="foods.count > 0"  @click.stop.prevent="decreaseCart">
		  <span class="inner icon-remove_circle_outline"></span>
		</div>
		</transition>
		<div class="cart-count" v-show="foods.count > 0">{{foods.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
	</div>
</template>
<script>
  import Vue from 'vue';
  // var eventHub = new Vue();
  export default {
    props: {
      foods: {
        type: Object
      }
    },
    methods: {
      addCart () {
        if (!this.foods.count) {
          Vue.set(this.foods, 'count', 1);
        } else {
          this.foods.count ++;
        }
        this.$emit('cartAdd', event.target);
      },
      decreaseCart () {
        if (this.foods.count) {
          this.foods.count --;
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size:0
    .cart-decrease
      display:inline-block
      padding:6px
      opacity:1
      .inner
        display:inline-block
        font-size:24px
        line-height:24px
        color:rgb(0,160,220)
        transition:all 0.4s linear
      &.move-enter-active
      &.move-leave-active
        transition:all 0.4s linear
        tranform:translate3d(0,0,0)
        transform:rotate(180deg)
        .inner
          transform:rotate(90deg)
      &.move-enter
      &.move-leave
        opacity:0
        transition:all 0.4s linear
        transform:translate3d(24px,0,0)
        .inner
          transform:rotate(0deg)
    .cart-count
      display:inline-block
      font-size:10px
      line-height:24px
      vertical-align:top
      width:12px
      color:rgb(147,153,159)
      text-align:center
      padding-top:6px
    .cart-add
      display:inline-block
      font-size:24px
      line-height:24px
      color:rgb(0,160,220)
      padding:6px
</style>
