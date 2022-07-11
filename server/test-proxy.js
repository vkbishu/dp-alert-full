const fs = require('fs');

// Free Proxy is not success

function random(item){
    return item[Math.floor(Math.random()*item.length)];
}

let ips = [];

// read file
function loadIp(){
    let content = fs.readFileSync('proxy-ip.txt', {encoding: 'utf8', flag: 'r'});
    if(content){
        // store ip in memory
        ips = content.split('\r\n');
    }
    return ips;
}

async function getRandomProxyIp(){
    // read ip from memory
    if(ips.length == 0){
        await updateProxyIpList();
    }
    return random(ips);
}

async function updateProxyIpList(){
    console.log('Updating Proxy Ips');
    const axios = require('axios');
    let ip_list = await axios.get('https://proxylist.geonode.com/api/proxy-list?limit=50&page=1&sort_by=lastChecked&sort_type=desc&filterLastChecked=20&country=IN&speed=medium&protocols=http%2Chttps');
    let tmp_ips = [];
    if(ip_list.data && ip_list.data.total > 0){
        ip_list.data.data.forEach(element => {
            tmp_ips.push(element.ip+':'+element.port);
        });
    }
    if(tmp_ips.length > 0){
        ips = tmp_ips;
    }
}

updateProxyIpList();

setInterval(function(){
    updateProxyIpList();
}, (60*1000));

module.exports.getRandomProxyIp = getRandomProxyIp;
/* 
console.log(getRandomProxyIp());
setTimeout(function(){
    console.log('Ips After Refreshing');
    console.log(getRandomProxyIp());
}, (5*1000)); */