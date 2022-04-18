<template>
  <fragment>
    <div class="table-container">
      <p v-if="reviews.length < 1" class="empty-table">No Reviews</p>
      <table class="table" v-else>
        <tbody>
          <tr :key="review.id" v-for="review in reviews">
            <td>
              <ReviewCard :review="review" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </fragment>
</template>

<script>
import ReviewCard from './ReviewCard.vue';

export default {
  name: 'review-card-table',
  props: {
    reviews: Array,
  },
  data() {
    //Data to populate component
    return {};
  },
  components: {
    //Name of any components used on the page
    ReviewCard,
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
.table-container {
  width: 100%;
  margin: 0px auto;
  padding: 0px;
}
.table {
  width: 100%;
  margin: 0px auto;
  padding: 0px;
  text-align: center;
  border-collapse: collapse;
}
td {
  border: none;
  padding: 0px;
}
button {
  margin: 0 0.5rem 0 0;
}

input {
  margin: 0;
}

.empty-table {
  text-align: center;
}
</style>
