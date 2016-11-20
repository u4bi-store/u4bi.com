function template(){
    return{
        templateUrl: function(element, attrs) {
            return 'views/main/template/'+attrs.type+'.html';
        }
    };
}
function gameWrap(){
    return{
        templateUrl: function(element, attrs) {
            return 'views/main/template/game/'+attrs.type+'.html';
        }
    };
}

app.directive('template',template);
app.directive('gameWrap',gameWrap);