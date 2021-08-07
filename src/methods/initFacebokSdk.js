export function initFacebookSdk() {
  return new Promise((resolve) => {
    // facebook sdk inicia antes que react app
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FB_ID,
        cookie: true,
        xfbml: true,
        version: "v11.0",
      });

      // autenticacion automatica con la api si esta logueado con facebook
      window.FB.getLoginStatus((response) => {
        if (response.authResponse) {
        } else {
          resolve();
        }
      });
    };

    //carga el script de facebook sdk
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });
}

export function statusChange(response) {
  if (response.status === "connected") {
    window.FB.api(
      "/me?fields=email,id,first_name,last_name,name&transport=cors",
      function (response) {
        //console.log("initFB", response)
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.id,
            username: response.name,
            isAdmin: false,
            email: response.email,
            name: response.first_name,
            lastname: response.last_name,
          })
        );
      }
    );
  }
}
