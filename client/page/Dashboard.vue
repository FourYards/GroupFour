<template>
  <fragment>
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

      for (let i in this.jobs) {
        switch (this.jobs[i].typeDetails.description) {
          case 'Lawn Mowing':
            this.jobs[i]['img'] = '/public/images/mowing.svg';
            break;
          case 'Raking':
            this.jobs[i]['img'] = '/public/images/rake.svg';
            break;
          case 'Snow Clearing':
            this.jobs[i]['img'] = '/public/images/shovel.svg';
            break;
          case 'Plant Pruning':
            this.jobs[i]['img'] = '/public/images/pruner.svg';
            break;
          case 'Housework':
            this.jobs[i]['img'] = '/public/images/house.svg';
            break;
          case 'Other':
            this.jobs[i]['img'] = '/public/images/misc.svg';
            break;
          default:
            this.jobs[i]['img'] = 'https://placekitten.com/300/300';
            break;
        }
      }
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

#FAB {
  margin-top: 20px;
}
</style>
