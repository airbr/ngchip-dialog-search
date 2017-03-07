angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

    .controller('AppCtrl', function($scope, $mdDialog) {

        var self = this;

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

            document.getElementById("demo").innerHTML = "cookiesEnabled is " + navigator.cookieEnabled + " on " + navigator.vendor + " " + navigator.userAgent;

            $mdDialog.show({
                contentElement: '#myDialog',
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
        .module('MyApp')
        .controller('CustomInputCtrl', chipCtrl);

    function chipCtrl ($timeout, $q, $scope, $mdDialog) {
        console.log("chipCtrl fired");

        var self = this;

        /* Ng Material Chips directive properties */
        self.readonly = false;
        self.autocompleteDemoRequireMatch = false;
        self.removable = false;

        self.selectChip = function(chip) {
            // console.log(chip);
            var selectedChips = self.selectedChips;
            if (selectedChips.indexOf(chip) == -1) {
                selectedChips.push(chip);
            } else {
                selectedChips.pop(chip);
            }

            // console.log(selectedChips.indexOf(chip));
        }

        self.checkChip = function(chip) {
            var checkChip = chip;
            console.log(checkChip);
        }

        /**
         * Return the proper object when the append is called.
         */
        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }
            // Otherwise, create a new one
            return { name: chip }
        }

        /* SEARCH & Filtering */

        // Array of Selected Chips within Modal
        self.selectedChips = [];
        // Selected item from autocomplete init
        self.selectedItem = null;
        // Current search text within any autocompkete
        self.searchText = null;
        // Array of Suggested items that have been selected
        // self.selectSuggest = [];

        // Define query - NB: Seems easier to define seperate queries if intending multiple search modals, due to changing fields on chips.
        self.querySearchThing = querySearchThing;

//   *****************
        /* 1. THING. This is one chip-dialog-search-module. It is intended that you could copy and refactor this section for multiple different searches, sharing the above code between them.*/
        /* Some functions are not easily made DRY, mainly because of custom fields on chips */

        self.Thing = loadThing();

        self.transformThingChip = transformThingChip;
        function transformThingChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }
            // Otherwise, create a new one
            return { thing: chip }
        }
        // Define array of "things" into a function to load at once
        function loadThing() {

            var setarray = [
                // Put whatever JSON here with key of 'thing:' for this example
                // Current example == Linkedin Industry fields
                {
                    "code": 47,
                    "groups": "corp, fin",
                    "thing": "Accounting"
                },
                {
                    "code": 94,
                    "groups": "man, tech, tran",
                    "thing": "Airlines/Aviation"
                },
                {
                    "code": 120,
                    "groups": "leg, org",
                    "thing": "Alternative Dispute Resolution"
                },
                {
                    "code": 125,
                    "groups": "hlth",
                    "thing": "Alternative Medicine"
                },
                {
                    "code": 127,
                    "groups": "art, med",
                    "thing": "Animation"
                },
                {
                    "code": 19,
                    "groups": "good",
                    "thing": "Apparel & Fashion"
                },
                {
                    "code": 50,
                    "groups": "cons",
                    "thing": "Architecture & Planning"
                },
                {
                    "code": 111,
                    "groups": "art, med, rec",
                    "thing": "Arts and Crafts"
                },
                {
                    "code": 53,
                    "groups": "man",
                    "thing": "Automotive"
                },
                {
                    "code": 52,
                    "groups": "gov, man",
                    "thing": "Aviation & Aerospace"
                },
                {
                    "code": 41,
                    "groups": "fin",
                    "thing": "Banking"
                },
                {
                    "code": 12,
                    "groups": "gov, hlth, tech",
                    "thing": "Biotechnology"
                },
                {
                    "code": 36,
                    "groups": "med, rec",
                    "thing": "Broadcast Media"
                },
                {
                    "code": 49,
                    "groups": "cons",
                    "thing": "Building Materials"
                },
                {
                    "code": 138,
                    "groups": "corp, man",
                    "thing": "Business Supplies and Equipment"
                },
                {
                    "code": 129,
                    "groups": "fin",
                    "thing": "Capital Markets"
                },
                {
                    "code": 54,
                    "groups": "man",
                    "thing": "Chemicals"
                },
                {
                    "code": 90,
                    "groups": "org, serv",
                    "thing": "Civic & Social Organization"
                },
                {
                    "code": 51,
                    "groups": "cons, gov",
                    "thing": "Civil Engineering"
                },
                {
                    "code": 128,
                    "groups": "cons, corp, fin",
                    "thing": "Commercial Real Estate"
                },
                {
                    "code": 118,
                    "groups": "tech",
                    "thing": "Computer & Network Security"
                },
                {
                    "code": 109,
                    "groups": "med, rec",
                    "thing": "Computer Games"
                },
                {
                    "code": 3,
                    "groups": "tech",
                    "thing": "Computer Hardware"
                },
                {
                    "code": 5,
                    "groups": "tech",
                    "thing": "Computer Networking"
                },
                {
                    "code": 4,
                    "groups": "tech",
                    "thing": "Computer Software"
                },
                {
                    "code": 48,
                    "groups": "cons",
                    "thing": "Construction"
                },
                {
                    "code": 24,
                    "groups": "good, man",
                    "thing": "Consumer Electronics"
                },
                {
                    "code": 25,
                    "groups": "good, man",
                    "thing": "Consumer Goods"
                },
                {
                    "code": 91,
                    "groups": "org, serv",
                    "thing": "Consumer Services"
                },
                {
                    "code": 18,
                    "groups": "good",
                    "thing": "Cosmetics"
                },
                {
                    "code": 65,
                    "groups": "agr",
                    "thing": "Dairy"
                },
                {
                    "code": 1,
                    "groups": "gov, tech",
                    "thing": "Defense & Space"
                },
                {
                    "code": 99,
                    "groups": "art, med",
                    "thing": "Design"
                },
                {
                    "code": 69,
                    "groups": "edu",
                    "thing": "Education Management"
                },
                {
                    "code": 132,
                    "groups": "edu, org",
                    "thing": "E-Learning"
                },
                {
                    "code": 112,
                    "groups": "good, man",
                    "thing": "Electrical/Electronic Manufacturing"
                },
                {
                    "code": 28,
                    "groups": "med, rec",
                    "thing": "Entertainment"
                },
                {
                    "code": 86,
                    "groups": "org, serv",
                    "thing": "Environmental Services"
                },
                {
                    "code": 110,
                    "groups": "corp, rec, serv",
                    "thing": "Events Services"
                },
                {
                    "code": 76,
                    "groups": "gov",
                    "thing": "Executive Office"
                },
                {
                    "code": 122,
                    "groups": "corp, serv",
                    "thing": "Facilities Services"
                },
                {
                    "code": 63,
                    "groups": "agr",
                    "thing": "Farming"
                },
                {
                    "code": 43,
                    "groups": "fin",
                    "thing": "Financial Services"
                },
                {
                    "code": 38,
                    "groups": "art, med, rec",
                    "thing": "Fine Art"
                },
                {
                    "code": 66,
                    "groups": "agr",
                    "thing": "Fishery"
                },
                {
                    "code": 34,
                    "groups": "rec, serv",
                    "thing": "Food & Beverages"
                },
                {
                    "code": 23,
                    "groups": "good, man, serv",
                    "thing": "Food Production"
                },
                {
                    "code": 101,
                    "groups": "org",
                    "thing": "Fund-Raising"
                },
                {
                    "code": 26,
                    "groups": "good, man",
                    "thing": "Furniture"
                },
                {
                    "code": 29,
                    "groups": "rec",
                    "thing": "Gambling & Casinos"
                },
                {
                    "code": 145,
                    "groups": "cons, man",
                    "thing": "Glass, Ceramics & Concrete"
                },
                {
                    "code": 75,
                    "groups": "gov",
                    "thing": "Government Administration"
                },
                {
                    "code": 148,
                    "groups": "gov",
                    "thing": "Government Relations"
                },
                {
                    "code": 140,
                    "groups": "art, med",
                    "thing": "Graphic Design"
                },
                {
                    "code": 124,
                    "groups": "hlth, rec",
                    "thing": "Health, Wellness and Fitness"
                },
                {
                    "code": 68,
                    "groups": "edu",
                    "thing": "Higher Education"
                },
                {
                    "code": 14,
                    "groups": "hlth",
                    "thing": "Hospital & Health Care"
                },
                {
                    "code": 31,
                    "groups": "rec, serv, tran",
                    "thing": "Hospitality"
                },
                {
                    "code": 137,
                    "groups": "corp",
                    "thing": "Human Resources"
                },
                {
                    "code": 134,
                    "groups": "corp, good, tran",
                    "thing": "Import and Export"
                },
                {
                    "code": 88,
                    "groups": "org, serv",
                    "thing": "Individual & Family Services"
                },
                {
                    "code": 147,
                    "groups": "cons, man",
                    "thing": "Industrial Automation"
                },
                {
                    "code": 84,
                    "groups": "med, serv",
                    "thing": "Information Services"
                },
                {
                    "code": 96,
                    "groups": "tech",
                    "thing": "Information Technology and Services"
                },
                {
                    "code": 42,
                    "groups": "fin",
                    "thing": "Insurance"
                },
                {
                    "code": 74,
                    "groups": "gov",
                    "thing": "International Affairs"
                },
                {
                    "code": 141,
                    "groups": "gov, org, tran",
                    "thing": "International Trade and Development"
                },
                {
                    "code": 6,
                    "groups": "tech",
                    "thing": "Internet"
                },
                {
                    "code": 45,
                    "groups": "fin",
                    "thing": "Investment Banking"
                },
                {
                    "code": 46,
                    "groups": "fin",
                    "thing": "Investment Management"
                },
                {
                    "code": 73,
                    "groups": "gov, leg",
                    "thing": "Judiciary"
                },
                {
                    "code": 77,
                    "groups": "gov, leg",
                    "thing": "Law Enforcement"
                },
                {
                    "code": 9,
                    "groups": "leg",
                    "thing": "Law Practice"
                },
                {
                    "code": 10,
                    "groups": "leg",
                    "thing": "Legal Services"
                },
                {
                    "code": 72,
                    "groups": "gov, leg",
                    "thing": "Legislative Office"
                },
                {
                    "code": 30,
                    "groups": "rec, serv, tran",
                    "thing": "Leisure, Travel & Tourism"
                },
                {
                    "code": 85,
                    "groups": "med, rec, serv",
                    "thing": "Libraries"
                },
                {
                    "code": 116,
                    "groups": "corp, tran",
                    "thing": "Logistics and Supply Chain"
                },
                {
                    "code": 143,
                    "groups": "good",
                    "thing": "Luxury Goods & Jewelry"
                },
                {
                    "code": 55,
                    "groups": "man",
                    "thing": "Machinery"
                },
                {
                    "code": 11,
                    "groups": "corp",
                    "thing": "Management Consulting"
                },
                {
                    "code": 95,
                    "groups": "tran",
                    "thing": "Maritime"
                },
                {
                    "code": 97,
                    "groups": "corp",
                    "thing": "Market Research"
                },
                {
                    "code": 80,
                    "groups": "corp, med",
                    "thing": "Marketing and Advertising"
                },
                {
                    "code": 135,
                    "groups": "cons, gov, man",
                    "thing": "Mechanical or Industrial Engineering"
                },
                {
                    "code": 126,
                    "groups": "med, rec",
                    "thing": "Media Production"
                },
                {
                    "code": 17,
                    "groups": "hlth",
                    "thing": "Medical Devices"
                },
                {
                    "code": 13,
                    "groups": "hlth",
                    "thing": "Medical Practice"
                },
                {
                    "code": 139,
                    "groups": "hlth",
                    "thing": "Mental Health Care"
                },
                {
                    "code": 71,
                    "groups": "gov",
                    "thing": "Military"
                },
                {
                    "code": 56,
                    "groups": "man",
                    "thing": "Mining & Metals"
                },
                {
                    "code": 35,
                    "groups": "art, med, rec",
                    "thing": "Motion Pictures and Film"
                },
                {
                    "code": 37,
                    "groups": "art, med, rec",
                    "thing": "Museums and Institutions"
                },
                {
                    "code": 115,
                    "groups": "art, rec",
                    "thing": "Music"
                },
                {
                    "code": 114,
                    "groups": "gov, man, tech",
                    "thing": "Nanotechnology"
                },
                {
                    "code": 81,
                    "groups": "med, rec",
                    "thing": "Newspapers"
                },
                {
                    "code": 100,
                    "groups": "org",
                    "thing": "Non-Profit Organization Management"
                },
                {
                    "code": 57,
                    "groups": "man",
                    "thing": "Oil & Energy"
                },
                {
                    "code": 113,
                    "groups": "med",
                    "thing": "Online Media"
                },
                {
                    "code": 123,
                    "groups": "corp",
                    "thing": "Outsourcing/Offshoring"
                },
                {
                    "code": 87,
                    "groups": "serv, tran",
                    "thing": "Package/Freight Delivery"
                },
                {
                    "code": 146,
                    "groups": "good, man",
                    "thing": "Packaging and Containers"
                },
                {
                    "code": 61,
                    "groups": "man",
                    "thing": "Paper & Forest Products"
                },
                {
                    "code": 39,
                    "groups": "art, med, rec",
                    "thing": "Performing Arts"
                },
                {
                    "code": 15,
                    "groups": "hlth, tech",
                    "thing": "Pharmaceuticals"
                },
                {
                    "code": 131,
                    "groups": "org",
                    "thing": "Philanthropy"
                },
                {
                    "code": 136,
                    "groups": "art, med, rec",
                    "thing": "Photography"
                },
                {
                    "code": 117,
                    "groups": "man",
                    "thing": "Plastics"
                },
                {
                    "code": 107,
                    "groups": "gov, org",
                    "thing": "Political Organization"
                },
                {
                    "code": 67,
                    "groups": "edu",
                    "thing": "Primary/Secondary Education"
                },
                {
                    "code": 83,
                    "groups": "med, rec",
                    "thing": "Printing"
                },
                {
                    "code": 105,
                    "groups": "corp",
                    "thing": "Professional Training & Coaching"
                },
                {
                    "code": 102,
                    "groups": "corp, org",
                    "thing": "Program Development"
                },
                {
                    "code": 79,
                    "groups": "gov",
                    "thing": "Public Policy"
                },
                {
                    "code": 98,
                    "groups": "corp",
                    "thing": "Public Relations and Communications"
                },
                {
                    "code": 78,
                    "groups": "gov",
                    "thing": "Public Safety"
                },
                {
                    "code": 82,
                    "groups": "med, rec",
                    "thing": "Publishing"
                },
                {
                    "code": 62,
                    "groups": "man",
                    "thing": "Railroad Manufacture"
                },
                {
                    "code": 64,
                    "groups": "agr",
                    "thing": "Ranching"
                },
                {
                    "code": 44,
                    "groups": "cons, fin, good",
                    "thing": "Real Estate"
                },
                {
                    "code": 40,
                    "groups": "rec, serv",
                    "thing": "Recreational Facilities and Services"
                },
                {
                    "code": 89,
                    "groups": "org, serv",
                    "thing": "Religious Institutions"
                },
                {
                    "code": 144,
                    "groups": "gov, man, org",
                    "thing": "Renewables & Environment"
                },
                {
                    "code": 70,
                    "groups": "edu, gov",
                    "thing": "Research"
                },
                {
                    "code": 32,
                    "groups": "rec, serv",
                    "thing": "Restaurants"
                },
                {
                    "code": 27,
                    "groups": "good, man",
                    "thing": "Retail"
                },
                {
                    "code": 121,
                    "groups": "corp, org, serv",
                    "thing": "Security and Investigations"
                },
                {
                    "code": 7,
                    "groups": "tech",
                    "thing": "Semiconductors"
                },
                {
                    "code": 58,
                    "groups": "man",
                    "thing": "Shipbuilding"
                },
                {
                    "code": 20,
                    "groups": "good, rec",
                    "thing": "Sporting Goods"
                },
                {
                    "code": 33,
                    "groups": "rec",
                    "thing": "Sports"
                },
                {
                    "code": 104,
                    "groups": "corp",
                    "thing": "Staffing and Recruiting"
                },
                {
                    "code": 22,
                    "groups": "good",
                    "thing": "Supermarkets"
                },
                {
                    "code": 8,
                    "groups": "gov, tech",
                    "thing": "Telecommunications"
                },
                {
                    "code": 60,
                    "groups": "man",
                    "thing": "Textiles"
                },
                {
                    "code": 130,
                    "groups": "gov, org",
                    "thing": "Think Tanks"
                },
                {
                    "code": 21,
                    "groups": "good",
                    "thing": "Tobacco"
                },
                {
                    "code": 108,
                    "groups": "corp, gov, serv",
                    "thing": "Translation and Localization"
                },
                {
                    "code": 92,
                    "groups": "tran",
                    "thing": "Transportation/Trucking/Railroad"
                },
                {
                    "code": 59,
                    "groups": "man",
                    "thing": "Utilities"
                },
                {
                    "code": 106,
                    "groups": "fin, tech",
                    "thing": "Venture Capital & Private Equity"
                },
                {
                    "code": 16,
                    "groups": "hlth",
                    "thing": "Veterinary"
                },
                {
                    "code": 93,
                    "groups": "tran",
                    "thing": "Warehousing"
                },
                {
                    "code": 133,
                    "groups": "good",
                    "thing": "Wholesale"
                },
                {
                    "code": 142,
                    "groups": "good, man, rec",
                    "thing": "Wine and Spirits"
                },
                {
                    "code": 119,
                    "groups": "tech",
                    "thing": "Wireless"
                },
                {
                    "code": 103,
                    "groups": "art, med, rec",
                    "thing": "Writing and Editing"
                }
            ];

            return setarray.map(function (Thing) {
                Thing._lowername = Thing.thing.toLowerCase();
                return Thing;
            });
        }
        /**
         * Search items.
         */
        function querySearchThing (query) {
            var results = query ? self.Thing.filter(createFilterForThing(query)) : [];
            return results;
        }
        /**
         * Create filter function for a query string. Filter run once on search of particular string.
         */
        function createFilterForThing(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFN(Thing) {
                // Logs -1 if no match found for query in string, logs index of character in string if match
                // console.log(Thing._lowername.indexOf(lowercaseQuery));
                // Logs match
                // if ( Thing._lowername.indexOf(lowercaseQuery) === 0) {
                //     console.log(Thing);
                // }
                return (Thing._lowername.indexOf(lowercaseQuery) === 0);
            };
        }
    }
})();


