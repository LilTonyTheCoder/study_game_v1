<template>
    <div class="container">
        <div class="avatar">
            <img :src="require(`img/personages/${currentPersonage.avatar}/big-ava.png`)" alt="">
            <div class="skin-button">
                <img src="" alt="">
            </div>
        </div>
        <div class="skills">
            <div class="skills__name">
                Навык
            </div>
            <div class="skills__container">
                <div
                    v-for="(skill, index) in currentPersonage.skills"
                    :key="index"
                    class="skills__item"
                >
                    <img :src="require(`img/skills/${skill.name}.png`)" alt="">
                    <span>{{skill.lvl}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'AvatarAndSkills',
    props: {
        currentPersonage: {
            type: Object
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
}
.avatar {
    width: 100%;
    height: 100%;
    img {
        width: 100%;
    }
}
.skills {
    width: 100%;
    min-height: 40%;
    position: absolute;
    bottom: 10px;
    left: 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    flex-direction: column;
    &__name {
        padding: 2px 10px;
        background: #7A7A7A;
        color: #fff;
        border-radius: 6px 6px 0 0;
    }
    &__container {
        border: 1px solid #7A7A7A;
        width: 100%;
        display: flex;
        padding: 5px 0;
        flex-grow: 1;
        background: #3b3d3f;
        display: flex;
    }
    &__item {
        position: relative;
        cursor: pointer;
        margin-right: 1%;
        width: 50px;
        height: 50px;
        img {
            box-sizing: border-box;
            width: 50px;
            border: 2px solid #eee;
        }
        span {
            position: absolute;
            display: block;
            width: 20px;
            right: 3px;
            bottom: 3px;
            text-align: center;
            font-weight: bold;
        }
    }
}
</style>
