document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const locationFilter = document.getElementById('locationFilter');
  const dateFilter = document.getElementById('dateFilter');
  const eventCards = document.querySelectorAll('.event-card-item');
  const noResultsMsg = document.getElementById('noResultsMsg');

  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam && categoryFilter) {
    categoryFilter.value = decodeURIComponent(categoryParam);
  }

  function filterEvents() {
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const selectedLocation = locationFilter.value;
    const selectedDate = dateFilter.value;
    let visibleCount = 0;

    eventCards.forEach(card => {
      const title = card.querySelector('h5').textContent.toLowerCase();
      const text = card.querySelector('p').textContent.toLowerCase();
      const category = card.getAttribute('data-category');
      const location = card.getAttribute('data-location');
      const month = card.getAttribute('data-month');

      const matchesSearch = title.includes(query) || text.includes(query);
      const matchesCategory = (selectedCategory === 'all' || category === selectedCategory);
      const matchesLocation = (selectedLocation === 'all' || location === selectedLocation);
      const matchesDate = (selectedDate === 'all' || month === selectedDate);

      if (matchesSearch && matchesCategory && matchesLocation && matchesDate) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResultsMsg) {
      if (visibleCount === 0) {
        noResultsMsg.classList.remove('d-none');
      } else {
        noResultsMsg.classList.add('d-none');
      }
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterEvents);
    categoryFilter.addEventListener('change', filterEvents);
    locationFilter.addEventListener('change', filterEvents);
    dateFilter.addEventListener('change', filterEvents);
    filterEvents();
  }
});