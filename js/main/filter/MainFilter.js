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

function typePagingColor(){
    return function(x,bool){
      if(bool && x == 3 || !bool && x == 0) return '#9c9c9c';
    };
}


function prnePagingColor(){
    return function(x, len){
      if(x == -1|| x >= len) return '#9c9c9c';
    };
}

function listPagingColor(){
    return function(x, page, len){
      if(page >= len) return '#9c9c9c';
      if(x == page) return '#1e63d9';
    };
}

app.filter('musiccolor', musiccolor);
app.filter('mouseover', mouseover);
app.filter('typePagingColor', typePagingColor);
app.filter('prnePagingColor', prnePagingColor);
app.filter('listPagingColor', listPagingColor);