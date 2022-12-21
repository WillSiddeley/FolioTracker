
// TODO
// Need to make sure the correct IP address is selected when running on Docker
// Also need to make sure that a user can add a lot from the blank screen
// when the database has no values inside of it

// Set default IP address to local server
var defaultIp = "192.168.2.222"

// If being served by container, use Docker Ip
if (process.env.DOCKER_HOST) {
    console.log(`[INFO]: Found DOCKER_HOST: ${process.env.DOCKER_HOST}`)
    const url = new URL(process.env.DOCKER_HOST);
    var defaultIp = url.hostname;
}

console.log(`[INFO]: Sending backend requests to http://${defaultIp}:3001`)

export default class WebConstants {

    static websiteURL = `http://${defaultIp}:3000`;
    static websiteAPI = `http://${defaultIp}:3001`;

}