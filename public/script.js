async function loadDoc() {
  try {
    let url = document.getElementById("url").value;
    //alert(url);
    if (url === "") {
      alert("Please enter text!");
    } else {
        let data = await postAjax("http://localhost:3000/any-url", "POST", {
        url: url
      });
      //debugger;
      document.getElementById("last-h1").innerHTML = `Last H1 Content: ${data.lastH1}` ;
      document.getElementById("url").value = "" ;
    }
  } catch(error) {
    console.error("Error: " + error);
  }
}

function postAjax(url, method, data) {
  return $.ajax({
    url: url,
    method: method,
    data: data,
    dataType: "json"
  });
}
