<template>
    <div class="bottom-bar">
        <div class="bottom-bar__wrapper">
            <div class="bottom-bar__left">
                <div class="bottom-bar__speed-btn btn">
                    <img src="~img/play.png" alt="">
                </div>
                <div class="bottom-bar__finish-btn btn">
                    <img src="~img/quick-play.png" alt="">
                </div>
            </div>
            <div class="bottom-bar__right">
                <div class="bottom-bar__actions actions">
                    <div class="actions__item">
                        <img src="~img/skill1.png" alt="">
                        <div class="actions__num">0</div>
                    </div>
                    <div class="actions__item">
                        <img src="~img/skill2.png" alt="">
                    </div>
                    <div class="actions__item disable">
                        <img src="~img/skill3.png" alt="">
                    </div>
                    <div class="actions__item disable">
                        <img src="~img/skill1.png" alt="">
                    </div>
                    <div class="actions__item disable">
                        <img src="~img/skill2.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FightBottom'
};
</script>
<style lang="scss">
.bottom-bar {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 50px;
  display: flex;
  &__wrapper {
    position: relative;
    display: flex;
    width: 100%;
  }
  &__left {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__speed-btn, &__finish-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #FFC814;
    cursor: pointer;
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #fff;
    img {
      width: 18px;
    }
  }
  &__right {
    width: 70%;
    // background: blue;
      .actions {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        &__item {
          width: 30px;
          height: 30px;
          background: #eee;
          border-radius: 6px;
          margin: 0 5px;
          border: 3px solid #eee;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0px 0px 8px 3px rgba(139,230,237,1);
          &.disable {
            box-shadow: none;
            img {
              filter: grayscale(100%);
            }
          }
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
  }
}
</style>
