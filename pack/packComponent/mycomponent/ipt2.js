import $ from 'jquery'
function csl(x){
    console.log(x)
    $("#root").html(x)
}

export {csl as csl}