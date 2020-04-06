'use strict';

const exec = require('cordova/exec');

function SSLCertificateChecker () 
{
}

SSLCertificateChecker.prototype.check = function (serverURL, allowedSHA1FingerprintOrArray, allowedSHA1FingerprintAlt) 
{
    return new Promise
    (
        function (resolve, reject) 
        {  
            // if an array is not passed, transform the input into one
            let fpArr = [];
            if (allowedSHA1FingerprintOrArray !== undefined) 
            {
                if (typeof allowedSHA1FingerprintOrArray == 'string') 
                {
                    fpArr.push(allowedSHA1FingerprintOrArray);
                }
                else 
                {
                    fpArr = allowedSHA1FingerprintOrArray.slice(0);
                }
            }

            if (allowedSHA1FingerprintAlt !== undefined) 
            {
                fpArr.push(allowedSHA1FingerprintAlt);
            }

            exec
            (
                () => { resolve(); }, 
                (error) => { reject(error); }, 
                'SSLCertificateChecker', 
                'check', 
                [serverURL, false, fpArr]
            );
        }
    );
};

const sslCertificateChecker = new SSLCertificateChecker();
module.exports = sslCertificateChecker;
