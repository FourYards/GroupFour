<template>
  <fragment>
    <div id="createListing" align="center">
      <h1>Post a Listing</h1>

      <div id="postlisting">
        <b-form @submit="onSubmit">
          <b-form-group
            id="input-group-1"
            label="Job Type:"
            label-for="input-1"
          >
            <b-form-select id="input-1" v-model="form.job" :options="jobs">
              >
            </b-form-select>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Time Estimate:"
            label-for="input-2"
          >
            <b-input-group append="min">
              <b-form-input
                id="input-2"
                v-model="form.lengthMin"
                placeholder="0"
                type="number"
                min="0"
                required
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Street Address:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              v-model="form.streetAddress"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="City:" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="form.city"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-5" label="State:" label-for="input-5">
            <b-form-select id="input-5" v-model="form.state" :options="states">
              >
            </b-form-select>
          </b-form-group>

          <b-form-group
            id="input-group-6"
            label="Zip Code:"
            label-for="input-6"
          >
            <b-form-input
              id="input-6"
              v-model="form.zipcode"
              type="text"
              placeholder="00000"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-7"
            label="Description:"
            label-for="input-7"
          >
            <b-form-textarea
              id="input-7"
              v-model="form.desc"
              placeholder="Additional Information"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>

          <b-button type="submit" variant="primary">Post</b-button>
        </b-form>
      </div>
    </div>
  </fragment>
</template>

<script>
//Import statements including components used on the page

export default {
  //Page name
  name: 'createListing',
  components: {
    //Name of any components used on the page
  },
  data() {
    return {
      //Any variables / data used on the page
      form: {
        job: null,
        lengthMin: 0,
        streetAddress: null,
        city: null,
        state: null,
        zipcode: null,
        desc: null,
      },
      jobs: [
        { text: 'Select One', value: null },
        'Lawn Mowing',
        'Snow Shoveling',
      ],
      states: null,
    };
  },

  mounted() {
    this.getJobTypes();
    this.getUSStates();
  },

  methods: {
    //Api calls to populate data
    onSubmit(event) {
      // Avoid default form submission
      event.preventDefault();

      // Validate input
      let errors = [];
      if (!this.jobs.includes(this.form.job)) {
        errors.push('Job Type');
      }
      if (isNaN(this.form.lengthMin) || this.form.lengthMin < 0) {
        errors.push('Time Estimate');
      }
      if (!this.form.streetAddress) {
        errors.push('Street Address');
      }
      if (!this.form.city) {
        errors.push('City');
      }
      if (!this.states.includes(this.form.state)) {
        errors.push('State');
      }
      if (
        !this.form.zipcode ||
        this.form.zipcode.length != 5 ||
        isNaN(this.form.zipcode)
      ) {
        errors.push('Zip Code');
      }

      if (errors.length > 0) {
        let err = 'Incorrect entries for: ';
        for (let i of errors) {
          err += i + ', ';
        }
        alert(err);
        return;
      }

      // POST the listing to the database
      const url = '/api/listing';
      let body = this.form;
      body['target'] = '/dashboard';
      fetch(url, {
        method: 'POST',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(body),
      });
      window.location.reload(true);
    },

    getJobTypes() {},

    getUSStates() {
      fetch('/api/states')
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            for (let i of json) {
              i['text'] = i['id'];
            }
            json.unshift({ value: null, text: 'Select One' });
            this.states = json;
          }
        });
    },
  },
};
</script>

<style>
/* Any styles specific to the page */
h1 {
  padding: 20px;
}

#postlisting {
  align-content: center;
  padding-top: 3em;
  padding-left: 30em;
  padding-right: 30em;
}
</style>
