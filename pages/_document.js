// In case anyone else needs this, here's what I done to add FB Messenger code to my NextJS app - As mentioned before, you need to drop the plugin code into `_document.js` and modify `script` tag

import Document, { Html, Head, Main, NextScript } from 'next/document';
import { FACEBOOK_APP_ID, FACEBOOK_CUSTOMER_PAGE_ID } from 'lib/constants';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
        {/* In future, you need to change pageID and app ID */}
        <div className="fb-customerchat" page_id={FACEBOOK_CUSTOMER_PAGE_ID} minimized="true"></div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
    window.fbAsyncInit = function() {
        FB.init({
            appId            : ${FACEBOOK_APP_ID},
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.11'
        });
    };
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
`,
          }}
        />
      </Html>
    );
  }
}
