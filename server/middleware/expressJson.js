const expressJson = function(req, res, next){
    res.data = function(data, message=''){
      // success
      res.status(200).json({
        data,
        message: message || '',
        status: 'success'
      });
    };
  
    res.fail = function(error, message, error_code=400){
      res.status(error_code).json({
        data: error || null,
        message: message || '',
        status: 'fail',
      });
    };
  
    res.error = function(error, message, error_code=400){
      res.status(error_code).json({
        data: error || null,
        message: message || '',
        status: 'error',
      });
    };
  
    req.validate = (data, rules) => {
      return new Promise(function(resolve, reject){
        const v = new Validator(data, rules);
        v.checkAsync(function(){
          // pass
          resolve(true);
        }, function(){
          // fail
          //resolve(v.errors);
          reject(new FormValidationError(v.errors, "Invalid Input"));
        });
      });
    };

    next();
};