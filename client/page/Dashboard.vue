<template>
  <fragment>
    <div class="container">
      <b-button id="FAB" variant="success" block href="/listing/create"
        >Post a Listing</b-button
      >
      <b-input v-model="searchBox" placeholder="Search..." @input="searchName">
      </b-input>
      <b-select
        v-if="workTypes != []"
        v-model="workTypeBox"
        :options="workTypes"
        placeholder="Select type of work"
        @input="searchType"
      >
      </b-select>
      <JobListingsTable :jobs="filteredJobs" />
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
      typeFilteredJobs: [],
      filteredJobs: [],
      prevSearchBox: '',
      searchBox: '',
      workTypes: [],
      prevWorkType: 0,
      workTypeBox: null,
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

      fetch('/api/listing')
        .then((res) => res.json())
        .then((res) => {
          this.jobs = res.data;
          this.filteredJobs = this.typeFilteredJobs = this.jobs;
        });

      fetch('/api/worktypes')
        .then((res) => res.json())
        .then((res) => {
          this.workTypes = res;
        });
    },

    // set filteredJobs to something more useful.
    // called as part of searchName.
    // uses typeFilteredJobs to cache.
    searchType() {
      if (this.workTypeBox == null) {
        this.filteredJobs = this.jobs;
        return;
      }

      if (this.prevWorkType == this.workTypeBox) {
        this.filteredJobs = this.typeFilteredJobs;
        return;
      }

      this.typeFilteredJobs = this.filteredJobs = this.jobs.filter((x) => {
        return x.typeDetails.id == this.workTypeBox;
      });

      this.prevWorkType = this.workTypeBox;
    },

    // search for the string in the title and description
    searchName() {
      if (this.searchBox == this.prevSearchBox) return;

      this.searchType();

      this.filteredJobs = this.filteredJobs.filter((x) => {
        let a =
          new RegExp(this.searchBox, 'i').test(x.title) ||
          new RegExp(this.searchBox, 'i').test(x.description);

        console.log(a);
        return a;
      });

      this.prevSearchBox = this.searchBox;
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
