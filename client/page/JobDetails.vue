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
            ><strong>Posted By:</strong>
            <a :href="userURL">{{ job.creator.realName }}</a>
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
          <b-form @submit="onSubmit">
            <b-input-group prepend="$" size="lg" class="mb-3">
              <b-form-input
                size="lg"
                type="number"
                min="0.00"
                step="any"
                placeholder="Enter Bid Amount"
                class=""
                v-model="form.amount"
              ></b-form-input>
            </b-input-group>
            <b-button block type="submit" variant="success">Place Bid</b-button>
          </b-form>
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
      userURL: null,
      form: {
        amount: 0,
        order: new URLSearchParams(location.search.substring(1)).get('id'),
      },
    };
  },
  components: {
    //Name of any components used on the page
  },
  mounted() {
    this.getListing();
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      if (isNaN(this.form.amount) || !this.form.amount > 0) {
        alert('Improper Bid Amount');
        return;
      }

      if (!this.form.order) {
        alert('Unable to Find Listing. Please refresh and try again.');
        return;
      }

      // Convert the bid amount to cents
      this.form.amount *= 100;

      const url = '/api/bid';
      const body = this.form;
      const csrfToken = document.querySelector('meta[name=csrf-token]').content;
      fetch(url, {
        method: 'POST',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(body),
      }).then(() => {
        window.location.replace('/dashboard');
      });
    },
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
          this.userURL = '/user/' + res.creator.id;
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
