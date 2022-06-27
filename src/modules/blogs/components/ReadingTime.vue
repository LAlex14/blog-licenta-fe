<template>
  <span class="reading-time">
    {{ time }} {{ $t('minutes_read', time) }}
  </span>
</template>

<script>
export default {
  name: 'ReadingTime',
  data() {
    return {
      WORDS_PER_MINUTE: 250,
    };
  },
  props: {
    content: {
      default: '',
      type: String,
    },
  },
  computed: {
    time() {
      return Math.ceil(this.extractContent(this.content).split(/\s/g).length / this.WORDS_PER_MINUTE) || 0;
    },
  },
  methods: {
    extractContent(s) {
      let span = document.createElement('span');
      span.innerHTML = s;
      return span.textContent || span.innerText || '';
    }
  }
};
</script>
