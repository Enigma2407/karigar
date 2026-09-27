document.addEventListener("DOMContentLoaded", function () {

    /* ================================
       PAGE LOAD ANIMATION
    ================================= */

    document.body.classList.add("page-loaded");


    /* ================================
       PAGE TRANSITION
    ================================= */

    const links = document.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const destination = this.getAttribute("href");

            if (
                destination &&
                destination.endsWith(".html") &&
                destination !== window.location.pathname.split("/").pop()
            ) {

                event.preventDefault();

                document.body.classList.add("page-exit");

                setTimeout(function () {
                    window.location.href = destination;
                }, 350);

            }

        });

    });


    /* ================================
       IMAGE LIGHTBOX
    ================================= */

    const galleryImages = document.querySelectorAll(
    ".gallery-grid img, .certificate-clickable"
);
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeButton = document.getElementById("lightboxClose");
    const previousButton = document.getElementById("lightboxPrev");
    const nextButton = document.getElementById("lightboxNext");
    const counter = document.getElementById("lightboxCounter");

    let currentImage = 0;


    /* Open image */

    galleryImages.forEach(function (image, index) {

        image.addEventListener("click", function () {

            currentImage = index;

            showImage(currentImage);

            lightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    /* Show selected image */

    function showImage(index) {

        if (galleryImages.length === 0) return;

        if (index < 0) {
            currentImage = galleryImages.length - 1;
        }

        else if (index >= galleryImages.length) {
            currentImage = 0;
        }

        else {
            currentImage = index;
        }

        lightboxImage.src = galleryImages[currentImage].src;

        lightboxImage.alt = galleryImages[currentImage].alt;

        counter.textContent =
            (currentImage + 1) + " / " + galleryImages.length;

    }


    /* Previous */

    previousButton.addEventListener("click", function (event) {

        event.stopPropagation();

        showImage(currentImage - 1);

    });


    /* Next */

    nextButton.addEventListener("click", function (event) {

        event.stopPropagation();

        showImage(currentImage + 1);

    });


    /* Close */

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }


    closeButton.addEventListener("click", function () {

        closeLightbox();

    });


    /* Click outside image to close */

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    /* Keyboard controls */

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showImage(currentImage - 1);
        }

        if (event.key === "ArrowRight") {
            showImage(currentImage + 1);
        }

    });

});