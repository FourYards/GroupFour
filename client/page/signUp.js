const submitBttn = document.querySelector('button[type="submit"]');
const passwdField = document.querySelector('input[name="password"]');
const confirmPasswdField = document.querySelector(
  'input[name="confirmPassword"]'
);

const checkPasswdsMatch = function () {
  if (
    passwdField.value === confirmPasswdField.value &&
    !!passwdField.value &&
    !!confirmPasswdField.value
  ) {
    submitBttn.disabled = false;
  } else {
    submitBttn.disabled = true;
  }
};

passwdField.addEventListener('input', checkPasswdsMatch);
confirmPasswdField.addEventListener('input', checkPasswdsMatch);
