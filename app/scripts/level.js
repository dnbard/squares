function Level(element, levelNumber){
    element.empty();

    this.base = this.calculateLevelBase();
    this.digit = 0;
    this.raw = this.provide(levelNumber);
    this.element = element;
    this.blockCount = this.calculateBlockCount(levelNumber);
    this.timestamp = null;

    this.build();

    element.on((document.ontouchstart!==null)?'click':'touchstart', '.block', _.bind(function(event){
        var target = $(event.target),
            value = target.attr('data-value') || 0,
            maxValue = _(element.find('.block')).map(function(el){
                return $(el).attr('data-value') || 0;
            }).max().value(),
            newValue;

        if (!value || value === '0'){
            return;
        }

        if (parseInt(value) < parseInt(maxValue)){
            target.addClass('error');
            setTimeout(function(){
                target.removeClass('error');
            }, 250);
            return;
        }

        if (!this.timestamp){
            this.timestamp = new Date();
        }

        this.blockCount --;
        newValue = parseInt(value) - 1;

        target.removeClass('block' + value);

        if (newValue){
            target.addClass('block' + newValue);
            target.attr('data-value', newValue);
            target.text(this.calculateBlockText(newValue));
        } else {
            target.attr('data-value', 0);
            target.text('');
        }

        if (this.blockCount === 0){
            alert((new Date() - this.timestamp) / 1000 + 's');

            levelNumber ++;

            element.empty();

            this.base = this.calculateLevelBase();
            this.raw = this.provide(levelNumber);
            this.blockCount = this.calculateBlockCount(levelNumber);
            this.build();
            this.timestamp = null;
        }
    }, this));
}

Level.prototype.build = function(){
    var i = 0,
        row;

    _.each(this.raw, function(el){
        if (i === 0){
            row = $('<div class="row"></div>')
            this.element.append(row);
            i = this.digit;
        }

        if (el){
            row.append('<span data-value="' + el + '" class="block block' + el + '">'+ this.calculateBlockText(el) +'</div>');
        } else {
            row.append('<span class="block"></div>');
        }

        i--;
    }, this);
}

Level.prototype.provide = function(levelNumber){
    var digit = this.calculeDigitCount(levelNumber),
        array = [],
        counter = this.calculateBlockCount(levelNumber);

    this.digit = digit;

    for(var i = 0; i < digit; i++){
        for(var j = 0; j < digit; j++){
            array.push(0);
        }
    }

    for(var k = 0; k < counter; k++){
        i = parseInt(Math.random() * digit * digit);
        array[i] ++;
    }

    return array;
}

Level.prototype.calculateBlockCount = function(levelNumber){
    return levelNumber*levelNumber + 1;
}

Level.prototype.calculeDigitCount = function(levelNumber){
    return 4;
}

Level.prototype.calculateBlockText = function(blockValue){
    return Math.pow(this.base, blockValue);
}

Level.prototype.calculateLevelBase = function(){
    /*return parseInt(Math.random() * 4) + 2;*/
    return 2;
}
