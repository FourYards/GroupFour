<template>
  <fragment>
    <body class="container">
      <div class="mb-3 img-container">
        <b-card
          img-src="https://placekitten.com/300/300"
          img-alt="Card image"
          img-left
          class="mb-3 image"
        ></b-card>
      </div>
      <b-card class="mb-3 b-card">
        <b-card-text> {{ job.title }}</b-card-text>
      </b-card>
      <b-card class="mb-3 b-card">
        <b-card-text> {{ job.description }} </b-card-text>
      </b-card>
      <b-card class="mb-3 b-card">
        <b-card-text> {{ job.customer }} </b-card-text>
      </b-card>
      <b-card class="mb-3 b-card">
        <b-card-text> {{ job.date }} </b-card-text>
      </b-card>
      <b-card class="mb-3 b-card">
        <form action="">
          <b-form-input
            size="lg"
            value="number"
            placeholder="Enter Bid Amount"
            class="mb-3"
          ></b-form-input>
          <b-button href="/dashboard" variant="primary">Place Bid</b-button>
        </form>
      </b-card>
    </body>
  </fragment>
</template>

<script>
//Import statements including components used on the page

export default {
  //Page name
  name: 'job-details',
  data() {
    return {
      job: {
        id: 1,
        title: 'Hard Job',
        customer: 'Wesley Perrett',
        description: 'This is a description for a job',
        date: 'March 23, 2021',
      },
    };
  },
  components: {
    //Name of any components used on the page
  },
  mounted() {
    // const csrfToken = document.querySelector('meta[name=csrf-token]').content;
    // fetch(
    //   `/api/listing?id=${new URLSearchParams(location.search.substring(1)).get(
    //     'id'
    //   )}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-CSRF-Token': csrfToken,
    //     },
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     this.job = res;
    //   });
  },
  methods: {
    //Api calls to populate data
  },
};
</script>

<style>
/* Any styles specific to the page */
.container {
  margin: 50px auto;
  padding: 0px;
}

.b-card {
  text-align: center;
}

.image {
  border: none;
}

.img-container {
  display: flex;
  justify-content: center;
}
</style>
