<template>
  <fragment>
    <div class="container">
      <div class="titleContainer">
        <h1>{{ realName }} Profile</h1>
      </div>
      <p><strong>Email Address: </strong> {{ emailAddress }}</p>
      <p><strong>Name:</strong> {{ realName }}</p>
      <p><strong>Phone Number:</strong> {{ formattedPhoneNumber }}</p>

      <div id="updateForm" v-if="isOwner">
        <p><strong>Preferred Display Type:</strong> {{ displayType }}</p>
        <p>
          <strong>Update Email Address:</strong>
          <b-input
            v-model="emailAddressBox"
            :placeholder="emailAddress"
          ></b-input>
        </p>
        <p>
          <strong>Update Name:</strong>
          <b-input v-model="realNameBox" :placeholder="realName"></b-input>
        </p>
        <p>
          <strong>Update Phone Number:</strong>
          <b-input
            v-model="phoneNumberBox"
            type="tel"
            :placeholder="formattedPhoneNumber"
          ></b-input>
        </p>
        <p>
          <strong>Update Preferred Display Type:</strong>
          <b-select v-model="displayTypeBox" :options="displayTypes"></b-select>
        </p>
        <p>
          <strong>Update Password:</strong>
          <b-input
            v-model="password1"
            type="password"
            placeholder="Enter password"
          ></b-input>
          <b-input
            v-model="password2"
            type="password"
            placeholder="Re-enter password"
          ></b-input>
        </p>
        <div class="buttonContainer">
          <p>
            <b-button variant="success" @click="updateData"
              >Update User Data</b-button
            >
          </p>
        </div>
        <p v-if="finalText">
          {{ finalText }}
        </p>
      </div>

      <div class="accordion" role="tablist">
        <b-card no-body class="mb-3">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="info"
              >Reviews</b-button
            >
          </b-card-header>
          <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <ReviewCardTable :reviews="reviews" />
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>

      <div class="buttonContainer">
        <p>
          <b-button variant="info" :href="reviewURL" v-if="isNotOwner"
            >Add Review</b-button
          >
        </p>
      </div>
    </div>
  </fragment>
</template>

<script>
//Import statements including components used on the page
import ReviewCardTable from '../components/ReviewCardTable.vue';

export default {
  //Page realName
  realName: 'app',

  components: { ReviewCardTable },

  data() {
    return {
      emailAddress: '',
      realName: '',
      displayType: '',
      phoneNumber: '',
      emailAddressBox: '',
      realNameBox: '',
      displayTypeBox: '',
      phoneNumberBox: '',
      password1: '',
      password2: '',
      displayTypes: [
        { value: 'PRO', text: 'Provider' },
        { value: 'CUS', text: 'Customer' },
      ],
      finalText: '',
      csrfToken: '',
      isOwner: false,
      reviews: [],
    };
  },

  mounted() {
    this.csrfToken = document.querySelector('meta[name=csrf-token]').content;

    if (
      window.context.profile ||
      window.context?.user?.id == window.context.userId
    ) {
      this.getMyProfile();
      this.isOwner = true;
    } else {
      this.getUserProfile();
    }

    this.getReviews();
  },

  methods: {
    updateData() {
      let toUpdate = {};

      if (this.emailAddressBox != '') {
        toUpdate.emailAddress = this.emailAddressBox;
      }

      if (this.realNameBox != '') {
        toUpdate.realName = this.realNameBox;
      }

      if (this.displayTypeBox != '') {
        toUpdate.displayType = this.displayTypeBox;
      }

      if (this.phoneNumberBox != '') {
        toUpdate.phoneNumber = this.phoneNumberBox;
      }

      if (this.password1 != '' && this.password2 != '') {
        if (this.password1 == this.password2) {
          toUpdate.password = this.password1;
        }
      }

      console.log(toUpdate);

      fetch('/api/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken,
        },
        body: JSON.stringify(toUpdate),
      }).then((res) => {
        if (res.ok) {
          if (this.emailAddressBox != '') {
            this.emailAddress = this.emailAddressBox;
            this.emailAddressBox = '';
          }

          if (this.realNameBox != '') {
            this.realName = this.realNameBox;
            this.realNameBox = '';
          }

          if (this.displayTypeBox != '') {
            this.displayType = this.displayTypeBox;
            this.displayTypeBox = '';
          }

          if (this.phoneNumberBox != '') {
            this.phoneNumber = this.phoneNumberBox;
            this.phoneNumberBox = '';
          }

          if (this.password1 != '' && this.password2 != '') {
            if (this.password1 == this.password2) {
              this.password1 = this.password2 = '';
            }
          }

          this.finalText = 'Data updated!';
        } else {
          this.finalText = 'Failed to update data; please try again.';
        }
      });
    },

    getMyProfile() {
      fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          for (const key of [
            'emailAddress',
            'realName',
            'displayType',
            'phoneNumber',
          ]) {
            this[key] = res[key];
          }
        });
    },

    getReviews() {
      fetch(`/api/review?providerId=${this.profileId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          this.reviews = res.data;
        });
    },

    getUserProfile() {
      const url = '/api/user?userId=' + window.context.userId;
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          for (const key of [
            'emailAddress',
            'realName',
            'displayType',
            'phoneNumber',
          ]) {
            this[key] = res[key];
          }
        });
    },
  },

  computed: {
    formattedPhoneNumber() {
      let digits = this.phoneNumber.split('').filter((x) => /\d/.test(x));

      if (digits.length == 10) {
        return (
          '(' +
          digits.slice(0, 3).join('') +
          ') ' +
          digits.slice(3, 6).join('') +
          '-' +
          digits.slice(6, 10).join('')
        );
      } else if (digits.length == 7) {
        return digits.slice(0, 3).join('') + '-' + digits.slice(3, 7).join('');
      } else {
        return digits.join('');
      }
    },

    reviewURL() {
      if (this.isOwner) {
        return window.location.value;
      }
      return '/addReview/' + window.context.userId;
    },

    isNotOwner() {
      return !this.isOwner;
    },

    profileId() {
      if (window.context.profile) {
        return window.context.user.id;
      } else {
        return window.context.userId;
      }
    },
  },
};
</script>

<style>
/* Any styles specific to the page */
.container {
  margin: 0px auto;
  padding: 0px;
  margin-top: 20px;
}

.titleContainer {
  display: flex;
  justify-content: center;
}

.buttonContainer {
  display: flex;
  justify-content: right;
}
</style>
