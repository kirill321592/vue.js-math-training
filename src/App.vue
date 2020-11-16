<template>
  <div class="traning">
    <h1>Математический тренажер</h1>
    <h2>Уровень:{{ lvl + 1 }}</h2>
    <hr />
    <div class="progress">
      <div class="progress-bar" :style="progressWidth"></div>
    </div>
    <div class="box">
      <transition name="flip" mode="out-in">
        <AppStart v-if="state == 'start'" @onstart="onstart"> </AppStart>
        <AppMsg
          v-else-if="state == 'msg'"
          :type="messages.type"
          :text="messages.text"
          @onNext="onNext"
        >
        </AppMsg>
        <AppQst
          v-else-if="state == 'qst'"
          @success="onsQstSuccess"
          @error="onsQstError"
          :settings="levels[lvl]"
        >
        </AppQst>
        <AppResult
          v-else-if="state == 'result'"
          :stats="stats"
          :lvl="lvl"
          :levels="levels"
          @repeat="onstart"
          @nextLvl="onNextLvl"
        >
        </AppResult>
        <div v-else>404</div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: "start",
      messages: {
        type: "",
        text: ""
      },
      stats: {
        success: 0,
        error: 0
      },
      qstMax: 5,
      lvl: 0,
      levels: [
        {
          variants: 2,
          from: 10,
          to: 50,
          ange: 5
        },
        {
          variants: 4,
          from: 100,
          to: 200,
          range: 20
        },
        {
          variants: 6,
          from: 500,
          to: 900,
          range: 40
        }
      ]
    };
  },
  methods: {
    onstart() {
      this.state = "qst";
      this.stats.success = 0;
      this.stats.error = 0;
    },

    onsQstSuccess(msg) {
      this.state = "msg";
      this.messages.text = "Хорошая работа";
      this.messages.type = "success";
      this.stats.success++;
    },
    onsQstError(msg) {
      this.state = "msg";
      this.messages.text = msg;
      this.messages.type = "error";
      this.stats.error++;
    },
    onNext() {
      if (this.qstDone < this.qstMax) {
        this.state = "qst";
      } else {
        this.state = "result";
      }
    },
    onNextLvl() {
      this.lvl++;
      this.onstart();
    }
  },
  computed: {
    qstDone() {
      return this.stats.success + this.stats.error;
    },
    progressWidth() {
      return {
        width: (this.qstDone / this.qstMax) * 100 + "%"
      };
    }
  }
};
</script>

<style>
.traning {
  margin: 80px auto;
  max-width: 700px;
  text-align: center;
  border: 1px solid #666;
  padding: 20px;
}
.alert {
  padding-bottom: 0;
}
.box {
  background: #e9ecef;
}

.progress {
  margin-bottom: 18px;
}
.btn {
  color: #fff;
  margin-bottom: 17px;
}
.success {
  background: #90ee90;
}
.error {
  background: #ffdab9;
}
.flip-enter-active {
  animation: flipx 0.3s linear;
}
.flip-leave-active {
  animation: flipoutx 0.3s linear;
}
@keyframes flipx {
  from {
    transform: rotateX(90deg);
  }
  to {
    transform: rotateX(0deg);
  }
}
@keyframes flipoutx {
  from {
    transform: rotateX(0deg);
  }
  to {
    transform: rotateX(90deg);
  }
}
</style>
