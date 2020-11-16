<template>
  <div class="alert">
    <h3>{{ x }} + {{ y }} = ?</h3>
    <hr />
    <div class="btn-row">
      <button
        class="btn btn-primary"
        v-for="number in answer"
        :key="number"
        @click="onAnswer(number)"
      >
        {{ number }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["settings"],
  data() {
    return {
      x: mtrand(this.settings.from, this.settings.to),
      y: mtrand(this.settings.from, this.settings.to)
    };
  },
  computed: {
    good() {
      return this.x + this.y;
    },
    answer() {
      let res = [this.good];
      while (res.length < this.settings.variants) {
        const num = mtrand(
          this.good - this.settings.range,
          this.good + this.settings.range
        );
        if (res.indexOf(num) === -1) {
          res.push(num);
        }
      }
      return res.sort(function() {
        return Math.random() > 0.5;
      });
    }
  },
  methods: {
    onAnswer(num) {
      if (num == this.good) {
        this.$emit("success");
      } else {
        this.$emit("error", `${this.x} + ${this.y} = ${this.good}!`);
      }
    }
  }
};
const mtrand = (min, max) => {
  const nmb = max - min;
  return Math.floor(Math.random() * (nmb + 1)) + min;
};
</script>

<style scoped>
.btn-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0 0 -30px;
}
.btn {
  margin-left: 30px;
}
h3 {
  font-size: 30px;
  color: #666;
}
</style>

