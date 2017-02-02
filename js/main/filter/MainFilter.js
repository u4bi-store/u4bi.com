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
      x == '' ? result = 'rgba(220, 220, 220, 0.4)' : result = 'rgba(255, 20, 147, 0.4)';
      return result;
    };
}

function minigamecolor(){
    return function(x){
      var result = null;
      x == '' ? result = 'rgba(220, 220, 220, 0.4)' : result = 'rgba(255, 20, 147, 0.4)';
      return result;
    };
}

function typePagingColor(){
    return function(x,bool){
      if(bool && x == 3 || !bool && x == 0) return 'rgba(220, 220, 220, 0.4)';
    };
}


function prnePagingColor(){
    return function(x, len){
      if(x == -1|| x >= len) return 'rgba(220, 220, 220, 0.4)';
    };
}

function listPagingColor(){
    return function(x, page, len){
      if(page >= len) return 'rgba(220, 220, 220, 0.4)';
      if(x == page) return 'rgba(255, 20, 147, 0.8)';
    };
}

app.filter('minigamecolor', minigamecolor);
app.filter('musiccolor', musiccolor);
app.filter('mouseover', mouseover);
app.filter('typePagingColor', typePagingColor);
app.filter('prnePagingColor', prnePagingColor);
app.filter('listPagingColor', listPagingColor);