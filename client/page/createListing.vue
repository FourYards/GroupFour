<template>
  <fragment>
    <body id="createListing" class="container">
      <div class="titleContainer">
        <h1>Post a Listing</h1>
      </div>

      <div>
        <b-form @submit="onSubmit">
          <b-form-group
            id="input-group-1"
            label="Job Type:"
            label-for="input-1"
          >
            <b-form-select id="input-1" v-model="form.job" :options="jobs">
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
                v-model="form.lengthinMinutes"
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
            </b-form-select>
          </b-form-group>

          <b-form-group
            id="input-group-6"
            label="Zip Code:"
            label-for="input-6"
          >
            <b-form-input
              id="input-6"
              v-model="form.zipCode"
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
              v-model="form.description"
              placeholder="Additional Information"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>

          <b-button block href="/dashboard" type="submit" variant="success"
            >Post</b-button
          >
        </b-form>
      </div>
    </body>
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
        typeofwork: null,
        lengthinMinutes: 0,
        streetAddress: null,
        city: null,
        state: null,
        zipCode: null,
        description: null,
      },
      jobs: null,
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
      if (!this.form.typeofwork) {
        errors.push('Job Type');
      }
      if (isNaN(this.form.lengthinMinutes) || this.form.lengthinMinutes < 0) {
        errors.push('Time Estimate');
      }
      if (!this.form.streetAddress) {
        errors.push('Street Address');
      }
      if (!this.form.city) {
        errors.push('City');
      }
      if (!this.form.state) {
        errors.push('State');
      }
      if (
        !this.form.zipCode ||
        this.form.zipCode.length != 5 ||
        isNaN(this.form.zipCode)
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
      const body = this.form;
      const csrfToken = document.querySelector('meta[name=csrf-token]').content;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(body),
      })
        .then(() => {
          window.location.replace('/myjobs');
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getJobTypes() {
      fetch('/api/worktypes')
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            json.unshift({ value: null, text: 'Select One' });
            this.jobs = json;
          }
        });
    },

    getUSStates() {
      fetch('/api/states')
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            for (let i of json) {
              i['text'] = i['id'];
              i['value'] = i['id'];
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
.titleContainer {
  display: flex;
  justify-content: center;
}

.container {
  margin: 0px auto;
  padding: 0px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
