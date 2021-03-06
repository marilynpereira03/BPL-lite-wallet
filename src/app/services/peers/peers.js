
import _ from 'lodash'

import './peer'

const UPDATE_INTERVAL_CHECK = 10000

app.factory('$peers', ($peer, $timeout) => {
  class $peers {
    constructor () {
      this.stack = {
        official: [
          new $peer({ host: '13.56.163.57', port: 4000, ssl: false }),
          new $peer({ host: '54.183.132.15', port: 4000, ssl: false }),
          new $peer({ host: '54.183.69.30', port: 4000, ssl: false }),
          new $peer({ host: '54.183.152.67', port: 4000, ssl: false }),
          new $peer({ host: '54.183.22.145', port: 4000, ssl: false }),
          new $peer({ host: '54.183.209.94', port: 4000, ssl: false }),
          new $peer({ host: '54.186.13.135', port: 4000, ssl: false }),
          new $peer({ host: '54.202.194.76', port: 4000, ssl: false }),
          new $peer({ host: '34.212.0.73', port: 4000, ssl: false }),
          new $peer({ host: '54.202.119.251', port: 4000, ssl: false }),
          new $peer({ host: '34.211.228.49', port: 4000, ssl: false }),
          new $peer({ host: '13.229.63.24', port: 4000, ssl: false }),
          new $peer({ host: '54.255.255.199', port: 4000, ssl: false }),
          new $peer({ host: '54.255.170.7', port: 4000, ssl: false })
        ],
        public: [],
        testnet: [
          new $peer({ host: '52.66.184.223', port: 9028, ssl: false }),
          new $peer({ host: '34.211.111.67', port: 9028, ssl: false }),
          new $peer({ host: '13.59.176.127', port: 902890289028, ssl: false }),
          new $peer({ host: '54.175.122.162', port: 90289028, ssl: false }),
          new $peer({ host: '13.126.40.180', port: 9028, ssl: false }),
          new $peer({ host: '54.93.85.178', port: 9028, ssl: false }),
          new $peer({ host: '54.246.214.229', port: 9028, ssl: false }),
          new $peer({ host: '35.182.28.68', port: 9028, ssl: false }),
          new $peer({ host: '54.153.35.65', port: 9028, ssl: false }),
          new $peer({ host: '54.252.170.222', port: 9028, ssl: false }),
          new $peer({ host: '13.124.137.65', port: 9028, ssl: false }),
          new $peer({ host: '52.78.18.248', port: 9028, ssl: false }),
          new $peer({ host: '54.206.6.159', port: 9028, ssl: false }),
          new $peer({ host: '54.183.178.42', port: 9028, ssl: false }),
          new $peer({ host: '54.241.135.25', port: 9028, ssl: false }),
          new $peer({ host: '52.60.226.39', port: 9028, ssl: false }),
          new $peer({ host: '52.60.223.205', port: 9028, ssl: false }),
          new $peer({ host: '176.34.156.16', port: 9028, ssl: false }),
          new $peer({ host: '54.154.120.195', port: 9028, ssl: false }),
          new $peer({ host: '54.93.33.249', port: 9028, ssl: false })
        ]
      }

      this.check()
    }

    reset (active) {
      $timeout.cancel(this.timeout)

      if (active) {
        this.active = undefined
      }
    }

    setActive () {
      this.active = _.chain([])
        .concat(this.stack.official, this.stack.public)
        .sample()
        .value()

      this.check()
    }

    check () {
      this.reset()

      let next = () => this.timeout = $timeout(this.check.bind(this), UPDATE_INTERVAL_CHECK)

      if (!this.active) {
        return next()
      }

      this.active.status()
        .then(() => this.online = true)
        .catch(() => this.online = false)
        .finally(() => next())
    }
  }

  return new $peers()
})
