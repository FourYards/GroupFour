<template>
  <fragment>
    <div class="container">
      <div v-if="job === null" class="titleContainer center">
        <h1>Job not Found</h1>
      </div>

      <div v-else>
        <div class="mb-3 img-container">
          <b-card
            img-src="https://placekitten.com/300/300"
            img-alt="Card image"
            img-left
            class="mb-3 image"
          ></b-card>
        </div>
        <b-card-text class="header text-center"> {{ job.title }}</b-card-text>
        <b-card class="mb-3 b-card">
          <b-card-text
            ><strong>Description:</strong> {{ job.description }}
          </b-card-text>
        </b-card>
        <b-card class="mb-3 b-card">
          <b-card-text
            ><strong>Posted By:</strong> {{ job.creator.realName }}
          </b-card-text>
        </b-card>
        <b-card class="mb-3 b-card">
          <b-card-text>
            <b-button variant="outline-primary" :href="reviewURL"
              >Review User</b-button
            >
          </b-card-text>
        </b-card>
        <b-card class="mb-3 b-card">
          <b-card-text>
            <strong>Estimated Time:</strong>
            {{ job.lengthInMinutes }} min</b-card-text
          >
        </b-card>
        <b-card class="mb-3 b-card">
          <b-card-text>
            <strong>Job Type:</strong> {{ job.typeDetails.description }}
          </b-card-text>
        </b-card>
        <b-card class="mb-3 b-card">
          <b-card-text>
            <strong>Status:</strong> {{ job.workStatusDetails.description }}
          </b-card-text>
        </b-card>
        <b-card class="mb-3 b-card">
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
      job: null,
    };
  },
  computed: {
    reviewURL() {
      return '/addReview/' + this.job.creator.id;
    },
  },
  components: {
    //Name of any components used on the page
  },
  mounted() {
    this.getListing();
  },
  methods: {
    //Api calls to populate data
    getListing() {
      fetch(
        `/api/listing?id=${new URLSearchParams(
          location.search.substring(1)
        ).get('id')}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.job = res;
        })
        .catch((err) => {
          console.log('error while fetching listing: ' + err);
        });
    },
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
