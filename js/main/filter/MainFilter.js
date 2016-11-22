function mouseover(){
    return function(x,bool){
      var result = null;
      bool ? result = x+'!' : result = x;
      return result;
    };
}

function musiccolor(){
    return function(x){
      var result = null;
      x == '' ? result = '#9c9c9c' : result = '#6596eb';
      return result;
    };
}

app.filter('musiccolor', musiccolor);
app.filter('mouseover', mouseover);