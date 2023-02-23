/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.gallery_overlay = {
    attach: function (context, settings) {
      console.log("lightbox");

      // Create a lightbox container element
      var lightbox = document.createElement("div");
      lightbox.classList.add("lightbox");

      var images = document.getElementsByTagName("img"); // Get all the images on the page

      // Loop through all the images and add a click event listener
      for (var i = 0; i < images.length; i++) {
        images[i].addEventListener("click", function () {
          // Create an image element and set its source to the clicked image's source
          var img = document.createElement("img");
          img.src = this.src;

          while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild); // Clear any existing content in the lightbox container
          }
          lightbox.appendChild(img); // Add the image element to the lightbox container element

          // Add the lightbox container element to the page if it's not already added
          if (!lightbox.parentNode) {
            document.body.appendChild(lightbox);
          }

          // Add a click event listener to the lightbox container element to close it
          lightbox.addEventListener("click", function () {
            lightbox.style.display = "none";
          });
          lightbox.style.display = "block";
        });
      }
    },
  };
})(jQuery, Drupal);
