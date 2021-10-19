import fetch from 'node-fetch' 

import fs from 'fs' 

import child_process from 'child_process' 

import $ from 'jquery' 

import { fileURLToPath } from 'url'; 

import { dirname } from 'path'; 

import client from 'webdriverio' 

import * as telegraf from 'telegraf' 

import * as childProcess from 'child_process' 

import moment from 'moment' 

import * as nodeSchedule from 'node-schedule' 

var canRun = true 

var sessionList = []
var phoneData = [
    {
        "productTitle": "iPhone 13 Pro 512GB Sierra Blue",
        "basePartNumber": "MLTJ3",
        "image": "iphone-13-pro-blue-select",
        "dimensionCapacity": "512gb",
        "dimensionScreensize": "6_1inch",
        "price": "10999_00_unlocked",
        "partNumber": "MLTJ3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.1-inch-display-512gb-sierra-blue",
        "dimensionColor": "sierrablue",
        "avialable": false,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro 256GB Gold",
        "basePartNumber": "MLTD3",
        "image": "iphone-13-pro-gold-select",
        "dimensionCapacity": "256gb",
        "dimensionScreensize": "6_1inch",
        "price": "9299_00_unlocked",
        "partNumber": "MLTD3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.1-inch-display-256gb-gold",
        "dimensionColor": "gold",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro 1TB Silver",
        "basePartNumber": "MLTL3",
        "image": "iphone-13-pro-silver-select",
        "dimensionCapacity": "1tb",
        "dimensionScreensize": "6_1inch",
        "price": "12699_00_unlocked",
        "partNumber": "MLTL3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.1-inch-display-1tb-silver",
        "dimensionColor": "silver",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro 128GB Sierra Blue",
        "basePartNumber": "MLT83",
        "image": "iphone-13-pro-blue-select",
        "dimensionCapacity": "128gb",
        "dimensionScreensize": "6_1inch",
        "price": "8499_00_unlocked",
        "partNumber": "MLT83ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.1-inch-display-128gb-sierra-blue",
        "dimensionColor": "sierrablue",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro 128GB Silver",
        "basePartNumber": "MLT63",
        "image": "iphone-13-pro-silver-select",
        "dimensionCapacity": "128gb",
        "dimensionScreensize": "6_1inch",
        "price": "8499_00_unlocked",
        "partNumber": "MLT63ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.1-inch-display-128gb-silver",
        "dimensionColor": "silver",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro 512GB Graphite",
        "basePartNumber": "MLTF3",
        "image": "iphone-13-pro-graphite-select",
        "dimensionCapacity": "512gb",
        "dimensionScreensize": "6_1inch",
        "price": "10999_00_unlocked",
        "partNumber": "MLTF3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.1-inch-display-512gb-graphite",
        "dimensionColor": "graphite",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro 256GB Graphite",
        "basePartNumber": "MLT93",
        "image": "iphone-13-pro-graphite-select",
        "dimensionCapacity": "256gb",
        "dimensionScreensize": "6_1inch",
        "price": "9299_00_unlocked",
        "partNumber": "MLT93ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.1-inch-display-256gb-graphite",
        "dimensionColor": "graphite",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro 256GB Sierra Blue",
        "basePartNumber": "MLTE3",
        "image": "iphone-13-pro-blue-select",
        "dimensionCapacity": "256gb",
        "dimensionScreensize": "6_1inch",
        "price": "9299_00_unlocked",
        "partNumber": "MLTE3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.1-inch-display-256gb-sierra-blue",
        "dimensionColor": "sierrablue",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro 128GB Gold",
        "basePartNumber": "MLT73",
        "image": "iphone-13-pro-gold-select",
        "dimensionCapacity": "128gb",
        "dimensionScreensize": "6_1inch",
        "price": "8499_00_unlocked",
        "partNumber": "MLT73ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.1-inch-display-128gb-gold",
        "dimensionColor": "gold",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro 128GB Graphite",
        "basePartNumber": "MLT53",
        "image": "iphone-13-pro-graphite-select",
        "dimensionCapacity": "128gb",
        "dimensionScreensize": "6_1inch",
        "price": "8499_00_unlocked",
        "partNumber": "MLT53ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.1-inch-display-128gb-graphite",
        "dimensionColor": "graphite",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro 1TB Gold",
        "basePartNumber": "MLTM3",
        "image": "iphone-13-pro-gold-select",
        "dimensionCapacity": "1tb",
        "dimensionScreensize": "6_1inch",
        "price": "12699_00_unlocked",
        "partNumber": "MLTM3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.1-inch-display-1tb-gold",
        "dimensionColor": "gold",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro 512GB Silver",
        "basePartNumber": "MLTG3",
        "image": "iphone-13-pro-silver-select",
        "dimensionCapacity": "512gb",
        "dimensionScreensize": "6_1inch",
        "price": "10999_00_unlocked",
        "partNumber": "MLTG3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.1-inch-display-512gb-silver",
        "dimensionColor": "silver",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro 1TB Sierra Blue",
        "basePartNumber": "MLTN3",
        "image": "iphone-13-pro-blue-select",
        "dimensionCapacity": "1tb",
        "dimensionScreensize": "6_1inch",
        "price": "12699_00_unlocked",
        "partNumber": "MLTN3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.1-inch-display-1tb-sierra-blue",
        "dimensionColor": "sierrablue",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro 1TB Graphite",
        "basePartNumber": "MLTK3",
        "image": "iphone-13-pro-graphite-select",
        "dimensionCapacity": "1tb",
        "dimensionScreensize": "6_1inch",
        "price": "12699_00_unlocked",
        "partNumber": "MLTK3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.1-inch-display-1tb-graphite",
        "dimensionColor": "graphite",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro 512GB Gold",
        "basePartNumber": "MLTH3",
        "image": "iphone-13-pro-gold-select",
        "dimensionCapacity": "512gb",
        "dimensionScreensize": "6_1inch",
        "price": "10999_00_unlocked",
        "partNumber": "MLTH3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.1-inch-display-512gb-gold",
        "dimensionColor": "gold",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro 256GB Silver",
        "basePartNumber": "MLTC3",
        "image": "iphone-13-pro-silver-select",
        "dimensionCapacity": "256gb",
        "dimensionScreensize": "6_1inch",
        "price": "9299_00_unlocked",
        "partNumber": "MLTC3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.1-inch-display-256gb-silver",
        "dimensionColor": "silver",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro Max 1TB Gold",
        "basePartNumber": "MLHK3",
        "image": "iphone-13-pro-max-gold-select",
        "dimensionCapacity": "1tb",
        "dimensionScreensize": "6_7inch",
        "price": "13599_00_unlocked",
        "partNumber": "MLHK3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-1tb-gold",
        "dimensionColor": "gold",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro Max 128GB Gold",
        "basePartNumber": "MLH63",
        "image": "iphone-13-pro-max-gold-select",
        "dimensionCapacity": "128gb",
        "dimensionScreensize": "6_7inch",
        "price": "9399_00_unlocked",
        "partNumber": "MLH63ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-128gb-gold",
        "dimensionColor": "gold",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro Max 128GB Sierra Blue",
        "basePartNumber": "MLH73",
        "image": "iphone-13-pro-max-blue-select",
        "dimensionCapacity": "128gb",
        "dimensionScreensize": "6_7inch",
        "price": "9399_00_unlocked",
        "partNumber": "MLH73ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-128gb-sierra-blue",
        "dimensionColor": "sierrablue",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro Max 128GB Silver",
        "basePartNumber": "MLH53",
        "image": "iphone-13-pro-max-silver-select",
        "dimensionCapacity": "128gb",
        "dimensionScreensize": "6_7inch",
        "price": "9399_00_unlocked",
        "partNumber": "MLH53ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-128gb-silver",
        "dimensionColor": "silver",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro Max 512GB Gold",
        "basePartNumber": "MLHF3",
        "image": "iphone-13-pro-max-gold-select",
        "dimensionCapacity": "512gb",
        "dimensionScreensize": "6_7inch",
        "price": "11899_00_unlocked",
        "partNumber": "MLHF3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-512gb-gold",
        "dimensionColor": "gold",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro Max 512GB Sierra Blue",
        "basePartNumber": "MLHG3",
        "image": "iphone-13-pro-max-blue-select",
        "dimensionCapacity": "512gb",
        "dimensionScreensize": "6_7inch",
        "price": "11899_00_unlocked",
        "partNumber": "MLHG3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-512gb-sierra-blue",
        "dimensionColor": "sierrablue",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro Max 1TB Graphite",
        "basePartNumber": "MLHH3",
        "image": "iphone-13-pro-max-graphite-select",
        "dimensionCapacity": "1tb",
        "dimensionScreensize": "6_7inch",
        "price": "13599_00_unlocked",
        "partNumber": "MLHH3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-1tb-graphite",
        "dimensionColor": "graphite",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro Max 512GB Silver",
        "basePartNumber": "MLHE3",
        "image": "iphone-13-pro-max-silver-select",
        "dimensionCapacity": "512gb",
        "dimensionScreensize": "6_7inch",
        "price": "11899_00_unlocked",
        "partNumber": "MLHE3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-512gb-silver",
        "dimensionColor": "silver",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro Max 1TB Sierra Blue",
        "basePartNumber": "MLHL3",
        "image": "iphone-13-pro-max-blue-select",
        "dimensionCapacity": "1tb",
        "dimensionScreensize": "6_7inch",
        "price": "13599_00_unlocked",
        "partNumber": "MLHL3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-1tb-sierra-blue",
        "dimensionColor": "sierrablue",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro Max 256GB Silver",
        "basePartNumber": "MLH93",
        "image": "iphone-13-pro-max-silver-select",
        "dimensionCapacity": "256gb",
        "dimensionScreensize": "6_7inch",
        "price": "10199_00_unlocked",
        "partNumber": "MLH93ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-256gb-silver",
        "dimensionColor": "silver",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro Max 1TB Silver",
        "basePartNumber": "MLHJ3",
        "image": "iphone-13-pro-max-silver-select",
        "dimensionCapacity": "1tb",
        "dimensionScreensize": "6_7inch",
        "price": "13599_00_unlocked",
        "partNumber": "MLHJ3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-1tb-silver",
        "dimensionColor": "silver",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro Max 256GB Sierra Blue",
        "basePartNumber": "MLHC3",
        "image": "iphone-13-pro-max-blue-select",
        "dimensionCapacity": "256gb",
        "dimensionScreensize": "6_7inch",
        "price": "10199_00_unlocked",
        "partNumber": "MLHC3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-256gb-sierra-blue",
        "dimensionColor": "sierrablue",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro Max 256GB Graphite",
        "basePartNumber": "MLH83",
        "image": "iphone-13-pro-max-graphite-select",
        "dimensionCapacity": "256gb",
        "dimensionScreensize": "6_7inch",
        "price": "10199_00_unlocked",
        "partNumber": "MLH83ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-256gb-graphite",
        "dimensionColor": "graphite",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro Max 128GB Graphite",
        "basePartNumber": "MLH43",
        "image": "iphone-13-pro-max-graphite-select",
        "dimensionCapacity": "128gb",
        "dimensionScreensize": "6_7inch",
        "price": "9399_00_unlocked",
        "partNumber": "MLH43ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-128gb-graphite",
        "dimensionColor": "graphite",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro Max 256GB Gold",
        "basePartNumber": "MLHA3",
        "image": "iphone-13-pro-max-gold-select",
        "dimensionCapacity": "256gb",
        "dimensionScreensize": "6_7inch",
        "price": "10199_00_unlocked",
        "partNumber": "MLHA3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-256gb-gold",
        "dimensionColor": "gold",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 Pro Max 512GB Graphite",
        "basePartNumber": "MLHD3",
        "image": "iphone-13-pro-max-graphite-select",
        "dimensionCapacity": "512gb",
        "dimensionScreensize": "6_7inch",
        "price": "11899_00_unlocked",
        "partNumber": "MLHD3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-512gb-graphite",
        "dimensionColor": "graphite",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 128GB Pink",
        "basePartNumber": "MLDW3",
        "image": "iphone-13-pink-select-2021",
        "dimensionCapacity": "128gb",
        "dimensionScreensize": "6_1inch",
        "price": "6799_00_unlocked",
        "partNumber": "MLDW3ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13/6.1-inch-display-128gb-pink",
        "dimensionColor": "pink",
        "avialable": false ,
        "called": false
    },
    {
        "productTitle": "iPhone 13 256GB Pink",
        "basePartNumber": "MLE23",
        "image": "iphone-13-pink-select-2021",
        "dimensionCapacity": "256gb",
        "dimensionScreensize": "6_1inch",
        "price": "7599_00_unlocked",
        "partNumber": "MLE23ZA/A",
        "productLink": "https://www.apple.com/hk/shop/buy-iphone/iphone-13/6.1-inch-display-256gb-pink",
        "dimensionColor": "pink",
        "avialable": false ,
        "called": false
    }
]
 
 

var getPhoneFamilyFunc = async () => { 

    await fetch("https://www.apple.com/hk/shop/product-locator-meta?family=iphone13pro", { 

        "credentials": "include", 

        "headers": { 

            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:93.0) Gecko/20100101 Firefox/93.0", 

            "Accept": "*/*", 

            "Accept-Language": "en-GB,en;q=0.5", 

            "Sec-Fetch-Dest": "empty", 

            "Sec-Fetch-Mode": "cors", 

            "Sec-Fetch-Site": "same-origin" 

        }, 

        "method": "GET", 

        "mode": "cors" 

    }).then(async PhoneFamilyResponse => { 

        return await PhoneFamilyResponse.json() 

    }).then(async PhoneFamilyReponseJSON => { 

        fs.writeFileSync('./data/PhoneData.json',JSON.stringify(PhoneFamilyReponseJSON)) 

    }).catch(err => { 

        console.warn(err) 

    }) 
    await fetch("https://www.apple.com/hk/shop/product-locator-meta?family=iphone13", { 

        "credentials": "include", 

        "headers": { 

            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:93.0) Gecko/20100101 Firefox/93.0", 

            "Accept": "*/*", 

            "Accept-Language": "en-GB,en;q=0.5", 

            "Sec-Fetch-Dest": "empty", 

            "Sec-Fetch-Mode": "cors", 

            "Sec-Fetch-Site": "same-origin" 

        }, 

        "method": "GET", 

        "mode": "cors" 

    }).then(async PhoneFamilyResponse => { 

        return await PhoneFamilyResponse.json() 

    }).then(async PhoneFamilyReponseJSON => { 

        fs.writeFileSync('./data/PhoneData_13.json',JSON.stringify(PhoneFamilyReponseJSON)) 

    }).catch(err => { 

        console.warn(err) 

    }) 

} 
var purchaseIPhone = async (url,productTitle) => {
    // await purchaseIPhone('https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-256gb-gold','IPhone 13 mini')
    var timeToWait = 35

    var humanClick = async(element)=>{
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("mouseover", true, true, window,
        0, 0, 0, 0, 0, false, false, false, false, 0, null);
        element.dispatchEvent(evt);
        evt.initMouseEvent("mousedown", true, true, window,
        0, 0, 0, 0, 0, false, false, false, false, 0, null);
        element.dispatchEvent(evt);
        evt.initMouseEvent("mouseup", true, true, window,
        0, 0, 0, 0, 0, false, false, false, false, 0, null);
        element.dispatchEvent(evt);
        evt.initMouseEvent("click", true, true, window,
        0, 0, 0, 0, 0, false, false, false, false, 0, null);
        element.dispatchEvent(evt);
    }
    
    await sessionList.push(productTitle)
    const timeOutSeconds = 30
    const browser = await client.remote({
        maxInstances: 10,
        capabilities: {
            // port: 9515,
            // path: '/',
            browserName: 'chrome',
            pageLoadStrategy: 'eager',
            'goog:chromeOptions': { 
                    args: [
                        "--headless", 
                        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                        // "--disable-gpu",
                        // "--window-size=1024,768"
                        "--ChromeOSMemoryPressureHandling",
                        "--incognito",
                        "--silent",
                        // "--disable-async-dns",
                        // "--disable-background-networking",
                        // "--disable-bundled-ppapi-flash",
                        // "--disable-client-side-phishing-detection",
                        // "--disable-component-extensions-with-background-pages",
                        // "--disable-component-update",
                        // "--disable-default-apps",
                        // "--disable-domain-reliability",
                        // "--disable-device-discovery-notifications",
                        // "--disable-extensions",
                        // "--disable-extensions-file-access-check",
                        // "--disable-extensions-http-throttling",
                        // "--disable-ipv6",
                        // "--disable-minimize-on-second-launcher-item-click",
                        // "--disable-ntp-other-sessions-menu",
                        // "--disable-material-design-ntp",
                        // "--disable-offline-auto-reload",
                        // "--enable-offline-auto-reload-visible-only",
                        // "--enable-fast-unload"
                    ]
            }
        },
        services: ['devtools','intercept']
    })
    
    var checkElementExists = async (xpath) => {
        do{
            // await browser.pause(timeToWait)
            var element = await browser.$$(xpath)[0]
            if(await element != undefined){
                await element.waitForExist({timeout: timeToWait})    
            } else {
                await browser.pause(timeToWait)
            }
            element = await element
        } while(element == undefined)
        return
    }

    

    // Implicit Timeout for FindElement
    // await browser.setTimeout({ 'implicit': timeOutSeconds * 1000 })
    // Page Timeout
    // await browser.setTimeout({ 'pageLoad': timeOutSeconds * 1000 })
    // Script Timeout
    // await browser.setTimeout({ 'script': timeOutSeconds * 1000 })

    var abortEle = async (url) => {
        var mock1 = await browser.mock(url)
        mock1.abort('Failed')
    }

    var runInBrowser = async (argument) => {
        await argument.click()
    }
    var tmp_value
    var currentStatus
    
    // var this_session

    

    await abortEle('https://www.apple.com/wss/fonts/**')
    await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-globalelements/dist/hk/ac-globalnav-dist/images/**')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-iphone/2/dist/step1flagship.css')
    await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/Catalog/global/css/dd/buy-flow/iphone.css')
    await abortEle('https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-ar-icon-**')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-iphone/2/dist/fulfillment-**')
    // await abortEle('https://securemetrics.apple.com/b/ss/applestoreww,applehkglobal/1/JS-2.22.0/**')
    await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-external/rel/assets/ac-footer/breadcrumbs/apple/icon_large.svg')
    await abortEle('data:image/**')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-external/rel/assets/ac-footer/breadcrumbs/separator/icon_large.svg')
    await abortEle('https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/**')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-iphone/2/dist/318.css')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/Catalog/global/css/web/fee/buy-flow/iphone/as-iphone-13.css')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-external/rel/hk/external.css')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-globalelements/dist/hk/globalelements.css')
    // await abortEle('https://www.apple.com/wss/fonts?families=SF+Pro,v3:200,300,400,500,600|SF+Pro+Icons,v3|Apple+Monochrome+Emoji,v3|Apple+Monochrome+Emoji+Ind,v1|Graphik,v1')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-iphone/2/dist/accessory-slot-adapter3.chunk.js')
    // await abortEle('https://www.apple.com/hk/shop/favoritesx/fetch')
    // await abortEle('https://www.apple.com/hk/shop/fulfillment-messages?little=false&mt=regular&parts.0=MLK43ZA/A')
    // await abortEle('https://www.apple.com/hk/shop/dc')
    // await abortEle('https://www.apple.com/search-services/suggestions/defaultlinks/?src=globalnav&locale=en_HK')
    // await abortEle('https://www.apple.com/favicon.ico')
    // await abortEle('https://xp.apple.com/report/2/xp_aos_clientperf')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-external/rel/external.js')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-vendor/1/dist/react@17.0.1/umd/react.production.min.js')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-vendor/1/dist/react-dom@17.0.1/umd/react-dom.production.min.js')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-globalelements/dist/globalelements.js')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-iphone/2/dist/step1flagship.js')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-iphone/2/dist/attach.css')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/Catalog/global/css/web/fee/buy-flow/iphone/as-iphone-catattach.css')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/Catalog/global/css/web/merch/merch-tools.css')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-iphone/2/dist/assets/as-icons/fonts/aosicons_regular.woff')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-iphone/2/dist/engraving.chunk.js')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-iphone/2/dist/engraving.css')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-iphone/2/dist/engraving.chunk.js')
    // await abortEle('https://www.apple.com/hk/shop/buyFlowAttachSummary/MLK43ZA/A?node=home%2Fshop_iphone%2Ffamily%2Fiphone_13&step=attach&complete=true&igt=true&buyflowParams=%5Bobject%20Object%5D&product=MLK43ZA%2FA')
    // await abortEle('https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=MM1Y3FE/A&parts.1=MM0J3FE/A&parts.2=MM2W3FE/A')
    // await abortEle('https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=HPRA2ZM/A&parts.1=HPQS2ZM/A&parts.2=MHXH3ZA/A')
    // await abortEle('https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=MM0Q3FE/A&parts.1=MHXF3ZA/A&parts.2=MJWY3ZA/A')
    // await abortEle('https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=HPBJ2ZM/A&parts.1=HPGA2B/A&parts.2=MX532ZP/A')
    // await abortEle('https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=MX542ZP/A&parts.1=MMFC3FE/A&parts.2=MLYY3FE/A')
    // await abortEle('https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=MX4A2FE/A&parts.1=MMN93ZP/A&parts.2=MMN53ZP/A')
    // await abortEle('https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=HNPU2ZM/A&parts.1=HNPX2ZM/A&parts.2=MWP22ZP/A')
    // await abortEle('https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=MV7N2ZP/A&parts.1=MMTN2FE/A&parts.2=MRXJ2ZP/A')
    // await abortEle('https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=MYMC2PA/A&parts.1=MHJF3ZP/A&parts.2=MMX62FE/A')
    // await abortEle('https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=MY5H2ZP/A')
    // await abortEle('https://www.apple.com/hk/shop/recommendedForYou-full?partsInCart.0=MLK43ZA/A&inline=true&recentAddedPart=MLK43ZA/A')
    await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-checkout/4/dist/assets/as-icons/fonts/**')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-checkout/4/dist/bag.css')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/Catalog/global/css/dd/buy-flow/checkout.css')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/Catalog/global/css/web/fee/transaction/as-bag.css')
    await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-account/3/dist/assets/as-icons/fonts/**')
    await abortEle('https://idmsa.apple.com/appleauth/auth/authorize/**')
    // await abortEle('https://secure4.store.apple.com/search-services/suggestions/defaultlinks/?src=globalnav&locale=en_HK')
    // await abortEle('https://secure4.store.apple.com/favicon.ico')
    // await abortEle('https://secure3.store.apple.com/search-services/suggestions/defaultlinks/?src=globalnav&locale=en_HK')
    // await abortEle('https://secure3.store.apple.com/favicon.ico')
    // await abortEle('https://secure2.store.apple.com/search-services/suggestions/defaultlinks/?src=globalnav&locale=en_HK')
    // await abortEle('https://secure2.store.apple.com/favicon.ico')
    // await abortEle('https://secure1.store.apple.com/search-services/suggestions/defaultlinks/?src=globalnav&locale=en_HK')
    // await abortEle('https://secure1.store.apple.com/favicon.ico')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-account/3/dist/unified-signin.js')
    // await abortEle('https://appleid.cdn-apple.com/appleauth/static/jsapi/authService.latest.min.js')
    await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-checkout/3/dist/assets/as-icons/fonts/**')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-account/3/dist/unified-signin.css')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/rs-checkout/3/dist/checkout.css')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/Catalog/global/css/web/transaction/checkout.css')
    // await abortEle('https://store.storeimages.cdn-apple.com/8756/store.apple.com/shop/Catalog/global/css/web/fee/transaction/as-checkout.css')
    await abortEle(/.+www.apple.com\/.+-.+-.+-.+-.+.js/)
    await abortEle(/.+.css/)
    await abortEle(/.+.woff/)
    await abortEle(/.+.svg/)
    // await abortEle(/https:\/\/(cdn.apple-mapkit.com)\/.+/)
    // await abortEle(/.+fulfillment-messages.+/)
    // var mock2 = await browser.mock(/.+shop\/buy-iphone\/iphone-13\/.+/)
    // await mock2.respond((res) => {
    //     console.log(res)
    //     return res
    // })

    // mock1.respond()
    var btn
    var content1
    var testingWaitTime = 0
    
    await browser.url(url)
    setTimeout(() => {
        browser.deleteSession()
    },5 * 60 * 1000)
    Promise.all([await checkElementExists('#noTradeIn')])
    btn = await browser.$('#noTradeIn')
    await btn.click()
    Promise.all([await checkElementExists('button[value="add-to-cart"]')])
    btn = await browser.$('button[value="add-to-cart"]')
    await btn.click()
    // await browser.execute(humanClick, btn)
    // await browser.pause(testingWaitTime)
    Promise.all([await checkElementExists('button[name="proceed"]')])
    btn = await browser.$('button[name="proceed"]')
    await btn.click()
    // await browser.execute(humanClick, btn)
    // await browser.pause(testingWaitTime)
    Promise.all([await checkElementExists('select[data-autom="item-quantity-dropdown"]  > option:nth-child(2)')])
    btn = await browser.$('select[data-autom="item-quantity-dropdown"]  > option:nth-child(2)')
    // await browser.execute(humanClick, btn)
    await btn.click()
    // await browser.pause(testingWaitTime)
    Promise.all([await checkElementExists('button[data-autom="checkout"]')])
    btn = await browser.$('button[data-autom="checkout"]')
    // await browser.execute(humanClick, btn)
    await btn.click()
    // await browser.pause(testingWaitTime)
    // await browser.pause(timeToWait)
    Promise.all([await checkElementExists('button[data-autom="guest-checkout-btn"]')])
    btn = await browser.$('button[data-autom="guest-checkout-btn"]')
    await btn.click()
    // await browser.execute(humanClick, btn)
    // await browser.pause(testingWaitTime)
    
    await browser.pause(timeToWait)
    try {
        Promise.all([await checkElementExists('input[value="RETAIL"]')])
    } catch(err){
        console.log(err)
    }
    
    btn = await browser.$('input[value="RETAIL"]')
    await btn.click()
    // await browser.execute(humanClick, btn)
    Promise.all([await checkElementExists('input[name="searchInput"]')])
    btn = await browser.$('input[name="searchInput"]')
    await btn.setValue('Central')
    Promise.all([await checkElementExists('button[data-autom="checkout-cityState-apply"]')])
    btn = await browser.$('button[data-autom="checkout-cityState-apply"]')
    await btn.click()
    // await browser.execute(humanClick, btn)
    // await browser.pause(timeToWait)
    Promise.all([await checkElementExists('input[name="checkout.fulfillment.pickupTab.pickup.storeLocator-storeName"]')])
    btn = await browser.$$('input[name="checkout.fulfillment.pickupTab.pickup.storeLocator-storeName"]:enabled')
    if(await btn.length == 0){
            var clickFirst = async () => {
                btn = await browser.$('button[data-autom="fulfillment-pickup-store-search-button"]')
                try {
                    await btn.click()
                    // await browser.execute(humanClick, btn)
                } catch(err){
                    await clickSecond()
                }
                await clickSecond()
            }
            var clickSecond = async() => {
                btn = await browser.$('button[data-autom="checkout-cityState-apply"]')
                try {
                    await btn.click()
                    // await browser.execute(humanClick, btn)
                    btn = await browser.$$('input[name="checkout.fulfillment.pickupTab.pickup.storeLocator-storeName"]:enabled')
                    if(await btn.length == 0)
                        await clickFirst()
                } catch(err){
                    await clickFirst()
                }
                // btn = await await browser.$$('input[name="checkout.fulfillment.pickupTab.pickup.storeLocator-storeName"]:enabled')
                // if(await btn.length == 0)
                //     await clickFirst()
            }
            btn = await browser.$$('input[name="checkout.fulfillment.pickupTab.pickup.storeLocator-storeName"]:enabled')
            if(await btn.length == 0)
                await clickFirst()
    }
    var startTmp = new Date()
    recordTimer.start = startTmp.toISOString()
    btn = await browser.$$('input[name="checkout.fulfillment.pickupTab.pickup.storeLocator-storeName"]:enabled')[0]
    await btn.click()
    // await browser.execute(humanClick, btn)
    Promise.all([await checkElementExists('input[name="pickupdate"]:enabled')])
    btn = await browser.$$('input[name="pickupdate"]:enabled')[1]
    await btn.click()
    // await browser.execute(humanClick, btn)
    Promise.all([await checkElementExists('select[aria-labelledby="timeWindows_label"]:enabled option:nth-child(2)')])
    btn = await browser.$('select[aria-labelledby="timeWindows_label"]:enabled option:nth-child(10)')
    await btn.click()
    // await browser.execute(humanClick, btn)
    Promise.all([await checkElementExists('button[data-autom="fulfillment-continue-button"]')])
    btn = await browser.$('button[data-autom="fulfillment-continue-button"]')
    await btn.click()
    // await browser.execute(humanClick, btn)
    // await browser.pause(testingWaitTime)
    Promise.all([await checkElementExists('input[name="firstName"]')])
    btn = await browser.$('input[name="firstName"]')
    await btn.setValue('HINGSANG')
    Promise.all([await checkElementExists('input[name="lastName"]')])
    btn = await browser.$('input[name="lastName"]')
    await btn.setValue('WONG')
    Promise.all([await checkElementExists('input[name="emailAddress"]')])
    btn = await browser.$('input[name="emailAddress"]')
    await btn.setValue('hswongan@connect.ust.hk')
    Promise.all([await checkElementExists('input[name="mobilePhone"]')])
    btn = await browser.$('input[name="mobilePhone"]')
    await btn.setValue('51604525')
    Promise.all([await checkElementExists('button[data-autom="continue-button-label"]')])
    btn = await browser.$('button[data-autom="continue-button-label"]')
    await btn.click()
    // await browser.execute(humanClick, btn)
    // await browser.pause(testingWaitTime)
    // await browser.pause(timeToWait)
    Promise.all([await checkElementExists('input[name="checkout.billing.billingOptions.selectBillingOption"]')])
    btn = await browser.$('input[name="checkout.billing.billingOptions.selectBillingOption"]')
    await btn.click()
    // await browser.execute(humanClick, btn)
    Promise.all([
        await checkElementExists('input[data-autom="card-number-input"]')
    ])
    btn = await browser.$('input[data-autom="card-number-input"]')
    await btn.setValue('4325650270439294')
    Promise.all([await checkElementExists('input[data-autom="expiration-input"]')])
    btn = await browser.$('input[data-autom="expiration-input"]')
    await btn.setValue('0926')
    Promise.all([await checkElementExists('input[data-autom="security-code-input"]')])
    btn = await browser.$('input[data-autom="security-code-input"]')
    await btn.setValue('015')
    Promise.all([await checkElementExists('input[name="firstName"]')])
    btn = await browser.$('input[name="firstName"]')
    await btn.setValue('HINGSANG')
    Promise.all([await checkElementExists('input[name="lastName"]')])
    btn = await browser.$('input[name="lastName"]')
    await btn.setValue('WONG')
    Promise.all([await checkElementExists('input[name="street"]')])
    btn = await browser.$('input[name="street"]')
    await btn.setValue('Wah Hing House, Wah Fu Estate,HK')
    Promise.all([await checkElementExists('input[name="street2"]')])
    btn = await browser.$('input[name="street2"]')
    await btn.setValue('2031 flat')
    Promise.all([await checkElementExists('button[data-autom="continue-button-label"]')])
    btn = await browser.$('button[data-autom="continue-button-label"]')
    await btn.click()
    
    // await browser.pause(testingWaitTime)
    // await browser.execute(humanClick, btn)
    // await browser.pause(timeToWait)
    Promise.all([await checkElementExists('span*=Place Your Order')])
    btn = await browser.$('#rs-checkout-continue-button-bottom')
    await btn.click()
    // await browser.execute(humanClick, btn)
    // await browser.pause(testingWaitTime)
    var endTmp = new Date()
    recordTimer.end = endTmp.toISOString()
    if(startTmp.getSeconds() > endTmp.getSeconds()){
        recordTimer.timePassed = endTmp.getSeconds() + 60 - startTmp.getSeconds()
    }else{
        recordTimer.timePassed = endTmp.getSeconds() - startTmp.getSeconds()
    }
    

    fs.writeFileSync('./data/Timer/Timing.json', JSON.stringify(recordTimer))

    // this_session = await browser.sessions()
    // var firstPageClick = async () => {
    //     var url = await browser.getUrl()
    //     if(url.includes('/shop/buy-iphone') && !(url.includes('attach'))){
    //         try {
    //             // $('body > div.metrics').remove()
    //             // $('#ac-globalnav').remove()
    //             // $('#ac-gn-menustate').remove()
    //             // $('#as-standardnav-menustate').remove()
    //             // $('#as-standardnav').remove()
    //             // $('#notification-portal').remove()
    //             // $('div[class="ribbon ribbon-blue-to-default rf-promo-ribbon dd-util-fill-gray-quaternary"]').remove()
    //             // $('div[class="rc-viewport-wrapper"]').remove()
    //             // $('div[class="rf-flagship rf-stickychat-enabled"] > div').remove()
    //             // $('div[class="rf-flagship rf-stickychat-enabled"] > div').remove()
    //             // $('div[class="rf-flagship rf-stickychat-enabled"] > div').remove()
    //             // $('div[class="rf-flagship rf-stickychat-enabled"] > div > div').remove()
    //             // $('div[class="rf-flagship rf-stickychat-enabled"] > div > div > div').remove()
    //             btn = await browser.$('#page')
    //             try{
    //                 var html = await btn.getHTML()
    //                 if(html.includes('503'))
    //                     await browser.refresh()
    //             } catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('#noTradeIn')
    //             try {
    //                 await btn.click()
    //             } catch(err){
    //                 console.log(err)
    //             }
                
    //             btn = await browser.$('button[value="add-to-cart"]')
    //             try {
    //                 await btn.click()
    //             } catch(err){
    //                 console.log(err)
    //             }
    //         } catch(err){
    //             console.warn(err)
    //         }
    //     } else {
    //         return
    //     }
    //     await firstPageClick()
    // }
    // var secondPageClick = async () => {
    //     var url = await browser.getUrl()
    //     if(url.includes('step=attach')){
    //         try {
    //             btn = await browser.$('html')
    //             try{
    //                 var html = await btn.getHTML()
    //                 if(html.includes('503'))
    //                     await browser.refresh()
    //             } catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('button[name="proceed"]')
    //             try {
    //                 await btn.click()
    //             } catch(err){
    //                 console.log(err)
    //             }
    //         } catch(err){
    //             console.warn(err)
    //         }
    //     } else {
    //         return
    //     }
    //     await secondPageClick()
    // }
    // var thirdPageClick = async () => {
    //     var url = await browser.getUrl()
    //     if(url.includes('shop/bag')){
    //         try {
    //             btn = await browser.$('html')
    //             try{
    //                 var html = await btn.getHTML()
    //                 if(html.includes('503'))
    //                     await browser.refresh()
    //             } catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('select[data-autom="item-quantity-dropdown"]  > option:nth-child(2)')
    //             try {
    //                 await btn.click()
    //             } catch(err){
    //                 console.log(err)
    //             }
    //             btn = await browser.$('button[data-autom="checkout"]')
    //             try {
    //                 await btn.click()
    //             } catch(err){
    //                 console.log(err)
    //             }
    //         } catch(err){
    //             console.warn(err)
    //         }
    //     } else {
    //         return
    //     }
    //     await thirdPageClick()
    // }
    // var fourthPageClick = async () => {
    //     var url = await browser.getUrl()
    //     if(url.includes('shop/signIn')){
    //         try {
    //             btn = await browser.$('html')
    //             try{
    //                 var html = await btn.getHTML()
    //                 if(html.includes('503'))
    //                     await browser.refresh()
    //             } catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('button[data-autom="guest-checkout-btn"]')
    //             try {
    //                 await btn.click()
    //             } catch(err){
    //                 console.log(err)
    //             }
    //         } catch(err){
    //             console.warn(err)
    //         }
    //     } else {
    //         return
    //     }
    //     await fourthPageClick()
    // }
    // var fifthPageClick = async () => {
    //     var url = await browser.getUrl()
    //     if(url.includes('Fulfillment-init')){
    //         try {
    //             btn = await browser.$('html')
    //             try{
    //                 var html = await btn.getHTML()
    //                 if(html.includes('503'))
    //                     await browser.refresh()
    //             } catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('input[value="RETAIL"]')
    //             try {
    //                 tmp_value = await btn.isSelected()
    //                 if(tmp_value == false)
    //                     await btn.click()
    //             } catch(err){
    //                 console.log(err)
    //             }
    //             btn = await browser.$('input[name="searchInput"]')
    //             try {
                    
    //                 tmp_value = await btn.getValue()
    //                 if(tmp_value.length == 0)
    //                     await btn.setValue('Central')
    //             } catch(err){
    //                 console.log(err)
    //             }
    //             btn = await browser.$('button[data-autom="checkout-cityState-apply"]')
    //             try {
    //                 tmp_value = await btn.isSelected()
    //                 if(tmp_value == false) 
    //                     await btn.click().then(async done => {
    //                         await browser.pause(timeToWait)
    //                     })
    //             } catch(err){
    //                 console.log(err)
    //             }
    //             btn = await browser.$$('input[name="checkout.fulfillment.pickupTab.pickup.storeLocator-storeName"]:enabled')[0]
    //             try {
    //                 tmp_value = await btn.isSelected()
    //                 if(tmp_value == false)
    //                     await btn.click()
    //             } catch(err){
    //                 console.log(err)
    //             }
    //             btn = await browser.$$('input[name="pickupdate"]:enabled')[0]
    //             try {
    //                 tmp_value = await btn.isSelected()
    //                 if(tmp_value == false)
    //                     await btn.click()
    //             } catch(err){
    //                 console.log(err)
    //             }
    //             btn = await browser.$('select[aria-labelledby="timeWindows_label"]:enabled option:nth-child(2)')
    //             try {
    //                 await btn.click()
    //             } catch(err){
    //                 console.log(err)
    //             }
    //             btn = await browser.$('button[data-autom="fulfillment-continue-button"]')
    //             try {
    //                 tmp_value = await btn.isSelected()
    //                 if(tmp_value == false)
    //                     await btn.click()
    //             } catch(err) {
    //                 console.log(err)
    //             }
    //         } catch(err){
    //             console.warn(err)
    //         }
    //     } else {
    //         return
    //     }
    //     await fifthPageClick()
    // }
    // var sixthPageClick = async () => {
    //     var url = await browser.getUrl()
    //     if(url.includes('PickupContact-init')){
    //         try {
    //             btn = await browser.$('html')
    //             try{
    //                 var html = await btn.getHTML()
    //                 if(html.includes('503'))
    //                     await browser.refresh()
    //             } catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('input[name="firstName"]')
    //             try {
    //                 tmp_value = await btn.getValue()
    //                 if(tmp_value.length == 0)
    //                     await btn.setValue('HINGSANG')
    //             }catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('input[name="lastName"]')
    //             try{
    //                 tmp_value = await btn.getValue()
    //                 if(tmp_value.length == 0)
    //                     await btn.setValue('WONG')
    //             }catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('input[name="emailAddress"]')
    //             try{
    //                 tmp_value = await btn.getValue()
    //                 if(tmp_value.length == 0)
    //                     await btn.setValue('hswongan@connect.ust.hk')
    //             }catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('input[name="mobilePhone"]')
    //             try{
    //                 tmp_value = await btn.getValue()
    //                 if(tmp_value.length == 0)
    //                     await btn.setValue('51604525')
    //             }catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('button[data-autom="continue-button-label"]')
    //             try {
    //                 tmp_value = await btn.isSelected()
    //                 if(tmp_value == false)
    //                     await btn.click().then(async done => {
    //                         await browser.pause(timeToWait)
    //                     })
    //             } catch(err){
    //                 console.warn(err)
    //             }
    //         }catch(err){
    //             console.warn(err)
    //         }
    //     } else {
    //         return
    //     }
    //     await sixthPageClick()
    // }
    // var seventhPageClick = async () => {
    //     var url = await browser.getUrl()
    //     if(url.includes('Billing-init')){
    //         try {
    //             btn = await browser.$('html')
    //             try{
    //                 var html = await btn.getHTML()
    //                 if(html.includes('503'))
    //                     await browser.refresh()
    //             } catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('input[name="checkout.billing.billingOptions.selectBillingOption"]')
    //             try {
    //                 tmp_value = await btn.isSelected()
    //                 if(tmp_value == false)
    //                     await btn.click()
    //             }catch(err){
    //                 console.warn(err)
    //             }
    //             Promise.all([
    //                 await checkElementExists('.as-creditcard-address-subheader')
    //             ])
    //             btn = await browser.$('input[data-autom="card-number-input"]')
    //             try {
    //                 tmp_value = await btn.getValue()
    //                 if(tmp_value.length == 0)
    //                     await btn.setValue('4557281006760909')
    //             }catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('input[data-autom="expiration-input"]')
    //             try {
    //                 tmp_value = await btn.getValue()
    //                 if(tmp_value.length == 0)
    //                     await btn.setValue('0324')
    //             }catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('input[data-autom="security-code-input"]')
    //             try {
    //                 tmp_value = await btn.getValue()
    //                 if(tmp_value.length == 0)
    //                     await btn.setValue('999')
    //             }catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('input[name="firstName"]')
    //             try {
    //                 tmp_value = await btn.getValue()
    //                 if(tmp_value.length == 0)
    //                     await btn.setValue('HINGSANG')
    //             }catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('input[name="lastName"]')
    //             try {
    //                 tmp_value = await btn.getValue()
    //                 if(tmp_value.length == 0)
    //                     await btn.setValue('WONG')
    //             }catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('input[name="street"]')
    //             try {
    //                 tmp_value = await btn.getValue()
    //                 if(tmp_value.length == 0)
    //                     await btn.setValue('Wah Hing House, Wah Fu Estate,HK')
    //             }catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('input[name="street2"]')
    //             try {
    //                 tmp_value = await btn.getValue()
    //                 if(tmp_value.length == 0)
    //                     await btn.setValue('2031 flat')
    //             }catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('button[data-autom="continue-button-label"]')
    //             try {
    //                 tmp_value = await btn.isSelected()
    //                 if(tmp_value == false)
    //                     await btn.click().then(async done => {
    //                         await browser.pause(timeToWait)
    //                     })
    //             }catch(err){
    //                 console.warn(err)
    //             }
    //             return
    //         }catch(err){
    //             console.warn(err)
    //         }
    //     } else {
    //         return
    //     }
    //     await seventhPageClick()
    // }
    // var eightPageClick = async () => {
    //     var url = await browser.getUrl()
    //     if(url.includes('Review')){
    //         try {
    //             btn = await browser.$('html')
    //             try{
    //                 var html = await btn.getHTML()
    //                 if(html.includes('503'))
    //                     await browser.refresh()
    //             } catch(err){
    //                 console.warn(err)
    //             }
    //             btn = await browser.$('button[data-autom="continue-button-label"]')
    //             try {
    //                 tmp_value = await btn.isSelected()
    //                 if(tmp_value == false)
    //                     await btn.click().then(async done => {
    //                         await browser.pause(timeToWait * 10).then(async done =>{
    //                             await browser.deleteSession()
    //                         })
    //                     })
    //             }catch(err){
    //                 console.warn(err)
    //             }
    //         }catch(err){
    //             console.warn(err)
    //         }
    //     } else {
    //         return
    //     }
    //     await eightPageClick()
    // }



    // await firstPageClick().then(async done => {
    //     await secondPageClick().then(async done => {
    //         await thirdPageClick().then(async done => {
    //             await fourthPageClick().then(async done => {
    //                 await fifthPageClick().then(async done => {
    //                     await sixthPageClick().then(async done => {
    //                         await seventhPageClick().then(async done => {
    //                             await eightPageClick().then(async done =>{
    //                             })
    //                         })
    //                     })
    //                 })
    //             })
    //         })
    //     })
    // })
}
 
 

var randomTextArr = [ 

    'I Love Lyan BBG', 

    'Lyan is My Pig', 

    'My Wife Lyan, I Love You!!' 

] 

 
 

var getRandomInt = async(max) => { 

    return await Math.floor(Math.random() * max); 

  } 

 
 

var TGChatIds = [ 

] 

 
 

var TGMessageIds = [ 

 
 

] 

 
 

// await getPhoneFamilyFunc() 

 
 

const MyTGApp = new telegraf.Telegraf('2022326396:AAFPFWDEGbcByCtjTw8vTZ83S2ijSAEsPkg') 

 
 

var makeDynamicKeyboard = async (phoneIndex) => { 

    var inlineMessageKeyboard = telegraf.Markup 

    .inlineKeyboard([ 

        telegraf.Markup.button.callback('Buy','/ipurchase ' + phoneIndex) 

    ]) 

    return inlineMessageKeyboard 

} 

// var inlineMessageKeyboard = telegraf.Telegraf.Markup.inlineKeyboard([ 

//     telegraf.Telegraf.Markup.callbackButton('Buy','/ipurchase') 

// ]).extra() 

var pushChatId = async (id) => { 

    if(TGChatIds.indexOf(id) < 0){ 

        TGChatIds.push(id) 

        // ctx.reply(`Your chat Id ${id} has been added onto the list successfully`) 

        // TGChatIds.forEach(async(ele,idx) =>{ 

        //     // ctx.reply(`${idx} ${ele} would be used to send message`) 

        // }) 

    }  

    // else { 

    //     ctx.reply('Your chat id has already been added onto the list, please wait for your surprise') 

    // } 

} 

MyTGApp.hears('check', (ctx) => ctx.reply('The App is Running!')) 

MyTGApp.hears('configure',async (ctx) => { 

    // console.log(`The existence of ${ctx.chat.id} is : ${TGChatIds.indexOf(ctx.chat.id)}`) 

    await pushChatId(ctx.chat.id)     

}) 

MyTGApp.command('help',async (ctx) => { 

    ctx.reply(`If you want to configure your chat to receive message, please type configure\n 

                    If you want to health check the app, please type check to get response\n 

                    If you want the list of the IPhone list, please type ipurchase`) 

}) 

MyTGApp.hears('ipurchase',async(ctx)=>{ 

    ctx.reply(`We have heard your voice, your voice is : ${ctx.message.text}`) 

    var message = '' 

    phoneData.forEach(async (val, idx) => { 

        message += `${idx} for ${phoneData[idx].productTitle}\n` 

    }) 

    ctx.reply(message) 

}) 

MyTGApp.command('ipurchase', async (ctx)=>{ 

    if(ctx.message.text.split(' ')[1] == undefined){ 

        ctx.reply('Please pass arguments') 

    } else { 

        ctx.reply(`The option sent is ${ctx.message.text.split(' ')[1]}`) 

        var productOption = ctx.message.text.split(' ')[1] 

        ctx.reply(`The option you have called is ${productOption} and the corresponding iPhone is ${phoneData[productOption].productTitle}`) 

        ctx.reply(`The bot will become busy in 5 minutes, expected time to finish is ${moment().add(5,'minutes').format("YYYY-MM-DD HH:mm:ss")}`) 

        // await childProcess.exec(`cd D:\\Users\\imctw\\Downloads\\WebDriverIO && node . ${phoneData[productOption].productLink} ${phoneData[productOption].productTitle}`) 

    } 

}) 

MyTGApp.command('sendLove',async(ctx)=>{ 

    try{ 

        MyTGApp.telegram.sendMessage(TGChatIds.filter(x => x!=ctx.chat.id)[0],`Your BBG has sent you : ${ctx.message.text.split(',')[1]}`) 

        ctx.reply(`The message has been set, please enjoy her reaction`) 

    } catch(err){ 

        console.error(err) 

    } 

}) 

// MyTGApp.command('amuse_me', async (ctx) => { 

//     ctx.repl 

// }) 

MyTGApp.start(async (ctx) => { 

    ctx.reply(`Welcome to use Tony BBG Telegram Bot`) 

    // console.log(ctx.chat.id) 

    ctx.reply(`Your Chat Id is : ${ctx.chat.id}`) 

    var messageId = await ctx.reply(`This chat will be used to update the IPhone availability`) 

    TGMessageIds.push(messageId.message_id) 

    await pushChatId(ctx.chat.id) 

}) 

MyTGApp.help((ctx) => { 

    ctx.reply(`To make sure you know how to use the App\nType /help to see it`) 

}) 

 
 

MyTGApp.on('callback_query', async (ctx) => { 

    const action = ctx.callbackQuery.data 

    ctx.reply(`The option sent is ${action.split(' ')[1]}`) 

    ctx.reply(`The option you have called is ${action.split(' ')[1]} and the corresponding iPhone is ${phoneData[action.split(' ')[1]].productTitle}`) 

    ctx.reply(`The bot will become busy in 5 minutes, expected time to finish is ${moment().add(5,'minutes').format("YYYY-MM-DD HH:mm:ss")}`) 

    // await childProcess.exec(`cd D:\\Users\\imctw\\Downloads\\WebDriverIO && node . ${phoneData[action.split(' ')[1]].productLink} ${phoneData[action.split(' ')[1]].productTitle}`) 

    // ctx.reply(`The callback data is : ${action}`) 

    ctx.reply(`The product ${phoneData[action.split(' ')[1]].productTitle} purchase is ready`) 

}) 

 
 

MyTGApp.launch() 

 
 

// MyTGApp.telegram.sendMessage('289545066','Testing') 

// MyTGApp.telegram.sendMessage('215469301','Testing') 

 
 

var sendSurpriseFunc = async() => { 

    var tmp_index = await getRandomInt(randomTextArr.length) 

    TGChatIds.forEach(async(ele,idx) => { 

        try{ 

            MyTGApp.telegram.sendMessage(ele,`It's time to say something to my BBG Lyan`) 

            MyTGApp.telegram.sendMessage(ele,`The suprise is`) 

            MyTGApp.telegram.sendMessage(ele,randomTextArr[tmp_index]) 

        } catch(err){ 

            console.error(err) 

        } 

         

    }) 

} 

 
 

const sendSuprise = nodeSchedule.scheduleJob('*/30 * * * *',async()=>{ 

    await sendSurpriseFunc() 

}) 

 
 

var checkPhoneAvailabilityFunc = async (ele) => { 

    await fetch(`https://www.apple.com/hk/shop/fulfillment-messages?pl=true&parts.0=${ele.partNumber}&location=Central` 

        // "credentials": "include", 

        // "headers": { 

        //     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:93.0) Gecko/20100101 Firefox/93.0", 

        //     "Accept": "*/*", 

        //     "Accept-Language": "en-GB,en;q=0.5", 

        //     "Sec-Fetch-Dest": "empty", 

        //     "Sec-Fetch-Mode": "cors", 

        //     "Sec-Fetch-Site": "same-origin" 

        // }, 

        // "mode": "cors" 

    ) 

    .then(async PhoneAvailabilityReponse => { 
        return await PhoneAvailabilityReponse.json() 
    }) 
    .then(async PhoneAvailabilityReponseJSON => { 
        PhoneAvailabilityReponseJSON.body.content.pickupMessage.stores.forEach(async ele1 => { 
            var productKey = Object.keys(ele1.partsAvailability)[0] 
            if(ele1.partsAvailability[productKey] != undefined){ 
                var productSelectible = ele1.partsAvailability[productKey].storeSelectionEnabled 
                phoneData.filter(x => x.partNumber == ele.partNumber)[0].avialable = productSelectible 
                    var tmp_message = ''
                    phoneData.filter(x => x.avialable == true).forEach(async (val2,idx2)=>{ 

                        tmp_message += `${val2.productTitle} : ${val2.avialable}\n` 
                        if(val2.called == false){
                            // await purchaseIPhone(val2.productLink, val2.productTitle)
                            val2.called = true
                        }

                    })
                    if(productSelectible == false){
                        phoneData.filter(x => x.partNumber == ele.partNumber)[0].called = false
                    }
                    TGChatIds.forEach(async (val,idx) => { 

                        try{ 

                            TGMessageIds.forEach(async (val1,idx1) => { 

                                if(tmp_message.length > 0 && tmp_message != null){ 

                                    try{ 

                                        await MyTGApp.telegram.editMessageText(val,val1,null,tmp_message ) 
                                        await MyTGApp.telegram.sendMessage(val,`iphone is avaiable`)

                                    } 

                                    catch(err) 

                                    { 

                                        console.error(err) 

                                    } 

                                } 

                            }) 

                            // MyTGApp.telegram.sendMessage(val, `The link is ${ele.productLink}`) 

                            // MyTGApp.telegram.sendMessage(val, `/ipurchase ${phoneData.indexOf(phoneData.filter(x => x.partNumber == ele.partNumber)[0])}`, (await makeDynamicKeyboard(phoneData.indexOf(phoneData.filter(x => x.partNumber == ele.partNumber)[0]))))     

                        } catch(err){ 

                            console.error(err) 

                        } 

                    })
            } 
        }) 
        // fs.writeFileSync(`./data/Availability/PhoneData${ele.productTitle}.json`, JSON.stringify(PhoneAvailabilityReponseJSON)) 

    }) 

    .catch(err => { 

        // console.warn(err) 

    }) 

} 

 
 

setInterval(() => { 
    phoneData 
        .map(async ele => { 
            return await checkPhoneAvailabilityFunc(ele) 
        }) 
},500) 

//  await getPhoneFamilyFunc()
 

// setTimeout(() => { 

//     // await browser.deleteSession(sessionList[0]) 

//     sessionList = [] 

// },44 * 1000) 

 
 
 

// const PhonePurchaseJob = nodeSchedule.scheduleJob('58,13,28,43 * * * *', async ()=>{ 

//     try { 

//         TGChatIds.forEach( async(val,idx) => { 

//             MyTGApp.telegram.sendMessage(val,`The scheduled job for purhcase has run at ${moment().format("YYYY-MM-DD HH:mm:ss")}`) 

//             await purchaseIPhone(phoneData[1].productLink, phoneData[1].productTitle) 

//             await purchaseIPhone(phoneData[30].productLink, phoneData[30].productTitle) 

//         }) 

//     } catch(err) { 

//         console.error(err) 

//     } 

     

// }) 


 