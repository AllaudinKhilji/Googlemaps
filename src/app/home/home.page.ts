

// import { Component, AfterViewInit, ViewChild } from '@angular/core';

// // Declaration for the Google Maps API
// declare var google: any;

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage implements AfterViewInit {
//   // Access the search bar element from the HTML template
//   @ViewChild('searchBar') searchBar: any;

//   // Variables for origin, destination, and stops
//   origin: string = '';
//   destination: string = '';
//   stops: string = ''; // Added variable for stops

//   // Variables for map and markers
//   map: any;
//   originMarker: any;
//   destinationMarker: any;
//   stopsMarkers: any[] = []; // Added array for stop markers
//   directionsRenderer: any;
//   userMarker: any;

//   constructor() {}

//   ngAfterViewInit() {
//     // Delayed initialization to ensure the view is rendered
//     setTimeout(() => {
//       this.loadMap();
//     }, 1000);
//   }

//   loadMap() {
//     // Get the current location using the browser's Geolocation API
//     navigator.geolocation.getCurrentPosition((position) => {
//       const { latitude, longitude } = position.coords;

//       // Map configuration options
//       const mapOptions = {
//         center: { lat: latitude, lng: longitude },
//         zoom: 13,
//         disableDefaultUI: true, // Disable default UI controls
//       };

//       // Create a new map instance with the provided options
//       this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
//       this.directionsRenderer = new google.maps.DirectionsRenderer({
//         map: this.map,
//       });

//       // Create a marker for the user's current location
//       const userMarker = new google.maps.Marker({
//         position: { lat: latitude, lng: longitude },
//         map: this.map,
//         icon: {
//           path: google.maps.SymbolPath.CIRCLE,
//           scale: 8,
//           fillColor: 'blue',
//           fillOpacity: 1,
//           strokeWeight: 0,
//         },
//       });

//       // Create a circle overlay around the user's location
//       const circle = new google.maps.Circle({
//         map: this.map,
//         center: { lat: latitude, lng: longitude },
//         radius: 100, // Specify the desired radius in meters
//         fillColor: 'blue',
//         fillOpacity: 0.1,
//         strokeColor: 'blue',
//         strokeOpacity: 0.3,
//         strokeWeight: 1,
//       });

//       // Update the marker and circle as the user moves
//       google.maps.event.addListener(this.map, 'mousemove', (event: { latLng: any }) => {
//         const newPosition = event.latLng;
//         userMarker.setPosition(newPosition);
//         circle.setCenter(newPosition);
//       });
//     });
//   }

//   trackUserLocation(userMarker: { setPosition: (arg0: any) => void }) {
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(
//         (position) => {
//           const newPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//           userMarker.setPosition(newPosition);
//         },
//         (error) => {
//           console.error('Error tracking user location:', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }

//   async onSearch() {
//     if (this.origin !== '' && this.destination !== '') {
//       // Clear previous markers and route
//       if (this.originMarker) {
//         this.originMarker.setMap(null);
//       }
//       if (this.destinationMarker) {
//         this.destinationMarker.setMap(null);
//       }
//       this.directionsRenderer.setDirections({ routes: [] });

//       const origin = this.origin;
//       const destination = this.destination;
      
//       // Split stops into an array
//       const stopsArray = this.stops.split(',');

//       const waypoints = [];
//       for (let stop of stopsArray) {
//         stop = stop.trim();
//         if (stop !== '') {
//           waypoints.push({ location: stop, stopover: true });
//         }
//       }

//       const directionsService = new google.maps.DirectionsService();
//       try {
//         const response = await directionsService.route({
//           origin: origin,
//           destination: destination,
//           travelMode: google.maps.TravelMode.DRIVING,
//           waypoints: waypoints,
//         });

//         if (response.status === google.maps.DirectionsStatus.OK) {
//           this.directionsRenderer.setDirections(response);

//           const route = response.routes[0];
//           const leg = route.legs[0];

//           // Create a marker for the origin location
//           this.originMarker = new google.maps.Marker({
//             position: leg.start_location,
//             map: this.map,
//             icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
//           });

//           // Create a marker for the destination location
//           this.destinationMarker = new google.maps.Marker({
//             position: leg.end_location,
//             map: this.map,
//             icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
//           });

//           // Clear previous stop markers
//           for (const marker of this.stopsMarkers) {
//             marker.setMap(null);
//           }
//           this.stopsMarkers = [];

//           // Create markers for the stop locations
//           for (let i = 0; i < leg.via_waypoints.length; i++) {
//             const stopLocation = leg.via_waypoints[i];
//             const stopMarker = new google.maps.Marker({
//               position: stopLocation,
//               map: this.map,
//               icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
//             });
//             this.stopsMarkers.push(stopMarker);
//           }

//           // Zoom and center the map based on the route
//           this.map.fitBounds(route.bounds);
//         } else {
//           console.error('Directions request failed:', response.status);
//         }
//       } catch (error) {
//         console.error('Error occurred during directions request:', error);
//       }
//     } else {
//       console.log('Please enter both origin and destination.');
//     }
//   }
// }


import { Component, AfterViewInit, ViewChild } from '@angular/core';

// Declaration for the Google Maps API
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  // Access the search bar element from the HTML template
  @ViewChild('searchBar') searchBar: any;

  // Variables for origin, destination, and stops
  origin: string = '';
  destination: string = '';
  stops: string = ''; // Added variable for stops

  // Variables for map and markers
  map: any;
  originMarker: any;
  destinationMarker: any;
  stopsMarkers: any[] = []; // Added array for stop markers
  directionsRenderer: any;
  userMarker: any;
  
  showStartButton: boolean = true; // Flag to control the visibility of the "Start" button

  constructor() {}

  ngAfterViewInit() {
    // Delayed initialization to ensure the view is rendered
    setTimeout(() => {
      this.loadMap();
    }, 1000);
  }

  loadMap() {
    // Get the current location using the browser's Geolocation API
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      // Map configuration options
      const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 13,
        disableDefaultUI: true, // Disable default UI controls
      };

      // Create a new map instance with the provided options
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      this.directionsRenderer = new google.maps.DirectionsRenderer({
        map: this.map,
      });

      // Create a marker for the user's current location
      const userMarker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: this.map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: 'blue',
          fillOpacity: 1,
          strokeWeight: 0,
        },
      });

      // Create a circle overlay around the user's location
      const circle = new google.maps.Circle({
        map: this.map,
        center: { lat: latitude, lng: longitude },
        radius: 100, // Specify the desired radius in meters
        fillColor: 'blue',
        fillOpacity: 0.1,
        strokeColor: 'blue',
        strokeOpacity: 0.3,
        strokeWeight: 1,
      });

      // Update the marker and circle as the user moves
      google.maps.event.addListener(this.map, 'mousemove', (event: { latLng: any }) => {
        const newPosition = event.latLng;
        userMarker.setPosition(newPosition);
        circle.setCenter(newPosition);
      });
    });
  }

  trackUserLocation(userMarker: { setPosition: (arg0: any) => void }) {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const newPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          userMarker.setPosition(newPosition);
        },
        (error) => {
          console.error('Error tracking user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  async onSearch() {
    if (this.origin !== '' && this.destination !== '') {
      // Clear previous markers and route
      if (this.originMarker) {
        this.originMarker.setMap(null);
      }
      if (this.destinationMarker) {
        this.destinationMarker.setMap(null);
      }
      this.directionsRenderer.setDirections({ routes: [] });

      const origin = this.origin;
      const destination = this.destination;

      // Split stops into an array
      const stopsArray = this.stops.split(',');

      const waypoints = [];
      for (let stop of stopsArray) {
        stop = stop.trim();
        if (stop !== '') {
          waypoints.push({ location: stop, stopover: true });
        }
      }

      const directionsService = new google.maps.DirectionsService();
      try {
        const response = await directionsService.route({
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: waypoints,
        });

        if (response.status === google.maps.DirectionsStatus.OK) {
          this.directionsRenderer.setDirections(response);

          const route = response.routes[0];
          const leg = route.legs[0];

          // Create a marker for the origin location
          this.originMarker = new google.maps.Marker({
            position: leg.start_location,
            map: this.map,
            icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          });

          // Create a marker for the destination location
          this.destinationMarker = new google.maps.Marker({
            position: leg.end_location,
            map: this.map,
            icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          });

          // Clear previous stop markers
          for (const marker of this.stopsMarkers) {
            marker.setMap(null);
          }
          this.stopsMarkers = [];

          // Create markers for the stop locations
          for (let i = 0; i < leg.via_waypoints.length; i++) {
            const stopLocation = leg.via_waypoints[i];
            const stopMarker = new google.maps.Marker({
              position: stopLocation,
              map: this.map,
              icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            });
            this.stopsMarkers.push(stopMarker);
          }

          // Zoom and center the map based on the route
          this.map.fitBounds(route.bounds);

          // Enable turn-by-turn navigation
          const directionsDisplay = new google.maps.DirectionsRenderer();
          directionsDisplay.setMap(this.map);
          directionsDisplay.setDirections(response);

          // Hide the "Start" button
          this.showStartButton = false;
        } else {
          console.error('Directions request failed:', response.status);
        }
      } catch (error) {
        console.error('Error occurred during directions request:', error);
      }
    } else {
      console.log('Please enter both origin and destination.');
    }
  }

  startNavigation() {
    const route = this.directionsRenderer.getDirections().routes[0];
    const leg = route.legs[0];

    // Zoom and center the map to show the starting location
    this.map.setZoom(15);
    this.map.setCenter(leg.start_location);

    // Set the route and show turn-by-turn instructions on the map
    this.directionsRenderer.setDirections(this.directionsRenderer.getDirections());
    this.directionsRenderer.setPanel(document.getElementById('directions-panel'));
  }
}
