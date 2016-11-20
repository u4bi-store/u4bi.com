function mouseover(){
    return function(x,bool){
      var result = null;
      bool ? result = x+'!' : result = x;
      return result;
    };
}

app.filter('mouseover', mouseover);