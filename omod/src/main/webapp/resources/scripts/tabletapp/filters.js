angular.module('filters', [])

    // shortens ward name
    .filter('ward', function() {
        return function (input) {
            if (!input) {
                return "";
            }
            var output = input.replace(" Ward", "");
            var output = input.replace("Ward ", "");
            var output = output.replace("#", "");
            var output = output.replace("Confirmed", "Conf");
            var output = output.replace("Suspect", "Susp");
            var output = output.replace("Recovery", "Rec");
            return output
        }
    })

    // shortens bed name
    .filter('bed', function() {
        return function (input) {
            if (!input) {
                return "";
            }
            var output = input.replace("Bed", "");
            var output = output.replace("#", "");
            return output
        }
    })

    // currently applies both bed and ward filters, but may be changed independently
    .filter('backButton', function(bedFilter, wardFilter) {
        return function (input) {
            return bedFilter(wardFilter(input));
        }
    })

    .filter('lastGiven', function(dateFilter) {
        return function(scheduledDose) {
            if (!scheduledDose) {
                return "No dose recorded";
            }
            var output = "";
            if (scheduledDose.status == 'FULL') {
                output += "Fully Given";
            } else if (scheduledDose.status == 'PARTIAL') {
                output += "Partially Given";
            } else if (scheduledDose.status == 'NOT_GIVEN') {
                output += "Not Given";
            } else {
                output += scheduledDose.status;
            }
            output += " " + dateFilter(new Date(scheduledDose.dateCreated), "d-MMM H:mm");
            if (scheduledDose.reasonNotAdministeredNonCoded) {
                output += " (" + scheduledDose.reasonNotAdministeredNonCoded + ")";
            }
            return output;
        }
    });