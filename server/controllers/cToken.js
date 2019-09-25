const ModelToken = require("../models/mToken");
const axios = require("axios");

class TokenController {
  static addToken(req, res, next) {
    const { expo_token, fullname } = req.body;
    ModelToken.create({ expo_token, fullname })
      .then(data => {
        res.status(201).send(data);
      })
      .catch(next);
  }

  static async sendNotification(req, res, next) {
    const { title, body } = req.body;
    try {
      if (title == undefined || body == undefined) {
        let err = {
          statusCode: 400,
          message: "title/body cant null"
        };
        next(err)
        return
      } else {
        let datas = await ModelToken.find();
        let targets = [];
        datas.forEach(el => {
          let obj = {
            to: el.expo_token,
            title,
            body
          };
          targets.push(obj);
        });
        let responses = await axios.default({
          url: "https://exp.host/--/api/v2/push/send",
          method: "post",
          headers: {
            "Content-Type": "application/json",
            host: "exp.host",
            accept: "application/json",
            "accept-encoding": "gzip, deflate"
          },
          data: targets
        });
        res.status(200).send({ message: "Ok" });
      }
    }  catch (err) {
        /* istanbul ignore next */
        next(err);
        /* istanbul ignore next */
    }
  }
}

module.exports = TokenController;
