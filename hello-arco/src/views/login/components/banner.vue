<template>
  <div class="banner">
    <div class="banner-inner">
      <a-carousel class="carousel" animation-name="fade">
        <a-carousel-item v-for="item in carouselItem" :key="item.slogan">
          <div :key="item.slogan" class="carousel-item">
            <div class="carousel-title">{{ item.slogan }}</div>
            <div class="carousel-sub-title">{{ item.subSlogan }}</div>
            <img class="carousel-image" :src="item.image" />
          </div>
        </a-carousel-item>
      </a-carousel>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import bannerImage1 from "@/assets/images/login-banner1.jpg"
import bannerImage2 from "@/assets/images/login-banner2.jpg"
import bannerImage3 from "@/assets/images/login-banner3.jpg"

const carouselItem = computed(() => [
  {
    slogan: "让法律服务触手可及",
    subSlogan: "围绕大数据、互联网、金融、提供数字化信息化的法律服务",
    image: bannerImage1,
  },
  {
    slogan: "数字仲裁",
    subSlogan: "构建全方位、数字化仲裁生态体系",
    image: bannerImage2,
  },
  {
    slogan: "不良资产处置",
    subSlogan: "以互联网仲裁为核心，一体化的在线纠纷解决方案",
    image: bannerImage3,
  },
])
</script>

<style lang="less" scoped>
.banner {
  display: flex;
  align-items: center;
  justify-content: center;

  &-inner {
    flex: 1;
    height: 100%;
  }
}

.carousel {
  height: 100%;

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  &-title {
    color: var(--color-fill-1);
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
  }

  &-sub-title {
    margin-top: 8px;
    color: var(--color-text-3);
    font-size: 14px;
    line-height: 22px;
  }

  &-image {
    width: 320px;
    margin-top: 30px;
  }
}
</style>
