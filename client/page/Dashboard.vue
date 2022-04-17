<template>
  <fragment>
    <div class="hero">
      <h1>Welcome to Four Yards!</h1>
      <p class="hero-paragraph">
        We are the premiere online yard work marketplace where anyone can find
        yard work to get paid for, or can post a listing for yard work that you
        need to have done.
      </p>
      <p class="hero-paragraph">
        Since March 2021, we have been the leading online yard work marketplace.
        We have since expanded to provide a place to find other forms of outdoor
        work for all seasons after the initial success with yard work in the
        four neighborhoods we initially launched in.
      </p>
    </div>
    <div class="container">
      <b-button id="FAB" variant="success" block href="/listing/create"
        >Post a Listing</b-button
      >
      <JobListingsTable :jobs="jobs" />
    </div>
  </fragment>
</template>

<script>
//Import statements including components used on the page
import JobListingsTable from '../components/JobListingsTable.vue';

export default {
  //Page name
  name: 'dashboard-page',
  components: {
    //Name of any components used on the page
    JobListingsTable,
  },
  data() {
    return {
      //Any variables / data used on the page
      jobs: [],
    };
  },

  mounted() {
    this.getJobs();
  },

  methods: {
    //Api calls to populate data
    async getJobs() {
      // [{
      //     id: 1,
      //     title: 'Hard Job',
      //     customer: 'Wesley Perrett',
      //     description: 'This is a description for a job',
      //     date: 'March 23, 2021',
      //   },]

      const response = await fetch('/api/listing');
      this.jobs = await response.json();
      this.jobs = this.jobs.data;
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
}

.hero-paragraph {
  font-size: medium;
}

#FAB {
  margin-top: 20px;
}
</style>
