function Timer(element){
    var self = this;

    this.element = element;
    this.time = null;
    this.timeoutToken = null;
    this.init();

    this.timerValue = 0;
    this.timerInterval = 25;

    PubSub.subscribe(events.LEVEL.START, function(){
        self.init();
        self.timeoutToken = setInterval(function(){
            self.timerValue += self.timerInterval / 1000;
            self.time.find('.value').text(self.timerValue.toFixed(2) + 's');
        }, self.timerInterval);
    });

    PubSub.subscribe(events.LEVEL.FINISH, function(event, levelInfo){
        var previousRecord = parseFloat(localStorage.getItem(levelInfo.level) || 9999999999);

        if (previousRecord && levelInfo.time < previousRecord){
            localStorage.setItem(levelInfo.level, levelInfo.time);
        }
    });

    PubSub.subscribe(events.LEVEL.COMPLETE, function(){
        clearInterval(self.timeoutToken);
    });
}

Timer.prototype.init = function(){
    this.element.empty();

    this.time = $('<div class="time"></div>');
    this.element.append(this.time);
    this.time.append('<span class="label">Time:</span>');
    this.time.append('<span class="value">0.0s</span>');

    this.timerValue = 0;
}
