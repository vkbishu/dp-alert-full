var express = require('express');
var router = express.Router();
const {User} = require('../../models');
// list users
router.get('/', async function(req, res, next) {
  try{
      let {page} = req.query;
      let limit = 30;
      let offset = page > 0 ? (((page-1)*limit)) : 0;
      const result = await User.findAll({
          attributes: {
            exclude: ['password', 'remember_token']
          },
          limit,
          offset,
          order: [
            ['createdAt', 'DESC']
          ]
      });

      return res.data(result);

  }catch(err){
      console.log(err.message);
    next(err);
  }
});

router.get('/:id', async function(req, res, next) {
    try{
        let pk = req.params.id;
        const result = await User.findByPk(pk);
        return res.data(result);

    }catch(err){
        console.log(err.message);
        next(err);
    }
});


module.exports = router;
