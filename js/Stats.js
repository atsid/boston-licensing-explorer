//stats on data
(function (scope) {

    scope.atsid = scope.atsid || {};
    scope.atsid.Stats = function (keys) {

        this.keys = keys;

        //run some basic stats against the dataset, for each key specified
        this.run = function (data) {

            this.data = data;
            this.stats = {};
            this.keys.forEach(function (key) {
                this.stats[key] = {
                    count: 0,
                    sum: 0,
                    min: 1000000, //?
                    max: -1000000 //?
                };
            }, this);

            Object.keys(data).forEach(function (geoid) {
                var item = data[geoid];
                this.keys.forEach(function (key) {
                    var stat = this.stats[key],
                        val = item[key];
                    if (val) { //some census data is missing
                        val = parseInt(val);
                        stat.count += 1;
                        stat.min = Math.min(stat.min, val);
                        stat.max = Math.max(stat.max, val);
                        stat.sum += val;
                    }
                }, this);
            }, this);

            this.keys.forEach(function (key) {
                this.stats[key].avg = this.stats[key].sum / this.stats[key].count;
            }, this);

        };

    };

})(this);