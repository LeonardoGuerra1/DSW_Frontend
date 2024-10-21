export const BASE_URL = "http://localhost:8090"

export const get = async (url) => {
  let result = [null, null]
  try {
    const response = await fetch(url)
    if (!response.ok) {
      result[1] = {
        status: response.status,
        message: `Error: ${response.statusText}` //...
      }
      return result
    }
    
    const data = await response.json()
    // console.log(data);
    result[0] = data.object
    return result
  }
  catch (ex) {
    result[1] = {
      status: 500,
      message: "Internal error.",
      ex
    }
    return result
  }
}

export const post = async (url, body) => {
  let result = [null, null]
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body
    })

    if (!response.ok) {
      result[1] = {
        status: response.status,
        message: `Error: ${response.statusText}` //...
      }
      return result
    }

    const data = await response.json()
    // console.log(data);
    result[0] = data
    return result
  }
  catch (ex) {
    result[1] = {
      status: 500,
      message: "Internal error.",
      ex
    }
    return result
  }
}