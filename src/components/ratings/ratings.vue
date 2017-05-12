<template>
	<div class="ratings" ref="ratings">
      <div class="ratings-content">
	    <div class="overview">
		   <div class="overview-left">
		   	 <h1 class="score">{{seller.score}}</h1>
		   	 <div class="title">综合评分</div>
		   	 <div class="rank">高于周边商家{{seller.rankRate}}%</div>
		   	</div>
		 <div class="overview-right">
		 	<div class="score-wrapper">
		 		<span class="title">服务态度</span>
		 		<star :size="36" :score="seller.serviceScore" ></star>
		 		<span class="score">{{seller.serviceScore}}</span>
		 	</div>
		 	<div class="score-wrapper">
		 		<div class="title">商品评价</div>
		 		<star :size="36" :score="seller.foodScore" ></star>
		 		<span class="score">{{seller.foodScore}}</span>
		 	</div>
		 	<div class="delivery-wrapper" >
		 		<span class="title">送达时间</span>
		 		<span class="delivery">{{seller.deliveryTime}}分钟</span>
		 	</div>
		 </div>
	   </div>
	   <split></split>
	    <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings ="ratings" ref="ratingselect" @selectF="getF" @selectG="getG"></ratingselect>
	    <div class="rating-wrapper">
	    	<ul>
	    		<li v-show="needShow(rating.rateType,rating.text)" v-for ="rating in ratings" class="rating">
	    			<div class="avatar">
	    				<img :src="rating.avatar" width="36" height="36">
	    			</div>
	    			<div class="content">
	    				<h1 class="name">{{rating.username}}</h1>
	    				<div class="star-wrapper">
	    					<star :size="24" :score="rating.score" ></star>
	    					<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟</span>
	    				</div>
	    				<p class="text">{{rating.text}}</p>
	    				<div class="recommend" v-show="rating.recommend ||!rating.recommend.length">
	    					<span class="icon-thumb_up"></span>
	    					<span v-for="item in rating.recommend" class="item">{{item}}</span>
	    				</div>
	    				<div class="time">{{rating.rateTime | formatDate}}</div>
	    			</div>
	    		</li>
	    	</ul>
	    </div>
     </div>
	</div>
</template>
<script>
import star from '../star/star.vue';
import split from '../split/split';
import ratingselect from '../ratingSelect/ratingSelect';
import {formatDate} from '../../common/js/date';
import BScroll from 'better-scroll';
const ALL = 2;
const ERR_OK = 0;
export default {

  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    };
  },
  methods: {
    getF (type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    getG (con) {
      this.onlyContent = con;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return this.selectType === type;
      }
    }
  },
  created () {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body;
      if (response.err === ERR_OK) {
        this.ratings = response.data;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
    });
  },
  filters: {
    formatDate (time) {
      let date = new Date(time);
      return formatDate(date, 'YYYY-MM-DD hh:mm');
    }
  },
  components: {
    star,
    ratingselect,
    split
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
   .ratings
     position:absolute
     top:174px
     left:0
     bottom:0
     width:100%
     overflow:hidden
     .overview
       display:flex
       padding:18px 0
       .overview-left
         flex:0 0 137px
         width:137px
         border-right:1px solid rgba(7,17,27,0.2)
         text-align:center
         @media only screen and (max-width:350px)
           flex: 0 0 110px
           width:110px
         .score
           margin-bottom:8px
           line-height:28px
           font-size:24px
           color:rgb(255,153,0)
         .title
           margin-bottom:8px
           font-size:12px
           line-height:12px
           color:rgba(7,17,27,0.2)
         .rank
           padding-bottom:6px
           line-height:10px
           font-size:10px
           color:rgb(147,153,159)
 
       .overview-right
         flex:1
         padding-left:24px
         @media only screen and (max-width:350px)
           padding-left:6px
         .score-wrapper
           margin-bottom:8px
           line-height:18px
           font-size:0
           .title
             display:inline-block
             font-size:12px
             color:rgb(7,17,27)
           .star
             display:inline-block
             margin:0 12px
             vertical-align:top
             .star-item
               margin-right:8px
            .score
             display:inline-block
             vertical-align:top
             font-size:12px
             color:rgb(255,153,0)
          .delivery-wrapper
            font-size:0
            .title
              display:inline-block
              line-height:18px
              vertical-align:top
              font-size:12px
              color:rgb(7,17,27)
            .delivery
              line-height:18px
              margin-left: 12px
              font-size:12px
              color:rgb(147,155,153)
     .rating-wrapper
       padding:0 18px
       .rating
         display:flex
         padding:18px 0
         border-1px(rgba(7,17,27,0.1))
         .avatar
           flex: 0 0 28px
           width:28px
           margin-right:12px
           img
           border-radius:50%
         .content
           position:relative
           flex:1
           .name
             margin-bottom:4px
             line-height:12px
             font-size:10px
             color:rgb(7,17,27)
           .star-wrapper
             margin-bottom:6px
             font-size:0
             .star
               display:inline-block
               vertical-align:top
               margin-right:6px
             .delivery
               display:inline-block
               vertical-align:top
           .text
             margin-bottom:8px
             line-height:18px
             color:rgb(7,17,27)
             font-size:12px
           .recommend
             line-height:16px
             .icon-thumb_up
             .item
               display:inline-block
               margin:0 8px 4px 0
               font-size:9px
             .icon-thumb_up
               color:rgb(0,160,220)
             .item
               padding:0 6px
               border:1px solid rgba(7,17,27,0.1)
               border-radius:1px
               color:rgb(147,153,159)
               background:#fff
</style>
