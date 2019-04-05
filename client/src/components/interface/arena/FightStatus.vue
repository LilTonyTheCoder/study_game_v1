<template>
  <div class="fight-status-popup hide">
    <div class="shadow"></div>
      <div class="fight-status-popup__img">
        <!-- <img src="" alt=""> -->
      </div>
      <div class="fight-status-popup__text">
        В бой!
      </div>
      <div class="fight-status-popup__reward-table reward-table">
        <div class="reward-table__reward str">
          <div class="reward-table__title">
            Награда
          </div>
          <div class="reward-table__content">
            <div class="reward-table__item">
              <div class="img">
                <img src="~img/gold-bar.png" alt="gold">
              </div>
              <div class="num">20</div>
            </div>
          </div>
        </div>
        <div class="reward-table__bonus str">
          <div class="reward-table__title">
            Бонус
          </div>
          <div class="reward-table__content">
            <div class="reward-table__item">
              <div class="img">
                <img src="~img/gold-bar.png" alt="gold">
              </div>
              <div class="num">20</div>
            </div>
            <div class="reward-table__item">
              <div class="img">
                <img src="~img/platina-bar.png" alt="platinum">
              </div>
              <div class="num">0</div>
            </div>
            <div class="reward-table__item">
              <div class="img">
                <img src="~img/fist.png" alt="fists">
              </div>
              <div class="num">0</div>
            </div>
            <div class="reward-table__item">
              <div class="img">
                <img src="~img/jar2.png" alt="blue sugar">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    name: 'FightStatus',
  }
</script>
<style lang="scss">
.shadow {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.8);
}
.fight-status-popup {
  position: absolute;
  width: 100%;
  height: 80%;
  top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__text {
    font-size: 64px;
    color: #fff;
    text-shadow: #474747 3px 5px 2px, 0px 0px 2px rgba(28,110,164,0);
  }
  .reward-table {
    display: flex;
    flex-direction: column;
    color: #fff;
    border-radius: 6px;
    border: 2px solid #fff;
    padding: 10px 20px;
    width: 70%;
    .str {
      display: flex;
      border-bottom: 1px solid #fff;
      margin-bottom: 15px;
      &:nth-child(2) {
        border-bottom: none;
      }
    }
    &__title {
      width: 30%;
      margin-bottom: 0;
    }
    &__content {
      width: 70%;
      display: flex;
      justify-content: center;
      // align-items: center;
    }
    &__item {
      display: flex;
      margin-right: 25px;
      .img {
        margin-right: 7px;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>