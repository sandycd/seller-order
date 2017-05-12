<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" v-bind:src="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" v-bind:class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if=""seller.supports class="support-count" @click="showDetail">
				<span class="count">
					{{seller.supports.length}}个
					<i class="icon-keyboard_arrow_right"></i>
				</span>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
	    <div class="bgc" >
	    	<img :src="seller.avatar" width="100%" height="100%">
	    </div>
	    <transition name="fade">
	    <div class="detail" v-show="detailShow">
	    	<div class="clearfix detail-wrapper">
	    		<div class="detail-main">
	    	       <h1 class="name">{{seller.name}}</h1>
	    	       <div class="star-wrapper">
	    	         <star :size="48" :score="seller.score"></star>
	    	       </div>
	    	       <v-title content='优惠信息'></v-title>     
	    	        <ul  v-if="seller.supports" class="supports" >
	    	        	<li v-for="value in seller.supports" class="supports-item">
	    	        		<span class="icon" :class="classMap[value.type]"></span>
	    	        		<span class="item">{{value.description}}</span>
	    	        	</li>
	    	        </ul> 
	    	        <v-title content='商家信息'></v-title>  
	    	        <p v-if="seller.supports" class="seller-text">{{seller.bulletin}}</p>           
	    		</div>
	    	</div>
	    	<div class="detail-close" @click="hideDetail">
	    		<i class="icon-close"></i>
	    	</div>
	    </div>
	    </transition>
	</div>
</template>
<script >
import star from '../star/star.vue';
import title from './title.vue';
export default {
  name: 'header',
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    showDetail: function () {
      this.detailShow = true;
    },
    hideDetail: function () {
      this.detailShow = false;
    }
  },
  data: function () {
    return {
      detailShow: false
    };
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    'star': star,
    'v-title': title
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import"../../common/stylus/mixin.styl";
.header
  color:#fff
  overflow:hidden
  position:relative
  background-color:rgba(7,17,27,0.5) 
  .content-wrapper
    padding: 18px 20px 18px 20px
    position:relative
    .avatar
      display:inline-block
      vertical-align:top
      img
        border-radius:2px
    .content
      display:inline-block
      margin-left: 16px
      font-size:14px
      .title
        margin:2px 0 8px 0
        .brand
          display:inline-block
          vertical-align:top
          width:30px
          height:18px
          bg-image("brand")
          background-size:30px 18px
          background-repeat:no-repeat
        .name
          margin-left: 6px
          font-size: 16px
          line-height: 18px
          font-weight: bold	      
      .description
        margin-bottom: 10px
        line-height: 12px
        font-size: 12px
      .support
        .icon
          display: inline-block
          vertical-align:top
          width: 12px
          height: 12px
          margin-right: 4px
          background-size:12px 12px
          background-repeat:no-repeat
          &.decrease
            bg-image("decrease_1")
          &.discount
            bg-image("discount_1")
          &.guarantee
            bg-image("guarantee_1")
          &.invoice
            bg-image("invoice_1")
          &.special
            bg-image("special_1")
        .text
          line-height: 12px
          font-size: 10px
    .support-count
      position:absolute
      right:12px
      bottom:14px
      padding:0 8px
      height:24px
      line-height:24px
      border-radius:14px
      background-color: rgba(0,0,0,0.2)
      text-align:center
      cursor:pointer
      .count
        font-size:10px
        vertical-align:top
      .icon-keyboard_arrow_right
        margin-left:2px
        font-size:10px
        line-height:24px
  .bulletin-wrapper
    position:relative
    cursor:pointer
    height: 28px
    line-height: 28px
    padding: 0 22px 0 12px
    white-space:nowrap
    overflow:hidden
    text-overflow:ellipsis
    background-color:rgba(7,17,27,0.2)
    .bulletin-title
      display:inline-block
      vertical-align:top
      margin-top:10px
      width:22px
      height:12px
      bg-image("bulletin")
      background-size:22px 12px
      background-repeat:no-repeat
    .bulletin-text
      text-align:top
      font-size:10px
      margin:0 4px
    .icon-keyboard_arrow_right
      position:absolute
      font-size:10px
      top:8px
      right:12px
  .bgc
    position:absolute
    top:0
    left:0
    width:100%
    height:100%
    z-index:-1
    filter:blur(10px)
  .fade-enter-active
  .fade-leave-active 
    transition: opacity 1s     
  .fade-enter
  .fade-leave-active 
    opacity: 0      
  .detail
   position: fixed
   z-index: 99
   left: 0
   top: 0
   width:100%
   height:100%
   background-color:rgba(7.17.27.0.8)
   overflow:auto
   .detail-wrapper
     width:100%
     min-height:100%
     .detail-main
       margin-top:64px
       padding-bottom:64px
       .name
         line-height:16px
         text-align:center
       .star-wrapper
         margin-top:18px
         padding:2px auto
         text-align:center
        ul.supports	           
          margin:0 auto
          width:80%
          li.supports-item
            margin-bottom:12px
            padding:0px 12px
            font-size:0
            .item
              font-size:12px
              font-weight:200
              vertical-align:top
              color:rgb(255,255,255)
              line-height:12px
            .icon
              display:inline-block
               width:16px
               height:16px
               margin-right:6px
               vertical-align: top;
               background-size:16px
            .decrease
              bg-image("decrease_2")
            .discount
              bg-image("discount_2")
            .guarantee
              bg-image("guarantee_2")
            .invoice
              bg-image("invoice_2")
            .special
              bg-image("special_2")
        .seller-text
          width:80%
          margin:0 auto
          font-size:12px
          font-weight:200
          line-height:24px
   .detail-close
     position:relative
     width:32px
     height:32px
     margin:-64px auto 0 auto
     clear:both
     font-size:32px


</style>
