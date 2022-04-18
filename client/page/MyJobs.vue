<template>
  <fragment>
    <div class="container">
      <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="success"
              >My Listings</b-button
            >
          </b-card-header>
          <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <JobListingsTable :jobs="jobs" />
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-2 variant="success"
              >My Bids</b-button
            >
          </b-card-header>
          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <JobListingsTable :jobs="bids" />
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </div>
  </fragment>
</template>

<script>
//Import statements including components used on the page
import JobListingsTable from '../components/JobListingsTable.vue';

export default {
  //Page name
  name: 'my-jobs-page',
  components: {
    JobListingsTable,
  },
  data() {
    return {
      //Any variables / data used on the page
      jobs: [],
      bids: [],
    };
  },

  mounted() {
    this.getJobs();
  },

  methods: {
    //Api calls to populate data
    async getJobs() {
      const response = await fetch('/api/listing/myjobs');
      const json = await response.json();
      this.jobs = json.posted;
      this.bids = json.bid;
    },
  },
};
</script>

<style>
/* Any styles specific to the page */
.addJob {
  margin-top: 20px;
}

.container {
  margin: 0px auto;
  padding: 0px;
  margin-top: 20px;
}
</style>
