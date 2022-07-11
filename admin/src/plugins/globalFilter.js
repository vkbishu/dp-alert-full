import moment from "moment";

const GlobalFilters = {
    install (Vue) {

      Vue.filter('formatDate', (value) => {
        return moment(value).format('MMMM Do YYYY, h:mm a')
      });

      Vue.filter('timeAgo', (value) => {
        return moment(value).fromNow(); 
      });

      Vue.filter('fixedLen', (str) => {
        return str.length > 100 ? str.substr(0, 100)+'...' : str;
      });

      Vue.filter('moneyFormat', (value) => {
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'INR',
            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
          });
          return formatter.format(value);
      });
    }
}
export default GlobalFilters