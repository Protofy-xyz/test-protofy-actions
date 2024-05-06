const execSync = require('child_process').execSync;

const DEV_SERVER_URL = "http://0.0.0.0:8080"
const args = process.argv.slice(2);
console.log('args: ', args)
const timeout = args[0] ?? 180000;// default 3 min
console.log('timeout: ', timeout)
const RETRY_TIME = 1000 // 1 sec

const healthCheck = () => { // Check system is up and ready to use
    console.log('Running healthcheck, waiting to be ready...')
    return new Promise((resolve, reject) => {
        const isReady = () => {
            let isEnabled = execSync(`curl -s ${DEV_SERVER_URL} | grep -q "__next" && echo true || echo false`, { encoding: 'utf-8' }).trim()
            if (isEnabled === 'true') {
                console.log('System Ready!')
                clearInterval(interval)
                resolve()
            }
            else {
                console.log('healthchecking, please wait...')
            }
        }
        let interval = setInterval(isReady, RETRY_TIME);
        setTimeout(() => {
            clearInterval(interval)
            reject("Error: healthcheck timeout.")
        }, timeout)
    })
}

const main = async () => {
    await healthCheck()
      .catch((msg) => {
        console.error(msg)
      })
    process.exit()
}
main()
