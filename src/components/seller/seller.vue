<template>
	<div class="sellers"  ref="sellerlet">
	  <div class="test">
	  	<div class="sellers-wrapper">
			<h1 class="title">{{seller.name}}</h1>
			<div class="star-wrapper">
			  <star :size="36" :score="seller.score"></star>
              <div class="text">({{seller.ratingCount}})</div>
              <div class="text">月售{{seller.sellCount}}单</div>
			</div>
		</div>
		<div class="overview">
			<div class="overview-top">
			<div class="title">起送价</div>
			  <div class="text">
				<span class="number">{{seller.minPrice}}</span>
				<span>元</span>
			  </div>			
			</div>
		   <div class="overview-top">
			<div class="title">商家配送</div>
			  <div class="text">
				<span class="number">{{seller.deliveryPrice}}</span>
				<span>元</span>
			  </div>			
			</div>
		  <div class="overview-top">
			<div class="title">平均配送时间</div>
			  <div class="text">
				<span class="number">{{seller.deliveryTime}}</span>
				<span>分钟</span>
			  </div>			
			</div>
		</div>
		<split></split>
		<div class="bulletin">
			<h1 class="title">公告与活动</h1>
			<div class="text">{{seller.bulletin}}</div>
			<div class="supports-wrapper" >
				<ul v-if="seller.supports" class="supports">
					<li v-for="item in seller.supports" class="support">
	    	           <span class="icon" :class="classMap[item.type]"></span>
	    	           <span class="item">{{item.description}}</span>
					</li>
				</ul>
			</div>
		</div>
		<split></split>
		<div class="pics">
			<h1 class="title">商家实景</h1>
			<div class="picif" ref="picif">
			  <ul class="picsr"ref="picsr">
				<li v-for="pic in seller.pics" class="imgage" ><img :src="pic" alt="" width="120" height="90"></li>
			  </ul>
			</div>
		</div>
		<split></split>
		<div class="descs">
			<h1 class="title">商家信息</h1>
			<ul>
				<li v-for="info in seller.infos" class="info">{{info}}</li>
			</ul>
		</div>
	  </div>		
	</div>
</template>
<script>
  import star from '../star/star';
  import BScroll from 'better-scroll';
  import split from '../split/split';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split
    },
    watch: {
      'seller' () {
        this._initScroll();
        this._dropScroll();
      }
    },
    methods: {
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.sellerlet, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _dropScroll () {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length;
          this.$refs.picsr.style.width = width + 'px';
          this.$nextTick(() => {
            this.picScroll = new BScroll(this.$refs.picif, {
              click: true,
              scrollX: true
            });
          });
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        this._initScroll();
        this._dropScroll();
      });
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .sellers
    position:absolute
    top:174px
    bottom:0
    left:0
    width:100%
    overflow:hidden
    .sellers-wrapper
      margin:18px
      padding-bottom:18px
      border-1px(rgba(7,17,27,0.1))
      .title
        font-size:14px
        line-height:14px
        color:rgb(7,17,27)
        margin-bottom:8px
      .star-wrapper
        display:inline-block
        .star
          display:inline-block
          vertical-align:top
          margin-right:8px
        .text
          display:inline-block
          vertical-align:top
          margin-right:12px
          font-size:10px
          line-height:18px
          color:rgb(77,85,93)
    .overview
      display:flex
      margin:18px 0
      .overview-top
        flex:1
        text-align:center
        border-right:1px solid rgba(7,17,27,0.1)
        .title
          font-size:10px
          color:rgb(147,153,159)
          line-height:10px
          margin-bottom:4px
        .text
          font-weight:200
          color:rgb(7,17,27)
          line-height:24px
          font-size:10px
          .number
            font-size:24px
    .bulletin
      margin:18px
      .title
        font-size:14px
        line-height:14px
        color:rgb(7,17,27)
        font-weight:700
        margin-bottom:8px
      .text
        margin:0 12px 
        padding-bottom:16px
        font-size:12px
        font-weight:200
        color:rgb(240,20,20)
        line-height:24px
      .supports-wrapper
        .supports
          .support
            border-top:1px solid rgba(7,17,27,0.1)
            padding:16px 12px
            font-size:0
            .item
              font-size:12px
              font-weight:200
              vertical-align:top
              line-height:12px
              color:rgb(7,17,27)
            .icon
              display:inline-block
              width:16px
              height:16px
              margin-right:6px
              vertical-align: top;
              background-size:16px
              &.decrease
                bg-image("decrease_2")
              &.discount
                bg-image("discount_2")
              &.guarantee
                bg-image("guarantee_2")
              &.invoice
                bg-image("invoice_2")
              &.special
                bg-image("special_2")
    .pics
      margin:18px
      .title
        font-size:14px
        line-height:12px
        color:rgb(7,17,27)
        font-weight:700
        margin-bottom:8px
      ul
        width:100%
        height:90px
        overflow:hidden
        .imgage
          display:inline-block
          padding-right:6px
    .descs
      margin:18px
      .title
        font-size:14px
        line-height:12px
        color:rgb(7,17,27)
        font-weight:700
        margin-bottom:8px
      .info
        font-size:12px
        color:rgb(7,17,27)
        line-height:16px
        padding:16px 12px
        border-top:1px solid rgba(7,17,27,0.1)

</style>
