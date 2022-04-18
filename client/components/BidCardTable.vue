<template>
  <fragment>
    <div class="table-container" id="bid-card-table">
      <p v-if="bids.length < 1" class="empty-table">No Bids</p>
      <table class="table" v-else>
        <tbody>
          <tr :key="bid.id" v-for="bid in bids">
            <td>
              <BidCard :listing="listing" :bid="bid" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </fragment>
</template>

<script>
import BidCard from './BidCard.vue';

export default {
  name: 'bid-card-table',
  props: {
    listing: {},
  },
  data() {
    //Data to populate component
    return {
      bids: [],
      listingID: new URLSearchParams(location.search.substring(1)).get('id'),
    };
  },
  mounted() {
    this.getBids();
  },
  components: {
    //Name of any components used on the page
    BidCard,
  },
  computed: {
    //Computed variables
  },
  methods: {
    //Methods for component
    async getBids() {
      const response = await fetch(`/api/bid?order=${this.listingID}`);
      const json = await response.json();
      this.bids = json.data;
    },
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
