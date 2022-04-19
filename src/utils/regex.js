export const emailValidation = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email.toLowerCase());
  };
  
  export const multipleEmailValidation = (email) => {
    const regex = /^(([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4};?))+$/;
    return regex.test(email.toLowerCase());
  };
  
  export const replaceSpaceWithUnderscore = (name) => {
    return lowerCase(name.split(' ').join('_'));
  };
  export const replaceUnderscoreWithSpace = (name) => {
    return lowerCase(name.split('_').join(' '));
  };
  export const values = (object) => (object ? Object.values(object) : []);
  
  export const keys = (object) => (object ? Object.keys(object) : []);
  
  export const isEmpty = (value) => (value !== undefined ? value : '');
  
  export const isEmptyString = (value) => value === '';
  
  export const lowerCase = (values) => values.toLowerCase();
  
  export const number = (val) => {
    const regex = /^[0-9]+$/;
    if (regex.test(val) === true) {
      return false;
    } else {
      return true;
    }
  };
  export const Numbers = (val) => {
    if (val) {
      const regex = /^[0-9\b]+$/;
      if (regex.test(val) === true) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  

  
  export const accountNumber = (val) => {
    const regex = /^[0-9]{0,17}$/;
    if (regex.test(val) === true) {
      if (val.toString().length < 17) {
        return 'Minimum 17 digit required';
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  
  export const mobileNumber = (val) => {
    const regex = /^\(?([2-9][0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (regex.test(val) === true) {
      return false;
    } else {
      if (val.toString().length > 10) {
        return true;
      } else {
        return 'Please enter valid phone number';
      }
    }
  };
    