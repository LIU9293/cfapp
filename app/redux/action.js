/*
 * this is the file that contains app action create function
 */

const login = (Userid) => {
  return {
    type: "LOG_IN",
    userid: Userid
  }
}

const logout = () => {
  return {
    type: "LOG_OUT",
  }
}
