<template>
  <div class="alert">
    <h2>Ошибки:{{ stats.error }}</h2>
    <hr />
    <button class="btn btn-primary" @click="$emit('repeat')">
      Повторить
    </button>
    <button
      class="btn btn-warning"
      @click="$emit('nextLvl')"
      v-if="lvl < levels.length - 1"
    >
      След. уровень
    </button>
  </div>
</template>

<script>
export default {
  props: ["stats", "lvl", "levels"]
};
</script>

