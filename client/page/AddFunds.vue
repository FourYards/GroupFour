<template>
  <fragment>
    <body class="container">
      <p>Your current balance is <strong>{{ formattedBalance }}</strong>.</p>
      <p><b-input v-model="numInput" type="number" placeholder="420.69"></b-input></p>
      <p><b-button @click="requestAddFunds">Add funds</b-button></p>
      <p v-if="errMsg != ''">{{ errMsg }}</p>
    </body>
  </fragment>
</template>

<script>
//Import statements including components used on the page

export default {
  //Page name
  name: 'app',

  components: {
  },

  data() {
    return {
      numInput: "",
      currentBalance: 0,
      errMsg: "",
      money: new Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: 'USD',
      }),
    };
  },

  mounted() {
    console.log("query api/balance");
    console.log("set currentBalance = balance");
  },

  methods: {
    requestAddFunds() {
      console.log("request API to add funds");
      if (/^\d+(\.\d+)?$/.test(this.numInput)) {
        this.currentBalance += +(this.numInput);
      } else {
        this.errMsg = "Result is not numeric";
      }
      this.numInput = "";
    }
  },

  computed: {
    formattedBalance() {
      return this.money.format(this.currentBalance);
    }
  }
};
</script>

<style>
/* Any styles specific to the page */
</style>
