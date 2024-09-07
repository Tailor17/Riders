document.addEventListener("DOMContentLoaded", function() {
    const galleryData = [
        { src: 'img/ft1.jpg', date: '2024-08-20' },
        { src: 'img/ft2.jpg', date: '2024-08-22' },
        { src: 'img/ft3.jpg', date: '2024-08-24' },
        { src: 'img/ft4.jpg', date: '2024-08-26' },
        { src: 'img/IMG_1247.jpg', date: '2024-08-25' },
        { src: 'img/IMG_1256.jpg', date: '2024-08-30' },
        { src: 'img/FT3.jpeg', date: '2024-08-30' },
        { src: 'img/IMG_2018.jpg', date: '2024-08-30' },
        { src: 'img/ft5.jpg', date: '2024-08-30' },
        { src: 'img/f6.jpg', date: '2024-08-25' },
        { src: 'img/f7.jpg', date: '2024-08-25' }
    ];

    const gallery = document.getElementById('gallery');
    const filterDateInput = document.getElementById('filter-date');
    const filterBtn = document.getElementById('filter-btn');
    const showAllBtn = document.getElementById('show-all-btn');
    const noImagesMsg = document.getElementById('no-images-msg');
    const imageModal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close');

    function displayImages(images) {
        gallery.innerHTML = '';
        if (images.length === 0) {
            noImagesMsg.style.display = 'block';
        } else {
            noImagesMsg.style.display = 'none';
            images.forEach(imgData => {
                const imgElement = document.createElement('img');
                imgElement.src = imgData.src;
                imgElement.alt = "Gallery Image";
                imgElement.classList.add('gallery-image'); // Adicionando classe para estilização
                imgElement.addEventListener('click', function() {
                    modalImg.src = imgData.src;
                    imageModal.style.display = 'block';
                });
                gallery.appendChild(imgElement);
            });
        }
    }

    filterBtn.addEventListener('click', function() {
        const selectedDate = filterDateInput.value;
        const filteredImages = galleryData.filter(img => img.date === selectedDate);
        displayImages(filteredImages);
    });

    showAllBtn.addEventListener('click', function() {
        filterDateInput.value = ''; // Clear date filter
        displayImages(galleryData);
    });

    closeBtn.addEventListener('click', function() {
        imageModal.style.display = 'none';
    });

    // Mostrar todas as imagens ao carregar a página
    displayImages(galleryData);
});
