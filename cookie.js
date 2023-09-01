//Cookie
const userObj = {likes: [], carted: [], quantity: [], clicked: 13};
generateCookie("user", userObj)
// currObj = 

export {generateCookie, getCookie, getUserDataFromCookie, create_UUID, updateUserDataInCookie, userObj};

function generateCookie(cookie_name, userObj) {
  let cookie = getCookie(cookie_name);
  if (cookie === null) {
      let cookie_id = create_UUID();
      let cookie_expiration = 365;
      const d = new Date();
      d.setTime(d.getTime() + cookie_expiration * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();

      // Set the cookie using the correct syntax
      document.cookie =
          cookie_name +
          "=" +
          cookie_id +
          "; " +
          expires +
          "; path=/";
      
      // Convert userObj to JSON string and store it as a separate cookie value
      let userObjString = JSON.stringify(userObj);
      document.cookie = cookie_name + "_data=" + encodeURIComponent(userObjString) + "; " + expires + "; path=/";
  }
}

function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) {
      return parts.pop().split(";").shift();
  }
  return null;
}

function getUserDataFromCookie(cookie_name) {
  let userDataCookieName = cookie_name + "_data";
  let userDataCookieValue = getCookie(userDataCookieName);

  if (userDataCookieValue !== null) {
      try {
          let decodedUserData = decodeURIComponent(userDataCookieValue);
          return JSON.parse(decodeURIComponent(userDataCookieValue));
      } catch (error) {
          console.error("Error parsing user data JSON:", error);
      }
  }
  return null;
}

function create_UUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

function updateUserDataInCookie(cookie_name, updatedUserData) {
  let cookieValue = getCookie(cookie_name);

  if (cookieValue !== null) {
      // Get the current user data cookie name
      let userDataCookieName = cookie_name + "_data";

      // Retrieve the existing user data from the cookie
      let existingUserData = getUserDataFromCookie(cookie_name);

      if (existingUserData !== null) {
          // Merge the existing user data with the updated user data
          let mergedUserData = { ...existingUserData, ...updatedUserData };

          // Convert the merged user data to a JSON string
          let mergedUserDataString = JSON.stringify(mergedUserData);

          // Update the user data cookie value
          document.cookie = userDataCookieName + "=" + encodeURIComponent(mergedUserDataString) + "; path=/";

          console.log("User data updated in cookie:", mergedUserData);
      }
  }
}