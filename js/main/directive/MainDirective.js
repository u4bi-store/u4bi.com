function template(){
    return{
        templateUrl: function(element, attrs) {
            return 'views/main/template/'+attrs.type+'.html';
        }
    };
}
app.directive('template',template);