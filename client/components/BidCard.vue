<template>
  <fragment>
    <div>
      <b-card>
        <b-card-text>
          <table class="table">
            <tr>
              <td><strong>Name: </strong>{{ bid.bidder.realName }}</td>
            </tr>
            <tr>
              <td><strong>Amount: </strong>${{ bid.amount / 100 }}</td>
            </tr>
          </table>
        </b-card-text>
        <b-button
          v-if="newStatus"
          block
          @click="onSubmit()"
          type="submit"
          variant="success"
          >Approve</b-button
        >
      </b-card>
    </div>
  </fragment>
</template>

<script>
export default {
  name: 'bid-card',
  props: {
    //Data variables
    listing: {},
    bid: {},
  },
  data() {
    //Data to populate component
    return {};
  },
  computed: {
    //Computed variables
    newStatus() {
      return this.listing.workStatusDetails.description == 'New';
    },
  },
  methods: {
    //Methods for component
    onSubmit() {
      const url = `api/bid/accept/${this.bid.id}`;
      const csrfToken = document.querySelector('meta[name=csrf-token]').content;

      fetch(url, {
        method: 'PATCH',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      }).then(() => {
        window.location.reload();
      });
    },
  },
};
</script>

<style scoped></style>
