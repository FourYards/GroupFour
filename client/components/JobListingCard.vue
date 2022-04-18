<template>
  <fragment>
    <div class="mt-4">
      <b-card
        img-src="https://placekitten.com/300/300"
        img-alt="Card image"
        img-left
        class="mb-3 card"
        :class="{ 'card-withButtons': hasFooter }"
        @click="openDetails(job)"
      >
        <b-card-text>
          <table class="table">
            <tr>
              <td class="title">{{ job.title }}</td>
            </tr>
            <tr>
              <td>{{ job.description }}</td>
            </tr>
            <tr>
              <td><strong>Job:</strong> {{ job.typeDetails.description }}</td>
            </tr>
            <tr>
              <td><strong>Posted by:</strong> {{ job.creator.realName }}</td>
            </tr>
            <tr>
              <td>{{ job.status }}</td>
            </tr>
          </table>
        </b-card-text>
        <b-button
          variant="success"
          v-if="completable"
          @click="completeJob"
          size="sm"
          class="m-0"
          >Job Complete</b-button
        >
        <b-card-footer v-if="$scopedSlots.footer">
          <slot name="footer" :job="job"></slot>
        </b-card-footer>
      </b-card>
    </div>
  </fragment>
</template>

<script>
export default {
  name: 'job-listing-card',
  props: {
    job: {},
  },
  data() {
    //Data to populate component
    return {};
  },
  computed: {
    hasFooter: function () {
      return !!this.$scopedSlots.footer;
    },
    completable() {
      if (!window.context.user) {
        return false;
      }
      return (
        this.job.creator.id == window.context.user.id &&
        this.job.workStatusDetails.description === 'In Progress'
      );
    },
  },
  methods: {
    //Methods for component
    openDetails(job) {
      location.href = `/jobdetails?id=${job.id}`;
    },
    completeJob() {
      const url = '/api/listing/complete/' + this.job.id;
      const csrfToken = document.querySelector('meta[name=csrf-token]').content;
      fetch(url, {
        method: 'PATCH',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      }).then(() => {
        window.location.reload();
      });
    },
  },
};
</script>

<style scoped>
td {
  border: none;
}
.title {
  font-size: 3rem;
  padding: 0px;
  border-bottom: 1px solid;
}

.card {
  width: 100%;
  margin: 0px auto;
  height: 250px;
  overflow: auto;
}

.card-withButtons {
  height: 305px;
}

.card:hover {
  border: 1px solid #000;
  box-shadow: 0 0 0 2px #d0d0d0;
  cursor: pointer;
}
</style>
