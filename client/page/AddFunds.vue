<template>
  <fragment>
    <div class="container">
      <p>
        Your current balance is <strong>{{ formattedBalance }}</strong
        >.
      </p>
      <p>
        <b-input v-model="numInput" type="number" placeholder="5.00"></b-input>
      </p>
      <p>
        <b-button variant="success" @click="requestAddFunds"
          >Add funds</b-button
        >
      </p>
      <p v-if="errMsg != ''">{{ errMsg }}</p>
    </div>
  </fragment>
</template>

<script>
//Import statements including components used on the page

export default {
  //Page name
  name: 'app',

  components: {},

  data() {
    return {
      numInput: '',
      currentBalance: 0,
      errMsg: '',
      money: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
      csrfToken: '',
    };
  },

  mounted() {
    this.csrfToken = document.querySelector('meta[name=csrf-token]').content;

    fetch('/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.csrfToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.currentBalance = res.balance;
      });
  },

  methods: {
    requestAddFunds() {
      if (!/^\d+(\.\d+)?$/.test(this.numInput)) {
        this.errMsg = 'Result is not numeric.';
        return;
      }

      fetch('/api/addfunds', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken,
        },
        body: JSON.stringify({ amount: +this.numInput }),
      }).then((res) => {
        if (!res.ok) {
          this.errMsg = 'Something went wrong!';
        } else {
          this.errMsg = 'Added funds!';
          this.currentBalance += +this.numInput;
          this.numInput = '';
        }
      });
    },
  },

  computed: {
    formattedBalance() {
      return this.money.format(this.currentBalance);
    },
  },
};
</script>

<style>
/* Any styles specific to the page */

.container {
  margin: 0px auto;
  padding: 0px;
  margin-top: 20px;
}
</style>
