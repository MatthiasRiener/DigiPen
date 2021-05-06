


function overlap(dateRanges) {
    var sortedRanges = sortDates(dateRanges)

    

    var result = sortedRanges.reduce((result, current, idx, arr) => {
        // get the previous range
        if (idx === 0) {
            return result;
        }
        var previous = arr[idx - 1];

        // check for any overlap
        var previousEnd = previous.end.getTime();
        var currentStart = current.start.getTime();
        var overlap = (previousEnd > currentStart);
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

function sortDates(dates) {
    return dates.sort((previous, current) => {
        return previous.start.getTime() - current.start.getTime();
    });

}