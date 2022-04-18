<template>
  <fragment>
    <div class="container">
      <b-card
        bg-variant="info"
        text-variant="white"
        :header="authorName"
        class="overflow text-center"
      >
        <b-card-text
          ><strong>Review: </strong>{{ review.rating }}/5</b-card-text
        >
        <b-card-text
          ><strong>Comment: </strong> {{ review.comment }}</b-card-text
        >
      </b-card>
    </div>
  </fragment>
</template>

<script>
export default {
  name: 'review-card',
  props: {
    //Data variables
    review: {},
  },
  data() {
    //Data to populate component
    return {
      authorName: this.review.author.realName,
    };
  },
  computed: {
    //Computed variables
  },
  methods: {
    //Methods for component
  },
};
</script>

<style scoped>
.overflow {
  overflow: auto;
}
</style>
