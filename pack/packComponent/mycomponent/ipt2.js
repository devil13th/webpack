import $ from "jquery";
function csl(x) {
  console.log("ipt2:" + x);
  $(document.body).append($(`<div>${x}</div>`));
}

export { csl as csl };
