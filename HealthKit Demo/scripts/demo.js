(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        isAvailable: function () {
            if (!this.checkSimulator()) {
              window.plugins.healthkit.available(
                function(isAvailable) { alert(isAvailable ? "Yes :)" : "Nope :(") }
              );
            }
        },

        getBirthdate: function () {
            if (!this.checkSimulator()) {
              window.plugins.healthkit.readDateOfBirth(
                this.onSuccess,
                this.onError
              );
            }
        },

        getGender: function () {
            if (!this.checkSimulator()) {
              window.plugins.healthkit.readGender(
                this.onSuccess,
                this.onError
              );
            }
        },

        getHeight: function () {
            if (!this.checkSimulator()) {
              window.plugins.healthkit.readHeight(
                {
                  'unit': 'cm' // mm|cm|m|in|ft
                },
                this.onSuccess,
                this.onError
              );
            }
        },

        getWeight: function () {
            if (!this.checkSimulator()) {
              window.plugins.healthkit.readWeight(
                {
                  'unit': 'kg' // g|kg|oz|lb|st
                },
                this.onSuccess,
                this.onError
              );
            }
        },

        setWeight80kg: function () {
            if (!this.checkSimulator()) {
              window.plugins.healthkit.saveWeight(
                {
                  'unit'  : 'kg', // g|kg|oz|lb|st
                  'amount': 80,
                  'date'  : new Date() // is 'now', which is the default as well
                },
                this.onSuccess,
                this.onError
              );
            }
        },

        setWeight80kgToday: function () {
            if (!this.checkSimulator()) {
              window.plugins.healthkit.saveWeight(
                {
                  'unit'  : 'kg', // g|kg|oz|lb|st
                  'amount': 80,
                  'date'  : new Date() // is 'now', which is the default as well
                },
                this.onSuccess,
                this.onError
              );
            }
        },

        setWeight170poundYesterday: function () {
            if (!this.checkSimulator()) {
              window.plugins.healthkit.saveWeight(
                {
                  'unit'  : 'lb', // g|kg|oz|lb|st
                  'amount': 170,
                  'date'  : new Date(new Date().getTime() - 24*60*60*1000) // yesterday
                },
                this.onSuccess,
                this.onError
              );
            }
        },

        setHeight180cmToday: function () {
            if (!this.checkSimulator()) {
              window.plugins.healthkit.saveHeight(
                {
                  'unit': 'cm', // m|cm|mm|in|ft
                  'amount': 180
                  // leaving out the optinal 'date' param, so it defaults to 'now'
                },
                this.onSuccess,
                this.onError
              );
            }
        },

        querySampleType: function () {
          if (!this.checkSimulator()) {
            window.plugins.healthkit.querySampleType(
              {
                'startDate': new Date(new Date().getTime() - 2*24*60*60*1000), // two days ago
                'endDate': new Date(), // now
                'sampleType': 'HKQuantityTypeIdentifierStepCount', // anything in HealthKit/HKTypeIdentifiers.h
                'unit' : 'count' // make sure this is compatible with the sampleType
              },
              this.onSuccess,
              this.onError
            );
          }
        },

        saveWorkout: function () {
          if (!this.checkSimulator()) {
            window.plugins.healthkit.saveWorkout(
              {
                'activityType': 'HKWorkoutActivityTypeCycling', // HKWorkoutActivityType constant (https://developer.apple.com/library/ios/documentation/HealthKit/Reference/HKWorkout_Class/#//apple_ref/c/tdef/HKWorkoutActivityType)
                'quantityType': 'HKQuantityTypeIdentifierDistanceCycling',
                'startDate': new Date(), // mandatory
                'endDate': null,         // optional, use either this or duration
                'duration': 60 * 60,     // in seconds, optional, use either this or endDate
                'energy': 800,
                'energyUnit': 'kcal',    // J|cal|kcal
                'distance': 25,          // optional
                'distanceUnit': 'km'
              },
              this.onSuccess,
              this.onError
            )
          }
        },

        findAllWorkouts: function () {
          if (!this.checkSimulator()) {
            window.plugins.healthkit.findWorkouts(
              {
                // no params supported yet
              },
              this.onSuccess,
              this.onError
            )
          }
        },

        onSuccess: function (result) {
          alert(result == null ? "OK" : JSON.stringify(result));
        },

        onError: function (result) {
          alert(JSON.stringify(result));
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.plugins.healthkit === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);