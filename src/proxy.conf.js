const PROXY_CONFIG=[
   {
       context:['/api'],
       target:'C:\\Users\\user\\Downloads',
       secure: true,
       logLevel:'debug',
       pathRewrite:{'^/api': ''}
   }

];
module.exports = PROXY_CONFIG;