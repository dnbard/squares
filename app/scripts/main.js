$(document).ready(function(){
    var app = $('#app');

    app.show();

    var level = new Level(app.find('.level'), 1),
        timer = new Timer(app.find('.timer')),
        record = new Record(app.find('.record'));
});
