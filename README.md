
# ![logo](https://i.ibb.co/2d8HbJP/crypto.png) CryptoLearn API 

> REST API Server used in [CryptoLearn](https://birkagal.github.io/cryptolearn) web application for Block Mining
> and Keys Sign-Verify.

The project is built with NodeJS and Express using Routers.\
Mining is achived with  [`crypto-js`](https://www.npmjs.com/package/crypto-js) SHA256 cryptographic function and Keys are done with [`elliptic`](https://www.npmjs.com/package/elliptic) secp256k1 curve.

The server is hosted on [`render.com`](https://render.com/) and can be accessed @ [https://cryptolearn-api.herokuapp.com/](https://cryptolearn-api.onrender.com/)

## How to run locally
To run the server on your machine, clone this repo `https://github.com/birkagal/cryptolearn-api.git`

Open terminal window at the project directory an run 

    npm install

You can change the `port` variable at the `server.js` file.\
To run the server, use

    npm start
![running-example](https://i.ibb.co/hW05BZf/1.png)

## TODO

 - [ ] Add difficulty control functionality.


# REST API

The CryptoLearn REST API is described below.

## Get Server Description

`GET /`

    {
    "description":"This is REST API Server used for birkagal.github.io/cryptolearn",
    "github":"https://github.com/birkagal/cryptolearn-api",
    "client_github":"https://github.com/birkagal/cryptolearn"
    }

## Mine Data

`GET /mine/:data/:difficulty?`\
Data is parameter for the string of data to be mined.\
Difficulty is parameter for the number of leading zeroes to be mined. Default value is 4. To limit server usage, maximum value is 7.

    {
    "hash":"0000f727854b50bb95c054b39c1fe5c92e5ebcfa4bcb5dc279f56aa96a365e5a",
    "nonce":72608
    }

Response is an object containing mined hash and nonce value.

## Get Private Key

`GET /key/getpriv`

Private key value from the server.

    {
    "key":"62bc0c158a5f4ff71d14527575a624dac19b976c969a848636664d62447cd2e6"
    }


## Get Public Key

`GET /key/getpub`

Public key value from the server.

    {
    "key":"04b5b329b96674d788eb0bbcf6d68a155e5fb81d38af73b17da2c8f6f82f632d798ddfc9bd44d1bed68616cf87f08e92b6995a1f9cc7a5a13cfa3c5c3afc70fd82"
    }

## Update Server's Key-Pair

`GET /key/update/:key`\
Key is parameter for the new private key to generate key-pair from.

    {
    "priv":"62bc0c158a5f4ff71d14527575a624dac19b976c969a848636664d62447cd2e6"
    }
   
   Response is the given private key, updating key-pair at the server.

## Sign Data


`GET /key/sign/:data`\
Data is the data to be signed.

    {
    "signature":"30450220789616313f84292670371737ecdbde5ccd31225caf7e1ba1b818c00e090d92e80221009903b6bfd1dd83f3e0f6ae0406867aa1ed94448913347dc69b69dfcc0924e896"
    }
Response is the signature of the signed data.


## Verify Data Signature


`GET /key/verify/:pub/:signature/:data`\
Pub is the public key to use in verification.\
Signature is the data signature to be verified.\
Data is the signed data to use in verification.

    {
    "status":true
    }

Response is true/false boolean.


## Meta
Gal Birka - birkagal@gmail.com\
Distributed under the GNU General Public License v3.0. See LICENSE for more information.
