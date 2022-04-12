<template>
  <fragment>
    <body class="container">
      <b-card
        img-src="https://placekitten.com/300/300"
        img-alt="Card image"
        img-left
        class="mb-3 image"
      ></b-card>
      <b-card class="b-card">
        <b-card-text> Job Title </b-card-text>
      </b-card>
      <b-card class="b-card">
        <b-card-text> Job Details </b-card-text>
      </b-card>
      <b-card class="b-card">
        <b-card-text> Job Customer </b-card-text>
      </b-card>
      <b-card class="b-card">
        <b-card-text> {{ job.status }} </b-card-text>
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
      job: {},
    };
  },
  components: {
    //Name of any components used on the page
  },
  mounted() {
    const csrfToken = document.querySelector('meta[name=csrf-token]').content;

    fetch(
      `/api/listing?id=${new URLSearchParams(location.search.substring(1)).get(
        'id'
      )}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.job = res;
      });
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
  margin-bottom: 20px;
}

.image {
  border: none;
}
</style>
