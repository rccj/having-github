<template>
  <div class="body">
    <div class="content">
      <div class="content__left">
        <div
          class="content__left__avatar"
          :style="{backgroundImage:`url('${repos[0].owner.avatar_url}')`}"
        ></div>
        <input
          type="text"
          class="content__left__name"
          v-model="userNew"
          @keydown.enter="searchUser"
        />
        <input type="button" value="Search" @click="searchUser" class="content__left__btn" />
        <div class="content__left__like">
          <div class="content__left__like__title">Liked</div>
          <div class="content__left__like__list">
            <div v-for="item in like" class="content__left__like__list__item">
              <a :href="item.html_url" target="_blank">{{item.full_name}}</a>
              <a href="#" @click.prevent="addLike(item)">X</a>
            </div>
          </div>
        </div>
      </div>

      <div class="content__right">
        <div class="content__right__nav">
          <div>Repositories</div>
        </div>

        <div class="repos">
          <div class="repos__item" v-for="item in repos">
            <div class="repos__item__left">
              <a :href="item.html_url">{{item.name}}</a>
              <div>{{item.description}}</div>
              <div>
                <div>{{item.language}}</div>
                <div>{{upDateTime(item.updated_at)}}</div>
              </div>
            </div>
            <div class="repos__item__right">
              <a @click="addLike(item)">
                <div v-if="!itemInLike(item)">Like</div>
                <div v-if="itemInLike(item)">Liked</div>
              </a>
              <a
                :href="`https://${item.owner.login}.github.io/${item.name}`"
                target="_blank"
                rel="noopener noreferrer"
              >Demo</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "home",
  data() {
    return {
      userNew: "rccj",
      page: 6
    };
  },
  computed: {
    ...mapState(["userInit", "repos", "like"]),
    ...mapGetters(["itemInLike"])
  },
  watch: {
    userNew() {
      this.setUser(this.userNew);
      console.log(this.userInit);
    }
  },
  methods: {
    ...mapActions(["getRepos"]),
    ...mapMutations(["setLike", "addLike", "setUser"]),
    searchUser() {
      this.getRepos(6);
    },
    upDateTime(time) {
      return time.substring(0, 10);
    },
    handleScroll(e) {
      let wScrollY = window.scrollY; // 當前滾動條位置
      let wInnerH = window.innerHeight; // 裝置視窗的高度（不會變）
      let bScrollH = document.body.scrollHeight; // 滾動條總高度

      if (wScrollY + wInnerH >= bScrollH) {
        this.page += 6;
        this.getRepos(this.page);
      }
    }
  },
  created() {
    this.getRepos(6);
    this.setLike();
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.body {
  max-width: 1280px;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  a,
  a:link,
  a:visited {
    color: black;
    background-color: white;
    text-decoration: none;
  }
  a:hover {
    color: #f4ab25;
    text-decoration: underline;
  }
  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    &__left {
      width: 30%;
      display: flex;
      flex-direction: column;
      &__avatar {
        width: 100%;
        height: 300px;
        background: {
          size: cover;
          position: center;
          repeat: no-repeat;
        }
      }
      &__name {
        font-size: 1.6em;
        font-weight: 700;
        outline: none;
        height: 50px;
      }
      &__btn {
        font-size: 1.3em;
        font-weight: 500;
        background-color: white;
        border: 1px solid black;
        outline: none;
      }
      &__btn:hover {
        background-color: #0366d6;
        color: white;
      }
      &__like {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        &__title {
          margin: 20px 0;
          font-size: 1.3em;
          font-weight: 600;
        }
        &__list {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          &__item {
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
    &__right {
      width: 60%;
      padding: 0 50px;
      &__nav {
        width: 100%;
        height: 80px;
      }
      &__nav > * {
        font-size: 2em;
        font-weight: 700;
      }
      .repos {
        &__item {
          width: 100%;
          height: 70px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e1e4e8;
          align-items: center;
          padding: 25px 0;
          &__left {
            display: flex;
            flex-direction: column;
          }
          &__left > * {
            text-align: left;
          }
          &__left > :nth-child(1) {
            font-size: 1.5em;
            font-weight: 600;
            color: #0366d6;
          }
          &__left > :nth-child(2) {
            font-size: 1em;
          }
          &__left > :nth-child(3) {
            display: flex;
            & > :first-child {
              margin-right: 10px;
              font-weight: 500;
              background-color: rgb(250, 241, 224);
            }
          }
          // &__right {
          // }
        }
      }
    }
  }
  @media screen and(max-width:768px ) {
    .content {
      flex-direction: column;
      align-items: center;
      &__left {
        width: 60%;
        margin-bottom: 50px;
      }
      &__right {
        width: 100%;
        padding: 0;
        &__nav {
          width: 100%;
          height: 40px;
        }
      }
    }
  }
    @media screen and(max-width:375px ) {
    .content {
      &__left {
        width: 100%;
      }
      &__right {
        &__nav {
          height: 30px;
        }
      }
    }
  }
}
</style>
