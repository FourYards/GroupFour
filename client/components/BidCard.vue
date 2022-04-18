<template>
  <fragment>
    <div>
      <b-card>
        <b-card-text>
          <table class="table">
            <tr>
              <td><strong>Name: </strong> {{ bid.bidder.realName }}</td>
            </tr>
            <tr>
              <td><strong>Amount: </strong> {{ bid.amount }}</td>
            </tr>
          </table>
        </b-card-text>
        <b-button block type="submit" variant="success">Approve</b-button>
      </b-card>
    </div>
  </fragment>
</template>

<script>
export default {
  name: 'bid-card',
  props: {
    //Data variables
    bid: {},
  },
  data() {
    //Data to populate component
    return {};
  },
  computed: {
    //Computed variables
  },
  methods: {
    //Methods for component
  },
};
</script>

<style scoped></style>
