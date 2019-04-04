<template>
    <div class="item" :class="{'item--disable' : disable}">
        {{name}}
    </div>
</template>

<script>
export default {
    name: 'MenuSection',
    props: {
        name: {
            type: String,
            default: 'Раздел'
        },
        disable: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped lang="scss">
.item {
    background: #f4ebdc;
    padding: 5px 20px;
    margin: 5px 20px;
    font-size: 22px;
    color: #402305;
    border: 1px solid #402305;
    border-radius: 10px;
    font-weight: bold;
    position: relative;
    cursor: pointer;
    &--disable {
        text-decoration: line-through;
        background: #d0d0d0;
        color: #9c9c9c;
        &::before, &::after {
            display: none !important;
        }
        &:hover {
            transform: scale(1) !important;
            cursor: default;
        }
    }
    transition: 0.3s;
    &::before, &::after {
      display: block;
      content: "";
      position: absolute;
      left: 0;
      top: 14px;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 10px solid #ffb002;
      // background: #ffb002;
    }
    &::after {
      right: 0;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 0;
      border-right: 10px solid #ffb002;
    }
    &:hover {
      transform: scale(1.2);
    }
}
</style>
