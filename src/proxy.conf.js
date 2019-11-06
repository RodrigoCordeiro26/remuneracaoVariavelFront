const PROXY_CONFIG=[
   {
       context:['/api'],
       target:'http://localhost:8088',
       secure: true,
       logLevel:'debug',
       pathRewrite:{'^/api': ''}
   }

];