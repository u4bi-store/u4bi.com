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

function miniWrap(){
    return{
        templateUrl: function(element, attrs) {
            return 'views/main/template/game/minigame/'+attrs.type+'.html';
        }
    };
}

app.directive('template',template);
app.directive('gameWrap',gameWrap);
app.directive('miniWrap',miniWrap);