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

function pagingcolor(){
    return function(x,bool){
      var result = null;
      
      if(bool && x == 3 || !bool && x == 0) return '#9c9c9c';
      result = '##9c9c9c';
      return result;
    };
}

app.filter('musiccolor', musiccolor);
app.filter('mouseover', mouseover);
app.filter('pagingcolor', pagingcolor);