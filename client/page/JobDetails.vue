<template>
  <fragment>
    <div class="container">
      <div class="mb-3 img-container">
        <b-card
          img-src="https://placekitten.com/300/300"
          img-alt="Card image"
          img-left
          class="mb-3 image"
        ></b-card>
      </div>
      <b-card class="mb-3 b-card">
        <b-card-text class="header"> {{ job.title }}</b-card-text>
        <b-card-text>
          <strong>Description:</strong> {{ job.description }}
        </b-card-text>
        <b-card-text>
          <strong>Posted By:</strong> {{ job.realname }}
        </b-card-text>
        <b-card-text>
          <strong>Posted Date:</strong> {{ job.date }}
        </b-card-text>
        <b-card-text>
          <strong>Estimated Time: </strong>
          {{ job.lengthInMinutes }} Min</b-card-text
        >
        <form action="">
          <b-form-input
            size="lg"
            placeholder="Enter Bid Amount"
            class="mb-3"
          ></b-form-input>
          <b-button href="/dashboard" block variant="success"
            >Place Bid</b-button
          >
        </form>
      </b-card>
    </div>
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
}

.image {
  border: none;
}

.img-container {
  display: flex;
  justify-content: center;
}

.header {
  font-size: 22px;
  font-weight: bold;
  border-bottom: 1px solid;
}
</style>
