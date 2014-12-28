function Record(element){
    var self = this;

    this.element = element;

    this.init(1);

    PubSub.subscribe(events.LEVEL.FINISH, function(event, info){
        var levelNumber = info.level + 1;
        self.init(levelNumber);
    });
}

Record.prototype.init = function(levelNumber){
    var recordValue = parseFloat(localStorage.getItem(levelNumber) || 0);

    this.element.empty();

    if (recordValue){
        this.element.append('<span class="label">Record:</span>');
        this.element.append('<span class="value"></span>');
        this.element.find('.value').text(recordValue.toFixed(2) + 's');
    }
}
