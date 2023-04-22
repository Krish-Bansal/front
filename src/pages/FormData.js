import axios from 'axios';
import React, { useEffect, useState } from 'react'

const FormData = () => {


  const [html, setHTML] = useState({ __html: "" });
  const getData = async () => {
    try {
      const response = await axios.get("https://test-pay.khalti.com", {
        headers: {
          Authorization: "Key test_secret_key_9e7b8f7a84114c8285901c6fcb00ddf2"
        }
      });
      console.log(response);
    } catch (err) {
      console.log(err);

    }
  }

  useEffect(() => {
    getData();
    // async function createMarkup() {
    //   let response;
    //   response = await axios.get("https://pay.khalti.com", {
    //     headers: {
    //       Authorization: "Key test_secret_key_9e7b8f7a84114c8285901c6fcb00ddf2"
    //     }

    //   })
    //   console.log(response.data);
    //   const backendHtmlString = await response.text()

    //   console.log(backendHtmlString)
    //   return { __html: backendHtmlString };
    // }
    // createMarkup().then(result => setHTML(result));
  }, []);


  return <div dangerouslySetInnerHTML={html} />;
}


export default FormData