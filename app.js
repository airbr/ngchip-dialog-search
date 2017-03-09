angular.module('chipDialogSearch',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

    .controller('AppCtrl', function($scope, $mdDialog) {

        $scope.answerCollection = [];

        $scope.status = ' ';

        /* Set to true for full screen mobile testing of dialogs by default. */
        $scope.customFullscreen = true;

        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'dialog1.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function(answer) {
                    $scope.answerCurrent = answer;
                    $scope.answerCollection.push(answer);
                }, function() {
                    $scope.status = 'Exit';

                });
        };

        $scope.showPrerenderedDialog = function(ev) {

            $mdDialog.show({
                contentElement: '#devConsole',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };

        function DialogController($scope, $mdDialog) {

            $scope.hide = function() {
                console.log("hide");
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                console.log("cancel");
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                console.log("answer");
                $mdDialog.hide(answer);
            };
        }

    });

(function () {
    'use strict';
    angular
        .module('chipDialogSearch')
        .controller('CustomInputCtrl', chipCtrl);

    function chipCtrl ($timeout, $q, $scope, $mdDialog) {

        var self = this;

        /* Ng Material Chips directive properties */
        self.readonly = false;
        self.autocompleteDemoRequireMatch = false;
        self.removable = false;

        self.selectChip = function(chip) {
            var selectedChips = self.selectedChips;
            if (selectedChips.indexOf(chip) == -1) {
                selectedChips.push(chip);
            } else {
                selectedChips.pop(chip);
            }
        }

        /* SEARCH & Filtering */

        // Array of Selected Chips within Modal
        self.selectedChips = [];
        // Selected item from autocomplete init
        self.selectedItem = null;
        // Current search text within any autocomplete
        self.searchText = null;
        // Array of Suggested items that have been selected
        // self.selectSuggest = [];

        // Define query - possibly define multiple here
        self.querySearchExample = querySearchExample;

        /* 1. Example. This is one chip-dialog-search-module. It is intended that you could copy and refactor this section
         for multiple different searches, sharing the above code between them.*/
        /* Some functions are not easily made DRY, mainly because of custom fields on chips */

        self.example = loadExample();

        self.transformExampleChip = transformExampleChip;
        function transformExampleChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }
            // Otherwise, create a new one
            return { example: chip }
        }
        // Define array of examples into a function to load at once
        function loadExample() {

            // LOAD DATA HERE i.e. setarray = [Array of stuff you want to map]
            // Example taken out for readability TODO: efficiently 'require' data into function loadExample
            var setarray = exampleArray;

            return setarray.map(function (example) {
                example._lowername = example.example.toLowerCase();
                return example;
            });
        }
        /**
         * Search items.
         */
        function querySearchExample (query) {
            var results = query ? self.example.filter(createFilterForExample(query)) : [];
            return results;
        }
        /**
         * Create filter function for a query string. Filter run once on search of particular string.
         */
        function createFilterForExample(query) {
            var lowercaseQuery = query.toLowerCase();

            return function filterFN(example) {
                return (example._lowername.indexOf(lowercaseQuery) === 0);
            };
        }
    }
})();


// Purely for Demonstration
var exampleArray = [
    // Current example == Linkedin Industry fields
    // SEE though relationship between key 'example' and examples above, creation of chips.
    {
        "code": 47,
        "groups": "corp, fin",
        "example": "Accounting"
    },
    {
        "code": 94,
        "groups": "man, tech, tran",
        "example": "Airlines/Aviation"
    },
    {
        "code": 120,
        "groups": "leg, org",
        "example": "Alternative Dispute Resolution"
    },
    {
        "code": 125,
        "groups": "hlth",
        "example": "Alternative Medicine"
    },
    {
        "code": 127,
        "groups": "art, med",
        "example": "Animation"
    },
    {
        "code": 19,
        "groups": "good",
        "example": "Apparel & Fashion"
    },
    {
        "code": 50,
        "groups": "cons",
        "example": "Architecture & Planning"
    },
    {
        "code": 111,
        "groups": "art, med, rec",
        "example": "Arts and Crafts"
    },
    {
        "code": 53,
        "groups": "man",
        "example": "Automotive"
    },
    {
        "code": 52,
        "groups": "gov, man",
        "example": "Aviation & Aerospace"
    },
    {
        "code": 41,
        "groups": "fin",
        "example": "Banking"
    },
    {
        "code": 12,
        "groups": "gov, hlth, tech",
        "example": "Biotechnology"
    },
    {
        "code": 36,
        "groups": "med, rec",
        "example": "Broadcast Media"
    },
    {
        "code": 49,
        "groups": "cons",
        "example": "Building Materials"
    },
    {
        "code": 138,
        "groups": "corp, man",
        "example": "Business Supplies and Equipment"
    },
    {
        "code": 129,
        "groups": "fin",
        "example": "Capital Markets"
    },
    {
        "code": 54,
        "groups": "man",
        "example": "Chemicals"
    },
    {
        "code": 90,
        "groups": "org, serv",
        "example": "Civic & Social Organization"
    },
    {
        "code": 51,
        "groups": "cons, gov",
        "example": "Civil Engineering"
    },
    {
        "code": 128,
        "groups": "cons, corp, fin",
        "example": "Commercial Real Estate"
    },
    {
        "code": 118,
        "groups": "tech",
        "example": "Computer & Network Security"
    },
    {
        "code": 109,
        "groups": "med, rec",
        "example": "Computer Games"
    },
    {
        "code": 3,
        "groups": "tech",
        "example": "Computer Hardware"
    },
    {
        "code": 5,
        "groups": "tech",
        "example": "Computer Networking"
    },
    {
        "code": 4,
        "groups": "tech",
        "example": "Computer Software"
    },
    {
        "code": 48,
        "groups": "cons",
        "example": "Construction"
    },
    {
        "code": 24,
        "groups": "good, man",
        "example": "Consumer Electronics"
    },
    {
        "code": 25,
        "groups": "good, man",
        "example": "Consumer Goods"
    },
    {
        "code": 91,
        "groups": "org, serv",
        "example": "Consumer Services"
    },
    {
        "code": 18,
        "groups": "good",
        "example": "Cosmetics"
    },
    {
        "code": 65,
        "groups": "agr",
        "example": "Dairy"
    },
    {
        "code": 1,
        "groups": "gov, tech",
        "example": "Defense & Space"
    },
    {
        "code": 99,
        "groups": "art, med",
        "example": "Design"
    },
    {
        "code": 69,
        "groups": "edu",
        "example": "Education Management"
    },
    {
        "code": 132,
        "groups": "edu, org",
        "example": "E-Learning"
    },
    {
        "code": 112,
        "groups": "good, man",
        "example": "Electrical/Electronic Manufacturing"
    },
    {
        "code": 28,
        "groups": "med, rec",
        "example": "Entertainment"
    },
    {
        "code": 86,
        "groups": "org, serv",
        "example": "Environmental Services"
    },
    {
        "code": 110,
        "groups": "corp, rec, serv",
        "example": "Events Services"
    },
    {
        "code": 76,
        "groups": "gov",
        "example": "Executive Office"
    },
    {
        "code": 122,
        "groups": "corp, serv",
        "example": "Facilities Services"
    },
    {
        "code": 63,
        "groups": "agr",
        "example": "Farming"
    },
    {
        "code": 43,
        "groups": "fin",
        "example": "Financial Services"
    },
    {
        "code": 38,
        "groups": "art, med, rec",
        "example": "Fine Art"
    },
    {
        "code": 66,
        "groups": "agr",
        "example": "Fishery"
    },
    {
        "code": 34,
        "groups": "rec, serv",
        "example": "Food & Beverages"
    },
    {
        "code": 23,
        "groups": "good, man, serv",
        "example": "Food Production"
    },
    {
        "code": 101,
        "groups": "org",
        "example": "Fund-Raising"
    },
    {
        "code": 26,
        "groups": "good, man",
        "example": "Furniture"
    },
    {
        "code": 29,
        "groups": "rec",
        "example": "Gambling & Casinos"
    },
    {
        "code": 145,
        "groups": "cons, man",
        "example": "Glass, Ceramics & Concrete"
    },
    {
        "code": 75,
        "groups": "gov",
        "example": "Government Administration"
    },
    {
        "code": 148,
        "groups": "gov",
        "example": "Government Relations"
    },
    {
        "code": 140,
        "groups": "art, med",
        "example": "Graphic Design"
    },
    {
        "code": 124,
        "groups": "hlth, rec",
        "example": "Health, Wellness and Fitness"
    },
    {
        "code": 68,
        "groups": "edu",
        "example": "Higher Education"
    },
    {
        "code": 14,
        "groups": "hlth",
        "example": "Hospital & Health Care"
    },
    {
        "code": 31,
        "groups": "rec, serv, tran",
        "example": "Hospitality"
    },
    {
        "code": 137,
        "groups": "corp",
        "example": "Human Resources"
    },
    {
        "code": 134,
        "groups": "corp, good, tran",
        "example": "Import and Export"
    },
    {
        "code": 88,
        "groups": "org, serv",
        "example": "Individual & Family Services"
    },
    {
        "code": 147,
        "groups": "cons, man",
        "example": "Industrial Automation"
    },
    {
        "code": 84,
        "groups": "med, serv",
        "example": "Information Services"
    },
    {
        "code": 96,
        "groups": "tech",
        "example": "Information Technology and Services"
    },
    {
        "code": 42,
        "groups": "fin",
        "example": "Insurance"
    },
    {
        "code": 74,
        "groups": "gov",
        "example": "International Affairs"
    },
    {
        "code": 141,
        "groups": "gov, org, tran",
        "example": "International Trade and Development"
    },
    {
        "code": 6,
        "groups": "tech",
        "example": "Internet"
    },
    {
        "code": 45,
        "groups": "fin",
        "example": "Investment Banking"
    },
    {
        "code": 46,
        "groups": "fin",
        "example": "Investment Management"
    },
    {
        "code": 73,
        "groups": "gov, leg",
        "example": "Judiciary"
    },
    {
        "code": 77,
        "groups": "gov, leg",
        "example": "Law Enforcement"
    },
    {
        "code": 9,
        "groups": "leg",
        "example": "Law Practice"
    },
    {
        "code": 10,
        "groups": "leg",
        "example": "Legal Services"
    },
    {
        "code": 72,
        "groups": "gov, leg",
        "example": "Legislative Office"
    },
    {
        "code": 30,
        "groups": "rec, serv, tran",
        "example": "Leisure, Travel & Tourism"
    },
    {
        "code": 85,
        "groups": "med, rec, serv",
        "example": "Libraries"
    },
    {
        "code": 116,
        "groups": "corp, tran",
        "example": "Logistics and Supply Chain"
    },
    {
        "code": 143,
        "groups": "good",
        "example": "Luxury Goods & Jewelry"
    },
    {
        "code": 55,
        "groups": "man",
        "example": "Machinery"
    },
    {
        "code": 11,
        "groups": "corp",
        "example": "Management Consulting"
    },
    {
        "code": 95,
        "groups": "tran",
        "example": "Maritime"
    },
    {
        "code": 97,
        "groups": "corp",
        "example": "Market Research"
    },
    {
        "code": 80,
        "groups": "corp, med",
        "example": "Marketing and Advertising"
    },
    {
        "code": 135,
        "groups": "cons, gov, man",
        "example": "Mechanical or Industrial Engineering"
    },
    {
        "code": 126,
        "groups": "med, rec",
        "example": "Media Production"
    },
    {
        "code": 17,
        "groups": "hlth",
        "example": "Medical Devices"
    },
    {
        "code": 13,
        "groups": "hlth",
        "example": "Medical Practice"
    },
    {
        "code": 139,
        "groups": "hlth",
        "example": "Mental Health Care"
    },
    {
        "code": 71,
        "groups": "gov",
        "example": "Military"
    },
    {
        "code": 56,
        "groups": "man",
        "example": "Mining & Metals"
    },
    {
        "code": 35,
        "groups": "art, med, rec",
        "example": "Motion Pictures and Film"
    },
    {
        "code": 37,
        "groups": "art, med, rec",
        "example": "Museums and Institutions"
    },
    {
        "code": 115,
        "groups": "art, rec",
        "example": "Music"
    },
    {
        "code": 114,
        "groups": "gov, man, tech",
        "example": "Nanotechnology"
    },
    {
        "code": 81,
        "groups": "med, rec",
        "example": "Newspapers"
    },
    {
        "code": 100,
        "groups": "org",
        "example": "Non-Profit Organization Management"
    },
    {
        "code": 57,
        "groups": "man",
        "example": "Oil & Energy"
    },
    {
        "code": 113,
        "groups": "med",
        "example": "Online Media"
    },
    {
        "code": 123,
        "groups": "corp",
        "example": "Outsourcing/Offshoring"
    },
    {
        "code": 87,
        "groups": "serv, tran",
        "example": "Package/Freight Delivery"
    },
    {
        "code": 146,
        "groups": "good, man",
        "example": "Packaging and Containers"
    },
    {
        "code": 61,
        "groups": "man",
        "example": "Paper & Forest Products"
    },
    {
        "code": 39,
        "groups": "art, med, rec",
        "example": "Performing Arts"
    },
    {
        "code": 15,
        "groups": "hlth, tech",
        "example": "Pharmaceuticals"
    },
    {
        "code": 131,
        "groups": "org",
        "example": "Philanthropy"
    },
    {
        "code": 136,
        "groups": "art, med, rec",
        "example": "Photography"
    },
    {
        "code": 117,
        "groups": "man",
        "example": "Plastics"
    },
    {
        "code": 107,
        "groups": "gov, org",
        "example": "Political Organization"
    },
    {
        "code": 67,
        "groups": "edu",
        "example": "Primary/Secondary Education"
    },
    {
        "code": 83,
        "groups": "med, rec",
        "example": "Printing"
    },
    {
        "code": 105,
        "groups": "corp",
        "example": "Professional Training & Coaching"
    },
    {
        "code": 102,
        "groups": "corp, org",
        "example": "Program Development"
    },
    {
        "code": 79,
        "groups": "gov",
        "example": "Public Policy"
    },
    {
        "code": 98,
        "groups": "corp",
        "example": "Public Relations and Communications"
    },
    {
        "code": 78,
        "groups": "gov",
        "example": "Public Safety"
    },
    {
        "code": 82,
        "groups": "med, rec",
        "example": "Publishing"
    },
    {
        "code": 62,
        "groups": "man",
        "example": "Railroad Manufacture"
    },
    {
        "code": 64,
        "groups": "agr",
        "example": "Ranching"
    },
    {
        "code": 44,
        "groups": "cons, fin, good",
        "example": "Real Estate"
    },
    {
        "code": 40,
        "groups": "rec, serv",
        "example": "Recreational Facilities and Services"
    },
    {
        "code": 89,
        "groups": "org, serv",
        "example": "Religious Institutions"
    },
    {
        "code": 144,
        "groups": "gov, man, org",
        "example": "Renewables & Environment"
    },
    {
        "code": 70,
        "groups": "edu, gov",
        "example": "Research"
    },
    {
        "code": 32,
        "groups": "rec, serv",
        "example": "Restaurants"
    },
    {
        "code": 27,
        "groups": "good, man",
        "example": "Retail"
    },
    {
        "code": 121,
        "groups": "corp, org, serv",
        "example": "Security and Investigations"
    },
    {
        "code": 7,
        "groups": "tech",
        "example": "Semiconductors"
    },
    {
        "code": 58,
        "groups": "man",
        "example": "Shipbuilding"
    },
    {
        "code": 20,
        "groups": "good, rec",
        "example": "Sporting Goods"
    },
    {
        "code": 33,
        "groups": "rec",
        "example": "Sports"
    },
    {
        "code": 104,
        "groups": "corp",
        "example": "Staffing and Recruiting"
    },
    {
        "code": 22,
        "groups": "good",
        "example": "Supermarkets"
    },
    {
        "code": 8,
        "groups": "gov, tech",
        "example": "Telecommunications"
    },
    {
        "code": 60,
        "groups": "man",
        "example": "Textiles"
    },
    {
        "code": 130,
        "groups": "gov, org",
        "example": "Think Tanks"
    },
    {
        "code": 21,
        "groups": "good",
        "example": "Tobacco"
    },
    {
        "code": 108,
        "groups": "corp, gov, serv",
        "example": "Translation and Localization"
    },
    {
        "code": 92,
        "groups": "tran",
        "example": "Transportation/Trucking/Railroad"
    },
    {
        "code": 59,
        "groups": "man",
        "example": "Utilities"
    },
    {
        "code": 106,
        "groups": "fin, tech",
        "example": "Venture Capital & Private Equity"
    },
    {
        "code": 16,
        "groups": "hlth",
        "example": "Veterinary"
    },
    {
        "code": 93,
        "groups": "tran",
        "example": "Warehousing"
    },
    {
        "code": 133,
        "groups": "good",
        "example": "Wholesale"
    },
    {
        "code": 142,
        "groups": "good, man, rec",
        "example": "Wine and Spirits"
    },
    {
        "code": 119,
        "groups": "tech",
        "example": "Wireless"
    },
    {
        "code": 103,
        "groups": "art, med, rec",
        "example": "Writing and Editing"
    }
];