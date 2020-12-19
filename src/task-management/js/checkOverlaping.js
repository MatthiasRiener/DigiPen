var r1 = {
    start: new Date("2/4/2001"),
    end: new Date("7/1/2002")
};

var r2 = {
    start: new Date("7/2/2002"),
    end: new Date("2/4/2003")
};

// start date overlaps with end date of previous
var r3 = {
    start: new Date("2/4/2003"),
    end: new Date("5/12/2007")
};

var ranges = [r1, r3, r2];

var output = overlap(ranges);
console.log(output);
// this function takes an array of date ranges in this format:
// [{ start: Date, end: Date}]
// the array is first sorted, and then checked for any overlap

function overlap(dateRanges) {
    var sortedRanges = dateRanges.sort((previous, current) => {

        return previous.start.getTime() - current.start.getTime();

    });

    var result = sortedRanges.reduce((result, current, idx, arr) => {
        // get the previous range
        if (idx === 0) {
            return result;
        }
        var previous = arr[idx - 1];

        // check for any overlap
        var previousEnd = previous.end.getTime();
        var currentStart = current.start.getTime();
        var overlap = (previousEnd >= currentStart);

        // store the result
        if (overlap) {
            // yes, there is overlap
            result.overlap = true;
            // store the specific ranges that overlap
            result.ranges.push({
                previous: previous,
                current: current
            })
        }

        return result;

        // seed the reduce  
    }, {
        overlap: false,
        ranges: []
    });


    // return the final results  
    return result;
}