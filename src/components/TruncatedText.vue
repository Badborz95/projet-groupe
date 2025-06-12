<template>
  <div>
    <p>{{ truncatedText }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    maxLength: {
      type: Number,
      default: 100 // nombre maximum de caractères avant troncature
    }
  },
  computed: {
    truncatedText() {
      if (this.text.length <= this.maxLength) {
        return this.text;
      }
      return this.text.slice(0, this.maxLength).trim() + '...';
    }
  }
};
</script>